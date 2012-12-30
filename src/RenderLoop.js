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
 *	// setup the pipeline here, create programs and arrays
 *	var loop = new OOGL.RenderLoop(function () {
 *		oogl.clear(oogl.COLOR_BUFFER_BIT | oogl.DEPTH_BUFFER_BIT);
 *		arrays.drawTriangles();
 *		oogl.flush();
 *	});
 *	loop.start();
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
		var period = Math.floor(1000 / rate);
		return function (tick) {
			var running = false;
			var banned = false;

			var counter = 0;
			var timestamp;
			var offset = 0;
			var suspendTimestamp;

			function RequestBasedLoop() {
				var request = null;
				this.start = function () {
					if (request === null) {
						request = requestAnimationFrame(function loop() {
							counter++;
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
						interval = setInterval(function () {
							counter++;
							tick();
						}, period);
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
					type = 'request';
					loop = new RequestBasedLoop();
				} else {
					type = 'interval';
					loop = new IntervalBasedLoop();
				}
				break;
			}

			/**
			 * Returns the type of this loop as a string; the return value can
			 * be either `'request'` or `'interval'`.
			 *
			 * @method getType
			 * @return {String} The type of this loop; either `'request'` or
			 *	`'interval'`.
			 * @example
			 *	OOGL.RenderLoop.setType('auto');
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	if (loop.getType() === 'interval') {
			 *		// apparently rAF is not supported
			 *	}
			 */
			this.getType = function () {
				return type;
			};

			/**
			 * The frame rate of this loop.
			 *
			 * Note that this value is meaningless if `requestAnimationFrame` is
			 * being used by this loop.
			 *
			 * @method getRate
			 * @return {Number} The frame rate of this loop.
			 * @example
			 *	var rate = loop.getRate();
			 */
			this.getRate = function () {
				return rate;
			};

			/**
			 * The period of this loop, in milliseconds. It is computed using the formula:
			 *
			 *	period = Math.floor(1000 / rate);
			 *
			 * This value is also used in `setInterval`-based loops.
			 *
			 * @method getPeriod
			 * @return {Number} The period of this loop, in milliseconds.
			 * @example
			 *	OOGL.RenderLoop.setRate(100);
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	var period = loop.getPeriod(); // 10
			 */
			this.getPeriod = function () {
				return period;
			};

			/**
			 * Returns the _actual_ frame rate for this loop. This is
			 * potentially different from the value returned by `getRate`
			 * because the former is the measured frame rate while the latter is
			 * the rate manually set using the static `setRate` method.
			 *
			 * The actual frame rate is measured as the number of loop
			 * iterations since the last time `getActualFrameRate` was called
			 * divided by the timespan.
			 *
			 * The measuring system automatically discards time spans during
			 * which the loop was suspended.
			 *
			 * @method getActualRate
			 * @return {Number} The measured actual frame rate.
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
				var now;
				if (banned) {
					now = suspendTimestamp;
				} else {
					now = Date.now();
				}
				var result = counter / (now - timestamp - offset);
				counter = 0;
				timestamp = now;
				offset = 0;
				return result;
			};

			/**
			 * Starts the loop.
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
					timestamp = Date.now();
					loop.start();
				}
			};

			/**
			 * Suspends the execution of the loop. There is no effect if the
			 * loop is not running.
			 *
			 * @method suspend
			 * @example
			 *	loop.suspend();
			 */
			this.suspend = function () {
				if (running) {
					banned = true;
					suspendTimestamp = Date.now();
					loop.stop();
				}
			};

			/**
			 * Resume the execution of the loop. There is no effect if the loop
			 * has not been previously suspended by the `suspend` method.
			 *
			 * @method resume
			 * @example
			 *	loop.resume();
			 */
			this.resume = function () {
				if (running) {
					banned = false;
					offset += Date.now() - suspendTimestamp;
					loop.start();
				}
			};

			/**
			 * Permanently stops the execution of the loop, whether it is
			 * suspended or not. There is no effect if the loop has not been
			 * started yet.
			 *
			 * The execution of this render loop cannot be restarted after it
			 * has been stopped.
			 *
			 * @method stop
			 * @example
			 *	loop.stop();
			 */
			this.stop = function () {
				running = false;
				banned = true;
				suspendTimestamp = Date.now();
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
	 * Returns the currently configured loop type.
	 *
	 * @method getType
	 * @static
	 * @return {String} The loop type; can be `request`, `interval` or `auto`.
	 * @example
	 *	var currentType = RenderLoop.getType();
	 */
	RenderLoop.getType = function () {
		return type;
	};

	/**
	 * Sets the loop type; can be `request`, `interval` or `auto`.
	 *
	 * When the loop type is `request` the `RenderLoop` constructor constructs
	 * `requestAnimationFrame`-based loops.
	 *
	 * When the loop type is `interval` the `RenderLoop` constructor constructs
	 * `setInterval`-based loops.
	 *
	 * When the loop type is `auto` the `RenderLoop` constructor constructs
	 * `requestAnimationFrame`-based loops if the `requestAnimationFrame` API is
	 * supported, `setInterval`-based loops otherwise.
	 *
	 * @method setType
	 * @static
	 * @param {String} newType The loop type; can be `request`, `interval` or
	 *	`auto`.
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
			throw 'invalid loop type, must be one of `request`, `interval` or `auto`.';
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
	 * @method getPeriod
	 * @static
	 * @return {Number} TODO
	 * @example
	 *	OOGL.RenderLoop.setRate(100);
	 *	var period = OOGL.RenderLoop.getPeriod(); // 10
	 */
	RenderLoop.getPeriod = function () {
		return Math.floor(1000 / rate);
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
