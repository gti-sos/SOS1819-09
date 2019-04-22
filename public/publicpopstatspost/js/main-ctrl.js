/*global angular */

var app = angular.module("PostmanPopApp",[]);


app.controller("MainCtrl", ["$scope","$http", function($scope,$http){
    console.log("MainCtrl initialized");
    
    $scope.url="/api/v1/populationstats";
    
    $scope.send = function(){
        $http.get($scope.url).then(function(response){
            $scope.inputdata="";
            $scope.data= JSON.stringify(response.data,null,2);
            $scope.status = response.status;
        }, function(error){
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    
    $scope.post = function(){
        $http.post($scope.url, $scope.inputdata).then(function(response){
            $scope.status = response.status;
            $scope.data="";
        }, function(error){
            $scope.status = error.status;
            $scope.data="";
        });
    };
    
    $scope.put = function(){
        $http.put($scope.url, $scope.inputdata).then(function(response){
            $scope.status = response.status;
            $scope.data="";
        }, function(error){
            $scope.status = error.status;
            $scope.data="";
        });
    };
    
    $scope.delete = function(){
        $http.delete($scope.url).then(function(response){
            $scope.inputdata="";
            $scope.data= "";
            $scope.status = response.status;
            
        });
    };
}]);