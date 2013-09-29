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
		}, Math.floor(1000 / 60));
		this._delayBubbleCreation();
		self._requestData();
		this._dataTimer = setInterval(function() {
			self._requestData();
		}, 5000);
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
		var ids = this._bubbles.map(function(bubble) {
			return bubble.getId();
		});
		this._stressToCreate.forEach(function(stress) {
			ids.push(stress.id);
		});
		getBunchOStress(5, ids, function(additions, updates) {
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
		}, Math.min(Math.max(1000, Math.floor(500 + 1000 * Math.random() + 600 * this._bubbles.length * Math.random())), 6000));
	};
	ComfortCloud.prototype._makeABubble = function(bubbleParams) {
		console.log("Making a bubble!"); //TODO remove
		var x = (0.6 * Math.random() - 0.05) * $(window).width();
		var y = 0.7 * Math.random() * $(window).height();
		var bubble = new ComfortBubble(bubbleParams, x, y);
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

	function ComfortBubble(params, x, y) {
		var self = this;
		this._root = $('<div class="stressor"></div>');
		this._root.css('z-index', 5);
		this._stressText = $('<p class="stressor-text"></p>').text(params.text).appendTo(this._root);
		this._comfortList = $('<ol class="comfort-list"></ol>').appendTo(this._root).appendTo(this._root);
		this._comfortLink = $('<span class="comfort-link"></span>').text('+ Comfort').appendTo(this._root);
		this._comfortText = $('<input class="comfort-text" type="text"></input>').appendTo(this._root).hide();
		this._comfortBr = $('<br/>').appendTo(this._root).hide();
		this._comfortButton = $('<input class="comfort-button" type="button" value="Give Comfort"></input>').appendTo(this._root).hide();
		this._comfortLink.on('click', function() {
			self._startEditMode();
		});
		this._comfortButton.on('click', function() {
			self.addComfort();
		});
		this._id = params.id;
		for(var i = params.comfort.length - 1; i >= 0; i--) {
			this._appendNewComfort(params.comfort[i].text);
		}
		this._x = x;//(0.8 * Math.random() - 0.2) * $(window).width();
		this._y = y;//Math.random();
		this._root.css({
			position: 'absolute',
			top: this._y,
			left: this._x
		});
		this._numComforts = params.comfort.length;
		var sizeClass;
		this._horizontalMove
		if(Math.random() < 0.33) {
			sizeClass = "small";
			this._horizontalMove = 13 + 13 / 10 * Math.random();
		}
		else if(Math.random() < 0.66) {
			sizeClass = "medium";
			this._horizontalMove = 15 + 15 / 10 * Math.random();
		}
		else {
			sizeClass = "normal";
			this._horizontalMove = 18.5 + 18.5 / 10 * Math.random();
		}
		this._root.addClass(sizeClass);
		this._lifetime = 10 * 1000 + 15 * 1000 * Math.random();
		this._timeAlive = 0;
		this._root.animate({ left: this._x + this._lifetime / 1000 * this._horizontalMove }, { duration: this._lifetime, queue: false, easing: 'linear' });
		this._root.fadeIn({duration: 1000, queue: false });
		this._isDying = false;
		this._comforted = false;
		this._isBeingEdited = false;
	}
	ComfortBubble.prototype.getId = function() {
		return this._id;
	};
	ComfortBubble.prototype.getBoundingBox = function() {
		return {
			x: +(this._root.css('left').replace('px', '')),
			y: +(this._root.css('top').replace('px', '')),
			width: this._root.width(),
			height: this._root.height()
		};
	};
	ComfortBubble.prototype.updateAnimation = function(ms, paused) {
		if(!this._isBeingEdited) {
			this._timeAlive += ms;
			if(this._timeAlive >= this._lifetime - 1000 && this._timeAlive - ms < this._lifetime - 1000) {
				this._root.fadeOut({duration: 1000, queue: false });
			}
		}
	};
	ComfortBubble.prototype._appendNewComfort = function(text) {
		var r = Math.random();
		var color;
		if(r < 1 / 5) { color = 'red'; }
		else if(r < 2 / 5) { color = 'green'; }
		else if(r < 3 / 5) { color = 'blue'; }
		else if(r < 4 / 5) { color = 'purple'; }
		else { color = 'orange'; }
		$('<li class="' + color + '"></li>').text(text).appendTo(this._comfortList);
	};
	ComfortBubble.prototype._startEditMode = function() {
		var self = this;
		if(!this._isDying && !this._isBeingEdited && !this._comforted && this._timeAlive > 1000) {
			this._isBeingEdited = true;
			this._comfortLink.fadeOut(400);
			this._root.stop();
			this._root.css('z-index', 9);
			setTimeout(function() {
				self._comfortText.fadeIn(400);
				self._comfortButton.fadeIn(400);
				self._comfortBr.fadeIn(400);
			}, 400);
		}
	};
	ComfortBubble.prototype.addComfort = function() {
		var self = this;
		var text = '' + this._comfortText.val();
		if(!this._comforted && text !== '') {
			this._comforted = true;
			this._comfortText.val('');
			postComfort(text, this.getId(), function(successful) {
				if(successful) {
					self._numComforts++;
					self._appendNewComfort(text);
					self._comfortText.fadeOut(400);
					self._comfortButton.fadeOut(400);
					self._comfortBr.fadeOut(400);
					setTimeout(function() {
						self._isBeingEdited = false;
						self._timeAlive = 0;
						self._x = +(self._root.css('left').replace('px', ''));
						self._root.animate({ left: self._x + self._lifetime / 1000 * self._horizontalMove }, { duration: self._lifetime, queue: false, easing: 'linear' });
					}, 1500);
				}
			});
		}
	};
	ComfortBubble.prototype.updateComfort = function(comfort) {
		//TODO
	};
	ComfortBubble.prototype.isDead = function() {
		return this._timeAlive > this._lifetime;
	};
	ComfortBubble.prototype.appendTo = function(parent) {
		this._root.appendTo(parent);
	};

	return ComfortCloud;
})();