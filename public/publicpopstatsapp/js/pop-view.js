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
        
        // getting data
        $http.get(API)
            .then(function(response){
                
                $scope.data=response.data;
                
                var myData = $scope.data;
                
                var myCategories = myData.map(function(item){
                    itemCountry = item.country;
                    itemYear = item.year;
                    return (itemCountry+" "+itemYear);
                });
                
                var dataCountryGeoChart = myData.map(function(item){
                    if(item.year==1990){
                        itemCountry = item.country;
                    }
                    return (itemCountry);
                });
                
                var dataTotalPop = myData.map(function(item){
                    itemTotalPop = parseInt(item.totalpopulation);
                    return(itemTotalPop);
                });
                
                var dataUrbanPop = myData.map(function(item){
                    itemUrbanPop = parseInt(item.urbanpopulation);
                    return(itemUrbanPop);
                });
                
                var dataAccessElec = myData.map(function(item){
                    itemAccessElec = Math.floor(parseFloat(item.accesstoelectricity)/100*parseInt(item.totalpopulation));
                    return(itemAccessElec);
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
            });
            
            //GeoChart----------------------------------------------------------------------------------
            
            google.charts.load('current', {
                'packages':['geochart'],
        
            });
            
            google.charts.setOnLoadCallback(drawRegionsMap);
            
            geoArray=[];
            geoArray[0]=['Country', 'Total Population'];
            for (j=1;j<4;j++){
               geoArray[j]= [myData[j+2].country,myData[j+2].totalpopulation]
            }
            
            console.log(geoArray);

            function drawRegionsMap() {
                 var data = google.visualization.arrayToDataTable(
                      geoArray
            );

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
        
        
    }]);