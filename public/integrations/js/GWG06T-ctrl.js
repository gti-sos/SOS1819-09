/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG06T-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG06T Controller initialized.");
            var API = "/proxyG06Transfer";

        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                $scope.data = response.data;
                
                
            });
}]);