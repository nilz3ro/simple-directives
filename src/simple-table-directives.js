(function() {
angular.module('simple-table-directives', [])
  .directive('sTable', sTable)
  .directive('sThead', sThead)
  .directive('sTbody', sTbody)
  .directive('sRow', sRow);

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
  
  function sThead() {
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
  
  function sTbody() {
    return {
      restrict: "A",
      scope: {},
      replace: true,
      transclude: true,
      template: "<tbody ng-transclude></tbody>",
      link: function(scope, element, attributes, controller, transclude) {
      }
    };
  }

  function sRow() {
    return {
      restrict: "A",
      scope: {
        item: '='
      },
      replace: true,
      transclude: true,
      template: "<tr ng-transclude></tr>",
      link: function(scope, element, attributes, controller, transclude) {
        console.log(scope)
      }
    };
  }
})();

