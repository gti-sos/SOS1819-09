/*global angular*/


angular.module("PopApp",["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    controller : "list-ctrl",
                    templateUrl : "list.html"
                })
                .when("/edit/:country/:year",{
                    controller :"edit-ctrl",
                    templateUrl : "edit.html"
                });
        });


console.log("Modular PopApp initialized");