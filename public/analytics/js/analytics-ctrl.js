/* global angular */

angular
    .module("ProjectApp")
    .controller("analytics-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("Analytics Controller initialized.");
                
            var GWAPI = "/api/v2/climate-stats";
            var EBAPI = "/api/v1/populationstats";
            var GPAPI = "/api/v1/economy-stats";
            var dataGW;
            var dataEB;
            var dataGP;
            
            $http({
                url : GWAPI,
                method : "GET",
            })
                .then(function (response){
                    //console.log("Data Received: "
                    //            + JSON.stringify(response.data,null,2));
                    dataGW = response.data;
                    
                    $http({
                        url : EBAPI,
                        method : "GET",
                    })
                        .then(function (response){
                            dataEB = response.data;
                            
                            $http({
                                url : GPAPI,
                                method : "GET",
                            })
                                .then(function (response){
                                    dataGP = response.data;
                                    
                                    
                                });
                        });
                });
}]);