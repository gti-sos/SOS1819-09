/* global angular */

angular
    .module('ProjectApp')
    .controller('hotel-ctrl',['$http',
                            '$scope',
                            "$routeParams", 
                            "$location",
            function($scope,$http,$routeParams,$location){
                    console.log("hotel ctrl initialized");
                    
                    var API="/EBhotel";
                    var myAPI="api/v1/populationstats";
                    
                    $http.get(API)
                        .then(function(response){
                            var data = response.data;
                           console.log(data); 
                        });
            }
        
        ]);