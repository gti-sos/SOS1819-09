/* global angular */

    angular
        .module("ProjectApp")
        .controller("ClimateEditCtrl",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("Edit Controller initialized.");
            var API = "/api/v1/climate-stats";

            var country = $routeParams.country;
            var year = $routeParams.year;
            
            console.log("Requesting climate <"+API+"/"+country+"/"+year+">...");
            
            $http.get(API+"/"+country+"/"+year).then(function (response){
                console.log("Data Received: "
                                + JSON.stringify(response.data,null,2));
    
                $scope.climate = response.data;
            });
            
            
            $scope.updateClimate = function (country, year){
                
                console.log("Updating climate with country: "+country+" and year: "+year);
                $http
                    .put(API+"/"+country+"/"+year,$scope.climate)
                    .then(function (response){
                        console.log("PUT Response: " 
                                    + response.status + " "
                                    + response.data);
                        $location.path("/climate-stats");
                    }); 
            }
            
        }]);    