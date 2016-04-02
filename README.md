ALOHA RESORT
=============

### Toyota In House Training sample app


This repository contains the code from the chapter 4 example of Ionic in Action. It is an app for a resort that guests could use to learn about their reservation, local restaurants, and current weather.

### Challenge #1
-------------
Cache weather data — Instead of always requesting new weather data, find a way to
cache and only reload the weather if it’s more than 15 minutes old. Consider
using localStorage to store the data.

### Challenge #2
-------------
Create a weather service — This demo uses $http in the controller to load data. Try
to build an Angular service for loading of weather data so the controller doesn’t
use $http directly.

### SQLite plugin
----------------
SQlite — Manage restaurant data with local sql

##### Step 1:
install ngCordova
``` bash
	bower install ngCordova
```

##### Step 2:
update index.html to include ng-cordova.js 

``` html
    <!-- load ng-cordova -->
    <script src="lib/ngCordova/dist/ng-cordova.js"></script>
```

#### Step 3:
update app.js to use ngCordova
``` javascript
	angular.module('App', ['ionic','ngCordova'])
``` 

create global variable db
``` javascript
	var db = null;
```

#### Step 4:
Initialize database
``` javascript

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // define database
    if(window.cordova) {
      // App syntax (platform)
      db = $cordovaSQLite.openDB("myapp.db");
    } else {
      // Ionic serve syntax (browser)
      db = window.openDatabase("myapp.db", "1.0", "My app", -1);
    }

    //create initial table &data
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS restaurant (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, city TEXT, image_url)");
    
    $cordovaSQLite.execute(db, "INSERT INTO restaurant(name,address,city) values(\'Restoran Padang sederhana\', \'jl.jalan-jalan\', \'jakarta\')");

  });
})

``` 

