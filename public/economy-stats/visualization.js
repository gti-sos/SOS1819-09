/* global angular Highcharts Chartkick google*/

angular
    .module("ProjectApp")
    .controller("ListCtrlVisualEconomy", ["$scope","$http", function ($scope,$http){
                console.log("GPE01-ctrl-Numbers Controller initialized.");
        var API = "/api/v1/economy-stats/";

        $http.get(API).then(function(response){
           
           var arreconomy  = response.data;

// HIGHCHART-------------------------------------------------------------------------------------------------------------------

            var Datagdpgrowthstats = [];
            var Dataindustrygdpstats = [];
            var Datagrosssavgdpstats = [];

            var j = 0;
            
            for (var i = 0; i<arreconomy.length; i++)
            {
                if (arreconomy[i].country == "Italy")
                {
                    Datagdpgrowthstats[j] = [ arreconomy[i].year, arreconomy[i].gdp_growth_stats ];
                    Dataindustrygdpstats[j] = [ arreconomy[i].year, arreconomy[i].industry_gdp_stats ];
                    Datagrosssavgdpstats[j] = [ arreconomy[i].year, arreconomy[i].gross_sav_gdp_stats] ;
                    var found = false;
                    for (var k=i+1; k<arreconomy.length; k++)
                    {
                        if (arreconomy[k].country == "Italy") found = true;
                    }
                    j++;
                }
            }
            
            var arrayDatagdpgrowthstats = []; 
            var arrayDataindustrygdpstats = [];
            var arrayDatagrosssavgdpstats = [];
            j = 0;
            
            for (var i = 1939; i<=2018; i++, j++)
            {
                var found = false;
                for (var k = 0; k<Datagdpgrowthstats.length; k++)
                {
                    var vetta = Datagdpgrowthstats[k];
                    var vettb = Dataindustrygdpstats[k];
                    var vettc = Datagrosssavgdpstats[k];
                    var date = vetta[0];
                    if (date == i) 
                    { 
                        arrayDatagdpgrowthstats[j] = vetta[1]; 
                        arrayDataindustrygdpstats[j] = vettb[1];
                        arrayDatagrosssavgdpstats[j] = vettc[1];
                        found = true; 
                        break; 
                    }
                }
                if (!found)
                {
                    arrayDatagdpgrowthstats[j] = null; 
                    arrayDataindustrygdpstats[j] = null;
                    arrayDatagrosssavgdpstats[j] = null;
                }
            }
            
            Highcharts.chart('grafico1', {
            	chart: {
                  type: 'line'
                },
                title: {
                    text: 'Indicadores de Economia sobre Italia, desde 1939 hasta 2018'
                },
            
                subtitle: {
                    text: 'Fuente de Information: API economy-stats'
                },
            
                yAxis: {
                    title: {
                        text: 'Valor indicador'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
            
                plotOptions: {
                    series: {
                        connectNulls: true,
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 1939
                    }
                },
            
                series: [{
                    name: 'Crecimiento PIB',
                    data: arrayDatagdpgrowthstats
                }, {
                    name: 'Crecimiento PIB para industria',
                    data: arrayDataindustrygdpstats
                }, {
                    name: 'PIB ahorro bruto',
                    data: arrayDatagrosssavgdpstats
                }],
            
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            
            });
            
//MAP GOOGLE-------------------------------------------------------------------------------------------------------------------
        
        google.charts.load('current', {
            'packages':['geochart'],
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);
        
        var arrGoogle = [];
        k = 0;
        
        for (var i = 0; i<arreconomy.length; i++)
           if (arreconomy[i].year == 2013) 
           { 
               arrGoogle[k] = [ arreconomy[i].country, arreconomy[i].gdp_growth_stats ];
               k++;
           }
        
    
        function drawRegionsMap() {
        
        var dataGoogle = [];
        dataGoogle[0] = ['Country', 'Crecimiento PIB'];
        var j = 1;
        for (var i = 0; i<arrGoogle.length; i++)
           { dataGoogle[j] = arrGoogle[i]; j++ }
         
        var data = google.visualization.arrayToDataTable(dataGoogle);
    
        var options = {};
    
        var chart = new google.visualization.GeoChart(document.getElementById('grafico2'));
    
        chart.draw(data, options);
        
        }
            
//CHARTKICK------------------------------------------------------------------------------------------------------------------- 

        var finalarray = []; j = 0;
        for (var i=0; i<arreconomy.length; i++)
        {
            finalarray[j] = [ "Crecimiento PIB en el año " + arreconomy[i].year + " de " + arreconomy[i].country, parseFloat(arreconomy[i].gdp_growth_stats) ]; 
            j++;
        }
        for (var i=0; i<arreconomy.length; i++)
        {
            finalarray[j] = [ "Crecimiento PIB para industria en accidentes en el año " + arreconomy[i].year + " de " + arreconomy[i].country, parseFloat(arreconomy[i].industry_gdp_stats) ];
            j++;
        }
        
        for (var i=0; i<arreconomy.length; i++)
        {
            finalarray[j] = [ "PIB ahorro bruto en el año " + arreconomy[i].year + " de " + arreconomy[i].country, parseFloat(arreconomy[i].gross_sav_gdp_stats) ];
            j++;
        }
        new Chartkick.BarChart("grafico3", finalarray);
            
        }, 
        function (error){});
}]);