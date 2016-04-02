angular.module('App')
.factory('DBA',function($ionicPlatform,$cordovaSQLite,$q){
	var self = this;
	//query data dibuat umum
	self.query_data = function(query,parameter){
		parameter = parameter || [];
	    var q = $q.defer();
	    //mengambil data dari database
	    $ionicPlatform.ready(function(){
	        $cordovaSQLite.execute(db,query,parameter)
	        .then(function(result){
	          	q.resolve(result);
	        	},function(error){
	          		console.log(error);
	          		q.reject();
	        	});
	    });
    	return q.promise;
  	}

  	// process result set --> array obj
  	self.getAll = function(result){
      var out = [];
      for (var i = 0;i < result.rows.length;i++) {
        out.push(result.rows.item(i));
      };
      return out;
  	}

  	//process singe result
  	self.getOne = function(result){
  		var out = null;
  		out = result.rows.item(0);
  		return out;
  	}


  	return self;
})
