/* global angular Highcharts*/

angular
    .module("ProjectApp")
    .controller("analytics-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("Analytics Controller initialized.");
                
            var GWAPI = "/api/v2/climate-stats";
            var EBAPI = "/api/v1/populationstats";
            var GPAPI = "/api/v1/economy-stats";
            var dataGW;
            var dataEB;
            var dataGP;
            
            $http({
                url : GWAPI,
                method : "GET",
            })
                .then(function (response){
                    //console.log("Data Received: "
                    //            + JSON.stringify(response.data,null,2));
                    dataGW = response.data;
                    
                    $http({
                        url : EBAPI,
                        method : "GET",
                    })
                        .then(function (response){
                            dataEB = response.data;
                            
                            $http({
                                url : GPAPI,
                                method : "GET",
                            })
                                .then(function (response){
                                    dataGP = response.data;
                                    
                                    var gw2012Data = [];
                                    var j = 0;
                                    for (var i = 0; i < dataGW.length; i++) {
                                        if(dataGW[i].year == 2012)
                                            gw2012Data[j++] = [dataGW[i].country, dataGW[i].co2_stats, dataGW[i].methane_stats, dataGW[i].nitrous_oxide_stats];
                                    }
                                    
                                    var gp2012Data = [];
                                    j = 0;
                                    for (var i = 0; i < dataGP.length; i++) {
                                        if(dataGP[i].year == 2012)
                                            gp2012Data[j++] = [dataGP[i].country, dataGP[i].gdp_growth_stats, dataGP[i].industry_gdp_stats, dataGP[i].gross_sav_gdp_stats];
                                    }
                                    
                                    var eb2012Data = [];
                                    j = 0;
                                    for (var i = 0; i < dataEB.length; i++) {
                                        if(dataEB[i].year == 2010)
                                            eb2012Data[j++] = [dataEB[i].country, dataEB[i].totalpopulation, dataEB[i].urbanpopulation, dataEB[i].accesstoelectricity];
                                    }
                                    
                                    /*console.log(eb2012Data)
                                    console.log(gw2012Data)
                                    console.log(gp2012Data)*/
                                    
                                    var categoriesData = [];
                                    var c02Data = [];
                                    var methaneData = [];
                                    var noData = [];
                                    var popData = [];
                                    var popuData = [];
                                    var elecData = [];
                                    var pibData = [];
                                    var pibIndData = [];
                                    var pibBruData = [];

                                    j = 0;
                                    for (var i = 0; i < gw2012Data.length; i++) {
                                        for (var k = 0; k < gp2012Data.length; k++) {
                                            if(gw2012Data[i][0] == gp2012Data[k][0]){
                                                for (var l = 0; l < eb2012Data.length; l++){
                                                    if(gp2012Data[k][0] == eb2012Data[l][0]){
                                                        categoriesData[j] = gw2012Data[i][0];
                                                        c02Data[j] = gw2012Data[i][1];
                                                        methaneData[j] = gw2012Data[i][2]/1000;
                                                        noData[j] = gw2012Data[i][3]/1000;
                                                        popData[j] = eb2012Data[l][1]/1000000;
                                                        popuData[j] = eb2012Data[l][2]/1000000;
                                                        elecData[j] = parseFloat(eb2012Data[l][3]);
                                                        pibData[j] = gp2012Data[k][1];
                                                        pibIndData[j] = gp2012Data[k][2];
                                                        pibBruData[j++] = gp2012Data[k][3];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    
                                    /*console.log(categoriesData)
                                    console.log(c02Data)
                                    console.log(methaneData)
                                    console.log(noData)
                                    console.log(popData)
                                    console.log(popuData)
                                    console.log(elecData)
                                    console.log(pibData)
                                    console.log(pibIndData)
                                    console.log(pibBruData)*/
                                    
                                    Highcharts.chart('container', {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: 'Datos múltiples durante el ano 2012 y población durante el ano 2010'
                                        },
                                        xAxis: {
                                            categories: categoriesData,
                                            crosshair: true,
                                            title: {
                                                text: 'País'
                                            }
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: 'Valores'
                                            }
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
                                            name: 'Emisión de co2 (kt)',
                                            data: c02Data
                                    
                                        }, {
                                            name: 'Emisión de metano (megatones de CO2 equivalente)',
                                            data: methaneData
                                    
                                        }, {
                                            name: 'Emisión de nitroso oxido (megatones de CO2 equivalente)',
                                            data: noData
                                    
                                        }, {
                                            name: 'Población (millones)',
                                            data: popData
                                    
                                        }, {
                                            name: 'Población urbana (millones)',
                                            data: popuData
                                    
                                        }, {
                                            name: 'Acceso a la electricidad (porcentaje)',
                                            data: elecData
                                        }, {
                                            name: 'Crecimiento PIB',
                                            data: pibData
                                    
                                        }, {
                                            name: 'Crecimiento PIB para industria',
                                            data: pibIndData
                                    
                                        }, {
                                            name: 'PIB ahorro bruto',
                                            data: pibBruData
                                        }]
                                    });
                                });
                        });
                });
}]);