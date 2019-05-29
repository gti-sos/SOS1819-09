/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG03C-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG03C Controller initialized.");
            var API = "/proxyG03Computer";

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