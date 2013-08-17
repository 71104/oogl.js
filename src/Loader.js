/*global OOGL: false */

/**
 * Represents a queue of asynchronous tasks. A Loader can be used to manage
 * asynchronous asset loading.
 *
 * @class OOGL.Loader
 * @constructor
 * @param tasks* {Function} Zero or more asynchronous tasks to queue. An
 * asynchronous task is a function that takes only one argument, a reference to
 * a callback function to be called by the task itself when it is accomplished.
 * @param tasks.next {Function} A reference to a callback function to be called
 * by the task as soon as it finished. The `next` callback is not user-defined,
 * it is passed to the task by the `Loader` object.
 * @example
 *	TODO
 */
OOGL.Loader = function () {
	var thisObject = this;

	var queue = [];
	for (var i = 0; i < arguments.length; i++) {
		queue.push(arguments[i]);
	}

	var textures = {};
	var programs = {};

	function enqueue() {
		queue.push.apply(queue, arguments);
		return thisObject;
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
	 * user-defined, it is passed to the task by the `Loader` object.
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
	 * Queue an asynchronous task that loads and creates a texture given its
	 * URL.
	 *
	 * After being loaded the texture can be retrieved via the
	 * {{#crossLink "OOGL.Loader/getTexture"}}getTexture{{/crossLink}} method as
	 * a {{#crossLink "context.Texture2D"}}Texture2D{{/crossLink}} object.
	 *
	 * @method queueTexture
	 * @chainable
	 * @param id {String} The URL of the texture image to load.
	 * @param [minFilter] {Number} TODO
	 * @param [magFilter] {Number} TODO
	 * @example
	 *	TODO
	 */
	this.queueTexture = function (id, minFilter, magFilter) {
		if (arguments.length < 2) {
			magFilter = context.LINEAR;
			minFilter = context.LINEAR;
		} else if (arguments.length < 3) {
			minFilter = context.LINEAR;
		}
		return enqueue(function (next) {
			textures[id] = new AutoTexture(id, next, minFilter, magFilter);
		});
	};

	/**
	 * TODO
	 *
	 * @method queueTextures
	 * @chainable
	 * @param ids {String[]} TODO
	 * @example
	 *	TODO
	 */
	this.queueTextures = function (ids) {
		for (var i in ids) {
			enqueue((function (id) {
				return function (next) {
					textures[id] = new AutoTexture(id, next);
				};
			})(ids[i]));
		}
		return thisObject;
	};

	/**
	 * TODO
	 *
	 * @method getTexture
	 * @param id {String} TODO
	 * @return {context.Texture2D} TODO
	 * @example
	 *	TODO
	 */
	this.getTexture = function (id) {
		return textures[id];
	};

	/**
	 * TODO
	 *
	 * @method queueProgram
	 * @chainable
	 * @param id {String} TODO
	 * @param attributes {Object} TODO
	 * @example
	 *	TODO
	 */
	this.queueProgram = function (id, attributes) {
		return enqueue(function (next) {
			programs[id] = new AjaxProgram(id, attributes, next);
		});
	};

	/**
	 * TODO
	 *
	 * @method queuePrograms
	 * @chainable
	 * @param map {Object} TODO
	 * @param map.id {String[]} TODO
	 * @example
	 *	TODO
	 */
	this.queuePrograms = function (map) {
		for (var id in map) {
			enqueue((function (id, attributes) {
				return function (next) {
					programs[id] = new AjaxProgram(id, attributes, next);
				};
			})(id, map[id]));
		}
		return thisObject;
	};

	/**
	 * TODO
	 *
	 * @method getProgram
	 * @param id {String} TODO
	 * @return {context.Program} TODO
	 * @example
	 *	TODO
	 */
	this.getProgram = function (id) {
		return programs[id];
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
