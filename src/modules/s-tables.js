(function() {
  'use strict';

  angular.module('simple-directives.tables', [])
    .directive('sTable', sTable)
    .directive('sThead', sThead)
    .directive('sTbody', sTbody)
    .directive('sRow', sRow)
    .directive('sColumn', sColumn)
    .directive('sCell', sCell);

    function sTable() {
      return {
        restrict: 'E',
        scope: {
          sModelList: '=',
          onSortChange: '=',
          defaultSortKey: '=',
          defaultSortOrder: '='
        },
        bindToController: true,
        replace: true,
        transclude: true,
        template: '<table class="s-table" ng-transclude></table>',
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
          var _this               = this;
          _this.defaultSortOrder  = _this.defaultSortOrder || 'asc';
          _this.columns           = [];
          _this.orderTranslations = {
            asc: false,
            desc: true,
            false: 'asc',
            true: 'desc'
          };

          _this.reOrderBy = function(field, reversed) {
            _this.sOrderBy = field;
            _this.sOrderReverse = reversed;

            _this.columns.forEach(function(column) {
              return column.removeOrderClasses();
            });

            return (_this.onSortChange || angular.noop)(field, _this.orderTranslations[reversed]);
          };

          if(_this.defaultSortKey) {
            _this.reOrderBy(_this.defaultSortKey, _this.orderTranslations[_this.defaultSortOrder]);
          }
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

    function sColumn() {
      return {
        restrict: 'E',
        scope: false,
        replace: true,
        bindToController: true,
        require: '^sTable',
        transclude: true,
        controllerAs: 'sColumnController',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          var _this = this;

          _this.removeOrderClasses = function() {
            $element.removeClass('ascending');
            $element.removeClass('descending');
          };

          _this.addOrderClass = function(className) {
            $element.addClass(className);
          };
        }],
        template: '<th class="s-column" ng-transclude></th>',
        link: function(scope, element, attributes, controller, transclude) {
          controller.columns.push(scope.sColumnController);
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
