'use strict';

var app = angular.module('app.controllers', ['ui.materialize', 'ngAnimate']);



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
              console.log('esto es data[] = '+response.data[0]);
              $scope.teams = response.data;
              var team = response.data[0];
              $scope.teamSelected = response.data[0];
              $scope.teamSelectedName = $scope.teamSelected.nombre;

              $scope.positionSelected='Delantero';
              $scope.positions = ['Delantero', 'Defensa', 'Centrocampista', 'Portero'];
           }else{
              alert('Error al intentar recuperar los equipos.');
           }
        }), 
        
        function() {
           alert('Error al intentar recuperar los equipos.');
        };
     })();


     var listarJugadores = (function(){

        $http({
           method: 'GET', 
           url: '/listarJugadores'
        })
        .then(function(response) {
           if(typeof(response) == 'object'){
              console.log('esto es data = '+response.data);
              $scope.players=response.data;
           }else{
              alert('Error al intentar recuperar los equipos.');
           }
        }), 
        
        function() {
           alert('Error al intentar recuperar los equipos.');
        };
     })();


     $scope.registrarJugador = function(){
      console.log('teamselecte'+$scope.teamSelected.nombre);

        $http({
            method: 'POST', 
            url: '/registrarJugador',
            params: {
              nombre: $scope.nombre,
              documento : $scope.documento,
              edad : $scope.edad,
              equipo : $scope.teamSelected,
              posicion: $scope.positionSelected
            }
        })
        .then(function(response) {
          if(typeof(response) == 'object')
          {
            console.log('jugador ='+response);
              //alert('Jugador '+response.config.params.nombre+' agregado correctamente.');
              $scope.nombre = '';
              $scope.documento = '';
              $scope.edad = '';
              $scope.positionSelected = 'Delantero';
              console.log('response = '+response.config.params);
              $scope.players.push(response.config.params);
          }
          else
          {
               alert('Error al intentar registrar el equipo.');
          }
        }),

        function() {
             alert('Error al intentar registrar el equipo.');
        };
      }


      $scope.remove = function(player) {

        var index = $scope.players.indexOf(player);
        $scope.players.splice(index, 1);
        console.log('player = '+index);


      $http({
        method: 'POST', 
        url: '/eliminarJugador',
        params: {
          jugador : player
        }
    })
      .then(function(response) {
        if(typeof(response) == 'object')
        {
          console.log(response);
            //alert('Arbitro '+response.config.params.nombre+' agregado correctamente.');
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












  .controller('registrarEquipoController', ["$scope",'$http', function ($scope, $http) 
  {

    $scope.title = "Registrar Equipo";
    $scope.subtitle = "Registre nuevos equipos en el sistema";


     var listarEquipos = (function(){
      $http({
         method: 'GET', 
         url: '/listarEquipos'
      })
      .then(function(response) {
         if(typeof(response) == 'object'){
            console.log('esto es data = '+response.data);
            $scope.teams = response.data;

         }else{
            alert('Error al intentar recuperar los equipos.');
         }
      }),   
      function() {
         alert('Error al intentar recuperar los equipos.');
      };
     })();

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
              //alert('Equipo '+response.config.params.nombre+' agregado correctamente.');
              $scope.nombre = '';
              $scope.tecnico = '';
              $scope.lema = '';

              $scope.teams.push(response.config.params);
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


    $scope.remove = function(team) {

        var index = $scope.teams.indexOf(team);
        $scope.teams.splice(index, 1);
        console.log('team = '+index);


      $http({
        method: 'POST', 
        url: '/eliminarEquipo',
        params: {
          id : team._id
        }
    })
      .then(function(response) {
        if(typeof(response) == 'object')
        {
          console.log(response);
            //alert('Arbitro '+response.config.params.nombre+' agregado correctamente.');
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




  .controller('registrarArbitroController', ["$scope",'$http', function ($scope, $http) 
  {

     $scope.title = "Registrar Arbitro";
     $scope.subtitle = "Registre un nuevo Arbitro dentro de la aplicacion.";
     $scope.posSelected = "Principal";
     $scope.positions = [ "Principal", "Asistente"];


     var listarArbitros = (function(){
      $http({
         method: 'GET', 
         url: '/listarArbitros'
      })
      .then(function(response) {
         if(typeof(response) == 'object'){
            console.log('ARBITROS = '+response.data);
            $scope.arbitros = response.data;
         }else{
            alert('Error al intentar recuperar los equipos.');
         }
      }),   
      function() {
         alert('Error al intentar recuperar los equipos.');
      };
     })();

     $scope.remove = function(arbitro) {

        var index = $scope.arbitros.indexOf(arbitro);
        $scope.arbitros.splice(index, 1);
        console.log('arbitro = '+arbitro._id);


      $http({
        method: 'POST', 
        url: '/eliminarArbitro',
        params: {
          id : arbitro._id
        }
    })
      .then(function(response) {
        if(typeof(response) == 'object')
        {
          console.log(response);
            //alert('Arbitro '+response.config.params.nombre+' agregado correctamente.');
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




    $scope.registrarArbitro = function(){

      $http({
          method: 'POST', 
          url: '/registrarArbitro',
          params: {
            nombre: $scope.nombre,
            documento : $scope.documento,
            pais : $scope.pais,
            posicion: $scope.posSelected
          }
      })
      .then(function(response) {
        if(typeof(response) == 'object')
        {
          console.log(response);
            //alert('Arbitro '+response.config.params.nombre+' agregado correctamente.');
            $scope.nombre = '';
            $scope.documento = '';
            $scope.pais = '';
            $scope.posSelected = 'Principal';
            $scope.arbitros.push(response.config.params);
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


  .controller('registrarPartidoController', ["$scope",'$http', function ($scope, $http) 
  {

     $scope.title = "Registrar Partido";
     $scope.subtitle = "Registre nuevos partidos a jugar proximamente.";
     $scope.posSelected = "Principal";
     $scope.positions = [ "Principal", "Asistente"];


     var listarEquipos = (function(){
      $http({
         method: 'GET', 
         url: '/listarEquipos'
      })
      .then(function(response) {
         if(typeof(response) == 'object'){
            console.log('esto es data = '+response.data);

            $scope.teams = response.data;
            $scope.localSelected = $scope.teams[0].nombre;
            $scope.visiterSelected = $scope.teams[1].nombre;

         }else{
            alert('Error al intentar recuperar los equipos.');
         }
      }),   
      function() {
         alert('Error al intentar recuperar los equipos.');
      };
     })();


     var listarArbitros = (function(){
      $http({
         method: 'GET', 
         url: '/listarArbitros'
      })
      .then(function(response) {
         if(typeof(response) == 'object'){
            console.log('ARBITROS = '+response.data);
            $scope.arbitros = response.data;
            $scope.principalSelected = $scope.arbitros[0].nombre;
            $scope.asistente1Selected = $scope.arbitros[1].nombre;
            $scope.asistente2Selected = $scope.arbitros[2].nombre;
         }else{
            alert('Error al intentar recuperar los equipos.');
         }
      }),   
      function() {
         alert('Error al intentar recuperar los equipos.');
      };
     })();



     var date = new Date().toISOString();
     $scope.date = date;

      $scope.estados = [
        "Pendiente",
        "Finalizado"
      ];

      $scope.estadoSelected = "Pendiente";
      $scope.localGoals = {value : ''};
      $scope.visiterGoals = {value : ''};

      $scope.registrarPartido = function(){

      console.log('PRIMERA FECHA = '+$scope.date);

      $http({
          method: 'POST', 
          url: '/registrarPartido',
          params: {
            local             : $scope.localSelected,
            visitante         : $scope.visiterSelected,
            arbitroPrincipal  : $scope.principalSelected,
            arbitroAsistente1  : $scope.asistente1Selected,
            arbitroAsistente2  : $scope.asistente2Selected,

            fecha: new Date($scope.date).toISOString(),
            estado: $scope.estadoSelected, 
            resultado : ($scope.localGoals.value+" - "+$scope.visiterGoals.value)

          }
      })
      .then(function(response) {
        if(typeof(response) == 'object')
        {
          console.log(response);
            //alert('Partido entre '+response.config.params.local+' y '+response.config.params.visitante+' agregado correctamente.');

            $scope.principalSelected = $scope.arbitros[0].nombre;
            $scope.asistente1Selected = $scope.arbitros[1].nombre;
            $scope.asistente2Selected = $scope.arbitros[2].nombre;
            $scope.localSelected=$scope.teams[0];
            $scope.visiterSelected=$scope.teams[1];

            $scope.fecha = new Date().toISOString();
            $scope.estadoSelected = 'Pendiente';
            $scope.localGoals = {value : ''};
            $scope.visiterGoals = {value : ''};

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








  .controller('calendarioController', ["$scope", "$http", function ($scope, $http) 
  {

      $scope.fecha = new Date();

      $scope.title = "Calendario de partidos";
      $scope.subtitle = "Visualize el calendario de partidos jugados y los proximos a jugarse"


      var listarPartidos = (function(){
      $http({
         method: 'GET', 
         url: '/listarPartidos'
      })
      .then(function(response) {
         if(typeof(response) == 'object'){
            console.log('esto es data = '+response.data);
            $scope.games = response.data;

         }else{
            alert('Error al intentar recuperar los equipos.');
         }
      }),   
      function() {
         alert('Error al intentar recuperar los equipos.');
      };
     })();


     $scope.storageGame = function(game) {
        $scope.game = game;
        $scope.index=$scope.games.indexOf($scope.game);

     };

         $scope.localGoals = {value : ''};
          $scope.visiterGoals = {value : ''};
     $scope.edit = function() {


      $http({
        method: 'POST', 
        url: '/actualizarMarcador',
        params: {
          id: $scope.game._id,
          resultado : ($scope.localGoals.value+" - "+$scope.visiterGoals.value)
        }
    })
      .then(function(response) {
        if(typeof(response) == 'object')
        {
          console.log(response);
            //alert('Arbitro '+response.config.params.nombre+' agregado correctamente.');
            $scope.game.resultado=($scope.localGoals.value+" - "+$scope.visiterGoals.value);
            $scope.game.estado = 'Finalizado';
            $scope.localGoals = {value : ''};
            $scope.visiterGoals = {value : ''};
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


     $scope.getFecha=function(date) {
        var fecha = new Date(date);

        return fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
     }
  }]);