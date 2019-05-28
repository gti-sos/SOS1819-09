/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG03-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG03 Controller initialized.");
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
                                text: 'Total c02 en kt'
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
                            name: 'C02 (kt)',
                            data: cdata
                        }, {
                            name: 'Metano (kt de co2 equivalente)',
                            data: mdata
                        }, {
                            name: 'Oxido nitroso (kt de co2 equivalente)',
                            data: ndata
                        }]
                    });
            });
}]);