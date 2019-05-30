/* global angular Highcharts*/

angular
    .module("ProjectApp")
    .controller("GWREST-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWREST Controller initialized.");
            var API = "/GWREST";
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
                        
                        
                        var my2012Data = [];
                        var j = 0;
                        for (var i = 0; i < myData.length; i++) {
                            if(myData[i].year == 2012)
                                my2012Data[j++] = [myData[i].country, myData[i].methane_stats];
                        }
                        
                        var categoriesData = [];
                        var methaneData = [];
                                                var popData = [];

                        j = 0;
                        for (var i = 0; i < my2012Data.length; i++) {
                            for (var k = 0; k < data.length; k++) {
                                if(my2012Data[i][0] == data[k].name){
                                    categoriesData[j] = my2012Data[i][0];
                                    methaneData[j] = my2012Data[i][1];
                                    popData[j++] = data[k].population/1000;
                                }
                            }
                        }
                        
                        Highcharts.chart('container', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Población y emission de Methane durante el ano 2012'
                            },
                            xAxis: {
                                categories: categoriesData,
                                crosshair: true,
                                title: {
                                    text: 'Country'
                                }
                            },
                            yAxis: {
                                min: 0,
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: 'Methane Emission (kt of CO2 equivalent)',
                                data: methaneData
                        
                            }, {
                                name: 'Population (million)',
                                data: popData
                        
                            }]
                        });
                            // End of HighCharts
                        });
            });
}]);