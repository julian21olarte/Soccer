'use strict';

var app = angular.module('app.controllers', ['ui.materialize']);


app.controller('registrarController', ["$scope", function ($scope) {
    $scope.select = {
        title: "Registrar",
        value: "Jugador",
        choices: ["Jugador", "Arbitro", "Equipo", "Partido"]
    };
}]);