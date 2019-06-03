/* global angular google*/

angular
    .module("ProjectApp")
    .controller("GPG03-ctrl-Country", ["$scope","$http", function ($scope,$http){
                console.log("GPG03-ctrl-Country Controller initialized.");
        var APICountry = "/proxyCountry";
        var APIEconomy = "/api/v1/economy-stats/";
        var dataEconomy;
        var dataCountry;

        $http.get(APICountry).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            
            dataCountry = response.data;
            
            $http.get(APIEconomy).then(function(response){
                
                dataEconomy = response.data;
            
                google.charts.load('current', {
                'packages':['geochart'],
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);
                
                var arridCountry = [];
                var arrterext = [];
                var arrGoogle = [];
                var k = 0;
                
                for (var i = 0; i<dataCountry.length; i++)
                   if (dataCountry[i].year == 2013) 
                   { 
                       arridCountry[k] = dataCountry[i].country;
                       arrterext[k] = dataCountry[i].territorialExtension;
                       k++;
                   }
                k = 0;
                for (var i = 0; i<arridCountry.length; i++)
                {
                    for (var j = 0; i<dataEconomy.length; j++)
                    {
                        if ((arridCountry[i] == dataEconomy[j].country || arridCountry[i] == "United States" && dataEconomy[j].country == "USA" ) && dataEconomy[j].year == 2013)
                        {
                            arrGoogle[k] = [arridCountry[i], arrterext[i], dataEconomy[j].gdp_growth_stats];
                            k++;
                            break;
                        }
                    }
                }
                
        
                function drawRegionsMap() {
                
                var dataGoogle = [];
                dataGoogle[0] = ['Country', 'Extensión territorial', 'Crecimiento PIB'];
                var j = 1;
                for (var i = 0; i<arrGoogle.length; i++)
                   { dataGoogle[j] = arrGoogle[i]; j++ }
                 
                var data = google.visualization.arrayToDataTable(dataGoogle);
        
                var options = {};
        
                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
                chart.draw(data, options);
                
                }
            
            }); }, function (error){});
}]);