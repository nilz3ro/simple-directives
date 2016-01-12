angular.module('simple-table-directives', [])
  .directive('sTable', sTable);

  function sTable() {
    return {
      restrict: "E",
      scope: {}, 
      transclude: true,
      template: "<table ng-transclude></table>",
      link: function(scope, element, attributes) {
              console.log("link fired now", scope, element, attributes)
            }
    };
  }

