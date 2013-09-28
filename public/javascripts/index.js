$(document).ready(function() {
	getBunchOStress(4, [3, 4, 5, 6, 7], function(additions, updates) {
		console.log('GET bunchostress =>', additions, updates);
	});
	getAllStress(function(stress) {
		console.log('GET stress =>', stress);
	});
	postStress('I am stressed', function(successful, id) {
		console.log('POST stress =>', successful, id);
	});
	getAllComfort(function(comfort) {
		console.log('GET comfort =>', comfort);
	});
	postComfort('Stay in there!', '52472bca1ae8647a27000001', function(successful, id) {
		console.log('POST comfort =>', successful, id);
	});
});