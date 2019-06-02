/*global angular */

angular

    .module('ProjectApp')
    
    .controller('weather-ctrl',["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
                    
                    function($scope,$http,$routeParams,$location){
                        
                        console.log("weather ctrl initialized");
                        
                        var API="/EBweather";
                        var myAPI="/api/v1/populationstats";
                        
                        $http.get(API)
                            .then(function(response){
                                
                                var dataw = response.data;
                                console.log(dataw.list[10].weather[0].id);
                                var list = dataw.list;
                                
                                var weat = list.map(function(item){
                                    return(item.weather); 
                                });
                                
                                var id = [];
                                
                                for(var i=0;i<weat.length;i++){
                                    id[i]=weat[i][0].id;
                                }
                                console.log(weat);
                                console.log(id);
                                
                                $http.get(myAPI)
                                    .then(function(response){
                                       
                                       var mydata = response.data;
                                       
                                       var data2010 = mydata.filter(function(item){
                                           if(item.year==2010)
                                            return item;
                                       });
                                       
                                       var country = data2010.map(function(item){
                                           return item.country;
                                       });
                                       
                                       var elec = data2010.map(function(item){
                                          return parseFloat(item.accesstoelectricity); 
                                       });
                                       
                                       //console.log(elec);
                                       
                                       var table=[];
                                       table[0]=['city/country','value'];
                                       
                                       for(i=1;i<id.length;i++){
                                           table[i]=['London',id[i]];
                                       }
                                       for(j=0;j<data2010.length;j++){
                                           table[i++]=[country[j],elec[j]];
                                       }
                                       
                                       console.log(table);
                                       
                                       
                                       
                                    google.charts.load('current', {packages: ['corechart', 'bar']});
                                    google.charts.setOnLoadCallback(drawBasic);
                                    
                                    function drawBasic() {
                                    
                                          var data = google.visualization.arrayToDataTable(table);
                                    
                                          var options = {
                                            title: 'London\'s weather identification, access to electricity' ,
                                            chartArea: {width: '50%'},
                                            hAxis: {
                                              title: 'value',
                                              minValue: 0
                                            },
                                            vAxis: {
                                              title: 'City/Country'
                                            }
                                          };
                                    
                                          var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                                    
                                          chart.draw(data, options);
                                        }
                                        
                                    });
                                
                                
                            });
                        
                    }
        
        ]);