/* global angular, alert */
(function () {
  angular.module('ExampleApp')
    .controller('ExampleController', ExampleController)

  ExampleController.$inject = ['$scope', '$rootScope', 'IsoCountries']

  function ExampleController ($scope, $rootScope, IsoCountries) {
    $scope.countries = IsoCountries.all
    $scope.myAction = function (m) {
      alert(m.name)
    }

    $scope.defaultKey = 'code'
    $scope.defaultOrder = 'desc'
    $scope.exampleCallback = function (field, order) {
      console.group('callback fired')
      console.log('field:', field)
      console.log('order', order)
      console.groupEnd('callback fired')
    }
  }
}())
