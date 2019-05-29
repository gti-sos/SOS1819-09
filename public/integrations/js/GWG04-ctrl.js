/* global angular zingchart*/

angular
    .module("ProjectApp")
    .controller("GWG04-ctrl", ["$scope","$http", function ($scope,$http){
                console.log("GWG04 Controller initialized.");
            var API = "/proxyG04Beer";
            var myAPI = "/api/v2/climate-stats";
            var data;
            var myData;
            
        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                data = response.data;
                
                $http({
                    url : myAPI,
                    method : "GET",
                })
                    .then(function (response){
                        myData = response.data;
                        
                        var cdata = myData.map(function(item){
                            return item.co2_stats;
                        });
                       
                        var categoriesMyData = myData.map(function(item){
                            return (item.country + " " + item.year);
                        });
                        
                        var ndata = data.map(function(item){
                            return item.rating;
                        });
                        
                        var categData = data.map(function(item){
                            return (item.country + " " + item.season);
                        });
                        
                        var bufferCat = categoriesMyData.concat(categData);
                        
                        var myChart = {
                          "type": "bar",
                          "title": {
                            "text": "Emisión de CO2 y número de jugadores fichados"
                          },
                          "plot": {
                            "value-box": {
                              "text": "%v"
                            },
                            "tooltip": {
                              "text": "%v"
                            }
                          },
                          "legend": {
                            "toggle-action": "hide",
                            "header": {
                              "text": "Legend Header"
                            },
                            "item": {
                              "cursor": "pointer"
                            },
                            "draggable": true,
                            "drag-handler": "icon"
                          },
                          "scale-x": {
                            "values": bufferCat
                          },
                          "series": [
                            {
                              "values": cdata,
                              "text": "CO2 en kt"
                            },
                            {
                              "values": ndata,
                              "text": "Beer rating"
                            }
                          ]
                        };
                        zingchart.render({
                          id: "myChart",
                          data: myChart,
                          height: "480",
                          width: "100%"
                        });
                        
                        
                        
                        
                    });
            });
}]);