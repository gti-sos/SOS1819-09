/* global angular */

angular
    .module("ProjectApp")
    .controller("GPG11-ctrl-GenPubExp", ["$scope","$http", function ($scope,$http){
                console.log("GPG11-ctrl-GenPubExp Controller initialized.");
        var API = "/proxyGenPubExp";

        $http.get(API).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.datas = response.data;
        }, 
        function (error){});
}]);