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
		var amt = req.query.amt;
		var stressors = req.query.stressors.split(',');
		getBunchOStress(amt, stressors, function(additions, updates) {
			res.send({ additions: additions, updates: updates });
		});
	});
	app.post('/api/stressor', function(req, res) {
		var text = req.body.text;
		postStressor(text, function(successful, id) {
			res.send({ successful: successful, id: id });
		});
	});
	app.post('/api/comfort', function(req, res) {
		var stressorId = req.body.stressor;
		var text = req.body.text;
		postComfort(stressorId, text, function(successful, id) {
			res.send({ successful: successful, id: id });
		});
	});
}
function getBunchOStress(amt, existingStressors, callback) {
	var additions = [];
	var updates = [];
	callback(additions, updates);
}
function postStressor(text, callback) {
	var successful = true;
	var id = 1;
	callback(successful, id);
}
function postComfort(stressorId, text, callback) {
	var successful = true;
	var id = 1;
	callback(successful, id);
}

exports.addRoutes = addRoutes;
exports.getBunchOStress = getBunchOStress;
exports.postStressor = postStressor;
exports.postComfort = postComfort;