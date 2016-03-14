angular.module('starter.directives').directive("shareButton", function(
  $rootScope
){
  return {
    bindToController: true,
    controllerAs: "view",
    restrict: "A",
    controller: function($scope) {
      return this;
    },
    link: function(scope, element) {
      element[0].addEventListener("click", function(){
        scope.$evalAsync(function(){
          $rootScope.$broadcast("share-button-clicked");
        });
      });
    }
  }
});
