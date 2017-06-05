


exports.listarEquipos = function(req, res) {

   var query = req.db.collection('equipo').find({});

	query.toArray(function(err, doc){
		var queryjson = (JSON.stringify(doc));
		var queryarray = JSON.parse(queryjson);
  		res.send(doc);
  	});
};




exports.registrarEquipo = function(req, res) {

	var doc = { 
		nombre 	: req.query.nombre,
		lema	: req.query.lema,
		tecnico	: req.query.tecnico
	}
	console.log(doc);

	req.db.collection('equipo').insert(doc, {w:1}, function(err, result) {
			if(err)
			{
				console.log('super error');
				res.send('Error');
			}
			else
			{
				console.log('super exito');
				res.send(result);
			}
		});

	
};