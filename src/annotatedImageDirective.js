angular.module('starter.directives').directive("annotatedImage", function(
  $state,
  $http,
  iBeacons,
  $cordovaSocialSharing
){
  return {
    bindToController: true,
    controllerAs: "view",
    restrict: "E",
    templateUrl: "templates/directive.annotatedImage.html",
    controller: function($scope) {
      var view = this;
      view.loading = true;
      view.annotations = [];
      view.activeAnnotationIndex = 0;

      iBeacons.getObject($state.params.id).then(function(response){
        var object = response.data;

        view.object = object;
        view.object.pois.sort(function(a, b){
          return b.id - a.id;
        });

        view.loading = false;
      });

      view.previousAnnotation = function(){
        if (view.activeAnnotationIndex > 0) {
          view.activeAnnotationIndex -= 1;
        }
      }

      view.nextAnnotation = function(){
        if (view.activeAnnotationIndex < view.object.pois.length - 1) {
          view.activeAnnotationIndex += 1;
        }
      }

      view.share = function(){
        var post = "I just learned something cool about " + view.object.titleOfWork1 + " at #pma: https://arty-facts.io/34hkj3h #art_facts";
        $cordovaSocialSharing.shareViaTwitter(post, "http://52.90.46.49/images/" + view.object.imageFilename).then(function(result) {
          console.log("Success!!!!");
          console.log(result);

        }).catch(function(error){
          console.log("Error...");
          console.log(error);
        });
      }

      $scope.$on("share-button-clicked", view.share);

      return view;
    }
  }
});
