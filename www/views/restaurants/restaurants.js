angular.module('App')
.controller('RestaurantsController', function ($scope, $http,
  $ionicPlatform,$cordovaSQLite,$q) {

  $scope.page = 0;
  $scope.total = 1;
  $scope.restaurants = [];

  query_data = function(){
    var q = $q.defer();
    //mengambil data dari database
    $ionicPlatform.ready(function(){
        $cordovaSQLite.execute(db,"SELECT * FROM restaurant")
        .then(function(result){
          console.log(result);
          q.resolve(result);
        },function(error){
          console.log(error);
          q.reject();
        })
    }
    );
    return q.promise;
  }

  getAll = function(result){
      var out = [];
      for (var i = 0;i < result.rows.length;i++) {
        out.push(result.rows.item(i));
      };
      return out;
  }

  $scope.getRestaurants = function () {
    query_data().then(function(result){
        $scope.restaurants = getAll(result);
    });

    // $scope.page++;
    // $http.get('https://ionic-in-action-api.herokuapp.com/restaurants?page=' + $scope.page).success(function (response) {
    //   angular.forEach(response.restaurants, function (restaurant) {
    //     $scope.restaurants.push(restaurant);
    //   });
    //   $scope.total = response.totalPages;
    //   $scope.$broadcast('scroll.infiniteScrollComplete');
    // }).error(function (err) {
    //   $scope.$broadcast('scroll.infiniteScrollComplete');
    //   console.log(err);
    // });
  };

  $scope.getRestaurants();
});
