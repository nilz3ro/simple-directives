(function() {
  console.log("WTFG")
  angular.module('ExampleApp')
    .value('IsoCountries', {
      all: [{name: "Uruguay", climate: "hot"}]
    });
})();
