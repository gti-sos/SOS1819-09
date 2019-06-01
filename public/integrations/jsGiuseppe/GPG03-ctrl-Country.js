/* global angular google*/

angular
    .module("ProjectApp")
    .controller("GPG03-ctrl-Country", ["$scope","$http", function ($scope,$http){
                console.log("GPG03-ctrl-Country Controller initialized.");
        var API = "/proxyCountry";
        var datas;

        $http.get(API).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            datas = response.data;
            
                google.charts.load('current', {
            'packages':['geochart'],
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
          });
         google.charts.setOnLoadCallback(drawRegionsMap);
    
         function drawRegionsMap() {
            
            var dataGoogle = [];
            dataGoogle[0] = ['Country', 'Extensión territorial'];
            var j = 1;
            for (var i = 0; i<datas.length; i++)
               if (datas[i].year == 2013) { dataGoogle[j] = [datas[i].country, datas[i].territorialExtension]; j++ }
             
            var data = google.visualization.arrayToDataTable(dataGoogle);
    
            var options = {};
    
            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    
            chart.draw(data, options);
            
                }
            }, 
            function (error){});
}]);