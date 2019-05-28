/* global angular */

    angular
        .module("ProjectApp")
        .controller("ClimateViewZCCtrl",
                        ["$scope",
                        "$http", 
                        "$routeParams",
                        "$location",
        function ($scope,$http,$routeParams,$location){
            console.log("View ZingChart Controller initialized.");
            var API = "/api/v2/climate-stats";
            var data;

            
        $http({
            url : API,
            method : "GET",
        })
            .then(function (response){
                //console.log("Data Received: "
                //            + JSON.stringify(response.data,null,2));
                data = response.data;
                
                var myConfig = {
  type: "bar",
  series: [
    {
      values:[20,40,25,50,15,45,33,34]
    },
    {
      values:[5,30,21,18,59,50,28,33]
    },
    {
      values:[30,5,18,21,33,41,29,15]
    }
  ]
};
 
zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height: "100%", 
	width: "100%" 
});
                        
            });
        }]);    