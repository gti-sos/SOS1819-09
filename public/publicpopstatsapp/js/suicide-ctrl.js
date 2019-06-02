/* global angular */

angular
    .module('ProjectApp')
    .controller('suicide-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('suicide ctrl initialized');
                
                var API='/proxySuicide';
                var myAPI = 'api/v1/populationstats';
                
                $http.get(API)
                    .then(function(response){
                       var data  = response.data;
                       console.log(data);
                       
                       var sCountryYear = data.map(function(item){
                          return item.country+','+item.year; 
                       });
                       
                       var rank = data.map(function(item){
                          return item.rank; 
                       });
                       
                       $http.get(myAPI)
                            .then(function(response){
                                var mydata=response.data;
                                
                                var myCountryYear = mydata.map(function(item){
                                   return item.country+','+item.year; 
                                });
                                
                                var totalpop = mydata.map(function(item){
                                    return parseInt(item.totalpopulation);
                                });
                                
                                console.log(sCountryYear);
                                var gtable = [];
                                
                                var i=0;
                                gtable[i++]=['country','rank of suicide and/or total population (in million)'];
                                
                                for(var j=0;j<sCountryYear.length;j++){
                                    gtable[i++]=[sCountryYear[j],rank[j]];
                                }
                                for(var k=0;k<myCountryYear.length;k++){
                                    gtable[i++]=[myCountryYear[k],Math.floor(totalpop[k]/100000)];
                                }
                                
                                console.log(totalpop);
                                console.log(gtable);
                                
                                
                                google.charts.load('current', {packages: ['corechart', 'bar']});
                                google.charts.setOnLoadCallback(drawBasic);
                                
                                function drawBasic() {
                                
                                      var data = google.visualization.arrayToDataTable(gtable);
                                
                                      var options = {
                                        title: 'Rank of suicide and total population',
                                        chartArea: {width: '60%'},
                                        hAxis: {
                                          title: '',
                                          minValue: 0,
                                          showTextEvery:1
                                        },
                                        vAxis: {
                                          title: 'Country',
                                          showTextEvery:1
                                        },
                                        "width":800,"height":400,"colors":["red"]
                                      };
                                
                                      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                                
                                      chart.draw(data, options);
                                    }
                            });
                    });
                
            }
    ]);