angular.module('starter.directives', [])
  .directive("welcome", function(
    $state
  ){
    return {
      bindToController: true,
      controllerAs: "view",
      restrict: "E",
      scope: {},
      template: "<h1>Hello World</h1>",
      controller: function() {
        var view = this;
        return view;
      }
    }
  });
