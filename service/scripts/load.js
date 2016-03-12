var _ = require('lodash'),
	fs = require('fs'),
	csv = require('csv'),
	Sequelize = require('sequelize');

var sequelize = new Sequelize('monet', 'olga', 'password');

var locationModel = require('../models/location')(sequelize);
var objectModel = require('../models/object')(sequelize);
var ibeaconModel = require('../models/ibeacon')(sequelize);

var objectDataFile = fs.readFileSync('./PMAPowerofArtHackathon-collectiondata.json');
var objectData = JSON.parse(objectDataFile);

var locationDataFile = fs.readFileSync('./PMAPowerofArtHackathon-locations.json');
var locationData = JSON.parse(locationDataFile);

var ibeaconDataFile = fs.readFileSync('./PMAPowerofArtHackathon-ibeacons.json');
var ibeaconData = JSON.parse(ibeaconDataFile);

sequelize
  .sync({ force: true })
  .then(function() {
  	console.log(locationData.locations)
    locationModel.bulkCreate(locationData.locations).then(function () {
    	var filterRegex = /(Gallery ([1-9]{3}))|(Great Stair Hall)/;
		var galleryNumRegex = /Gallery ([1-9]{3})/;

		locationModel.findOne({ where: { name: 'GSH_2_stairs'} }).then(function (GSH) {
			_.filter(objectData,
			 	function (object) { return filterRegex.test(object.galleryLocation); })
			.map(function (object) {
				// Gallery 275, European Art 1500-1850, second floor (Pollack Gallery)

				if ((/^Great Stair Hall/).test(object.galleryLocation)) {
					object.locationId = GSH.id;
					objectModel.create(object);
				} else if (galleryNumRegex.test(object.galleryLocation)) {
					var galleryNum = galleryNumRegex.exec(object.galleryLocation)[1];
					locationModel.findOne({ where: { name: galleryNum } }).then(function (gallery) {
						//console.log(gallery);
						if (gallery) {
							object.locationId = gallery.id;
							objectModel.create(object);
						}
					});
				} else {
					console.log(object);
				}
			});
		});

		_.map(ibeaconData.beacons, function (beacon) {
			locationModel.findOne({ where: { name: beacon.alias }})
			.then(function (location) {
				if (location) {
					beacon.locationId = location.id;
					ibeaconModel.create(beacon);
				} else {
					locationModel.findOne({ where: { name: { $like: beacon.alias.substring(0,3) + '%' }}})
					.then(function (location) {
						if (location) {
							beacon.locationId = location.id;
							ibeaconModel.create(beacon);
						}
					});
				}
			});
		});
	}, function (err) { console.log(err); });
  },
  function (err) {
  	console.log(err);
  });
