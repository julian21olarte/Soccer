var ObjectId = require('mongodb').ObjectId;


exports.listarEquipos = function (req, res) {

	var query = req.db.collection('equipo').find({});

	query.toArray(function (err, equipos) {
		console.log('equipos = ' + equipos);
		console.log('equipos[] = ' + equipos[0]);
		res.send(equipos);
	});
};


exports.listarJugadores = function (req, res) {

	var query = req.db.collection('jugador').find({});


	query.toArray(function (err, jugadores) {
		res.send(jugadores);
	});
};




exports.listarArbitros = function (req, res) {

	var query = req.db.collection('arbitro').find({});

	query.toArray(function (err, arbitros) {

		res.send(arbitros);
	});
};


exports.listarArbitrosEquipos = function (req, res) {
	console.log('entra1');
	req.db.collection('arbitro').find({}).toArray(function (err, arbitros) {
		console.log('entra2');
		req.db.collection('equipo').find({}).toArray(function (req, equipos) {

			console.log('SUPER = ' + arbitros);
			console.log('SUPER = ' + equipos);
			doc = [
				arbitros,
				equipos
			];

			res.send(doc);
		});
	});
};



exports.listarPartidos = function (req, res) {

	req.db.collection('partido').find({}).toArray(function (err, partidos) {
		res.send(partidos);
	});

};


exports.eliminarArbitro = function (req, res) {
	console.log('si entra');
	req.db.collection('arbitro').remove({ '_id': new ObjectId(req.query.id) }, function (err, result) {
		console.log('si borra = ' + req.query.documento);
		if (err) {
			console.log('ERROR');
			console.log(err);
			throw err;
		}
		else {
			console.log('NO ERROR');
			res.send(result);
		}
	});
};



exports.eliminarEquipo = function (req, res) {
	console.log('si entra');
	req.db.collection('equipo').remove({ '_id': new ObjectId(req.query.id) }, function (err, result1) {
		if (err) {
			throw err;
			console.log('ERROR');
			console.log(err);
		}
		else {
			req.db.collection('jugador').remove({ 'equipo._id': new ObjectId(req.query.id) }, function (err, result2) {
				if (err) {
					throw err;
				}
				else {
					res.send(result2);

				}
			});
		}
	});
};




exports.eliminarJugador = function (req, res) {

	req.db.collection('jugador').remove({ 'documento': JSON.parse(req.query.jugador).documento }, function (err, result) {
		if (err) {
			throw err;
		}
		else {
			res.send(result);
		}
	});
};











exports.registrarEquipo = function (req, res) {

	var doc = {
		nombre: req.query.nombre,
		tecnico: req.query.tecnico,
		lema: req.query.lema
	}

	console.log(doc);

	req.db.collection('equipo').insert(doc, { w: 1 }, function (err, result) {
		if (err) {
			console.log('super error');
			res.send('Error');
		}
		else {
			console.log('super exito');
			res.send(result);
		}
	});


};






exports.registrarJugador = function (req, res) {


	console.log('nombre del equipo = ' + req.query.equipo.nombre);
	console.log('nombre del equipo = ' + req.query.equipo);

	var doc = {

		nombre: req.query.nombre,
		documento: req.query.documento,
		edad: req.query.edad,
		equipo: JSON.parse(req.query.equipo),
		posicion: req.query.posicion
	};


	req.db.collection('jugador').insert(doc, { w: 1 }, function (err, result) {
		if (err) {
			console.log('super error');
			res.send('Error');
		}
		else {
			console.log('super exito');
			res.send(result);
		}
	});


};




exports.registrarArbitro = function (req, res) {

	var doc = {
		nombre: req.query.nombre,
		documento: req.query.documento,
		pais: req.query.pais,
		posicion: req.query.posicion
	}

	req.db.collection('arbitro').insert(doc, { w: 1 }, function (err, result) {
		if (err) {
			console.log('super error');
			res.send('Error');
		}
		else {
			console.log('super exito');
			res.send(result);
		}
	});

};




exports.registrarPartido = function (req, res) {

	console.log('ENTRA');

	req.db.collection('arbitro').find({
		$or: [
			{ 'nombre': req.query.arbitroPrincipal },
			{ 'nombre': req.query.arbitroAsistente1 },
			{ 'nombre': req.query.arbitroAsistente2 }
		]
	})
		.toArray(function (err, arbitros) {
			console.log('ENTRA ARBITROS');
			req.db.collection('equipo').find({
				$or: [
					{ 'nombre': req.query.local },
					{ 'nombre': req.query.visitante }
				]
			})
				.toArray(function (err, equipos) {

					console.log('ENTRA EQUIPOS');
					var doc = {

						local: { id: equipos[0]._id, nombre: equipos[0].nombre },
						visitante: { id: equipos[1]._id, nombre: equipos[1].nombre },
						fecha: req.query.fecha,
						estado: req.query.estado,
						resultado: req.query.resultado,
						Arbitros: arbitros
					}

					console.log('esta listo = ' + doc);
					req.db.collection('partido').insert(doc, { w: 1 }, function (err, result) {
						if (err) {
							console.log('super error');
							res.send('Error');
						}
						else {
							console.log('super exito');
							res.send(result);
						}
					});

				});

		});




};




exports.actualizarMarcador = function (req, res) {

	req.db.collection('partido').update({ '_id': new ObjectId(req.query.id) }, { $set: { 'resultado': req.query.resultado, 'estado': 'Finalizado' } }, function (err, result) {
		if (err) {
			throw err;
			console.log('ERROR');
			console.log(err);
		}
		else {
			console.log('NO ERROR');
			res.send(result);
		}
	});
};