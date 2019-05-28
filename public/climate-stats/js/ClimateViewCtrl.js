/* global angular zingchart Highcharts google*/
    angular
        .module("ProjectApp")
        .controller("ClimateViewCtrl",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("View Controller initialized.");
            var API = "/api/v2/climate-stats";
            var data;
            
        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                
                data = response.data;
                
                // ----------------- HighCharts
                
                var mdata = data.map(function(item){
                    return item.methane_stats;
                });
                
                var cdata = data.map(function(item){
                    return item.co2_stats;
                });
                
                var ndata = data.map(function(item){
                    return item.nitrous_oxide_stats;
                });
                
                var categoriesData = data.map(function(item){
                    return (item.country + " " + item.year);
                });
                
                Highcharts.chart('highchart', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Emisión de gases de efecto invernadero'
                        },
                        xAxis: {
                            categories: categoriesData
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total CO2 en kt'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                                }
                            }
                        },
                        legend: {
                            align: 'right',
                            x: -30,
                            verticalAlign: 'top',
                            y: 25,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                                }
                            }
                        },
                        series: [{
                            name: 'CO2 (kt)',
                            data: cdata
                        }, {
                            name: 'Metano (kt de co2 equivalente)',
                            data: mdata
                        }, {
                            name: 'Oxido nitroso (kt de co2 equivalente)',
                            data: ndata
                        }]
                    });
                    
                // ----------------- GeoCharts
            
                var googleData = [];
                
                googleData[0] = ['Country', 'CO2 Emission (kt)'];
                googleData[1] = [' ', 0];
                var j = 2;
                for (var i = 0; i < data.length; i++) {
                        if(data[i].year == 2012)
                            googleData[j++] = [data[i].country, data[i].co2_stats];
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
                
                // ----------------- ZingChart
                var myConfig = {
                  "type": "bar",
                  "title": {
                    "text": "Emisión de gases de efecto invernadero"
                  },
                  "plot": {
                    "value-box": {
                      "text": "%v"
                    },
                    "tooltip": {
                      "text": "%v"
                    }
                  },
                  "legend": {
                    "toggle-action": "hide",
                    "header": {
                      "text": "Legend Header"
                    },
                    "item": {
                      "cursor": "pointer"
                    },
                    "draggable": true,
                    "drag-handler": "icon"
                  },
                  "scale-x": {
                    "labels": categoriesData
                  },
                  "series": [
                    {
                      "values": cdata,
                      "text": "CO2 (kt)"
                    },
                    {
                      "values": mdata,
                      "text": "Metano (kt de co2 equivalente)"
                    },
                    {
                      "values": ndata,
                      "text": "Oxido nitroso (kt de co2 equivalente)"
                    }
                  ]
                };
                 
                zingchart.render({ 
                	id : 'myChart', 
                	data : myConfig, 
                	height: "100%", 
                	width: "100%" 
                });
                        
            });
        }]);    