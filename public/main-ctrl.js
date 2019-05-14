/* global angular */

    angular
        .module("ProjectApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "menu.html"
                })
                .when("/climate-stats",{
                   controller : "ClimateCtrl",
                   templateUrl: "climate-stats/index.html"
                })
                .when("/climate-stats/edit/:name",{
                   controller : "ClimateEditCtrl",
                   templateUrl: "climate-stats/edit.html"
                })
                ;
        });

    console.log("Project App Initialized.");