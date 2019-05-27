/* global angular */

    angular
        .module("ProjectApp")
        .controller("ClimateViewCtrl",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("View Controller initialized.");
            var API = "/api/v2/climate-stats";
            
            
            
        }]);    