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
            
            for (var i=0; i<arrspending.length-1; i++)
            {
                for (var j = i+1; j<arrspending.length; j++)
                {
                     var arr = arrspending[i];
                     var arrseg = arrspending[j];
                     if (arr[0] > arrseg[0]) { var s=arrspending[i]; arrspending[i]=arrspending[j]; arrspending[j]=s; }   
                }
            }
            
            var finalArray = [];
            for (var i = 0; i<arrspending.length; i++)
            {
                var arr = arrspending[i];
                finalArray[i] = [ arr[0].toString(), arr[1] ] ;
            }
            
            new Chartkick.LineChart("chart-id", finalArray); //da finire
        }, 
        function (error){});
}]);