(function() {
  angular.module('simple-table-directives', [])
    .directive('sTable', sTable)
    .directive('sThead', sThead)
    .directive('sTbody', sTbody)
    .directive('sRow', sRow)
    .directive('sRowRepeat', sRowRepeat)
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
        controller: function($scope, $element, $attrs) {},
        template: '<tbody class="s-tbody" ng-transclude></tbody>',
        link: function(scope, element, attributes, sTableCtrl, transclude) {
          scope.sModelList = sTableCtrl.sModelList;
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
        require: "^sTable",
        template: '<tr class="s-row" ng-transclude></tr>',
        controller: function($scope, $element, $attrs) {
          console.log($scope.sRowModel);
        },
        link: function(scope, element, attributes, controller, transclude) {
        }
      };
    }

    function sRowRepeat() {
      return {
        restrict: "AE",
        scope: false,
        require: "^sTable",
        template: '<s-row ng-repeat="model in sModelList" s-row-model="model"></s-row>',
        controller: function($scope, $element, $attrs) {
        },
        link: function(scope, element, attributes, sTableCtrl, transclude) {
          scope.sModelList = sTableCtrl.sModelList;
        }
      };
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
        require: "^sRow",
        template: '<td class="s-cell" ng-transclude></td>',
        link: function(scope, element, attributes, sRowCtrl, transclude) {
          scope.model = sRowCtrl.sRowModel;
        }
      };
    }
})();

