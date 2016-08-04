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

    function sTable() {
      return {
        restrict: 'E',
        scope: {
          sModelList: '=',
          onSortChange: '='
        },
        replace: true,
        transclude: true,
        template: '<table class="s-table" ng-transclude></table>',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
          var _this = this;
          this.sModelList = $scope.sModelList;
          this.onSortChange = $scope.onSortChange;
          this.columns = [];

          this.reOrderBy = function(field, reversed) {
            var orderTranslations = {
              false: 'asc',
              true: 'desc'
            };

            _this.sOrderBy = field;
            _this.sOrderReverse = reversed;

            _this.columns.forEach(function(column) {
              column.removeClass('ascending');
              column.removeClass('descending');
            });

            $scope.$apply();
            console.log(_this.onSortChange);
            return _this.onSortChange && _this.onSortChange(field, orderTranslations[reversed]);
          };
        }],
        require: '?sTable',
        controllerAs: 'sTableCtrl'
      };
    }

    function sThead() {
      return {
        restrict: 'E',
        scope: false,
        replace: true,
        transclude: true,
        require: '^sTable',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          $scope.sModelList = $scope.$parent.sModelList;
          $scope.sTableCtrl = $scope.$parent.sTableCtrl;
        }],
        template: '<thead class="s-thead" ng-transclude></thead>'
      };
    }

    function sTbody() {
      return {
        restrict: 'E',
        scope: false,
        replace: true,
        transclude: true,
        require: '^sTable',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          $scope.sModelList = $scope.$parent.sModelList;
        }],
        template: '<tbody class="s-tbody" ng-transclude></tbody>'
      };
    }

    function sRow() {
      return {
        restrict: 'E',
        scope: {
          sRowModel: '='
        },
        transclude: true,
        replace: true,
        template: '<tr class="s-row" ng-transclude></tr>',
        controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
          $scope.sTableCtrl = $scope.$parent.sTableCtrl;
        }]
      };
    }

    function sRowRepeat($compile) {
     return {
       restrict: 'E',
       transclude: true,
       require: '^sTable',
       controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
         $scope.sTableCtrl = $scope.$parent.sTableCtrl;
       }],
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
        restrict: 'E',
        scope: false,
        replace: true,
        require: '^sTable',
        transclude: true,
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        }],
        template: '<th class="s-column" ng-transclude></th>',
        link: function(scope, element, attributes, controller, transclude) {
          controller.columns.push(element);
          var sortOrder = false;

          if(attributes.sOrderBy) {
            element.on('click', function(event) {
              controller.reOrderBy(attributes.sOrderBy, sortOrder);
              if(sortOrder) {
                element.removeClass('ascending');
                element.addClass('descending');
              } else {
                element.addClass('ascending');
                element.removeClass('descending');
              }
              sortOrder = !sortOrder;
            });
          }
        }
      };
    }

    function sCell() {
      return {
        restrict: 'E',
        scope: false,
        replace: true,
        transclude: true,
        require: ['?sRow', '?sRowRepeat'],
        template: '<td class="s-cell" ng-transclude></td>',
        controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
          $scope.model = $scope.$parent.sRowModel || $scope.$parent.model;
        }]
      };
    }
})();
