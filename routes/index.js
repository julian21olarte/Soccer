var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	/*var query=req.db.collection('jugador').find({'age' : 22}, {name:1, _id:0});

	query.toArray(function(err, doc){
		var queryjson = (JSON.stringify(doc));
		var queryarray = JSON.parse(queryjson);
*/
  		//res.render('index', { title: queryarray[0]['name'] });
  		res.render('index', {title: 'Campeonato de futbol'});
		
	/*})*/
});

module.exports = router;
