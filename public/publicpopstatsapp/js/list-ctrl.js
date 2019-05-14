/* global angular*/

angular

    .module("PopApp")
    
    .controller("list-ctrl",["$scope", "$http", function($scope,$http){
        
        console.log("list ctrl initialized");
        
        var API = "/api/v1/populationstats";
        
        function refresh(){
            
            $scope.pagina=1;
            $http.get(API+ "?offset=" + 0 + "&limit=" + 10).then(function(response){
            
                $scope.popstats = response.data;
            });
        }
        
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
        
        
        $scope.guardarUpdate = function (updateStat) {
            updateStat = $scope.updateStat;
            console.log("PUT : "+API+"/"+updateStat.country+"/"+updateStat.year);
            $http.put(API+"/"+updateStat.country+"/"+updateStat.year,updateStat)
                 .then( function(response){
                     console.log("Put response : "+response.status);
                     $scope.updateStat = "";
                     refresh();
                    $scope.message = response.statusText;
                    
                });
        };
        
        $scope.pagination = function(pag){
            if (pag != 1){
                $scope.pagina=pag;
                $http.get(API+ "?offset=" + ($scope.pagina-1)*10 + "&limit=" + (($scope.pagina-1)*10 + 10)).then(function(response){
            
                $scope.popstats = response.data;
            });
            } else {
                $scope.pagina=pag;
                $http.get(API+ "?offset=" + 0 + "&limit=" + 10).then(function(response){
            
                $scope.popstats = response.data;
            });
            }
        };
        
    }]);