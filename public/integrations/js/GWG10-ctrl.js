/* global angular */

angular
    .module("ProjectApp")
    .controller("GWG10-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG03 Controller initialized.");
            var API = "/proxyG03Companies";
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
                        
                        
                        // ----------------- HighCharts
                
                        var comdata = data.map(function(item){
                            return item.numberOfCompanies;
                        });
                        
                        var co2data = myData.map(function(item){
                            return item.co2_stats;
                        });
                        
                        var ndata = myData.map(function(item){
                            return item.nitrous_oxide_stats;
                        });
                        
                        var mdata = myData.map(function(item){
                            return item.methane_stats;
                        });
                        
                        var categoriesData = data.map(function(item){
                            return (item.country + " " + item.year);
                        });
                        
                        var categoriesMyData = myData.map(function(item){
                            return (item.country + " " + item.year);
                        });
                        
                        var categories = categoriesData.concat(categoriesMyData);
                        
                        console.log(categoriesData);
                        console.log(categoriesMyData);
                        console.log(categories);

                        Highcharts.chart('container', {
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: 'Integración de la API GO3-companies'
                            },
                            subtitle: {
                                text: '¿El número de empresas en un país está correlacionado con su contaminación?'
                            },
                            xAxis: {
                                categories: categories,
                                title: {
                                    text: null
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Total c02 en kt / número de empresas',
                                    align: 'high'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                                valueSuffix: ' kt / uds'
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -40,
                                y: 80,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                shadow: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                name: 'Companies',
                                data: comdata
                            }, {
                                name: 'Co2',
                                data: co2data
                            }, {
                                name: 'Metano',
                                data: mdata
                            }, {
                                name: 'Oxido nitroso',
                                data: ndata
                            }]
                        });
                        // End of HighChart
                        
                        
                    });
            });
}]);