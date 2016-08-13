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
        controller: ['$scope', '$element', '$attrs', '$rootScope', function ($scope, $element, $attrs, $rootScope) {
          var _this = this;

          $rootScope.$on('s-table:ready', function() {
            if(_this.defaultSortKey) {
              _this.applyOrder(_this.defaultSortKey, _this.orderTranslations[_this.defaultSortOrder]);
            }
          });

          function initialize() {
            _this.defaultSortOrder  = _this.defaultSortOrder || 'asc';
            _this.columns           = [];
            _this.orderTranslations = {
              asc: false,
              desc: true,
              false: 'asc',
              true: 'desc'
            };

            _this.registerColumn = function(column) {
              _this.columns.push(column);
            };

            _this.applyOrder = function(field, reversed) {
              console.log(_this.columns.length, 'l');
              _this.sOrderBy = field;
              _this.sOrderReverse = reversed;

              _this.columns.forEach(function(column) {
                column.removeOrderClasses();
                if(column.sOrderBy === field) {
                  column.addOrderClass(_this.orderTranslations[reversed] + 'ending');
                }
              });

              return (_this.onSortChange || angular.noop)(field, _this.orderTranslations[reversed]);
            };
          }

          $scope.$watchCollection('sTableCtrl.columns', function(newState, oldState) {
            if(newState.length === oldState.length) {
              $rootScope.$broadcast('s-table:ready');
            }
          });

          initialize();
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
        scope: {
          sOrderBy: '@'
        },
        replace: true,
        bindToController: true,
        require: '^sTable',
        transclude: true,
        controllerAs: 'sColumnCtrl',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
          var _this = this;
          _this.sortOrder = false;
          _this.removeOrderClasses = function() {
            $element.removeClass('ascending');
            $element.removeClass('descending');
          };

          _this.addOrderClass = function(className) {
            $element.addClass(className);
          };

          _this.toggleSortOrder = function() {
            return _this.sortOrder = !_this.sortOrder;
          };

          _this.handleClick = function(e, onClick) {
            e.preventDefault();
            return onClick(_this.sOrderBy, _this.toggleSortOrder());
          };
        }],
        template: '<th class="s-column" ng-transclude></th>',
        link: function(scope, element, attributes, controller, transclude) {
          controller.registerColumn(scope.sColumnCtrl);

          if(attributes.sOrderBy) {
            element.on('click', function(e) {
              return scope.sColumnCtrl.handleClick(e, controller.applyOrder);
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
