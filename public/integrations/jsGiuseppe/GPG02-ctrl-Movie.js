/* global angular Highcharts*/

angular
    .module("ProjectApp")
    .controller("GPG02-ctrl-Movie", ["$scope","$http", function ($scope,$http){
                console.log("GPG02-ctrl-Movie Controller initialized.");
        var API = "/proxyMovie";

        $http.get(API).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            var DataMovie = response.data;
            
            

            var DataNomination = [];
            var DataMovieAward = [];
            var DataMovieEdition = [];
            var filmlist = "";
            
            var j = 0;
            
            for (var i = 0; i<DataMovie.length; i++)
            {
                if (DataMovie[i].country == "EEUU")
                {
                    DataNomination[j] = [ DataMovie[i].year, DataMovie[i].movienomination ];
                    DataMovieAward[j] = [ DataMovie[i].year, DataMovie[i].movieaward ];
                    DataMovieEdition[j] = [ DataMovie[i].year, DataMovie[i].movieedition] ;
                    if (filmlist == "") filmlist = DataMovie[i].name; else filmlist += DataMovie[i].name;
                    var found = false;
                    for (var k=i+1; k<DataMovie.length; k++)
                    {
                        if (DataMovie[k].country == "EEUU") found = true;
                    }
                    if (found == true) filmlist += ", "; else filmlist+=".";
                    j++;
                    
                    
                }
            }
            
            var arrayDataNom = []; 
            var arrayDataMA = [];
            var arrayDataME = [];
            j = 0;
            
            for (var i = 1939; i<=2011; i++, j++)
            {
                var found = false;
                for (var k = 0; k<DataNomination.length; k++)
                {
                    var vetta = DataNomination[k];
                    var vettb = DataMovieAward[k];
                    var vettc = DataMovieEdition[k];
                    var date = vetta[0];
                    if (date == i) 
                    { 
                        arrayDataNom[j] = vetta[1]; 
                        arrayDataMA[j] = vettb[1];
                        arrayDataME[j] = vettc[1];
                        found = true; 
                        break; 
                    }
                }
                if (!found)
                {
                    arrayDataNom[j] = null; 
                    arrayDataMA[j] = null;
                    arrayDataME[j] = null;
                }
            }
            
            Highcharts.chart('chart', {
            	chart: {
                  type: 'line'
                },
                title: {
                    text: 'Premios a las mejores películas de Estados Unidos, desde 1939 hasta 2011'
                },
            
                subtitle: {
                    text: 'Fuente de Information: Alejandro Martin Mancheño'
                },
            
                yAxis: {
                    title: {
                        text: 'Numero de premios'
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
                    name: 'Nominaciones',
                    data: arrayDataNom
                }, {
                    name: 'Movie Award',
                    data: arrayDataMA
                }, {
                    name: 'Movie Edition',
                    data: arrayDataME
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

        }, 
        function (error){});
}]);