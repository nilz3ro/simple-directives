(function() {
  angular.module('ExampleApp')
    .controller('ExampleController', ExampleController);
    function ExampleController($scope, IsoCountries) {
      $scope.countries = IsoCountries.all;
      $scope.myAction = function(m) {
        alert(m.name);
      };

      $scope.defaultKey = 'Dial';
      $scope.defaultOrder = 'desc';
      $scope.exampleCallback = function(field, order) {
        console.group('callback fired');
        console.log('field:', field);
        console.log('order', order);
        console.groupEnd('callback fired');
      };
    }
})();
