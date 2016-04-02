angular.module('App')
.factory('Restaurant',function(DBA){
	var self = this;
	
	//get all restaurant
  	self.getAll = function(){
  		return DBA.query_data("SELECT * FROM restaurant")
  		.then(function(result){
  			console.log(DBA.getAll(result));
  			return DBA.getAll(result);	
  		});
  	};

  	//cari restoran dengan nama tertentu
  	self.getByName = function(name){
  		param = [name];
  		DBA.query_data("SELECT * FROM restaurant where name = ?",
  		param).then(function(result){
  			return DBA.getAll(result);
  		})	
  	};

  	return self;
})
