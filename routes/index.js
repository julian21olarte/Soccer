

/*exports.index = function(req, res)
{
    res.render('index');
};

exports.registrar = function(req, res)
{
	res.render('partials/registrar', {title: 'super registro'});
};

exports.name = function(req, res)
{
	var name=req.params.name;
	res.render('partials/'+name);
};
*/

/*var query=req.db.collection('jugador').find({'age' : 22}, {name:1, _id:0});

	query.toArray(function(err, doc){
		var queryjson = (JSON.stringify(doc));
		var queryarray = JSON.parse(queryjson);
*/
  		//res.render('index', { title: queryarray[0]['name'] });





exports.index = function(req, res) {
	console.log('llega index');
	res.render('index');
};




exports.partials = function(req, res) {
	var name = req.params.name;
	console.log('se llama = '+name);
	res.render('partials/'+name);
};