/*global OOGL: false */

/**
 * @module OOGL
 */

/**
 * Static class providing timing-related functions.
 *
 * @class OOGL.Timing
 * @module OOGL
 * @static
 * @example
 *	var loop = new OOGL.RenderLoop(function () {
 *		console.log(OOGL.Timing.now());
 *	});
 *	loop.start();
 */
OOGL.Timing = {
	/**
	 * Returns the current timestamp in milliseconds since the Epoch.
	 *
	 * This method relies on `window.performance.now` where available and
	 * transparently falls back to `Date.now`.
	 *
	 * @method now
	 * @static
	 * @return {Number} The current timestamp in milliseconds.
	 * @example
	 *	var loop = new OOGL.RenderLoop(function () {
	 *		console.log(OOGL.Timing.now());
	 *	});
	 *	loop.start();
	 */
	now: (function () {
		if (('performance' in window) && ('now' in window.performance)) {
			return window.performance.now.bind(window.performance);
		} else {
			return Date.now.bind(Date);
		}
	})()
};
