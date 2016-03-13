var Sequelize = require('sequelize'),
	epilogue = require('epilogue'),
	http = require('http'),
	fs = require('fs'),
	restify = require('restify');

var sequelize = new Sequelize('monet', 'olga', 'password');

var locationModel = require('./models/location')(sequelize);
var objectModel = require('./models/object')(sequelize);
var ibeaconModel = require('./models/ibeacon')(sequelize);
var poiModel = require('./models/poi')(sequelize);

objectModel.hasMany(poiModel, {foreignKey: 'objectId', as: 'pois'});

var app = server = restify.createServer()
app.use(function (req, res, next) {
	if ((/^\/images\/.+/).test(req.url))
		return next();

	if (req.headers.authorization &&
		req.headers.authorization.replace('Bearer ','') == process.env.API_KEY)
		next();
	else {
		res.statusCode = 401;
		res.end();
	}
});

app.use(restify.queryParser());
app.use(restify.bodyParser());

app.get('/images/:file', function (req, res, next) {
	fs.readFile('./images/' + req.params.file, function(err, file) {
		if (err) {
			res.statusCode = 404;
			return res.end();
		}

		res.writeHead(200);
		res.write(file);
		res.end();
	});
});

app.get('/images/thumbnails/:file', function (req, res, next) {
	fs.readFile('./images/thumbnails/' + req.params.file, function(err, file) {
		if (err) {
			res.statusCode = 404;
			return res.end();
		}

		res.writeHead(200);
		res.write(file);
		res.end();
	});
});

epilogue.initialize({
	app: app,
	sequelize: sequelize
});

var objectResource = epilogue.resource({
	model: objectModel,
	endpoints: ['/objects', '/objects/:objectid'],
	associations: true
});

var locationResource = epilogue.resource({
	model: locationModel,
	endpoints: ['/locations', '/locations/:id']
});

var ibeaconResource = epilogue.resource({
	model: ibeaconModel,
	endpoints: ['/ibeacons', '/ibeacons/:id']
});

var poieRsource = epilogue.resource({
	model: poiModel,
	endpoints: ['/poi', '/poi/:id']
});

sequelize
  .sync({ force: false })
  .then(function() {
    server.listen(5556, function() {
      var host = server.address().address,
          port = server.address().port;

      console.log('listening at http://%s:%s', host, port);
    });
  });
