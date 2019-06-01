/* global angular google*/

angular
    .module("ProjectApp")
    .controller("GWRESTV1-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWRESTV1 Controller initialized.");
            var API = "/GWRESTV1";
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
                                googleData[j++] = [data[i].name, data[i].population];
                        }
                        
                        var my2012Data = [];
                        j = 0;
                        for (var i = 0; i < myData.length; i++) {
                            if(myData[i].year == 2012)
                                my2012Data[j++] = [myData[i].country, myData[i].methane_stats];
                        }
                        var areaData = [];
                        areaData[0] = ['País', 'Emisión de metano (kt de CO2 equivalente)', 'Población (Miles)'];
                        j = 1;
                        for (var i = 0; i < my2012Data.length; i++) {
                            for (var k = 0; k < data.length; k++) {
                                if(my2012Data[i][0] == data[k].name){
                                    areaData[j++] = [my2012Data[i][0], my2012Data[i][1], data[k].population/1000];
                                }
                            }
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
                        
                        google.charts.load('current', {'packages':['corechart']});
                          google.charts.setOnLoadCallback(drawChart);
                    
                          function drawChart() {
                            var data = google.visualization.arrayToDataTable(areaData);
                    
                            var options = {
                              title: 'Población y emisión de metano durante el ano 2012',
                              hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
                              vAxis: {minValue: 0}
                            };
                    
                            var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                            chart.draw(data, options);
                          }
                            // End of GoogleChart
                        });
            });
}]);