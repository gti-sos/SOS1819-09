/* global angular */

angular
    .module("ProjectApp")
    .controller("GPE01-ctrl-Numbers", ["$scope","$http", function ($scope,$http){
                console.log("GPE01-ctrl-Numbers Controller initialized.");
        var API = "/GPnumber";

        $http.get(API).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            var arrinfo = response.data;
            $scope.info = "NUMBER FROM " + arrinfo.region + ", " + arrinfo["iso-code"] + ": " + arrinfo["telephone-number"];
            
        }, 
        function (error){});
}]);