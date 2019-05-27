/* global angular */

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
            params : {offset: ($scope.page-1)*10, limit: (($scope.page-1)*10 + 10)}
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                $scope.climates = response.data;
                data = $scope.climates;
                
                var mdata = data.map(function(item){
                    var newItem = item.methane_stats;
                    return newItem;
                });
                
                var cdata = data.map(function(item){
                    var newItem = item.co2_stats;
                    return newItem;
                });
                
                var ndata = data.map(function(item){
                    var newItem = item.nitrous_oxide_stats;
                    return newItem;
                });
                
                var categoriesData = data.map(function(item){
                    var newItem = "" + item.country + " " + item.year;
                    return newItem;
                });
                
                console.log(categoriesData)
                
                // ----------------- HighCharts
                
                Highcharts.chart('container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Stacked column chart'
                        },
                        xAxis: {
                            categories: categoriesData
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total fruit consumption'
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