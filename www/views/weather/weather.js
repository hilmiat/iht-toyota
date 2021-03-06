angular.module('App')
.controller('WeatherController', function ($scope, $http, 
  $ionicLoading,Weather) {
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

// Challenge #1
// ==============
// Cache weather data — Instead of always requesting new weather data, find a way to
// cache and only reload the weather if it’s more than 15 minutes old. Consider
// using localStorage to store the data.

// Challenge #2
// ===============
// Create a weather service —This demo uses $http in the controller to load data. Try
// to build an Angular service for loading of weather data so the controller doesn’t
// use $http directly.
  $scope.weather = Weather.getWeather();
  



  $scope.getDirection = function (degree) {
    if (degree > 338) {
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
});
