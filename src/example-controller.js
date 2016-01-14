(function() {
  angular.module('ExampleApp')
    .controller('ExampleController', ExampleController);
    function ExampleController($scope, IsoCountries) {
      $scope.countries = IsoCountries.all;
      $scope.myAction = function(m) {
        alert(m.name);
      };
    }
})();

