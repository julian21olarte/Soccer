'use strict';

var app = angular.module("app", ["app.controllers", "ngRoute"]);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("se prendio esta mierda");
    $routeProvider
    .when('/', {
      templateUrl: '/main'
    })
    .when('/registrar', {
      templateUrl: '/registrar',
      controller: 'registrarController'
    }).
      otherwise({
        redirectTo: '/'
    });
}]);
