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
function getBunchOStress(numNewStressorsToGet, stressorsToUpdate, callback) {
	var additions = null;
	var updates = null;
	Stressor.find().where('_id').in(stressorsToUpdate).sort('-dateCreated').exec(function(err, stressors) {
		wrapStressors(stressors, function(stressors) {
			updates = stressors;
			if(additions !== null) {
				callback(additions, updates);
			}
		});
	});
	Stressor.find().where('_id').nin(stressorsToUpdate).sort('-dateCreated').limit(2 * numNewStressorsToGet).exec(function(err, stressors) {
		for(var i = 0; i < 10 && stressors.length > numNewStressorsToGet; i++) {
			stressors.splice(Math.floor(Math.random() * stressors.length), 1);
		}
		wrapStressors(stressors, function(stressors) {
			additions = stressors;
			if(updates !== null) {
				callback(additions, updates);
			}
		});
	});
}
function getAllStress(callback) {
	Stressor.find().sort('-dateCreated').exec(function(err, stressors) {
		if(err) {
			callback([]);
		}
		else {
			wrapStressors(stressors, callback);
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
	Comfort.find().sort('-dateCreated').exec(function(err, comforts) {
		if(err) {
			callback([]);
		}
		else {
			wrapComforts(comforts, callback);
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
function wrapStressors(stressors, callback) {
	var stressorIds = [];
	var stressArr = [];
	stressors.forEach(function(stressor) {
		stressorIds.push(stressor.id);
		stressArr.push({
			id: stressor.id,
			text: stressor.text,
			comfort: []
		});
	});
	getComfortsForStressors(stressorIds, function(comforts) {
		var i, j;
		for(i = 0; i < stressArr.length; i++) {
			for(j = 0; j < comforts.length; j++) {
				if('' + stressArr[i].id ===  '' + comforts[j].stressorId) {
					stressArr[i].comfort.push({
						id: comforts[j].id,
						text: comforts[j].text
					});
				}
			}
		}
		callback(stressArr);
	});
}
function wrapComforts(comforts, callback) {
	var comfortArr = [];
	comforts.forEach(function(comfort) {
		comfortArr.push({
			id: comfort.id,
			stressorId: comfort.stressorId,
			text: comfort.text
		});
	});
	callback(comfortArr);
}
function getComfortsForStressors(stressors, callback) {
	Comfort.find().where('stressorId').in(stressors).sort('-dateCreated').exec(function(err, comforts) {
		callback(comforts);
	});
}

exports.addRoutes = addRoutes;
exports.getBunchOStress = getBunchOStress;
exports.getAllStress = getAllStress;
exports.postStress = postStress;
exports.getAllComfort = getAllComfort;
exports.postComfort = postComfort;