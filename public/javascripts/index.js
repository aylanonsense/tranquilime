$(document).ready(function() {
	getAllStress(function(stress) {
		stress.forEach(function(stressor) {
			$('<p>' + stressor.text + ' <a class="delete-stressor" href="#' + stressor.id + '">delete</a></p>').appendTo('body').find('a');
			if(stressor.comfort.length > 0) {
				var ul = $('<ul></ul>').appendTo('body');
				stressor.comfort.forEach(function(comfort) {
					$('<li>' + comfort.text + ' <a class="delete-comfort" href="#' + comfort.id + '">delete</a></li>').appendTo(ul);
				});
			}
		});
	});
	$('body').on('click', 'a', function() {
		var p = $(this).parent();
		var id = $(this).attr('href');
		id = id.substr(1, id.length - 1);
		if($(this).hasClass('delete-comfort')) {
			deleteComfort(id, function(successful) {
				p.remove();
			});
		}
		else {
			deleteStress(id, function(successful) {
				p.remove();
			});
		}
	});
});