(function() {
angular.module('simple-table-directives', [])
  .directive('sTable', sTable)
  .directive('sThead', sThead)
  .directive('sTbody', sTbody)
  .directive('sRow', sRow)
  .directive('sColumn', sColumn)
  .directive('sCell', sCell);

  function sTable() {
    return {
      restrict: "AE",
      scope: {}, 
      replace: true,
      transclude: true,
      template: '<table class="s-table" ng-transclude></table>',
      link: function(scope, element, attributes, controller, transclude) {
            }
    };
  }
  
  function sThead() {
    return {
      restrict: "AE",
      scope: {}, 
      replace: true,
      transclude: true,
      template: '<thead class="s-thead" ng-transclude></thead>',
      link: function(scope, element, attributes, controller, transclude) {
      }
    };
  }
  
  function sTbody() {
    return {
      restrict: "AE",
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
      restrict: "AE",
      scope: {
        sModel: '='
      },
      transclude: true,
      replace: true,
      template: "<tr ng-transclude></tr>",
      link: function(scope, element, attributes, controller, transclude) {
        console.log(scope)
      }
    };
  }
 
  function sColumn() {
    return {
      restrict: "AE",
      scope: {
        sModel: "&sModel"
      }, 
      replace: true,
      transclude: true,
      template: "<th ng-transclude></th>",
      link: function(scope, element, attributes, controller, transclude) {
      }
    };
  }
  
  function sCell() {
    return {
      restrict: "AE",
      scope: {
        sModel: "&sModel"
      }, 
      replace: true,
      transclude: true,
      template: "<td ng-transclude></td>",
      link: function(scope, element, attributes, controller, transclude) {
      }
    };
  }
})();

