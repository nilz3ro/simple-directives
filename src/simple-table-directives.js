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
        bindToController: true,
        scope: {
          sModelList: "="
        }, 
        replace: true,
        transclude: true,
        template: '<table class="s-table" ng-transclude></table>',
        controller($scope, $element, $attrs) {
        },
        controllerAs: "sTableCtrl",
        link: function(scope, element, attributes, controller, transclude) {
        }
      };
    }
    // TODO
    // all dependant directives should
    // have databound access to the table model list
    // (sModelList)
 
    function sThead() {
      return {
        restrict: "AE",
        scope: false, 
        replace: true,
        transclude: true,
        require: "^sTable",
        template: '<thead class="s-thead" ng-transclude></thead>',
        link: function(scope, element, attributes, sTableCtrl, transclude) {
          console.log(sTableCtrl)
        }
      };
    }
    
    function sTbody() {
      return {
        restrict: "AE",
        scope: false, 
        replace: true,
        transclude: true,
        require: "^sTable",
        template: '<tbody class="s-tbody" ng-transclude></tbody>',
        link: function(scope, element, attributes, sTableCtrl, transclude) {
          console.log(sTableCtrl)
          console.log(scope)
        }
      };
    }

    function sRow() {
      return {
        restrict: "AE",
        scope: {
          sRowModel: '='
        },
        transclude: true,
        replace: true,
        template: '<tr class="s-row" ng-transclude></tr>',
        link: function(scope, element, attributes, controller, transclude) {
        }
      };
    }

    function sRowRepeat() {
      // TODO
      // repeat for each model object
      // in table sModelList
    }
   
    function sColumn() {
      return {
        restrict: "AE",
        scope: {}, 
        replace: true,
        transclude: true,
        template: '<th class="s-column" ng-transclude></th>',
        link: function(scope, element, attributes, controller, transclude) {
        }
      };
    }
    
    function sCell() {
      return {
        restrict: "AE",
        scope: false, 
        replace: true,
        transclude: true,
        template: '<td class="s-cell" ng-transclude></td>',
        link: function(scope, element, attributes, controller, transclude) {
          scope.model = scope.$parent.sRowModel;
        }
      };
    }
})();

