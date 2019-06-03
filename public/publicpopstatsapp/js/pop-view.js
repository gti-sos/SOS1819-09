/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("pop-view",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
        
        console.log("pop view ctrl initialized");
        
        var API = "/api/v1/populationstats";
        var myData;
        
        // getting data
        $http.get(API)
            .then(function(response){
                
                myData=response.data;
                
                var myCategories = myData.map(function(item){
                    var itemCountry = item.country;
                    var itemYear = item.year;
                    return (itemCountry+" "+itemYear);
                });
                
                var dataCountryGeoChart = myData.filter(function(item){
                    if(item.year==1990){
                        return (item.country);
                    }
                });
                
                var dataTotalPop = myData.map(function(item){
                    return(parseInt(item.totalpopulation));
                });
                
                var dataUrbanPop = myData.map(function(item){
                    return(parseInt(item.urbanpopulation));
                });
                
                var dataAccessElec = myData.map(function(item){
                    return(Math.floor(parseFloat(item.accesstoelectricity)/100*parseInt(item.totalpopulation)));
                });
                
                //for debugging--------------------------------------------------------------------------------------------
                console.log(dataTotalPop);
                console.log(dataCountryGeoChart);
                console.log(myData[1].country);
                
                // From Highcharts -----------------------------------------------------------------------------------------
                Highcharts.chart('container', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'Total, Urban population and Access to electricity for different Country in 1990 and 2010'
                    },
                    subtitle: {
                        text: ' '
                    },
                    xAxis: {
                        categories: myCategories,
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function () {
                                return this.value / 1000;
                            }
                        }
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ''
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666'
                            }
                        }
                    },
                    series: [{
                        name: 'Total Population',
                        data: dataTotalPop
                    }, {
                        name: 'Urban Population',
                        data: dataUrbanPop
                    }, {
                        name: 'Access to Electricity',
                        data: dataAccessElec
                    }]
                });
                
                
                //GeoChart----------------------------------------------------------------------------------
               console.log("test : "+myData.length);
               
                var geoArray=[];
                
                geoArray[0]=['Country', 'AccessToElectricity'];
                geoArray[1]=['',0];
                var i=2;
                    for (j=1;j<myData.length;j++){
                        if(myData[j].year==2010){
                            console.log(myData[j].country)
                            geoArray[i++]= [myData[j].country, myData[j].accesstoelectricity];
                        }
                    }
                    
                
                google.charts.load('current', {
                    'packages':['geochart'],
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                
                google.charts.setOnLoadCallback(drawRegionsMap);
                
                console.log("geochart : "+geoArray);
    
                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(geoArray);
    
                    var options = {};
        
                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
                    chart.draw(data, options);
                }  
                
                //uvChart----------------------------------------------------------------------------------------------
                
                var myName1990 = myData.filter(function(item){
                  if(item.year==1990){
                       return(item.country);
                  }
               });
               
               var myName2010 = myData.filter(function(item){
                  if(item.year==2010){
                       return(item.country);
                  }
               });
               
               var myValue1990 = myData.filter(function(item){
                  if(item.year==1990){
                       return(parseInt(item.urbanpopulation));
                  }
               });
               
               var myValue2010 = myData.filter(function(item){
                  if(item.year==2010){
                       return(parseInt(item.urbanpopulation));
                  }
               });
                
                console.log(myName1990.length);
                console.log(myValue2010);
                

                var jsonArr = [];
                
                for (var i=0;i<myName1990.length;i++){
                    
                    jsonArr[i] = {name: myName1990[i].country, value: parseInt(myValue1990[i].totalpopulation)};
                }

                

                var json2010 = [];
                
                for (var i=0;i<myName2010.length;i++){

                    json2010[i] = {name: myName2010[i].country, value: parseInt(myValue2010[i].totalpopulation)}
                }

            
                
                var graphdef = {
                	categories : ['1990', '2010'],
                	dataset : {
                		'1990' : jsonArr,
                		'2010' : json2010
                		
                	}
                }

                var chart = uv.chart('Bar', graphdef,{
                                                    	meta : {
                                                    		caption : 'Total population',
                                                    		subcaption : 'in 1990 and 2010',
                                                    		hlabel : 'Total population',
                                                    		vlabel : 'Countries',
	
                }});
                
                
            });
            
        
        
    }]);