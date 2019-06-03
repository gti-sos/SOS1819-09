/* global angular Chartkick*/

angular
    .module("ProjectApp")
    .controller("GPG14-ctrl-Elements", ["$scope","$http", function ($scope,$http){
                console.log("GPG14-ctrl-Elements Controller initialized.");
        var API = "/proxyElements";

        $http.get(API).then(function(response){
            
            var arrElements = response.data;
            var finalarray = []; var j = 0;
            for (var i=0; i<arrElements.length; i++)
            {
                finalarray[j] = [ "Las victimas en el año " + arrElements[i].year + " de " + arrElements[i].province, parseInt(arrElements[i].victims, 10) ]; 
                j++;
            }
            for (var i=0; i<arrElements.length; i++)
            {
                finalarray[j] = [ "Heridos no hospitalizados en accidentes en el año " + arrElements[i].year + " de " + arrElements[i].province, parseInt(arrElements[i].injurednothospitalizedinaccidents, 10) ];
                j++;
            }
            
            for (var i=0; i<arrElements.length; i++)
            {
                finalarray[j] = [ "Accidentes con víctimas en el año " + arrElements[i].year + " de " + arrElements[i].province, parseInt(arrElements[i].accidentswithvictims, 10) ];
                j++;
            }
            new Chartkick.BarChart("chart-1", finalarray);
            
        }, 
        function (error){});
}]);