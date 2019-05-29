/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG02-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG02 Controller initialized.");
            var API = "/proxyG02Scorers";

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