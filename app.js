// Angular app for temperature moniter
angular.module('weatherApp', [])

.directive('myTemperatureMonitor', ['temperatureMonitorService', '$window', 
function(temperatureMonitor, $window) {
  return {
    restrict: 'EA',
    scope: {},
    template: `<div>
                <h1>Temperature Monitor</h1>
                <form name="inputForm" ng-submit="submitTemperature()" novalidate>
                  <label for="temperature">Add Temperture:</label>
                  <input name="temperature" id="temperature" ng-model="temperatureRecord" type="number">
                  <button>Add</button>
                </form>
                <hr/>
                <section>
                  <button ng-click="getMedian()">Get Median Temperature</button>
                  Current Median: {{median}}
                </section>
               </div>`,
    link: function(scope, element, attrs) {
      // Validate input and then send valid temperature record to service
      scope.submitTemperature = function() {
        if (scope.inputForm.$valid) {
          temperatureMonitor.addRecord(+scope.temperatureRecord);
          scope.temperatureRecord = null;
        } else {
          $window.alert('Invalid input');
        }
      }
      
      // Run median calculator in service
      scope.getMedian = function() {
        scope.median = temperatureMonitor.getMedianRecord() || 'No data available';
      }
    }
  };
}])

.factory('temperatureMonitorService', [function() {
  // Array to store the temperature record
  var temperatures = [];
    
  // Add temperature record to array
  var addRecord = function(value) {
    temperatures.push(value);
  }

  // Calculate median of records
  var getMedianRecord = function() {
    var median;
    
    // Sort the temperature collection
    temperatures.sort(function(a, b) {
      return a - b;
    });

    // Get median base on length of record array
    if(temperatures.length % 2 === 0) {
      median = +((temperatures[temperatures.length / 2] + temperatures[temperatures.length / 2 - 1]) / 2).toFixed(2);
    }
    else {
      median = temperatures[Math.floor(temperatures.length / 2)];
    }
    
    return median;
  }

  return {
    addRecord: addRecord,
    getMedianRecord: getMedianRecord
  };

}]);