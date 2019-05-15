/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("edit-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
        
        console.log("edit ctrl initialized");
        
        var API = "/api/v1/populationstats";
        
        var country = $routeParams.country;
        var year = $routeParams.year;
        
        $http.get(API+"/"+country+"/"+year)
            .then(function(response){
                $scope.updateStat=response.data;
            });
        
        
        $scope.guardarUpdate = function (updateStat) {
            updateStat = $scope.updateStat;
            console.log("PUT : "+API+"/"+updateStat.country+"/"+updateStat.year);
            $http.put(API+"/"+updateStat.country+"/"+updateStat.year,updateStat)
                 .then( function(response){
                     console.log("Put response : "+response.status);
                     $scope.updateStat = "";
                     //refresh();
                    $scope.message = response.statusText;
                    console.log('response :'+response.statusText);
                    console.log('ir a :'+"</populationstats>");
                    $location.path("/populationstats");
                });
                
            
        }; 
        
    }]);