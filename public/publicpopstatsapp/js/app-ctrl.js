/* global angular*/

angular

    .module("PopApp")
    
    .controller("app-ctrl",["$scope", "$http", function($scope,$http){
        
        console.log("ctrl initialized");
        
        var API = "/api/v1/populationstats";
        
        function refresh(){
            $http.get(API).then(function(response){
            
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
            var offset=$scope.offset;
            var limit=$scope.limit;
            console.log("ver de "+ offset +" a " + limit);
            console.log("<"+API+"?limit="+limit+"?offset="+offset+">");
            $http.get(API+"?limit="+limit+"?offset="+offset)
                 .then(function(response){
                     refresh();
                     $scope.popstats = response.data;
                     $scope.message = response.statusText;
                     //refresh();
                 });
        };
        
    }]);