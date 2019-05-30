/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("geo-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
            console.log("geo ctrl initialized");

        var API = '/proxySport';
        
        $http.get(API)
            .then(function(response){
               
               console.log(response.data);
                
            });
        
    }]);