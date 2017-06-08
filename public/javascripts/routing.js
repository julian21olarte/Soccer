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

        .when('/registrarArbitro', {
        templateUrl: '/registrarArbitro',
        controller: 'registrarArbitroController'
      })

        .when('/registrarPartido', {
        templateUrl: '/registrarPartido',
        controller: 'registrarPartidoController'
      })

       .when('/calendario', {
        templateUrl: '/calendario',
        controller: 'calendarioController'
      })

        .otherwise({
          redirectTo: '/'
      });
}]);
