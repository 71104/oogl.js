/*global OOGL: false */

/**
 * @module OOGL
 */

/**
 * Represents a queue of asynchronous tasks. This is mainly used to manage
 * asynchronous asset loading and is inherited by
 * {{#crossLink "context.Loader"}}Loader{{/crossLink}}.
 *
 * A task is a function that executes a job and can be either synchronous or
 * asynchronous.
 *
 * A synchronous task runs synchronously and its job terminates as soon as the
 * function returns.
 *
 * An asynchronous task, instead, runs asynchronously and always receives one
 * single argument, a callback function that is invoked by the task as soon as
 * it ends.
 *
 * @class OOGL.TaskQueue
 * @constructor
 * @param tasks* {Function} Zero or more asynchronous tasks to queue.
 * @example
 *	TODO
 */
OOGL.TaskQueue = function () {
	var thisObject = this;

	var queue = [];
	for (var i = 0; i < arguments.length; i++) {
		queue.push(arguments[i]);
	}

	/**
	 * Queues zero or more asynchronous tasks.
	 *
	 * @method queue
	 * @chainable
	 * @param tasks* {Function} Zero or more asynchronous tasks to queue.
	 * @example
	 *	TODO
	 */
	this.queue = function () {
		queue.push.apply(queue, arguments);
		return thisObject;
	};

	/**
	 * Queues zero or more synchronous tasks.
	 *
	 * @method queueSync
	 * @chainable
	 * @param tasks* {Function} Zero or more synchronous tasks to queue.
	 * @example
	 *	TODO
	 */
	this.queueSync = function () {
		for (var i = 0; i < arguments.length; i++) {
			(function (task) {
				queue.push(function (next) {
					task();
					next();
				});
			})(arguments[i]);
		}
		return thisObject;
	};

	/**
	 * Returns the number of tasks queued so far.
	 *
	 * @method count
	 * @return {Number} The number of tasks queued so far.
	 * @example
	 *	TODO
	 */
	this.count = function () {
		return queue.length;
	};

	/**
	 * Starts executing the queued tasks in queuing order.
	 *
	 * @method start
	 * @chainable
	 * @param [callback] {Function} An optional user-defined callback function
	 * that gets invoked as soon as all the tasks finish.
	 * @param [progress] {Function} An optional user-defined callback function
	 * that gets invoked every time a task ends.
	 * @param progress.progress {Number} A percentage value indicating the
	 * current progress, computed by the following formula:
	 *
	 *	i * 100 / c
	 *
	 * Where `i` indicates the zero-based index of the last executed task and
	 * `c` indicates the total number of queued tasks.
	 * @example
	 *	TODO
	 */
	this.start = function (callback, progress) {
		(function run(index) {
			if (index < queue.length) {
				queue[index](function () {
					progress && progress(index * 100 / queue.length);
					run(index + 1);
				});
			} else {
				callback && callback();
			}
		})(0);
		return thisObject;
	};
};
