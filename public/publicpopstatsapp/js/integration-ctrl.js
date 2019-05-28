/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("integration-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
        
        console.log("chart ctrl initialized");
        
        //var API = "/api/v1/populationstats";
        var API="https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries/";
        
        $http.get(API)
            .then(function(response){
                var data=response.data;
                console.log(data);
                
            });
            
    }]);