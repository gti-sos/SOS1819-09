/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG08-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG08 Controller initialized.");
            var API = "/proxyG08Tourist";

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