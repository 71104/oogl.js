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

	var data = {};

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
	 * Queues a task that loads a file of the specified type via AJAX.
	 *
	 * @method queueData
	 * @param id {String} The URL of the file.
	 * @param [parameters] {Object} An optional object containing parameters to
	 * be passed to the server in the AJAX request. It specified directly to the
	 * {{#crossLink "OOGL.Ajax/get"}}OOGL.Ajax.get{{/crossLink}} method.
	 * @param type {String} The data type, specified directly to the
	 * {{#crossLink "OOGL.Ajax/get"}}OOGL.Ajax.get{{/crossLink}} method.
	 * @example
	 *	TODO
	 */
	this.queueData = function (id, parameters, type) {
		if (arguments.length > 2) {
			return thisObject.queue(function (next) {
				OOGL.Ajax.get(id, parameters, function (response) {
					data[id] = response;
					next();
				}, type);
			});
		} else {
			type = data;
			return thisObject.queue(function (next) {
				OOGL.Ajax.get(id, function (response) {
					data[id] = response;
					next();
				}, type);
			});
		}
	};

	/**
	 * Queues a task that loads JSON data via AJAX.
	 *
	 * @method queueJSON
	 * @param id {String} The URL of the JSON data.
	 * @param [parameters] {Object} An optional object containing parameters to
	 * be passed to the server in the AJAX request. It specified directly to the
	 * {{#crossLink "OOGL.Ajax/get"}}OOGL.Ajax.getJSON{{/crossLink}} method.
	 * @example
	 *	TODO
	 */
	this.queueJSON = function (id, parameters) {
		if (arguments.length > 1) {
			return thisObject.queue(function (next) {
				OOGL.Ajax.getJSON(id, parameters, function (response) {
					data[id] = response;
					next();
				});
			});
		} else {
			return thisObject.queue(function (next) {
				OOGL.Ajax.getJSON(id, function (response) {
					data[id] = response;
					next();
				});
			});
		}
	};

	/**
	 * Retrieves data previously loaded via the
	 * {{#crossLink "OOGL.TaskQueue/queueData"}}queueData{{/crossLink}} or
	 * {{#crossLink "OOGL.TaskQueue/queueJSON"}}queueJSON{{/crossLink}} method.
	 *
	 * @method getData
	 * @param id {String} The URL of the requested data.
	 * @return {Object} The requested data.
	 * @example
	 *	TODO
	 */
	this.getData = function (id) {
		if (data.hasOwnProperty(id)) {
			return data[id];
		}
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
	 * that gets invoked as soon as all the tasks finish. The `TaskQueue` object
	 * is used as `this` when calling the function.
	 * @param [progress] {Function} An optional user-defined callback function
	 * that gets invoked every time a task ends. The `TaskQueue` object is used
	 * as `this` when calling the function.
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
					progress && progress.call(thisObject, index * 100 / queue.length);
					run(index + 1);
				});
			} else {
				callback && callback.call(thisObject);
			}
		})(0);
		return thisObject;
	};
};
