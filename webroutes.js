var api = require('./api');

function addRoutes(app) {
	app.get('/', function(req, res) {
		res.render('index.jade', {});
	});
}

exports.addRoutes = addRoutes;