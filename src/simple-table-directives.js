(function() {
  angular.module('simple-table-directives', [])
    .directive('sTable', sTable)
    .directive('sThead', sThead)
    .directive('sTbody', sTbody)
    .directive('sRow', sRow)
    .directive('sRowRepeat', sRowRepeat)
    .directive('sColumn', sColumn)
    .directive('sCell', sCell);

    function sTable($q) {
      return {
        restrict: "AE",
        scope: {
          sModelList: "="
        }, 
        replace: true,
        transclude: true,
        template: '<table class="s-table" ng-transclude></table>',
        controller($scope, $element, $attrs) {
          var sTableCtrl = this;
          sTableCtrl.sModelList = $scope.sModelList;
          sTableCtrl.columns = [];
          sTableCtrl.testName = "string";
          
          sTableCtrl.reOrderBy = function(field, reversed) {
            sTableCtrl.sOrderBy = field;
            sTableCtrl.sOrderReverse = reversed;
            $scope.$apply();
          };
        },
        controllerAs: 'sTableCtrl',
        link: function(scope, element, attributes, controller, transclude) {
        }
      };
    }
 
    function sThead() {
      return {
        restrict: "AE",
        scope: false, 
        replace: true,
        transclude: true,
        require: "^sTable",
        controller: function($scope, $element, $attrs) {
          $scope.sModelList = $scope.$parent.sModelList;
          $scope.sTableCtrl = $scope.$parent.sTableCtrl;
        },
        template: '<thead class="s-thead" ng-transclude></thead>',
        link: function(scope, element, attributes, controller, transclude) {
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
        controller: function($scope, $element, $attrs) {
          $scope.sModelList = $scope.$parent.sModelList;
        },
        template: '<tbody class="s-tbody" ng-transclude></tbody>',
        link: function(scope, element, attributes, controller, transclude) {
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
        controller: function($scope, $element, $attrs, $transclude) {
          $scope.sTableCtrl = $scope.$parent.sTableCtrl;
        },
        link: function(scope, element, attributes, controller, transclude) {
              if(element.children().hasClass('s-ghost-transclude')) {
                  element.children().replaceWith(element.children().contents())
                }
        }
      };
    }

    // TODO refactor this, transclusion scope is weird.
    function sRowRepeat() {
      return {
        restrict: "AE",
        scope: false,
        transclude: true, 
        require: "^sTable",
        template: '<s-row class="s-row-repeat" ng-repeat="model in sModelList" s-row-model="model"><div class="s-ghost-transclude" ng-transclude></div></s-row>',
        controller: function($scope, $element, $attrs) {
          $scope.sModelList = $scope.$parent.sModelList;
        },
        link: function(scope, element, attributes, controller, transclude) {
        }
      };
    }
   
    function sColumn() {
      return {
        restrict: "AE",
        scope: false,
        replace: true,
        require: "^sTable",
        transclude: true,
        controller: function($scope, $element, $attrs) {
        },
        template: '<th class="s-column" ng-transclude></th>',
        link: function(scope, element, attributes, controller, transclude) {
          controller.columns.push([element, attributes])
          var sortOrder = false;
          element.on('click', function(event) {
            controller.reOrderBy(attributes.sOrderBy, sortOrder);
            if(sortOrder) {
              element.removeClass("descending")
              element.addClass("ascending")
            } else {
              element.removeClass("ascending")
              element.addClass("descending")
            }
            sortOrder = !sortOrder;
          })
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
        controller: function($scope) {
          $scope.model = $scope.$parent.sRowModel;
        },
        link: function(scope, element, attributes, sRowCtrl, transclude) {
        }
      };
    }
})();

