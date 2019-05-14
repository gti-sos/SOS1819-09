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
                }).when("/economy-stats",{
                   controller : "ListCtrlEconomy",
                   templateUrl: "economy-stats/index.html"
                }).when("/edit/:country/:year", {   
                   controller: "EditCtrlEconomy",
                   templateUrl: "economy-stats/edit.html"
                })
                .when("/climate-stats/edit/:country/:year",{
                   controller : "ClimateEditCtrl",
                   templateUrl: "climate-stats/edit.html"
                })
                .when("/populationstats",{
                    controller : "list-ctrl",
                    templateUrl : "publicpopstatsapp/list.html"
                })
                .when("/populationstats/edit/:country/:year",{
                    controller :"edit-ctrl",
                    templateUrl : "publicpopstatsapp/edit.html"
                })
                ;
        });

    console.log("Project App Initialized.");