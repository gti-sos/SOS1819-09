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
                        
                        
                        var myGermany = mydata.filter(function(item){
                            if (item.country=='Germany')
                                return(item);
                        });
                        
                        var extGermany = dataext.filter(function(item){
                            if(item.country=='Germany')
                                return(item);
                        });
                        console.log(myGermany[1].year+' '+myGermany[1].totalpopulation);
                        
                        var mger=[];
                        for (var i=0;i<myGermany.length;i++){
                            mger[i]={name : myGermany[i].year, value : myGermany[i].totalpopulation};
                        }
                        
                        var eger=[];
                        for (var i=0;i<extGermany.length;i++){
                            eger[i]={name : extGermany[i].year, value : extGermany[i].totalemigrant};
                        }
                        
                        var graphdef = {
                        	categories : ['Total Population','Total Emigration'],
                        	dataset : {
                        		'Total Population' : mger,
                        		
                        		'Total Emigration' : eger
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