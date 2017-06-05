'use strict';

var app = angular.module('app.controllers', ['ui.materialize']);



app
  .controller('mainController', ['$scope', function($scope)
  {
    $scope.title = "Campeonato de futbol";

  }])











  .controller('registrarJugadorController', ["$scope",'$http', function ($scope, $http) 
  {

    $scope.title = "Registrar Jugador";
    $scope.subtitle = "Registre jugadores en la plantilla de un equipo";


    var listarEquipos = (function(){

        $http({
           method: 'GET', 
           url: '/listarEquipos'
        })
        .then(function(response) {
           if(typeof(response) == 'object'){
              console.log('esto es data = '+response.data);
              $scope.teams = response.data;
              $scope.teamSelected = $scope.teams[0].nombre;
           }else{
              alert('Error al intentar recuperar los equipos.');
           }
        }), 
        
        function() {
           alert('Error al intentar recuperar los equipos.');
        };
     })();

  }])












  .controller('registrarEquipoController', ["$scope",'$http', function ($scope, $http) 
  {

    $scope.title = "Registrar Equipo";
    $scope.subtitle = "Registre nuevos equipos en el sistema";


    $scope.registrarEquipo = function(){

        $http({
            method: 'POST', 
            url: '/registrarEquipo',
            params: {
              nombre: $scope.nombre,
              tecnico : $scope.tecnico,
              lema : $scope.lema
            }
        })
        .then(function(response) {
          if(typeof(response) == 'object')
          {
            console.log(response);
              alert('Equipo '+response.config.params.nombre+' agregado correctamente.');
              $scope.nombre = '';
              $scope.tecnico = '';
              $scope.lema = '';
          }
          else
          {
               alert('Error al intentar registrar el equipo.');
          }
        }),

        function() {
             alert('Error al intentar registrar el equipo.');
        };

    };

  }])









  .controller('calendarioController', ["$scope", function ($scope) 
  {

      var fecha = new Date();

      $scope.title = "Calendario de partidos";
      $scope.subtitle = "Visualize el calendario de partidos jugados y los proximos a jugarse"
      $scope.games = 
      [
          {
            local: "Real Madrid", 
            visitante: "Barcelona", 
            fecha: (fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear()), 
            estado: "Pendiente",
            resultado: "2 - 1"
          },

          {
            local: "Juventus", 
            visitante: "Barcelona", 
            fecha: (fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear()), 
            estado: "Pendiente",
            resultado: "1 - 1"
          }
      ];


  }]);