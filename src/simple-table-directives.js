angular.module('simple-table-directives', [])
  .directive('sTable', sTable)
  .directive('sTableHead', sTableHead);

  function sTable() {
    return {
      restrict: "E",
      scope: {}, 
      replace: true,
      transclude: true,
      template: "<table ng-transclude></table>",
      link: function(scope, element, attributes, controller, transclude) {
            }
    };
  }
  
  function sTableHead() {
    return {
      restrict: "E",
      scope: {}, 
      replace: true,
      transclude: true,
      template: "<thead ng-transclude></thead>",
      link: function(scope, element, attributes, controller, transclude) {
            }
    };
  }
  

