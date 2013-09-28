$(document).ready(function() {
	/*$(document).ready(function() {
	$('table.stickies tbody tr').each(function(rowNum, tr) {
		var id = $(this).find('a').attr('href');
		id = id.slice(1, id.length);
		$(this).find('a').attr('href', '#').on('click', function() {
			$.ajax({
				url: 'api/sticky/' + id,
				type: 'DELETE',
				complete: function() {
					$(tr).remove();
				}
			});
		});
	});
	$('table.stickers tbody tr').each(function(rowNum, tr) {
		var id = $(this).find('a').attr('href');
		id = id.slice(1, id.length);
		$(this).find('a').attr('href', '#').on('click', function() {
			$.ajax({
				url: 'api/sticker/' + id,
				type: 'DELETE',
				complete: function() {
					$(tr).remove();
				}
			});
		});
	});
});*/
	/*var isAddingStickers = false;

	var canvas = $("#canvas");
	var form = $("#menu form");
	var textField = $("#sticky-message");
	var textColorDropDown = $("#sticky-text-color");
	var paperColorDropDown = $("#sticky-paper-color");
	var pinColorDropDown = $("#sticky-pin-color");
	var createStickyButton = $("#sticky-create");
	var stickerTypeDropDown = $("#sticker-type");
	var stickerToggleButton = $("#sticker-toggle");

	var board = new StickyBoard(io.connect());
	$(board.getRoot()).appendTo(canvas);

	form.on('submit', function() {
		createSticky();
		setTimeout(function() {
			textField.val("");
		}, 0);
		return false;
	});
	textField.on('keypress', function(evt) {
		if(evt.which === 13) {
			createSticky();
			setTimeout(function() {
				textField.val("");
			}, 0);
		}
	});
	stickerToggleButton.on('click', function() {
		isAddingStickers = !isAddingStickers;
		if(isAddingStickers) {
			board.startAddingStickers(stickerTypeDropDown.val());
			stickerToggleButton.val("Stop Adding");
			stickerTypeDropDown.prop('disabled', true);
		}
		else {
			board.stopAddingStickers();
			stickerToggleButton.val("Start Adding");
			stickerTypeDropDown.prop('disabled', false);
		}
	});

	function createSticky() {
		if(textField.val().trim() !== "") {
			board.createSticky({
				text: textField.val(),
				x: Math.floor(20 + (canvas.width() - 40) * Math.random()),
				y: Math.floor(5 + (canvas.height() - 80) * Math.random()),
				textColor: textColorDropDown.val(),
				pinColor: pinColorDropDown.val(),
				paperColor: paperColorDropDown.val()
			});
		}
	}*/
});