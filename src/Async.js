/*global OOGL: false */

/**
 * @module OOGL
 */

/**
 * Manages the serial and parallel execution of asynchronous tasks.
 *
 * Mainly used by {{#crossLink "context.Loader"}}Loader{{/crossLink}}.
 *
 * Asynchronous tasks are specified as functions receiving two arguments: one
 * callback function to invoke as soon as the task is accomplished, and one
 * optional object to use as `this` when invoking the callback function. Return
 * values are ignored.
 *
 * @class OOGL.Async
 * @static
 */
OOGL.Async = {
	/**
	 * Creates an asynchronous task from a synchronous one.
	 *
	 * The returned task function invokes the task function (without specifying
	 * any arguments) and subsequently invokes the callback function, if
	 * specified.
	 *
	 * @method async
	 * @static
	 * @param task {Function} A synchronous task function.
	 * @return {Function} A new asynchronous task function.
	 *
	 * The returned function does not return anything but expects two optional
	 * arguments: the first is a user-defined callback function invoked when all
	 * the tasks have been executed, the second is a scope object to use as
	 * `this` while invoking the callback function.
	 *
	 * The returned function may be specified as a task for
	 * {{#crossLink "OOGL.Async.serial"}}serial{{/crossLink}} and
	 * {{#crossLink "OOGL.Async.parallel"}}parallel{{/crossLink}}.
	 * @example
	 *	TODO
	 */
	async: function (task) {
		return function (callback, scope) {
			task();
			callback && callback.call(scope);
		};
	},

	/**
	 * Creates an asynchronous task that executes the specified asynchronous
	 * tasks serially.
	 *
	 * @method serial
	 * @static
	 * @param [tasks]* {Function} Zero or more task functions.
	 * @param tasks.next {Function} A callback function that must be invoked by
	 * each task as soon as it is accomplished.
	 * @param [tasks.scope] {Object} An optional object the task must use as
	 * `this` when invoking the `next` callback.
	 * @return {Function} A function that starts the execution.
	 *
	 * The returned function does not return anything but expects two optional
	 * arguments: the first is a user-defined callback function invoked when all
	 * the tasks have been executed, the second is a scope object to use as
	 * `this` while invoking the callback function.
	 *
	 * The returned function may also be specified as a task for 
	 * {{#crossLink "OOGL.Async.parallel"}}parallel{{/crossLink}} or for another
	 * {{#crossLink "OOGL.Async.serial"}}serial{{/crossLink}} call.
	 * @example
	 *	TODO
	 */
	serial: function () {
		var tasks = arguments;
		return function (callback, scope) {
			if (tasks.length) {
				(function run(index) {
					tasks[index](function () {
						if (index < tasks.length - 1) {
							run(index + 1);
						} else {
							callback && callback.call(scope);
						}
					});
				})(0);
			} else {
				callback && callback.call(scope);
			}
		};
	},

	/**
	 * Creates an asynchronous task that executes the specified asynchronous
	 * tasks in parallel.
	 *
	 * @method parallel
	 * @static
	 * @param [tasks]* {Function} Zero or more task functions.
	 * @param tasks.next {Function} A callback function that must be invoked by
	 * each task as soon as it is accomplished.
	 * @param [tasks.scope] {Object} An optional object the task must use as
	 * `this` when invoking the `next` callback.
	 * @return {Function} A function that starts the execution.
	 *
	 * The returned function does not return anything but expects two optional
	 * arguments: the first is a user-defined callback function invoked when all
	 * the tasks have been executed, the second is a scope object to use as
	 * `this` while invoking the callback function.
	 *
	 * The returned function may also be specified as a task for 
	 * {{#crossLink "OOGL.Async.serial"}}serial{{/crossLink}} or for another
	 * {{#crossLink "OOGL.Async.parallel"}}parallel{{/crossLink}} call.
	 * @example
	 *	TODO
	 */
	parallel: function () {
		var tasks = arguments;
		return function (callback, scope) {
			if (tasks.length) {
				var count = tasks.length;
				for (var i = 0; i < tasks.length; i++) {
					tasks[i](function () {
						if (!--count) {
							callback && callback.call(scope);
						}
					});
				}
			} else {
				callback && callback.call(scope);
			}
		};
	}
};
