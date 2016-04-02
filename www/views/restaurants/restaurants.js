angular.module('App')
.controller('RestaurantsController', function ($scope, $http,
  Restaurant,$ionicModal,$ionicPopup) {

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
    $ionicPopup.confirm({
     title: 'Delete Resto',
     template: 'Are you sure you want to delete resto?'
    }).then(function(res) {
     if(res) {
        Restaurant.deleteResto(id);
        console.log('menghapus data id:',id);
        $scope.getRestaurants();
     } else {
       console.log('You are not sure');
     }
   });




   
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
    $scope.save = true;
    $scope.modal.show();
  }

  $scope.simpan = function(restaurant){
    if($scope.save){
      Restaurant.addResto(restaurant);
    }else{
      Restaurant.updateResto(restaurant);
    }
    restaurant.name='';
    restaurant.address='';
    restaurant.city='';
    $scope.modal.hide();
    $scope.getRestaurants();
  }

  $scope.save = true;

  $scope.restaurant = {id:'',name:'',address:'',city:'',image_url:''}
  $scope.update = function(restaurant){
    $scope.restaurant.name = restaurant.name;
    $scope.restaurant.address = restaurant.address;
    $scope.restaurant.city = restaurant.city;
    $scope.restaurant.image_url = restaurant.image_url;
    $scope.restaurant.id = restaurant.id;

    $scope.save = false;
    $scope.modal.show();
  }

});
