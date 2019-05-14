/* global angular */

angular
    .module("ProjectApp")
    .controller("ListCtrlEconomy", ["$scope","$http", function ($scope,$http){
     console.log("Modular MainCtrl Economy initialized!");   
     $scope.url="/api/v1/economy-stats";
     
     function refresh()
    {
        console.log("Requesting API");
        $http.get($scope.url).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            $scope.economies = response.data;
        }, 
        function (error){});
    }
    
    refresh();
    
    $scope.getTotal = function (){ initializepag(); refresh(); $scope.information = "Extraido todos los campos" };
    
    function initializepag() 
    { 
        $scope.pagina = 0;
        document.getElementById("divpagina").style.visibility = "hidden"; 
        document.getElementById("btnprvpg").style.visibility = "hidden"; 
        document.getElementById("btnsuccpg").style.visibility = "hidden"; 
    }

    initializepag();

    $scope.getPagination = function (pag){ 
        if (pag == 1) 
        {
            document.getElementById("divpagina").style.visibility = "visible";
            document.getElementById("btnprvpg").style.visibility = "hidden"; 
            document.getElementById("btnsuccpg").style.visibility = "visible";
        }
        else document.getElementById("btnprvpg").style.visibility = "visible";
        $scope.pagina = pag;
        var URL = $scope.url + "?offset=" + ($scope.pagina-1)*2 + "&limit=" + 2;
        $http.get(URL).then(function(response){
            $scope.economies = [];
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            document.getElementById("btnsuccpg").style.visibility = "visible";
            if (response.data.length>1)
                $scope.economies = response.data;
            else $scope.economies[0] = response.data;
        }, 
        function (error){});
        $http.get($scope.url + "?offset=" + ($scope.pagina)*2 + "&limit=" + 2).then(function(response){}, 
        function (error){
            document.getElementById("btnsuccpg").style.visibility = "hidden";
        });
        $scope.information = "Extraido los campos de Pagina " + $scope.pagina; 
    };
    
    
    $scope.initializeTodo = function (){
        
        var newEconomy = $scope.newFieldEconomy;
        
        console.log("Initializing the economy stats" + JSON.stringify(newEconomy, null, 2)); 
        initializepag();
        $http.get($scope.url + "/loadInitialData").then(function(response){
            console.log("ALL Created!");
            if (response.status == 200) $scope.information = "Todo inicializado";
            refresh();
        }, 
        function (error){
            if (error.status == 409) $scope.information = "Hay un conflicto";
        });
    };
    
    $scope.findFromYears = function (){
        initializepag();
        var newSearch = $scope.newSearchEconomy;
        console.log("finding recursos from " + newSearch.from + " to " + newSearch.to);
        
        var URL = $scope.url + "?from=" + newSearch.from + "&to=" + newSearch.to ;
        
        $http.get(URL).then(function(response){
            $scope.economies = [];
            console.log("Found countries from " + newSearch.from + " to " + newSearch.to);
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            if (response.data.length>1)
                $scope.economies = response.data;
            else $scope.economies[0] = response.data;
            if (response.status == 200) $scope.information = "Encontrado los campos con año desde " + newSearch.from + " hasta " + newSearch.to;
        }, 
        function (error){
            $scope.information = "No encontrado los campos con año desde " + newSearch.from + " hasta " + newSearch.to;
        });
        
    };
    
    $scope.findForCountry = function (){
        initializepag();
        var newSearch = $scope.newSearchEconomy;
        console.log("finding recursos for the Country " + newSearch.country);
        
        var URL = $scope.url + "/" + newSearch.country;
        
        $http.get(URL).then(function(response){
            $scope.economies = [];
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            if (response.data.length>1)
                $scope.economies = response.data;
            else $scope.economies[0] = response.data;
            
            if (response.status == 200) $scope.information = "Encontrado los campos de la Nación " + newSearch.country;
        }, 
        function (error){
            $scope.information = "No encontrado los campos de la Nación " + newSearch.country;
        });
        
    };
    
    $scope.deleteAllEconomy = function(){
        initializepag();
        $http.delete($scope.url).then(function(response){
            $scope.information = "Borrado Todo";
            console.log("Deleting All FIELDS"); 
            refresh();
        }, 
        function (error){
            $scope.information = "Error durante la cancelación";
        }); 
    };
    
    $scope.addNewFieldEconomy = function (){
        initializepag();
        var newEconomy = $scope.newFieldEconomy;
        console.log("adding a new field economy " + JSON.stringify(newEconomy, null, 2)); 
        
        $http.post($scope.url, newEconomy).then(function(response){
            if (response.status == 201) { console.log("Created!"); $scope.information = "Campo Creado"; }
            refresh();
        }, 
        function (error){
            if (error.status == 400) { console.log("Solicitud incorrecta!"); $scope.information = "Solicitud incorrecta"; }
            if (error.status == 409) { console.log("Ya está el campo"); $scope.information = "Ya está el campo"; }
        });
    };
    
    $scope.deleteFieldEconomy = function(country, year){
        initializepag();
        $http.delete($scope.url+"/"+country+"/"+year).then(function(response){
            console.log("Deleting field with name "+ country + "and year " + year); 
            if (response.status == 200) { console.log("Field erased"); $scope.information = "Campo aborrado"; }
            refresh();
        }, 
        function (error){
            if (error.status == 404) { console.log("Field not found"); $scope.information = "No encontrado el campo"; }
        }); 
    };
    
}]);