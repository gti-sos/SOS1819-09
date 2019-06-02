/* global angular */

angular
    .module("ProjectApp")
    .controller("GPG14-ctrl-Elements", ["$scope","$http", function ($scope,$http){
                console.log("GPG14-ctrl-Elements Controller initialized.");
        var API = "/proxyElements";

        $http.get(API).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.datas = response.data;
        }, 
        function (error){});
}]);