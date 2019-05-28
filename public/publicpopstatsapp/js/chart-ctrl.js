/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("chart-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
        
        console.log("chart ctrl initialized");
        
        var API = "/api/v1/populationstats";
        
        $http.get(API)
            .then(function(response){
               
               var myData = response.data;
               
               var myCategories = myData.map(function(item){
                    
                    itemYear = item.year;
                    
                    return (itemYear);
                });
               
               var myName1990 = myData.map(function(item){
                  if(item.year==1990){
                       itemName=item.country;
                  }
                    return(itemName);
               });
               
               var myName2010 = myData.map(function(item){
                  if(item.year==2010){
                       itemName=item.country;
                  }
                    return(itemName);
               });
               
               var myValue1990 = myData.map(function(item){
                  if(item.year==1990){
                       itemValue=parseInt(item.urbanpopulation);
                       console.log(item.year);
                  }
                    return(itemValue);
               });
               
               var myValue2010 = myData.map(function(item){
                  if(item.year==2010){
                       itemValue=parseInt(item.urbanpopulation);
                  }
                    return(itemValue);
               });
                
                console.log(myName1990.length);
                console.log(myName2010);
                
            
                var graphdef = {
	categories : ['1990', '2010'],
	dataset : {
		'1990' : [
			{ name : myName1990[0], value : myValue1990[0] },
			{ name : myName1990[1], value : myValue1990[1] },
			{ name : myName1990[2], value : myValue1990[2] },
			{ name : myName1990[3], value : myValue1990[3] },
			{ name : myName1990[4], value : myValue1990[4] }
		],
		
		'2010' : [
			{ name : myName2010[0], value : myValue2010[0] },
			{ name : myName2010[1], value : myValue2010[1] },
			{ name : myName2010[2], value : myValue2010[2] },
			{ name : myName2010[3], value : myValue2010[3] },
			{ name : myName2010[4], value : myValue2010[4] }		
		]
	}
}
               
               
                var chart = uv.chart('Pie', graphdef);
            });
        
        
	}]);
	