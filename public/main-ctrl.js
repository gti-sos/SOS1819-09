/* global angular */

    angular
        .module("ProjectApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/",{
                   templateUrl: "menu.html"
                })
                // ----------------- Integrations
                .when("/integrations",{
                    templateUrl : "integrations/index.html"
                })
                .when("/integrations/GWREST",{
                    controller :"GWREST-ctrl",
                    templateUrl : "integrations/GWREST.html"
                })
                .when("/integrations/GWRESTV1",{
                    controller :"GWRESTV1-ctrl",
                    templateUrl : "integrations/GWRESTV1.html"
                })
                .when("/integrations/GWG02",{
                    controller :"GWG02-ctrl",
                    templateUrl : "integrations/GWG02.html"
                })
                .when("/integrations/GWG03",{
                    controller :"GWG03-ctrl",
                    templateUrl : "integrations/GWG03.html"
                })
                .when("/integrations/GWG04",{
                    controller :"GWG04-ctrl",
                    templateUrl : "integrations/GWG04.html"
                })
                .when("/integrations/GWG06T",{
                    controller :"GWG06T-ctrl",
                    templateUrl : "integrations/GWG06T.html"
                })
                .when("/integrations/GWG08",{
                    controller :"GWG08-ctrl",
                    templateUrl : "integrations/GWG08.html"
                })
                .when("/integrations/GWG10",{
                    controller :"GWG10-ctrl",
                    templateUrl : "integrations/GWG10.html"
                })
                .when("/integrations/GWG11",{
                    controller :"GWG11-ctrl",
                    templateUrl : "integrations/GWG11.html"
                })
                .when("/integrations/GWG12",{
                    controller :"GWG12-ctrl",
                    templateUrl : "integrations/GWG12.html"
                })
                .when("/integrations/GWG14",{
                    controller :"GWG14-ctrl",
                    templateUrl : "integrations/GWG14.html"
                })
                // ----------------- Analytics
                .when("/analytics",{
                    controller :"analytics-ctrl",
                    templateUrl : "analytics/index.html"
                })
                // ----------------- Climate Stats
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
                // ----------------- Economy Stats
                .when("/economy-stats",{
                   controller : "ListCtrlEconomy",
                   templateUrl: "economy-stats/index.html"
                })
                .when("/edit/:country/:year", {   
                   controller: "EditCtrlEconomy",
                   templateUrl: "economy-stats/edit.html"
                })
                .when("/integrations/GPG11GenPubExp", {   
                   controller: "GPG11-ctrl-GenPubExp",
                   templateUrl: "integrations/GPG11GenPubExp.html"
                })
                .when("/integrations/GPG11GenPubExp", {   
                   controller: "GPG11-ctrl-GenPubExp",
                   templateUrl: "integrations/GPG11GenPubExp.html"
                })
                .when("/integrations/GPG03Country", {   
                   controller: "GPG03-ctrl-Country",
                   templateUrl: "integrations/GPG03Country.html"
                })
                // ----------------- Population Stats
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
                .when("/integrations/EBG08",{
                    controller : "integration-ctrl",
                    templateUrl : "publicpopstatsapp/integration.html"
                })
                .when("/integrations/EBintefuel",{
                    controller : "fuel-ctrl",
                    templateUrl : "publicpopstatsapp/fuel.html"
                })
                .when("/integrations/EBinteweather",{
                    controller : "weather-ctrl",
                    templateUrl : "publicpopstatsapp/weather.html"
                })
                ;
        });

    console.log("Project App Initialized.");