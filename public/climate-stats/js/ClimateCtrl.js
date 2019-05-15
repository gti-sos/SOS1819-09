/* global angular */

angular
    .module("ProjectApp")
    .controller("ClimateCtrl", ["$scope","$http", function ($scope,$http){
                console.log("Modular ClimateCtrl initialized");
                var API = "/api/v2/climate-stats";
                
                
                refresh(1);
                
                function refresh(page){
                    console.log("Requesting contacts to <"+API+">...");
                    
                    document.getElementById("pre").disabled = (page == 1);
                    $scope.page = page;
                    
                    $http({
                        url : API,
                        method : "GET",
                        params : {offset: ($scope.page-1)*10, limit: (($scope.page-1)*10 + 10)}
                    })
                        .then(function (response){
                            console.log("Data Received: "
                                        + JSON.stringify(response.data,null,2));
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
                
                //Pagination
                
                $scope.pagination = function(page){
                    refresh(page);
                };
                
                // GET FROM TO
                
                $scope.getFromTo = function(){
                    console.log("buscando");
                    $http({
                        url: API, 
                        method: "GET",
                        params: {from: $scope.from, to: $scope.to}
                     }).then(function (response){
                        $scope.climates = response.data;
                        console.log(JSON.stringify(response.data,null,2));
                        $scope.information = "Buscando realizada";
                    });
                };
                
                // LOAD DATA
                
                $scope.loadData = function(){
                    $http.get(API+"/loadInitialData")
                        .then(function(response){
                            console.log("Data Received: "
                                        + JSON.stringify(response.data,null,2));
                            $scope.climates = response.data;
                            $scope.information = 'Datos inicialados';
                            refresh(1);
                        }, function (error){
                            $scope.information = 'Error : Ya hay datos';
                        });
                };
                
                // GET /country
                
                $scope.getCountry = function(country){
                    console.log("buscando");
                    $http({
                        url: API+"/"+country, 
                        method: "GET",
                     }).then(function (response){
                        $scope.climates = response.data;
                        console.log(JSON.stringify(response.data,null,2));
                        $scope.information = "Buscando realizada";
                    }, function (error){
                        refresh(1);
                        $scope.information = 'Error : El pais "' + $scope.country + '" no existe';
                    });
                };
                
                // POST
                
                $scope.addClimate = function(){
            
                    console.log("Adding climate");
                    $scope.newClimate.country = $scope.newClimate.country;
                    $scope.newClimate.year = parseInt($scope.newClimate.year,10);
                    $scope.newClimate.methane_stats = parseFloat($scope.newClimate.methane_stats);
                    $scope.newClimate.co2_stats = parseFloat($scope.newClimate.co2_stats);
                    $scope.newClimate.nitrous_oxide_stats = parseFloat($scope.newClimate.nitrous_oxide_stats);
                    
                    $http.post(API,$scope.newClimate).then(function (response){
                        console.log("Climate added");
                        refresh(1);
                        $scope.information = "Recurso creado";
                    }, function (error){
                        refresh(1);
                        if(error.status == 409){
                            $scope.information = "Error : El recurso ya existe";
                        }
                        if(error.status == 400){
                            $scope.information = "Error : Datos no validos";
                        }
                    });
                };
                
                // DELETE /country/year
                
                $scope.deleteClimate = function(country, year){
            
                    console.log("Deleting climate");
                    $http.delete(API+"/"+country+"/"+year).then(function (response){
                        console.log("Climate deleted");
                        sleep(100); //Database update
                        $scope.information = "Recurso borrado";
                        refresh(1);
                    });
                };
                
                // DELETE
                
                $scope.delete = function(){
                    $http.delete(API).then(function(response){
                        sleep(100); //Database update
                        $scope.information = "Recurso borrado";
                        refresh(1);
                    });
                };
}]);