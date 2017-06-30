var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('express-mongo-db');


var routes = require('./routes');
var crud = require('./routes/crud');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(mongodb('mongodb://localhost/soccer'));
app.use(mongodb('mongodb://julian21olarte:julian21olarte@ds143132.mlab.com:43132/soccer'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Home page */
app.get('/', routes.index);

/* Render partials views */
app.get('/listarEquipos', crud.listarEquipos );
app.get('/listarJugadores', crud.listarJugadores );
app.get('/listarArbitros', crud.listarArbitros );
app.get('/listarArbitrosEquipos', crud.listarArbitrosEquipos);
app.get('/listarPartidos', crud.listarPartidos);


app.post('/registrarEquipo', crud.registrarEquipo);
app.post('/registrarJugador', crud.registrarJugador);
app.post('/registrarArbitro', crud.registrarArbitro);
app.post('/registrarPartido', crud.registrarPartido);

app.post('/eliminarArbitro', crud.eliminarArbitro);
app.post('/eliminarEquipo', crud.eliminarEquipo);
app.post('/eliminarJugador', crud.eliminarJugador);
app.post('/actualizarMarcador', crud.actualizarMarcador);

app.get('/:name', routes.partials);




/* CRUD */






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
