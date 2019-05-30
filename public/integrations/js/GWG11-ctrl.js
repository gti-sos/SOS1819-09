/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG11-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG11 Controller initialized.");
            var API = "/proxyG11";

        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                $scope.datas = response.data;
                
                
            });
}]);