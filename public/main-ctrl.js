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
                // ----------------- About
                .when("/about",{
                    templateUrl : "about.html"
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
                .when("/integrations/GPG03Country", {   
                   controller: "GPG03-ctrl-Country",
                   templateUrl: "integrations/GPG03Country.html"
                })
                .when("/integrations/GPG02Movie", {   
                   controller: "GPG02-ctrl-Movie",
                   templateUrl: "integrations/GPG02Movie.html"
                })
                .when("/integrations/GPG14Elements", {   
                   controller: "GPG14-ctrl-Elements",
                   templateUrl: "integrations/GPG14Elements.html"
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
                .when("/integrations/EBintehotel",{
                    controller : "hotel-ctrl",
                    templateUrl : "publicpopstatsapp/hotel.html"
                })
                .when("/integrations/EBG04",{
                    controller : "suicide-ctrl",
                    templateUrl : "publicpopstatsapp/suicide.html"
                })
                .when("/integrations/EBG12",{
                    controller : "life-ctrl",
                    templateUrl : "publicpopstatsapp/life.html"
                })
                .when("/integrations/EBranking",{
                    controller : "g06-ctrl",
                    templateUrl : "publicpopstatsapp/g06.html"
                })
                .when("/integrations/EBUsoAirport",{
                    controller : "airport-ctrl",
                    templateUrl : "publicpopstatsapp/airport.html"
                })
                .when("/integrations/EBUsoFoot",{
                    controller : "foot-ctrl",
                    templateUrl : "publicpopstatsapp/foot.html"
                })
                .when("/integrations/EBUsoFact",{
                    controller : "fact-ctrl",
                    templateUrl : "publicpopstatsapp/fact.html"
                })
                ;
        });

    console.log("Project App Initialized.");