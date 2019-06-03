/* global angular */

angular
    .module('ProjectApp')
    .controller('deezer-ctrl',['$http',
                                '$scope',
                                '$routeParams', 
                                "$location",
            function($http,$scope,$routeParams,$location){
                
                console.log('deezer ctrl initialized');
                
                var API='/EBdeezer';
                
                $http.get(API)
                    .then(function(response){
                      var data = response.data; 
                      console.log(data);
                      
                      $scope.eminem = data.data;
                      
                    
                        
                    });
                    
                    
            }
            
        ]);