/* global angular */

angular
    .module('ProjectApp')
    .controller('fact-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('fact ctrl initialized');
                
                var API='/EBfact';
                
                $http.get(API)
                    .then(function(response){
                        var data = response.data;
                        
                        console.log(data);
                        
                        $scope.factstats=data;
                    });
            }
    ]);