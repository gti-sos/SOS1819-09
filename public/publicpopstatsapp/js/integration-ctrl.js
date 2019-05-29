/* global angular*/

angular

    .module("ProjectApp")
    
    .controller("integration-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
        
        console.log("integration ctrl initialized");
        
        var APImy = "/api/v1/populationstats";
        var APIext="proxyEmigration";
        
        $http.get(APIext)
            .then(function(response){
                
                //récupération données extérieures
                var dataext = response.data;
                
                $http.get(APImy)
                    .then(function(response){
                        
                        //récupération de mes données
                        var mydata = response.data;
                        
                        var mydataYear = mydata.map(function(item){
                            return item.year;
                        });
                        
                        var dataextYear = dataext.map(function(item){
                            return item.year;
                        });
                        
                        var myGermany = mydata.filter(function(item){
                            if (item.country=='Germany')
                                return(item);
                        });
                        
                        var extGermany = dataext.filter(function(item){
                            if(item.country=='Germany')
                                return(item);
                        });
                        console.log(myGermany[1].year+' '+myGermany[1].totalpopulation);
                        
                        var graphdef = {
                        	categories : ['Total Population','Total Emigration'],
                        	dataset : {
                        		'Total Population' : [
                        			{ "name": myGermany[0].year, "value" : myGermany[0].totalpopulation },
                        			{ "name": myGermany[1].year, "value" : myGermany[1].totalpopulation }
                        		],
                        		
                        		'Total Emigration' : [
                        			{ name : extGermany[0].year, value : extGermany[0].totalemigrant }
                        		]
                        	}
                        };
               
                        var chart = uv.chart('Bar', graphdef,{
                                	meta : {
                                		caption : 'Germany',
                                		subcaption : 'Total population and emigration over the years'
	                               }});
                        
                    });
                
                
            });
            
    }]);