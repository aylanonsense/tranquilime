$(document).ready(function() {
	getBunchOStress(3325834, [3, 4, 5, 6, 7], function(additions, updates) {
		console.log('GET bunchostress =>', additions, updates);
	});
	postStressor('I am stressed', function(successful, id) {
		console.log('POST stressor =>', successful, id);
	});
	postComfort('Stay in there!', 4, function(successful, id) {
		console.log('POST comfort =>', successful, id);
	});
});