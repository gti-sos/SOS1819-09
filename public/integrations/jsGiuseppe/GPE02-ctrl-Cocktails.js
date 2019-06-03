/* global angular */

angular
    .module("ProjectApp")
    .controller("GPE02-ctrl-Cocktails", ["$scope","$http", function ($scope,$http){
                console.log("GPE02-ctrl-Cocktails Controller initialized.");
        var API = "/GPcocktail";

        $http.get(API).then(function(response){
            console.log("Data received " + JSON.stringify(response.data, null, 2));
            var arrinfo = response.data;
            $scope.info = "Preparation of " + arrinfo.drinks[0].strDrink + ": " + arrinfo.drinks[0].strInstructions + ".";
            $scope.listingredient = "LIST OF INGREDIENTS: \n";
            if (arrinfo.drinks[0].strIngredient1 == "")  $scope.listingredient = "ERR ingredients."
            else 
            {
                $scope.listingredient += arrinfo.drinks[0].strIngredient1
                if (arrinfo.drinks[0].strIngredient2 == "")  $scope.listingredient += ".";
                else 
                {
                    $scope.listingredient += ", ";
                    $scope.listingredient += arrinfo.drinks[0].strIngredient2;
                    if (arrinfo.drinks[0].strIngredient3 == "")  $scope.listingredient += ".";
                    else 
                    {
                        $scope.listingredient += ", ";
                        $scope.listingredient += arrinfo.drinks[0].strIngredient3;
                        if (arrinfo.drinks[0].strIngredient4 == "")  $scope.listingredient += ".";
                        else 
                        {
                            $scope.listingredient += ", ";
                            $scope.listingredient += arrinfo.drinks[0].strIngredient4;
                            if (arrinfo.drinks[0].strIngredient5 == "") $scope.listingredient += ".";
                            else 
                            {
                                $scope.listingredient += ", ";
                                $scope.listingredient += arrinfo.drinks[0].strIngredient5;
                                if (arrinfo.drinks[0].strIngredient6 == "")  $scope.listingredient += ".";
                                else
                                {
                                    $scope.listingredient += ", ";
                                    $scope.listingredient += arrinfo.drinks[0].strIngredient6;
                                    if (arrinfo.drinks[0].strIngredient7 == "") $scope.listingredient += "."; 
                                    else 
                                    {
                                        $scope.listingredient += ", ";
                                        $scope.listingredient += arrinfo.drinks[0].strIngredient7;
                                        if (arrinfo.drinks[0].strIngredient8 == "")  $scope.listingredient += ".";
                                        else
                                        {
                                            $scope.listingredient += ", ";
                                            $scope.listingredient += arrinfo.drinks[0].strIngredient8;
                                            if (arrinfo.drinks[0].strIngredient9 == "")  $scope.listingredient += ".";
                                            else
                                            {
                                                $scope.listingredient += ", ";
                                                $scope.listingredient += arrinfo.drinks[0].strIngredient9;
                                                if (arrinfo.drinks[0].strIngredient10 == "")  $scope.listingredient += ".";
                                                else
                                                {
                                                    $scope.listingredient += ", ";
                                                    $scope.listingredient += arrinfo.drinks[0].strIngredient10;
                                                    if (arrinfo.drinks[0].strIngredient11 == "")  $scope.listingredient += ".";
                                                    else
                                                    {
                                                        $scope.listingredient += ", ";
                                                        $scope.listingredient += arrinfo.drinks[0].strIngredient11;
                                                        if (arrinfo.drinks[0].strIngredient12 == "")  $scope.listingredient += ".";
                                                        else
                                                        {
                                                            $scope.listingredient += ", ";
                                                            $scope.listingredient += arrinfo.drinks[0].strIngredient12;
                                                            if (arrinfo.drinks[0].strIngredient13 == "")  $scope.listingredient += ".";
                                                            else
                                                            {
                                                                $scope.listingredient += ", ";
                                                                $scope.listingredient += arrinfo.drinks[0].strIngredient13;
                                                                if (arrinfo.drinks[0].strIngredient14 == "")  $scope.listingredient += ".";
                                                                else
                                                                {
                                                                    $scope.listingredient += ", ";
                                                                    $scope.listingredient += arrinfo.drinks[0].strIngredient14;
                                                                    if (arrinfo.drinks[0].strIngredient15 != "") $scope.listingredient += ".";
                                                                    else $scope.listingredient += arrinfo.drinks[0].strIngredient15 + ".";
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, 
        function (error){});
}]);