/* global angular */

angular
    .module("ProjectApp")
    .controller("EditCtrlEconomy", [
        "$scope",
        "$http", 
        "$routeParams", //per poter estrarre il nome richiesto e trasferito tramite path
        "$location",    //per poter portare in un altro path dopo l'esecuzione del programma
        function ($scope,$http, $routeParams, $location){
     console.log("Modular MainCtrl Economy initialized!");   
     $scope.url="/api/v1/economy-stats";
     
     var country = $routeParams.country;
     var year = $routeParams.year;
     
     $http.get($scope.url +"/" + country + "/" + year)
                .then(function(response){
                    $scope.economies = [];
                    $scope.economies[0] = response.data;
                });
     
     $scope.modifyEconomy = function(){
        
        var newEconomy = $scope.economies;
        newEconomy[0].year = parseInt(newEconomy[0].year,10);
        newEconomy[0].gdp_growth_stats = parseFloat(newEconomy[0].gdp_growth_stats);
        newEconomy[0].industry_gdp_stats = parseFloat(newEconomy[0].industry_gdp_stats);
        newEconomy[0].gross_sav_gdp_stats = parseFloat(newEconomy[0].gross_sav_gdp_stats);
        console.log("Trying to change the field with country " + newEconomy.country + " and year " + newEconomy.year + " in this way: " + JSON.stringify(newEconomy, null, 2)); 
        
        var path = $scope.url+"/"+newEconomy[0].country+"/"+newEconomy[0].year;
        
        $http.put(path, newEconomy[0]).then(function(response){
            console.log("Field Changed!");
            $location.path("/economy-stats");
            if (response.status == 200) { console.log("Field updated"); }
        }, 
        function (error){
            $location.path("/economy-stats");
            if (error.status == 404) { console.log("Field not found"); }
            if (error.status == 400) { console.log("Bad request"); }
        });
        
    };
}]);


