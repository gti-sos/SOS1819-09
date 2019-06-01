/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG12-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG12 Controller initialized.");
            var API = "/proxyG12";

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