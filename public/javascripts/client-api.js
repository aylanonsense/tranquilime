function getBunchOStress(amt, existingStressors, callback) { //callback(additions, updates)
	$.ajax({
		url: 'api/bunchostress',
		type: 'GET',
		dataType: 'json',
		data: {
			amt: amt,
			stressors: existingStressors.join()
		},
		complete: function(response) {
			callback(response.responseJSON.additions, response.responseJSON.updates);
		},
		error: function(xhr, status, error) {
			console.warn('Error on POST bunchostress:', error);
		}
	});
}
function getAllStress(callback) { //callback(stress)
	$.ajax({
		url: 'api/stress',
		type: 'GET',
		dataType: 'json',
		complete: function(response) {
			callback(response.responseJSON.stress);
		},
		error: function(xhr, status, error) {
			console.warn('Error on GET stress:', error);
		}
	});
}
function postStress(text, callback) { //callback(successful, id)
	$.ajax({
		url: 'api/stress',
		type: 'POST',
		dataType: 'json',
		data: {
			text: '' + text
		},
		complete: function(response) {
			callback(response.responseJSON.successful, response.responseJSON.id);
		},
		error: function(xhr, status, error) {
			console.warn('Error on POST stress:', error);
		}
	});
}
function deleteStress(id, callback) { //callback(successful)
	$.ajax({
		url: 'api/stress/' + id, 
		type: 'DELETE',
		dataType: 'json',
		complete: function(response) {
			callback(response.responseJSON.successful);
		},
		error: function(xhr, status, error) {
			console.warn('Error on DELETE stress:', error);
		}
	});
}
function getAllComfort(callback) { //callback(comfort)
	$.ajax({
		url: 'api/comfort',
		type: 'GET',
		dataType: 'json',
		complete: function(response) {
			callback(response.responseJSON.comfort);
		},
		error: function(xhr, status, error) {
			console.warn('Error on GET comfort:', error);
		}
	});
}
function postComfort(text, stressorId, callback) { //callback(successful, id)
	$.ajax({
		url: 'api/comfort',
		type: 'POST',
		dataType: 'json',
		data: {
			stressor: stressorId,
			text: '' + text
		},
		complete: function(response) {
			callback(response.responseJSON.successful, response.responseJSON.id);
		},
		error: function(xhr, status, error) {
			console.warn('Error on POST comfort:', error);
		}
	});
}
function deleteComfort(id, callback) { //callback(successful)
	$.ajax({
		url: 'api/comfort/' + id, 
		type: 'DELETE',
		dataType: 'json',
		complete: function(response) {
			callback(response.responseJSON.successful);
		},
		error: function(xhr, status, error) {
			console.warn('Error on DELETE comfort:', error);
		}
	});
}