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

  	//insert
  	self.addResto = function(restaurant){
  		var query = 
  			"INSERT INTO restaurant(name,address,city) values(?,?,?)";
  		var params = [restaurant.name,restaurant.address,restaurant.city];
  		return DBA.query_data(query,params)
  	}

  	//update
  	self.updateResto = function(restaurant){
  		var query = 
  			"update restaurant set name=?,address=?,city=? where id=?";
  		var params = [restaurant.name,
  				restaurant.address,
  				restaurant.city,
  				restaurant.id];
  		return DBA.query_data(query,params);
  	}  	
  	//delete
  	self.deleteResto = function(id){
  		var query = "DELETE FROM restaurant WHERE id = ?";
  		var param = [id];
  		return DBA.query_data(query,param);
  	}
  	return self;
})
