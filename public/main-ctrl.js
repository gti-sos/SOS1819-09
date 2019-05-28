/* global angular */

    angular
        .module("ProjectApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "menu.html"
                })
                .when("/integrations",{
                    templateUrl : "integrations/index.html"
                })
                .when("/integrations/GWG03",{
                    controller :"GWG03-ctrl",
                    templateUrl : "integrations/GWG03.html"
                })
                .when("/integrations/GWG10",{
                    controller :"GWG10-ctrl",
                    templateUrl : "integrations/GWG10.html"
                })
                .when("/analytics",{
                    controller :"analytics-ctrl",
                    templateUrl : "analytics.html"
                })
                .when("/climate-stats",{
                   controller : "ClimateCtrl",
                   templateUrl: "climate-stats/index.html"
                })
                .when("/climate-stats/edit/:country/:year",{
                   controller : "ClimateEditCtrl",
                   templateUrl: "climate-stats/edit.html"
                })
                .when("/climate-stats/view",{
                   controller : "ClimateViewCtrl",
                   templateUrl: "climate-stats/view.html"
                })
                .when("/economy-stats",{
                   controller : "ListCtrlEconomy",
                   templateUrl: "economy-stats/index.html"
                })
                .when("/edit/:country/:year", {   
                   controller: "EditCtrlEconomy",
                   templateUrl: "economy-stats/edit.html"
                })
                .when("/populationstats",{
                    controller : "list-ctrl",
                    templateUrl : "publicpopstatsapp/list.html"
                })
                .when("/populationstats/edit/:country/:year",{
                    controller :"edit-ctrl",
                    templateUrl : "publicpopstatsapp/edit.html"
                })
                .when("/populationstats/view",{
                    controller : "pop-view",
                    templateUrl : "publicpopstatsapp/view.html"
                })
                .when("/populationstats/uvChart",{
                    controller : "chart-ctrl",
                    templateUrl : "publicpopstatsapp/chart.html"
                })
                .when("/populationstats/next",{
                    controller : "integration-ctrl",
                    templateUrl : "publicpopstatsapp/integration.html"
                })
                ;
        });

    console.log("Project App Initialized.");