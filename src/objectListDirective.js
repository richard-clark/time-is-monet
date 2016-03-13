angular.module('starter.directives').directive("objectList", function(
  $state,
  $http,
  $rootScope,
  $ionicPlatform,
  // $cordovaBeacon
  iBeacons
){
  return {
    bindToController: true,
    controllerAs: "view",
    restrict: "E",
    scope: {},
    templateUrl: "templates/directive.objectList.html",
    controller: function($scope) {
      var view = this;
      view.loading = false;
      view.objects = [];
      var beacons = [{
        major: "22912",
        minor: "5583"
      }];

      iBeacons.getObjects(beacons).then(function(objects){
        view.objects = objects;
        view.loading = false;
      });

      // function beaconsLoadeded(allBeacons) {
      //   view.callbacks++;
      //   var uniqueBeaconKey;
      //   view.beacons = allBeacons;
      //   view.beacons = allBeacons.filter(function(beacon){
      //     return beacon.proximity == "ProximityNear" || beacon.proximity == "ProximityImmediate";
      //   });
      //   view.beacons.forEach(function(beacon){
      //     beacon.uniqueBeaconKey = beacon.uuid + ":" + beacon.major + ":" + beacon.minor;
      //   });
      // }
      //
      // $ionicPlatform.ready(function() {
      //   view.loading = true;
      //
      //   $cordovaBeacon.requestWhenInUseAuthorization();
      //
      //   $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
      //     $scope.$applyAsync(function(){
      //       beaconsLoadeded(pluginResult.beacons);
      //     });
      //   });

      //   $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("pms", "f7826da6-4fa2-4e98-8024- bc5b71e0893e"));
      // });

      return view;
    }
  }
});
