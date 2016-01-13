(function() {
  angular.module('ExampleApp')
    .controller('ExampleController', ExampleController);
    function ExampleController($scope, IsoCountries) {
      $scope.vm = this;
      $scope.countries = IsoCountries.all;
      $scope.myAction = function(model) {
        alert(model.name);
      };
    }
})();

