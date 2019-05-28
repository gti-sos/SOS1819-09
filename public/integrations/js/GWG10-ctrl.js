/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG10-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG03 Controller initialized.");
            var API = "/proxyG10Biofuels";
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
                        
                        
                        // ----------------- MyGoogleCharts
                        
                        var googleData = [];
                        
                        googleData[0] = ['Country', 'CO2 Emission (kt)'];
                        var j = 1;
                        for (var i = 0; i < myData.length; i++) {
                                if(myData[i].year == 2012)
                                    googleData[j++] = [myData[i].country, myData[i].co2_stats];
                        }
                        
                        var hisGoogleData = [];
                        
                        hisGoogleData[0] = ['Country and Year', 'Ethanol', 'Gas Natural', 'Biodiesel'];
                        var k = 1;
                        for (var i = 0; i < data.length; i++) {
                            hisGoogleData[k++] = [data[i].country + " " + data[i].year, data[i].ethanolFuel, data[i].dryNaturalGas, data[i].biodiesel];
                        }
                
                        google.charts.load("current", {packages:["corechart"]});
                        google.charts.load('current', {'packages':['bar']});
                        google.charts.setOnLoadCallback(drawChart);
                        function drawChart() {
                            var data = google.visualization.arrayToDataTable(googleData);
                            var data2 = google.visualization.arrayToDataTable(hisGoogleData);
                    
                            var options = {
                              title: 'Emisión de CO2 durante el año 2012',
                              pieHole: 0.4,
                            };
                            
                            var options2 = {
                              chart: {
                                title: 'Producción de biocombustible',
                              }
                            };
                    
                            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                            chart.draw(data, options);
                            
                            var chart2 = new google.charts.Bar(document.getElementById('columnchart_material'));
                            chart2.draw(data2, google.charts.Bar.convertOptions(options2));
                        }
                        // End of GoogleChart
                    });
            });
}]);