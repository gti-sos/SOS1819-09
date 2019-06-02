/* global angular */

angular
    .module('ProjectApp')
    .controller('life-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('life ctrl initialized');
                
                var API='proxylife';
                var myAPI = "api/v1/populationstats"
                
                $http.get(API)
                    .then(function(response){
                       
                       var data = response.data;
                       
                       var lCountryYear = data.map(function(item){
                          return(item.country+','+item.year);
                       });
                       
                       var lifeEx = data.map(function(item){
                          return(item.expectancy); 
                       });
                       
                       $http.get(myAPI)
                            .then(function(response){
                               var mydata = response.data;
                               
                               var myCountryYear = mydata.map(function(item){
                                  return(item.country+','+item.year); 
                               });
                               
                               var elec = mydata.map(function(item){
                                  return(parseFloat(item.accesstoelectricity));
                               });
                               
                               var table = [];
                               var i=0;
                               
                               for(var j=0;j<lCountryYear.length;j++){
                                   table[i++]=[lCountryYear[j],lifeEx[j]];
                               }
                               for(var k=0;k<myCountryYear.length;k++){
                                   table[i++]=[myCountryYear[k],elec[k]];
                               }
                               
                               console.log(table);
                               
                               Highcharts.chart('container', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false
                                    },
                                    title: {
                                        text: 'Life expectancy and Access to electricity',
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        y: 40
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            dataLabels: {
                                                enabled: true,
                                                distance: -50,
                                                style: {
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['50%', '75%'],
                                            size: '110%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Life Expectancy and Access to electricity',
                                        innerSize: '50%',
                                        data: table
                                    }]
                                });
                               
                               
                            });
                        
                    });
            }
        ]);