angular.module('App')
.factory('Weather',function($ionicLoading,$http){
	var self = this;
	self.getWeather = function(){
		 //#1 baca localStorage
  		 weather = JSON.parse(localStorage.getItem('cuaca'),null);  
		  //cek akses terakhir
		  akses_terakhir = localStorage.getItem('waktu_akses');
		  waktu_sekarang = Date.now(); 
		  selisih = waktu_sekarang - akses_terakhir;
		  //selisih dalam milidetik
		  selisih_menit = selisih / 60000; 
		  console.log('selisih_menit:',selisih_menit);
		  
		  //#2 jika belum ada data (localStorage=null), baca ke server
		  if(weather == null || selisih_menit > 15 ){
		      $ionicLoading.show();
		      $http.get('https://ionic-in-action-api.herokuapp.com/weather')
		      .success(function (weat) {
		        weather = weat;
		        //simpan data ke localStorage
		        localStorage.setItem('cuaca',
		        	JSON.stringify(weather));
		        //simpan waktu akses
		        // ----code here----
		        console.log(Date.now());
		        localStorage.setItem('waktu_akses',Date.now());
		        $ionicLoading.hide();
		      }).error(function (err) {
		        $ionicLoading.show({
		          template: 'Could not load weather. Please try again later.',
		          duration: 3000
		        });
		      });
		  }
		  return weather;
	}
	return self;
})