/* global angular Chartkick*/

angular
    .module("ProjectApp")
    .controller("GPG11-ctrl-GenPubExp", ["$scope","$http", function ($scope,$http){
                console.log("GPG11-ctrl-GenPubExp Controller initialized.");
        var API = "/proxyGenPubExp";

        $http.get(API).then(function(response){
            
            var DataGenPubExp = response.data;
            
            var arrspending = []; var j = 0;
            for (var i=0; i<DataGenPubExp.length; i++)
            {
                if (DataGenPubExp[i].country == "spain") { arrspending[j] = [DataGenPubExp[i].year, DataGenPubExp[i].publicSpending]; j++ }
            }
            
            new Chartkick.LineChart("chart-id", arrspending); //da finire
        }, 
        function (error){});
}]);