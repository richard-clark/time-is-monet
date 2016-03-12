angular.module('starter.directives', []).directive("annotatedImage", function(
  $state,
  $http
){
  return {
    bindToController: true,
    controllerAs: "view",
    restrict: "E",
    scope: {},
    templateUrl: "templates/directive.annotatedImage.html",
    controller: function() {
      var view = this;
      view.loading = true;
      view.annotations = [{
          type: 1,
          x: 0.25,
          y: 0.75,
          text: "Lorem ipsum dolor sit amit."
        },{
          type: 2,
          x: 0.33,
          y: 0.33,
          text: "Annotation #2"
        },{
          type: 3,
          x: 0.2,
          y: 0.9,
          text: "Annotation #2"
      }];
      view.activeAnnotationIndex = 0;

      view.url = "http://lh5.ggpht.com/MTDSp6f87Wbz_gF7SxGyYqRe_fgDP_hYvLGkI661hmnX3cw2ugMCw9e6OLvUng=s1200"

      return view;
    }
  }
});
