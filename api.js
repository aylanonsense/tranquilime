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
	app.get('/api/stress', function(req, res) {
		getAllStress(function(stress) {
			res.send({ stress: stress });
		});
	});
	app.post('/api/stress', function(req, res) {
		var text = req.body.text;
		postStress(text, function(successful, id) {
			res.send({ successful: successful, id: id });
		});
	});
	app.get('/api/comfort', function(req, res) {
		getAllComfort(function(comfort) {
			res.send({ comfort: comfort });
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
function getAllStress(callback) {
	Stressor.find(function(err, stressors) {
		if(err) {
			callback([]);
		}
		else {
			var stressArr = [];
			stressors.sort(function(a, b) { //TODO sort using mongoose instead
				return a.dateCreated.getTime() - b.dateCreated.getTime();
			});
			stressors.forEach(function(stressor) {
				stressArr.push({
					id: stressor.id,
					text: stressor.text
				});
			});
			callback(stressArr);
		}
	});
}
function postStress(text, callback) {
	var stressor = new Stressor({
		text: text
	});
	stressor.save(function(err) {
		if(err) {
			callback(false, null);
		}
		else {
			callback(true, stressor.id);
		}
	});
}
function getAllComfort(callback) {
	Comfort.find(function(err, comforts) {
		if(err) {
			callback([]);
		}
		else {
			var comfortArr = [];
			comforts.sort(function(a, b) { //TODO sort using mongoose instead
				return a.dateCreated.getTime() - b.dateCreated.getTime();
			});
			comforts.forEach(function(comfort) {
				comfortArr.push({
					id: comfort.id,
					stressorId: comfort.stressorId,
					text: comfort.text
				});
			});
			callback(comfortArr);
		}
	});
}
function postComfort(stressorId, text, callback) {
	Stressor.find({ _id: stressorId }, function(err, stressor) {
		if(err || !stressor) {
			callback(false, null);
		}
		else {
			stressor = stressor[0];
			var comfort = new Comfort({
				stressorId: stressor.id,
				text: text
			});
			comfort.save(function(err) {
				if(err) {
					callback(false, null);
				}
				else {
					callback(true, comfort.id);
				}
			});
		}
	});
}

exports.addRoutes = addRoutes;
exports.getBunchOStress = getBunchOStress;
exports.getAllStress = getAllStress;
exports.postStress = postStress;
exports.getAllComfort = getAllComfort;
exports.postComfort = postComfort;