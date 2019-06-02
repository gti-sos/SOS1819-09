/* global angular */

angular
    .module('ProjectApp')
    .controller('airport-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('airport ctrl initialized');
                
                var API='/EBairport';
                
                $http.get(API)
                    .then(function(response){
                        var data = response.data;
                        
                        console.log(data);
                        
                        $scope.airportstats=data;
                    });
            }
    ]);