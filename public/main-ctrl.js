/* global angular */

    angular
        .module("ProjectApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "menu.html"
                })
                .when("/climate-stats",{
                   controller : "climate-stats/js/ClimateCtrl",
                   templateUrl: "climate-stats/index.html"
                }).when("/economy-stats",{
                   controller : "economy-stats/economy-ctrl.js",
                   templateUrl: "economy-stats/index.html"
                })
                ;
        });

    console.log("Project App Initialized.");