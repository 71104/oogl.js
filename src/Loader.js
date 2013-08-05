/*global OOGL: false */

/**
 * TODO
 *
 * @class OOGL.Loader
 * @constructor
 * @param {Function} tasks* TODO
 * @example
 *	TODO
 */
OOGL.Loader = function () {
	var queue = [];
	for (var i = 0; i < arguments.length; i++) {
		queue.push(arguments[i]);
	}

	/**
	 * TODO
	 *
	 * @method queue
	 * @param {Function} tasks* TODO
	 * @example
	 *	TODO
	 */
	this.queue = function () {
		queue.push.apply(queue, arguments);
	};

	/**
	 * TODO
	 *
	 * @method queueSync
	 * @param {Function} tasks* TODO
	 * @example
	 *	TODO
	 */
	this.queueSync = function () {
		for (var i = 0; i < arguments.length; i++) {
			(function (i) {
				queue.push(function (next) {
					arguments[i]();
					next();
				});
			})(i);
		}
	};

	/**
	 * TODO
	 *
	 * @method count
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	this.count = function () {
		return queue.length;
	};

	/**
	 * TODO
	 *
	 * @method start
	 * @param {Function} [callback] TODO
	 * @example
	 *	TODO
	 */
	this.start = function (callback) {
		(function run(index) {
			if (index < queue.length) {
				queue[index](function () {
					run(index + 1);
				});
			} else {
				callback && callback();
			}
		})(0);
	};
};
