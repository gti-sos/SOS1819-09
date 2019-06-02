/* global angular */

angular
    .module('ProjectApp')
    .controller('hotel-ctrl',['$http',
                            '$scope',
                            "$routeParams", 
                            "$location",
            function($http,$scope,$routeParams,$location){
                    console.log("hotel ctrl initialized");
                    
                    var API="/EBhotel";
                    var myAPI="api/v1/populationstats";
                    
                    $http.get(API)
                            .then(function(response){
                            var data = response.data;
                           console.log(data[1].name);
                           
                           var hotel = data.map(function(item){
                              return item.name; 
                           });
                           
                           var nbroom = data.map(function(item){
                              return item.totalrooms; 
                           });
                           
                           $http.get(myAPI)
                                .then(function(response){
                                   var mydata = response.data;
                                   
                                   var data1990 = mydata.filter(function(item){
                                           if(item.year==1990)
                                            return item;
                                       });
                                       
                                   var country = data1990.map(function(item){
                                       return item.country;
                                   });
                                   
                                   var totalpop = data1990.map(function(item){
                                      return parseFloat(item.totalpopulation); 
                                   });
                                   
                                   var urbanpop = data1990.map(function(item){
                                      return parseFloat(item.urbanpopulation); 
                                   });
                                   
                                   console.log(Math.floor(100*urbanpop[1]/totalpop[1]));
                                   
                                   var graphHotel = [];
                                   for(var i=0;i<10;i++){
                                       graphHotel[i]={name : hotel[i], value : nbroom[i]};
                                   }
                                   
                                   
                                   //var graphUrb = [];
                                   for(var j=0;j<country.length;j++){
                                       graphHotel[i++]={name : country[j], value : Math.floor(100*urbanpop[j]/totalpop[j])};
                                   }
                                   
                                   console.log(graphHotel);
                                       
                                    var graphdef = {
                                        categories : ['number of rooms of hotels in Singapore and % of urban population'],
                                        dataset : {
                                            'number of rooms of hotels in Singapore and % of urban population' : graphHotel
                                            
                                        }
                                        };
                                        
                                        var chart = uv.chart ('Donut', graphdef, {
                                                            	meta : {
                                                            		caption : 'Number of rooms of hotels in Sigapore',
                                                            		subcaption : 'and percentage of urban population in different country'
                                                            		
                                                            	}
                                                            });

                                   
                                });
                        });
            }
        
        ]);