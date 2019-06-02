/* global angular */

angular
    .module('ProjectApp')
    .controller('hotel-ctrl',['$http',
                            '$scope',
                            "$routeParams", 
                            "$location",
            function($scope,$http,$routeParams,$location){
                    console.log("hotel ctrl initialized");
                    
                       
            }
        
        ]);