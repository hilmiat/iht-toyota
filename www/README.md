ALOHA RESORT
=============

Toyota In House Training sample app
-------------

This repository contains the code from the chapter 4 example of Ionic in Action. It is an app for a resort that guests could use to learn about their reservation, local restaurants, and current weather.

Challenge #1
-------------
Cache weather data — Instead of always requesting new weather data, find a way to
cache and only reload the weather if it’s more than 15 minutes old. Consider
using localStorage to store the data.

Challenge #2
-------------
Create a weather service —This demo uses $http in the controller to load data. Try
to build an Angular service for loading of weather data so the controller doesn’t
use $http directly.