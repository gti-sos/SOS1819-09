/* global angular */
var app = angular.module("MiniPostmanEconomy");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http){
     console.log("Modular MainCtrl Economy initialized!");   
     $scope.url="/api/v1/economy-stats";
     
     function refresh()
    {
        console.log("Requesting API");
        $http.get($scope.url).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.economies = response.data;
        }, 
        function (error){
            $scope.status = error.status;
        });
    }
    
    $scope.getTotal = function (){ refresh(); $scope.information = "Extraido todos los campos" };
    
    $scope.initializeTodo = function (){
        var newEconomy = $scope.newFieldEconomy;
        console.log("Initializing the economy stats" + JSON.stringify(newEconomy, null, 2)); 
        
        $http.get($scope.url + "/loadInitialData").then(function(response){
            console.log("ALL Created!");
            $scope.status = response.status;
            if ($scope.status == 200) $scope.information = "Todo inicializado";
            refresh();
        }, 
        function (error){
            $scope.status = error.status;
            if ($scope.status == 409) $scope.information = "Hay un conflicto";
        });
    };
    
    $scope.findFromYears = function (){
        var newSearch = $scope.newSearchEconomy;
        console.log("finding recursos from " + newSearch.from + " to " + newSearch.to);
        
        var URL = $scope.url + "?from=" + newSearch.from + "&to=" + newSearch.to ;
        
        $http.get(URL).then(function(response){
            console.log("Found countries from " + newSearch.from + " to " + newSearch.to);
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.economies = response.data;
            $scope.status = response.status;
            if ($scope.status == 200) $scope.information = "Encontrado los campos con año desde " + newSearch.from + " hasta " + newSearch.to;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con año desde " + newSearch.from + " hasta " + newSearch.to;
            $scope.status = error.status;
        });
        
    };
    
    $scope.findForCountry = function (){
        var newSearch = $scope.newSearchEconomy;
        console.log("finding recursos for the Country " + newSearch.country);
        
        var URL = $scope.url + "/" + newSearch.country;
        
        $http.get(URL).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.economies = response.data;
            $scope.status = response.status;
            if ($scope.status == 200) $scope.information = "Encontrado los campos de la Nación " + newSearch.country;
        }, 
        function (error){
            $scope.information = "No encontrado los campos de la Nación " + newSearch.country;
            $scope.status = error.status;
        });
        
    };
    
    $scope.deleteAllEconomy = function(){
        $http.delete($scope.url).then(function(response){
            $scope.status = response.status;
            $scope.information = "Borrado Todo";
            console.log("Deleting All FIELDS"); 
            refresh();
        }, 
        function (error){
            $scope.status = error.status;
            $scope.information = "Error durante la cancelación";
        }); 
    };
    
    $scope.addNewFieldEconomy = function (){
        var newEconomy = $scope.newFieldEconomy;
        console.log("adding a new field economy " + JSON.stringify(newEconomy, null, 2)); 
        
        $http.post($scope.url, newEconomy).then(function(response){
            $scope.status = response.status;
            if ($scope.status == 201) { console.log("Created!"); $scope.information = "Campo Creado"; }
            refresh();
        }, 
        function (error){
            $scope.status = error.status;
            if ($scope.status == 400) { console.log("Solicitud incorrecta!"); $scope.information = "Solicitud incorrecta"; }
            if ($scope.status == 409) { console.log("Ya está el campo"); $scope.information = "Ya está el campo"; }
        });
    };
    
    $scope.deleteFieldEconomy = function(country, year){
        $http.delete($scope.url+"/"+country+"/"+year).then(function(response){
            console.log("Deleting field with name "+ country + "and year " + year); 
            $scope.status = response.status;
            if ($scope.status == 200) { console.log("Field erased"); $scope.information = "Campo aborrado"; }
            refresh();
        }, 
        function (error){
            $scope.status = error.status;
            if ($scope.status == 404) { console.log("Field not found"); $scope.information = "No encontrado el campo"; }
        }); 
    };

    $scope.modifyEconomy = function(){
        
        var newEconomy = $scope.newFieldEconomy;
        console.log("Trying to change the field with country " + newEconomy.country + " and year " + newEconomy.year + " in this way: " + JSON.stringify(newEconomy, null, 2)); 
        
        $http.put($scope.url+"/"+newEconomy.country+"/"+newEconomy.year, newEconomy).then(function(response){
            console.log("Field Changed!");
            $scope.status = response.status;
            if ($scope.status == 200) { console.log("Field erased"); $scope.information = "Campo modificado"; }
            refresh();
        }, 
        function (error){
            $scope.status = error.status;
            if ($scope.status == 404) { console.log("Field not found"); $scope.information = "Campo no encontrado con país " + newEconomy.country + " y año " + newEconomy.year; }
            if ($scope.status == 400) { console.log("Bad request"); $scope.information = "Solicitud incorrecta"; }
        });
        
    };
    
}]);