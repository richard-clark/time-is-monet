angular.module('starter.directives').directive("foo", function(
  $state,
  $http
){
  return {
    bindToController: true,
    controllerAs: "view",
    restrict: "E",
    scope: {},
    templateUrl: "templates/directive.objectList.html",
    controller: function() {
      var view = this;

      return view;
    }
  }
});
