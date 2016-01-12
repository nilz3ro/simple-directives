(function() {
angular.module('simple-table-directives', [])
  .directive('sTable', sTable)
  .directive('sTableHead', sTableHead)
  .directive('sTableBody', sTableBody)
  .directive('sRowRepeat', sRowRepeat);

  function sTable() {
    return {
      restrict: "A",
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
      restrict: "A",
      scope: {}, 
      replace: true,
      transclude: true,
      template: "<thead ng-transclude></thead>",
      link: function(scope, element, attributes, controller, transclude) {
            }
    };
  }
  
  function sTableBody() {
  }

  function sRowRepeat() {
  }
})();
