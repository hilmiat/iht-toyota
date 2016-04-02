angular.module('App', ['ionic','ngCordova'])

.config(function ($stateProvider, $urlRouterProvider) {

  // lihat localStorage untuk menentukan halaman default
  default_view = localStorage.getItem('default_view');
  if(default_view==null){
    // jika null (pertama kali membuka aplikasi, 
    // maka tampilkan halaman tour)
    default_view = '/tour';
    // simpan data di localStorage agar ketika aplikasi dibuka untuk kedua kalinya
    // yg tampil tidak lagi tour
    localStorage.setItem('default_view','/home');
  }

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('reservation', {
      url: '/reservation',
      controller: 'ReservationController',
      templateUrl: 'views/reservation/reservation.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    });
  // set default view
  $urlRouterProvider.otherwise(default_view);

})

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
