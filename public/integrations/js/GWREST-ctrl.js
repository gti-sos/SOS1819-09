/* global angular */

angular
    .module("ProjectApp")
    .controller("GWREST-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWREST Controller initialized.");
            var API = "/GWRest";
            var myAPI = "/api/v2/climate-stats";
            var data;
            var myData;
            
        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                data = response.data;
                
                $http({
                    url : myAPI,
                    method : "GET",
                })
                    .then(function (response){
                        myData = response.data;
                        
                        
                        // ----------------- GoogleCharts
                        
                        var googleData = [];
                
                        googleData[0] = ['Country', 'Population'];
                        googleData[1] = [' ', 0];
                        var j = 2;
                        for (var i = 0; i < data.length; i++) {
                                if(data[i].year == 2012)
                                    googleData[j++] = [data[i].name, data[i].population];
                        }
                        
                        google.charts.load('current', {
                            'packages':['geochart'],
                            // Note: you will need to get a mapsApiKey for your project.
                            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);
                            
                        function drawRegionsMap() {
                            var data = google.visualization.arrayToDataTable(googleData);
                            
                            var options = {
                                colorAxis: {colors: ['#00853f', 'orange', '#e31b23']},
        
                                };
                            
                            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
                            
                            chart.draw(data, options);
                        }
                        // End of GoogleChart
                    });
            });
}]);