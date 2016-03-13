angular.module('starter.services').factory('social', function($q, $http, $cordovaSocialSharing) {
  return {
    share: function (message, subject, file, link) {
      // $cordovaSocialSharing
      //   .share(message, subject, file, link) // Share via native share sheet
      //   .then(function(result) {
      //     // Success!
      //     console.log(result);
      //   }, function(err) {
      //     // An error occured. Show a message to the user
      //     console.log(err);
      //   });
      cordova.plugins.socialsharing.share(message, subject, file, link, function () {
          q.resolve(true);
        }, function () {
          q.reject(false);
        });
    }
  }
});