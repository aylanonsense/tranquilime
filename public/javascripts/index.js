$(document).ready(function() {
	getAllStress(function(stress) {
		stress.forEach(function(stressor) {
			$('<p></p>').text(stressor.text).appendTo('body');
			if(stressor.comfort.length > 0) {
				var ul = $('<ul></ul>').appendTo('body');
				stressor.comfort.forEach(function(comfort) {
					$('<li></li>').text(comfort.text).appendTo(ul);
				});
			}
		});
	});
});