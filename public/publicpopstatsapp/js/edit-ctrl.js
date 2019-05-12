/* global angular*/

angular

    .module("PopApp")
    
    .controller("edit-ctrl",
                    ["$scope", 
                    "$http", 
                    "$routeParams", 
                    "$location",
    function($scope,$http,$routeParams,$location){
        
        console.log("edit ctrl initialized");
        
        var API = "/api/v1/populationstats";
        
        /*function refresh(){
            $http.get(API).then(function(response){
            
                $scope.popstats = response.data;
            });
        }*/
        
        var country = $routeParams.country;
        var year = $routeParams.year;
        
        $http.get(API+"/"+country+"/"+year)
            .then(function(response){
                $scope.updateStat=response.data;
            });
        
      // $scope.updateStat={country : "Aruba", year : 1990, totalpopulation : "3", urbanpopulation : "2", accesstoelectricity : "100"};
        
        /*
        refresh();
        
        $scope.add = function(){
            var newPopStat= $scope.newPopStat;
            if (isNaN($scope.newPopStat.year)){
                $scope.message = $scope.newPopStat.year + " no es un año, por favor añade un recurso con campos correctos"
            } else {
                $scope.newPopStat.year = parseInt(newPopStat.year);
                
                console.log("adding stats "+JSON.stringify(newPopStat,null,2));
                
                $http.post(API, newPopStat)
                     .then(function(response){
                    
                    console.log("post response "+ response.statusText);
                    
                    $scope.message = response.statusText;
                    
                    $scope.newPopStat="";
                    
                    refresh();
                })
                    .catch(function(data){
                        console.log(data.status);
                        $scope.message = data.statusText+" : Añade un recurso con campos correctos";
                    });
            }
        };
        
        $scope.delete = function(stat){
            console.log("deleting stats <"+ stat.country +">");
            $http.delete(API+"/"+stat.country+"/"+stat.year)
                 .then(function(response){
                     console.log("delete response"+ response.statusText);
                     $scope.message = response.statusText;
                     refresh();
                     
                 });
        };
        
        $scope.deleteall = function (){
            $http.delete(API)
                 .then(function(response){
                    console.log("delete all response"+ response.statusText);
                    $scope.message = response.statusText;
                    refresh();
                 });
        };
        
        $scope.ver = function () {
            var year1=$scope.year1;
            var year2=$scope.year2;
            console.log("ver de <"+ year1 +"> a <" + year2+">");
            console.log("<"+API+"?from="+year1+"&to="+year2+">");
            $http.get(API+"?from="+year1+"&to="+year2)
                 .then(function(response){
                     
                     $scope.popstats = response.data;
                     $scope.message = response.statusText;
                     //refresh();
                 });
        };
        
        $scope.vercountry = function () {
            var country = $scope.inputcountry;
            console.log("ver recurso : <"+ country + ">");
            $http.get(API+"/"+country)
                 .then(function(response){
                     $scope.popstats = response.data;
                     //refresh();
                 })
                 .catch(function(data){
                        console.log(data.status);
                        refresh();
                        $scope.message = data.statusText+" : El recurso "+country+" no existe";
                    });
        };
        
        $scope.update = function (stat){
            console.log("updating stats <"+ stat.country +">");
            $scope.updateStat = stat;
        };
        */
        
        $scope.guardarUpdate = function (updateStat) {
            updateStat = $scope.updateStat;
            console.log("PUT : "+API+"/"+updateStat.country+"/"+updateStat.year);
            $http.put(API+"/"+updateStat.country+"/"+updateStat.year,updateStat)
                 .then( function(response){
                     console.log("Put response : "+response.status);
                     $scope.updateStat = "";
                     //refresh();
                    $scope.message = response.statusText;
                    
                });
                
            $location.path("/");
        }; 
        
    }]);