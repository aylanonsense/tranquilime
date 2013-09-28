/*
	GET bunchostress?amt=0&stressors=1,2
		{
			updates: [ { id: 1, comfort: [ { id: 1, text: "grr" } ] } ],
			additions: [ { id: 2, text: "bloop", comfort: [] }
		}

	POST stressor  BODY: { text: text }
		{ id: 1, successful: true }

	POST comfort  BODY: { text: text }
		{ id: 1, successful: true }
*/
var models = require('./models');
var Stressor = models.Stressor;
var Comfort = models.Comfort;

function addRoutes(app) {
	app.get('/api/bunchostress', function(req, res) {
		getBunchOStress(req.params.amt, req.params.stressors, function(additions, updates) {
			res.send({ additions: additions, updates: updates });
		});
	});
	app.get('/api/stressor', function(req, res) { //TODO change to use POST
		postStressor(req.params.text, function(successful, id) { //TODO change to use BODY
			res.send({ successful: successful, id: id });
		});
	});
	app.get('/api/comfort', function(req, res) { //TODO change to use POST
		postComfort(req.params.stressor, req.params.text, function(successful, id) { //TODO change to use BODY
			res.send({ successful: successful, id: id });
		});
	});
}
function getBunchOStress(amt, existingStressors, callback) {
	var additions = [];
	var updates = [];
	callback(additions, updates);
};
function postStressor(text, callback) {
	var successful = true;
	var id = 1;
	callback(successful, id)
};
function postComfort(text, callback) {
	var successful = true;
	var id = 1;
	callback(successful, id);
};

exports.addRoutes = addRoutes;
exports.getBunchOStress = getBunchOStress;
exports.postStressor = postStressor;
exports.postComfort = postComfort;