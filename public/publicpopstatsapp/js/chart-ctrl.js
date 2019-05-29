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
               
               var myName1990 = myData.filter(function(item){
                  if(item.year==1990){
                       return(item.country);
                  }
               });
               
               var myName2010 = myData.filter(function(item){
                  if(item.year==2010){
                       return(item.country);
                  }
               });
               
               var myValue1990 = myData.filter(function(item){
                  if(item.year==1990){
                       return(parseInt(item.urbanpopulation));
                  }
               });
               
               var myValue2010 = myData.filter(function(item){
                  if(item.year==2010){
                       return(parseInt(item.urbanpopulation));
                  }
               });
                
                console.log(myName1990.length);
                console.log(myValue2010);
                
                var arr1990 = [];
                var jsonArr = [];
                
                for (var i=0;i<myName1990.length;i++){
                    //arr1990[i]= name : myName1990[i].country, value : parseInt(myValue1990[i].totalpopulation);
                    jsonArr[i] = {name: myName1990[i].country, value: parseInt(myValue1990[i].totalpopulation)};
                }
                arr1990 = JSON.stringify(jsonArr);
                console.log('jsonArr : '+JSON.stringify(jsonArr));
                
                var arr2010=[];
                var json2010 = [];
                
                for (var i=0;i<myName2010.length;i++){
                    //arr2010[i]=' name : '+myName2010[i].country+','+' value : '+parseInt(myValue2010[i].totalpopulation);
                    json2010[i] = {name: myName2010[i].country, value: parseInt(myValue2010[i].totalpopulation)}
                }
                arr2010=JSON.stringify(json2010);
            
                console.log('json2010 : '+JSON.stringify(json2010));
                
                console.log(json2010);
                
                var graphdef = {
                	categories : ['1990', '2010'],
                	dataset : {
                		'1990' : jsonArr,
                		'2010' : json2010
                		
                	}
                }

                var chart = uv.chart('Bar', graphdef,{
                                                    	meta : {
                                                    		caption : 'Total population',
                                                    		subcaption : 'in 1990 and 2010',
                                                    		hlabel : 'Total population',
                                                    		vlabel : 'Countries',
	
                }});
                
            });
        
        
	}]);
	