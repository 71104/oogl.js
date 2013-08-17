/*global OOGL: false */

/**
 * Represents a queue of asynchronous tasks. This is mainly used to manage
 * asynchronous asset loading and is inherited by
 * {{#crossLink "context.Loader"}}Loader{{/crossLink}}.
 *
 * @class OOGL.TaskQueue
 * @constructor
 * @param tasks* {Function} Zero or more asynchronous tasks to queue. An
 * asynchronous task is a function that takes only one argument, a reference to
 * a callback function to be called by the task itself when it is accomplished.
 * @param tasks.next {Function} A reference to a callback function to be called
 * by the task as soon as it finished. The `next` callback is not user-defined,
 * it is passed to the task by the `TaskQueue` object.
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
	 * @param tasks* {Function} Zero or more asynchronous tasks to queue. An
	 * asynchronous task is a function that takes only one argument, a reference
	 * to a callback function to be called by the task itself when it is
	 * accomplished.
	 * @param tasks.next {Function} A reference to a callback function to be
	 * called by the task as soon as it finished. The `next` callback is not
	 * user-defined, it is passed to the task by the `TaskQueue` object.
	 * @example
	 *	TODO
	 */
	this.queue = enqueue;

	/**
	 * Queues zero or more synchronous tasks.
	 *
	 * @method queueSync
	 * @chainable
	 * @param tasks* {Function} Zero or more synchronous tasks. A synchronous
	 * task is a function that executes synchronously. The next task in the
	 * queue is executed as soon as the function returns.
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
	 * @param [progress] {Function} TODO
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
