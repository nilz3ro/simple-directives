(function() {
  'use strict';

  angular.module('simple-directives.tables', [])
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
        controller: function ($scope, $element, $attrs) {
          var sTableCtrl = this;
          sTableCtrl.sModelList = $scope.sModelList;
          sTableCtrl.columns = [];
          sTableCtrl.testName = "string";

          sTableCtrl.reOrderBy = function(field, reversed) {
            sTableCtrl.sOrderBy = field;
            sTableCtrl.sOrderReverse = reversed;

            sTableCtrl.columns.forEach(function(column) {
              column.removeClass('ascending');
              column.removeClass('descending');
            });

            $scope.$apply();
          };
        },
        require: "?sTable",
        controllerAs: 'sTableCtrl'
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
        template: '<thead class="s-thead" ng-transclude></thead>'
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
        template: '<tbody class="s-tbody" ng-transclude></tbody>'
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
        controller: function($scope, $element, $attrs, $transclude) {
          $scope.sTableCtrl = $scope.$parent.sTableCtrl;
        }
      };
    }

    function sRowRepeat($compile) {
     return {
       restrict: "AE",
       transclude: true,
       require: "^sTable",
       controller: function($scope, $element, $attrs, $transclude) {
         $scope.sTableCtrl = $scope.$parent.sTableCtrl;
       },
       link: function(scope, element, attributes, controller, transclude) {
        transclude(function(contents, skope) {
          element.append(angular.element('<s-row ng-repeat="model in sTableCtrl.sModelList"></s-row>').append(contents));
        });
        element.replaceWith($compile(element.contents())(scope));
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
          controller.columns.push(element);
          var sortOrder = false;
          var hasSortOrder = Boolean(attributes.sOrderBy);

          if(hasSortOrder) {
            element.on('click', function(event) {
              controller.reOrderBy(attributes.sOrderBy, sortOrder);
              if(sortOrder) {
                element.removeClass("ascending");
                element.addClass("descending");
              } else {
                element.addClass("ascending");
                element.removeClass("descending");
              }
              sortOrder = !sortOrder;
            });
          }
        }
      };
    }

    function sCell() {
      return {
        restrict: "AE",
        scope: false,
        replace: true,
        transclude: true,
        require: ['?sRow', '?sRowRepeat'],
        template: '<td class="s-cell" ng-transclude></td>',
        controller: function($scope, $element, $attrs, $transclude) {
          $scope.model = $scope.$parent.sRowModel || $scope.$parent.model;
        }
      };
    }
})();
