/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("geo-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
            console.log("geo ctrl initialized");

        var API = '/EBstad';
        
        $http.get(API)
            .then(function(response){
                console.log("Ca marche");
               var data = response.data;
               var villes=data.map(function(item){
                   return item.city;
               });
               
               var garray = [];
               for (var i=1;i<10;i++){
                   garray[i]= [data[i].city, data[i].latitude, data[i].longitude];
               }
               
               google.charts.load('current', {'packages':['corechart']});
              google.charts.setOnLoadCallback(drawChart);
        
              function drawChart() {
                var data = google.visualization.arrayToDataTable([
                  ['Villes', 'latitude', 'longitude'],
                  garray
                  
                ]);
        
                var options = {
                  title: 'Company Performance',
                  hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
                  vAxis: {minValue: 0}
                };
        
                var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                chart.draw(data, options);
              }
               
                //console.log('les villes : '+villes);
                
            });
        
    }]);