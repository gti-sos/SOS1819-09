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
                        
                        
                        // ----------------- GoogleCharts
                        
                        var googleData = [];
                        
                        googleData[0] = ['Country and Year', 'Ethanol/CO2', 'Gas Natural (decenas)/Metano (cientos)', 'Biodiesel/Oxido nitroso (cientos)'];
                        var k = 1;
                        for (var i = 0; i < data.length; i++) {
                            googleData[k++] = [data[i].country + " " + data[i].year, data[i].ethanolFuel, data[i].dryNaturalGas/10, data[i].biodiesel];
                        }
                        for (var i = 0; i < myData.length; i++) {
                            googleData[k++] = [myData[i].country + " " + myData[i].year, myData[i].co2_stats, myData[i].methane_stats/100, myData[i].nitrous_oxide_stats/100];
                        }

                        google.charts.load('current', {'packages':['bar']});
                        google.charts.setOnLoadCallback(drawChart);
                        function drawChart() {
                            var data2 = google.visualization.arrayToDataTable(googleData);
                    
                            var options2 = {
                              chart: {
                                title: 'Producción de biocombustible y emisión de CO2 o equivalente',
                              }
                            };
                            
                            var chart2 = new google.charts.Bar(document.getElementById('columnchart_material'));
                            chart2.draw(data2, google.charts.Bar.convertOptions(options2));
                        }
                        // End of GoogleChart
                    });
            });
}]);