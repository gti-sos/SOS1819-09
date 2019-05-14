var app = angular.module("MiniPostmanEconomy");

app.controller("EconomyCtrl", ["$scope", "$http", function($scope, $http){
     console.log("Modular MainCtrl Economy initialized!");   
     $scope.url="/api/v1/economy-stats";
     
     
     // GET
     $scope.get = function () { //la funzione del bottone send
         $http.get($scope.url).then(function(response)
         {
            $scope.status = response.status;
            $scope.resp = JSON.stringify(response.data,null,2); 
         }, 
         function (error){
            $scope.status = error.status;
         });
     };
    
     // POST
     $scope.post = function () { //la funzione del bottone send
         $http.post($scope.url, $scope.body).then(function(response)
         {
            $scope.resp = "";
            $scope.status = response.status;
         }, 
         function (error){
            $scope.resp = "";
            $scope.status = error.status;
         });
     };
     
     // PUT
     $scope.put = function () { //la funzione del bottone send
         $http.put($scope.url, $scope.body).then(function(response)
         {
            $scope.resp = "";
            $scope.status = response.status; 
         }, 
         function (error){
            $scope.resp = "";
            $scope.status = error.status;
         });
     };
     
     // DELETE
     $scope.delete = function () { //la funzione del bottone send
         $http.delete($scope.url).then(function(response)
         {
            $scope.resp = "";
            $scope.status = response.status;
         }, 
         function (error){
            $scope.resp = "";
            $scope.status = error.status;
         });
     };
}]);