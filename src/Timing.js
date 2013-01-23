/*global OOGL: false */

/**
 * TODO
 *
 * @class OOGL.Timing
 * @module OOGL
 * @static
 * @example
 *	TODO
 */
OOGL.Timing = {
	/**
	 * TODO
	 *
	 * @method now
	 * @static
	 * @return {Number} TODO
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
