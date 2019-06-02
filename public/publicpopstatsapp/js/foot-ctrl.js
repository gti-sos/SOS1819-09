/* global angular */

angular
    .module('ProjectApp')
    .controller('foot-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('foot ctrl initialized');
                
                var API='/EBfoot';
                
                $http.get(API)
                    .then(function(response){
                        var data = response.data;
                        
                        console.log(data);
                        
                        $scope.footstats=data;
                    });
            }
    ]);