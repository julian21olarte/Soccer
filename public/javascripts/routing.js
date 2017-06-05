'use strict';

var app = angular.module("app", ["app.controllers", "ngRoute"]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("se prendio esta mierda");
    $routeProvider

      .when('/', {
        templateUrl: '/main',
        controller: 'mainController'
      })

      .when('/registrarJugador', {
        templateUrl: '/registrarJugador',
        controller: 'registrarJugadorController'
      })

      .when('/registrarEquipo', {
        templateUrl: '/registrarEquipo',
        controller: 'registrarEquipoController'
      })

       .when('/calendario', {
        templateUrl: '/calendario',
        controller: 'calendarioController'
      })

        .otherwise({
          redirectTo: '/'
      });
}]);
