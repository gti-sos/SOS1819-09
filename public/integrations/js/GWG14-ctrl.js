/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG14-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG14 Controller initialized.");
            var API = "/proxyG14Deceaseds";

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