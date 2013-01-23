/*global OOGL: false */

/**
 * Static class providing timing-related functions.
 *
 * @class OOGL.Timing
 * @module OOGL
 * @static
 * @example
 *	TODO
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
	 *	TODO
	 */
	now: (function () {
		if (('performance' in window) && ('now' in window.performance)) {
			return function () {
				return window.performance.now();
			};
		} else {
			return function () {
				return Date.now();
			};
		}
	})()
};
