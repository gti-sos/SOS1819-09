/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
                console.log("Modular MainCtrl initialized");
                $scope.url = "/api/v1/climate-stats";
                
                
                refresh();
                
                function refresh(){
                    $http.get($scope.url).then(function (response){
                        $scope.climates = response.data;
                    });
                }
                
                function sleep(milliseconds) {
                  var start = new Date().getTime();
                  for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds){
                      break;
                    }
                  }
                }
                
                $scope.getFromTo = function(){
                    console.log("buscando");
                    $http({
                        url: $scope.url, 
                        method: "GET",
                        params: {from: $scope.from, to: $scope.to}
                     }).then(function (response){
                        $scope.climates = response.data;
                        console.log(JSON.stringify(response.data,null,2));
                    });
                };
                
                $scope.getCountry = function(){
                    console.log("buscando");
                    $http({
                        url: $scope.url, 
                        method: "GET",
                        params: {country : $scope.country}
                     }).then(function (response){
                        $scope.climates = response.data;
                        console.log(JSON.stringify(response.data,null,2));
                    });
                };

                $scope.addClimate = function(){
            
                    console.log("Adding climate");
                    $scope.newClimate.year = parseInt($scope.newClimate.year,10);
                    $scope.newClimate.methane_stats = parseFloat($scope.newClimate.methane_stats);
                    $scope.newClimate.co2_stats = parseFloat($scope.newClimate.co2_stats);
                    $scope.newClimate.nitrous_oxide_stats = parseFloat($scope.newClimate.nitrous_oxide_stats);
                    
                    $http.post($scope.url,$scope.newClimate).then(function (response){
                        console.log("Climate added");
                        refresh();
                    });
                };
                
                $scope.deleteClimate = function(country, year){
            
                    console.log("Deleting climate");
                    $http.delete($scope.url+"/"+country+"/"+year).then(function (response){
                        console.log("Climate deleted");
                        sleep(100); //Database update
                        refresh();
                    });
                };
                
                // DELETE
                
                $scope.delete = function(){
                    $http.delete($scope.url).then(function(response){
                        $scope.status = response.status;
                        sleep(100); //Database update
                        refresh();
                    }, function (error){
                        $scope.status = error.status;
                    });
                };
                
                /*
                // GET
                
                $scope.send = function(){
                    $http.get($scope.url).then(function (response){
                        $scope.status = response.status;
                        $scope.data = JSON.stringify(response.data,null,2);
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                // POST
                
                $scope.post = function(){
                    $http.post($scope.url,$scope.body).then(function (response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                // PUT
                
                $scope.put = function(){
                    $http.put($scope.url,$scope.body).then(function (response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                */
}]);