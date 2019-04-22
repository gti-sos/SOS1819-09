/* global angular */
var app = angular.module("MiniPostmanEconomy");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http){
     console.log("Modular MainCtrl Economy initialized!");   
     $scope.url="/api/v1/economy-stats";
     
     function refresh()
    {
        console.log("Requesting API");
        $http.get($scope.url).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.economies = response.data;
        });
    }
    
    refresh();
    
    $scope.addNewFieldEconomy = function (){
        var newEconomy = $scope.newFieldEconomy;
        console.log("adding a new field economy " + JSON.stringify(newEconomy, null, 2)); 
        
        $http.post($scope.url, newEconomy).then(function(response){
            console.log("Created!");
            refresh();
        });
    };
    
    $scope.deleteFieldEconomy = function(country, year){
        $http.delete($scope.url+"/"+country+"/"+year).then(function(response){
            console.log("Deleting field with name "+ country + "and year " + year); 
            refresh();
        }); 
    };
     
}]);