/*global OOGL: false */

/**
 * Efficient render loop implementation that uses `requestAnimationFrame` where
 * available and transparently falls back on `setInterval`.
 *
 * @class OOGL.RenderLoop
 * @constructor
 * @param {Function} tick A user-defined callback function that is invoked at
 *	each iteration of the loop. It typically contains (OO)GL calls that render
 *	the full scene.
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	// setup the pipeline here creating programs and arrays
 *	var loop = new OOGL.RenderLoop(function () {
 *		oogl.clear(oogl.COLOR_BUFFER_BIT | oogl.DEPTH_BUFFER_BIT);
 *		arrays.drawTriangles();
 *		oogl.flush();
 *	});
 */
OOGL.RenderLoop = (function () {
	var type = 'auto';
	var rate = 60;

	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.msCancelAnimationFrame;

	var RenderLoop = (function (type, rate) {
		var period = Math.floor(rate / 1000);
		return function (tick) {
			var running = false;
			var banned = false;

			function RequestBasedLoop() {
				var request = null;
				this.start = function () {
					if (request === null) {
						request = requestAnimationFrame(function loop() {
							tick();
							request = requestAnimationFrame(loop);
						});
					}
				};
				this.stop = function () {
					if (request !== null) {
						cancelAnimationFrame(request);
						request = null;
					}
				};
			}

			function IntervalBasedLoop() {
				var interval = null;
				this.start = function () {
					if (interval === null) {
						interval = setInterval(tick, period);
					}
				};
				this.stop = function () {
					if (interval !== null) {
						clearInterval(interval);
						interval = null;
					}
				};
			}

			var loop;
			switch (type) {
			case 'request':
				loop = new RequestBasedLoop();
				break;
			case 'interval':
				loop = new IntervalBasedLoop();
				break;
			default: // auto
				if (requestAnimationFrame) {
					loop = new RequestBasedLoop();
				} else {
					loop = new IntervalBasedLoop();
				}
				break;
			}

			var counter = 0;
			var timestamp = 0;

			this.getType = function () {
				return type;
			};

			this.getRate = function () {
				return rate;
			};

			this.getPeriod = function () {
				return period;
			};

			/**
			 * TODO
			 *
			 * @method getActualRate
			 * @return {Number} TODO
			 * @example
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	loop.start();
			 *	setInterval(function () {
			 *		rateDisplay.innerText = loop.getActualRate();
			 *	}, 1000);
			 */
			this.getActualRate = function () {
				var now = Date.now();
				var result = counter / (now - timestamp);
				counter = 0;
				timestamp = now;
				return result;
			};

			/**
			 * TODO
			 *
			 * @method start
			 * @example
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	loop.start();
			 */
			this.start = function () {
				if (!running && !banned) {
					running = true;
					loop.start();
				}
			};

			this.suspend = function () {
				if (running) {
					banned = true;
					loop.stop();
				}
			};

			this.resume = function () {
				if (running) {
					banned = false;
					loop.start();
				}
			};

			this.stop = function () {
				running = false;
				banned = true;
				loop.stop();
			};
		};
	})(type, rate);

	/**
	 * Indicates whether `requestAnimationFrame` is supported.
	 *
	 * @method isRequestAnimationFrameSupported
	 * @static
	 * @return {Boolean} `true` if `requestAnimationFrame` is supported, `false`
	 *	otherwise.
	 * @example
	 *	if (OOGL.RenderLoop.isRequestAnimationFrameSupported()) {
	 *		OOGL.RenderLoop.setType('request');
	 *	} else {
	 *		throw 'requestAnimationFrame not supported';
	 *	}
	 */
	RenderLoop.isRequestAnimationFrameSupported = function () {
		return !!requestAnimationFrame;
	};

	/**
	 * TODO
	 *
	 * @method getType
	 * @static
	 * @return {String} TODO
	 * @example
	 *	var currentType = RenderLoop.getType();
	 */
	RenderLoop.getType = function () {
		return type;
	};

	/**
	 * TODO
	 *
	 * @method setType
	 * @static
	 * @param {String} newType TODO
	 * @example
	 *	RenderLoop.setType('request');
	 */
	RenderLoop.setType = function (newType) {
		if ({
			request: true,
			interval: true,
			auto: true
		}.hasOwnProperty(type)) {
			type = newType;
		} else {
			throw 'invalid loop type must be one of `request`, `interval` or `auto`.';
		}
	};

	/**
	 * TODO
	 *
	 * @method getRate
	 * @static
	 * @return {Number} TODO
	 * @example
	 *	var currentRate = RenderLoop.getRate();
	 */
	RenderLoop.getRate = function () {
		return rate;
	};

	/**
	 * TODO
	 *
	 * @method setRate
	 * @static
	 * @param {Number} newRate TODO
	 * @example
	 *	RenderLoop.setRate(100);
	 */
	RenderLoop.setRate = function (newRate) {
		rate = newRate;
	};

	return RenderLoop;
})();
