angular.module('App')
.controller('RestaurantsController', function ($scope, $http,
  Restaurant,$ionicModal) {

  $scope.page = 0;
  $scope.total = 1;
  $scope.restaurants = [];


  $scope.getRestaurants = function () {
    console.log(Restaurant.getAll());
    Restaurant.getAll().then(function(result){
      $scope.restaurants = result;
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

  $scope.hapus = function(id){
    Restaurant.deleteResto(id);
    console.log('menghapus data id:',id);
    $scope.getRestaurants();
  }

  $scope.modal;
  //inisialisasi modal
      $scope.modal;
      $ionicModal.fromTemplateUrl(
          'views/restaurants/add_resto.html',
          {
            scope:$scope,
            animation: 'slide-in-up'
          }
        ).then(function(modal){
          $scope.modal = modal;
          }
      );

  $scope.add = function(){
    $scope.modal.show();
  }

  $scope.simpan = function(restaurant){
    Restaurant.addResto(restaurant);
    $scope.modal.hide();
    $scope.getRestaurants();
  }

});
