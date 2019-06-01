/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("fuel-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
            console.log("geo ctrl initialized");

        var API = '/EBfuel';
        var MYAPI = "/api/v1/populationstats";
        
        $http.get(API)
            .then(function(response){
                //console.log("Ca marche");
                
               var mydata = response.data;
               var prix = mydata.data.prices;
               
               //console.log(prix);
               
               var name = prix.map(function(item){
                   return(item.name);
               });
               
               var price = prix.map(function(item){
                  return(item.value); 
               });
               
               //console.log(price);
               
               $http.get(MYAPI)
                .then(function(response){
                    
                   var data=response.data;
                   var emdata=[];
                   var j=0;
                   
                   for(var i=0;i<data.length;i++){
                       if(data[i].year==1990){
                           emdata[j++] = data[i];
                       }
                   }
                   
                   //console.log(data[0]);
                   //console.log(emdata);
                   
                   var year = emdata.map(function(item){
                      return(item.year); 
                   });
                   
                   var country = emdata.map(function(item){
                      return(item.country); 
                   });
                   
                   var electricity = emdata.map(function(item){
                      return(item.accesstoelectricity); 
                   });
                   
                   var myprice=[];
                   
                   for(i=0;i<price.length;i++){
                       myprice[i]=parseFloat(price[i]);
                   }
                   for(var k=0;k<(electricity.length);k++){
                       myprice[i++]='null';
                   }
                   
                   var elec=[];
                   var c=0;
                   
                   for(var l=0;l<price.length;l++){
                       elec[l]='null';
                   }
                   for(l=price.length;l<=(price.length+electricity.length);l++){
                       elec[l]=parseFloat(electricity[c++]);
                   }
                   
                   var mycat =[];
                   for(var y=0;y<(name.length);y++){
                       mycat[y]=name[y];
                   }
                   for( j=0;j<country.length;j++){
                       mycat[y++]=country[j];
                   }
                   
                   //console.log('p : '+myprice+' elec : '+elec);
                   //console.log(mycat);
                   
                    
                    Highcharts.chart('container2', {
                        chart: {
                            type: 'area',
                            spacingBottom: 30
                        },
                        title: {
                            text: 'Fuel price in France and Access to electricity'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            verticalAlign: 'top',
                            x: 100,
                            y: 70,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                        },
                        xAxis: {
                            categories: mycat
                        },
                        yAxis: {
                            title: {
                                text: 'Y-Axis'
                            },
                            labels: {
                                formatter: function () {
                                    return this.value;
                                }
                            }
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    this.x + ': ' + this.y;
                            }
                        },
                        plotOptions: {
                            area: {
                                fillOpacity: 0.5
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'fuel price in France in 2019',
                            data: myprice
                        }, {
                            name: 'Access to electricity in %',
                            data: elec
                        }]
                    });
                });
                
            });
        
    }]);