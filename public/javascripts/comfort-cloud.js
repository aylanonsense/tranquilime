var ComfortCloud = (function() {
	function ComfortCloud() {
		this._animTimer = null;
		this._createTimer = null;
		this._dataTimer = null;
		this._timeOfLastAnimationUpdate = null;
		this._bubbles = [];
		this._stressToCreate = [];
		this._root = $('<div class="cloud"></div>');
	}
	ComfortCloud.prototype.start = function() {
		var self = this;

		//stop first if necessary
		if(this._animTimer !== null || this._dataTimer !== null) {
			this.stop();
		}

		//start the timers
		this._timeOfLastAnimationUpdate = Date.now();
		this._animTimer = setInterval(function() {
			var then = self._timeOfLastAnimationUpdate;
			var now = Date.now();
			self._timeOfLastAnimationUpdate = now;
			self._updateAnimation(now - then);
		}, Math.floor(1000 / 35));
		this._delayBubbleCreation();
		this._dataTimer = setInterval(function() {
			self._requestData();
		}, 1000);
	};
	ComfortCloud.prototype.stop = function() {
		if(this._animTimer !== null) {
			clearInterval(this._animTimer);
			this._animTimer = null;
		}
		if(this._createTimer !== null) {
			clearTimeout(this._createTimer);
			this._createTimer = null;
		}
		this._timeOfLastAnimationUpdate = null;
		if(this._dataTimer !== null) {
			clearInterval(this._dataTimer);
			this._dataTimer = null;
		}
	};
	ComfortCloud.prototype._requestData = function() {
		console.log("Requesting data..."); //TODO remove
		var self = this;
		getBunchOStress(5, [], function(additions, updates) {
			self._handleData(additions, updates);
		});
	};
	ComfortCloud.prototype._handleData = function(additions, updates) {
		this._updateExistingBubbles(updates);
		this._queueBubblesToCreate(additions);
	};
	ComfortCloud.prototype._queueBubblesToCreate = function(additions) {
		var self = this;
		additions.forEach(function(addition) {
			self._stressToCreate.push(addition);
		});
	};
	ComfortCloud.prototype._delayBubbleCreation = function() {
		var self = this;
		this._createTimer = setTimeout(function() {
			if(self._stressToCreate.length > 0) {
				var bubble = self._stressToCreate[0];
				self._stressToCreate.splice(0, 1);
				self._makeABubble(bubble);
			}
			self._delayBubbleCreation();
		}, Math.min(Math.max(100, Math.floor(50 + 400 * Math.random() + 20 * this._bubbles.length)), 1000));
	};
	ComfortCloud.prototype._makeABubble = function(bubbleParams) {
		console.log("Making a bubble!"); //TODO remove
		var bubble = new ComfortBubble(bubbleParams);
		this._bubbles.push(bubble);
		bubble.appendTo(this._root);
	};
	ComfortCloud.prototype._updateExistingBubbles = function(updates) {
		for(var i = 0; i < this._bubbles.length; i++) {
			for(var j = 0; j < updates.length; j++) {
				if(this._bubbles[i].getId() === updates[j].id) {
					this._bubbles[i].updateComfort(updates[j].comfort);
				}
			}
		}
	};
	ComfortCloud.prototype._updateAnimation = function(ms) {
		this._bubbles.forEach(function(bubble) {
			bubble.updateAnimation(ms, false);
		});
		for(var i = this._bubbles.length - 1; i >= 0; i--) {
			if(this._bubbles[i].isDead()) {
				this._bubbles.splice(i, 1);
			}
		}
	};
	ComfortCloud.prototype.appendTo = function(parent) {
		this._root.appendTo(parent);
	};

	function ComfortBubble(params) {
		this._root = $('<div class="stressor"></div>');
		this._stressText = $('<p class="stressor-text"></p>').text(params.text).appendTo(this._root);
		this._comfortList = $('<ol class="comfort-list"></ol>').appendTo(this._root).appendTo(this._root);
		this._comfortText = $('<input class="comfort-text" type="text"></input>').appendTo(this._root);
		this._comfortButton = $('<input class="comfort-button" type="button" value="Give Comfort"></input>').appendTo(this._root);
		this._id = params.id;
		for(var i = params.comfort.length - 1; i >= 0; i--) {
			console.log(i, params.comfort[i]);
			$('<li></li>').text(params.comfort[i].text).appendTo(this._comfortList);
		}
		this._numComforts = params.comfort.length;
	}
	ComfortBubble.prototype.getId = function() {
		return this._id;
	};
	ComfortBubble.prototype.updateAnimation = function(ms, paused) {

	};
	ComfortBubble.prototype.updateComfort = function(comfort) {

	};
	ComfortBubble.prototype.isDead = function() {

	};
	ComfortBubble.prototype.appendTo = function(parent) {
		this._root.appendTo(parent);
	};

	return ComfortCloud;
})();