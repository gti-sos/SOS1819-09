/* global angular */

angular
    .module('ProjectApp')
    .controller('g06-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('g06 ctrl initialized');
                
                var PROXY='/proxyRanking';
                
                $http.get(PROXY)
                    .then(function(response){
                        var data = response.data;
                        
                        console.log(data);
                        
                        $scope.rankingstats=data;
                    });
            }
    ]);