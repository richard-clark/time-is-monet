angular.module('starter.services', [])

.factory('iBeacons', function($q, $http) {
  var baseUrl = 'http://52.90.46.49';

  $http.defaults.headers.common.Authorization = 'Bearer 9a9688e2-e0f3-4b48-ac60-902ef7a36eee';

  return {
    getObjects: function (beacons) {
      // query each ibeacon, then get unique locationIds, then query all objects with those locationIds

      function queryBeacon (beacon) {
        return $http({
          method: 'GET',
          url: baseUrl + '/ibeacons?major=' + beacon.major + '&minor=' + beacon.minor
        }).then(function (response) {
          if (response.data.length > 0) {
            return response.data[0].locationId;
          }
        });
      }

      function getUniqueLocationIds (beacons) {
        beaconPromises = beacons.map(queryBeacon);
        return $q.all(beaconPromises).then(function(locationIds){
          var uniqueLocationIds = {};
          locationIds.forEach(function(locationId){
            uniqueLocationIds[locationId] = true;
          });
          
          return Object.keys(uniqueLocationIds);
        });
      }

      function queryLocationObjects (locationId) {
        return $http({
          method: 'GET',
          url: baseUrl + '/objects?locationId=' + locationId
        }).then(function successCallback (response) {
          return response.data;
        });
      }

      function flatten (items) {
        return items.reduce(function(previous, current) {
          return previous.concat(current);
        }, []);
      }

      return getUniqueLocationIds(beacons).then(function (locationIds) {
        locationPromises = locationIds.map(queryLocationObjects);
        return $q.all(locationPromises).then(function (objects) {
          return flatten(objects);
        });
      });
    }
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
