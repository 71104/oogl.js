/*global OOGL: false */
/*global context: false */

/**
 * @module context
 */

/**
 * Manages asynchronous asset loading with progress feedback.
 *
 * @class context.Loader
 * @constructor
 * @example
 *	TODO
 */
context.Loader = function () {
	var thisObject = this;
	var queue = [];

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
			queue.push(function (data, textures, programs, callback, scope) {
				OOGL.Ajax.get(id, parameters, function (response) {
					data[id] = response;
					callback && callback.call(scope);
				}, type);
			});
		} else {
			queue.push(function (data, textures, programs, callback, scope) {
				OOGL.Ajax.get(id, function (response) {
					data[id] = response;
					callback && callback.call(scope);
				}, type);
			});
		}
		return thisObject;
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
			queue.push(function (data, textures, programs, callback, scope) {
				OOGL.Ajax.getJSON(id, parameters, function (response) {
					data[id] = response;
					callback && callback.call(scope);
				});
			});
		} else {
			queue.push(function (data, textures, programs, callback, scope) {
				OOGL.Ajax.getJSON(id, function (response) {
					data[id] = response;
					callback && callback.call(scope);
				});
			});
		}
		return thisObject;
	};

	/**
	 * Queues an asynchronous task that loads and creates a texture given its
	 * URL.
	 *
	 * Internally the `queueTexture` method uses the
	 * {{#crossLink "context.AsyncTexture"}}AsyncTexture{{/crossLink}} class.
	 *
	 * After being loaded, the texture can be retrieved via the
	 * {{#crossLink "OOGL.Loader/getTexture"}}getTexture{{/crossLink}} method as
	 * a {{#crossLink "context.Texture2D"}}Texture2D{{/crossLink}} object.
	 *
	 * @method queueTexture
	 * @chainable
	 * @param id {String} The URL of the texture image to load.
	 * @param [magFilter=gl.LINEAR] {Number} An optional value for the
	 * magnifying filter. See
	 * {{#crossLink "context.AsyncTexture"}}AsyncTexture{{/crossLink}} for more
	 * information.
	 * @param [minFilter=gl.LINEAR] {Number} An optional value for the minifying
	 * filter. See
	 * {{#crossLink "context.AsyncTexture"}}AsyncTexture{{/crossLink}} for more
	 * information.
	 * @example
	 *	TODO
	 */
	this.queueTexture = function (id, magFilter, minFilter) {
		if (arguments.length < 2) {
			magFilter = context.LINEAR;
			minFilter = context.LINEAR;
		} else if (arguments.length < 3) {
			minFilter = context.LINEAR;
		}
		queue.push(function (data, textures, programs, callback, scope) {
			textures[id] = new context.AsyncTexture(id, function () {
				callback && callback.call(scope);
			}, magFilter, minFilter);
		});
		return thisObject;
	};

	/**
	 * Queues asynchronous tasks that load and create zero or more textures
	 * given their URLs.
	 *
	 * Internally the `queueTextures` method uses the
	 * {{#crossLink "context.AsyncTexture"}}AsyncTexture{{/crossLink}} class.
	 *
	 * After being loaded, the textures can be retrieved via the
	 * {{#crossLink "OOGL.Loader/getTexture"}}getTexture{{/crossLink}} method as
	 * {{#crossLink "context.Texture2D"}}Texture2D{{/crossLink}} objects.
	 *
	 * @method queueTextures
	 * @chainable
	 * @param ids {String[]} An array of image URLs.
	 * @param [magFilter=gl.LINEAR] {Number} An optional value for the
	 * magnifying filter. See
	 * {{#crossLink "context.AsyncTexture"}}AsyncTexture{{/crossLink}} for more
	 * information.
	 * @param [minFilter=gl.LINEAR] {Number} An optional value for the minifying
	 * filter. See
	 * {{#crossLink "context.AsyncTexture"}}AsyncTexture{{/crossLink}} for more
	 * information.
	 * @example
	 *	TODO
	 */
	this.queueTextures = function (ids, magFilter, minFilter) {
		if (arguments.length < 2) {
			magFilter = context.LINEAR;
			minFilter = context.LINEAR;
		} else if (arguments.length < 3) {
			minFilter = context.LINEAR;
		}
		queue.push.apply(queue, ids.map(function (id) {
			return function (data, textures, programs, callback, scope) {
				textures[id] = new context.AsyncTexture(id, function () {
					callback && callback.call(scope);
				}, magFilter, minFilter);
			};
		}));
		return thisObject;
	};

	/**
	 * Queues an asynchronous task that loads, compiles and links the specified
	 * shader pair, and returns it as a
	 * {{#crossLink "context.Program"}}Program{{/crossLink}} object.
	 *
	 * Internally the `queueProgram` method uses the
	 * {{#crossLink "context.AjaxProgram"}}AjaxProgram{{/crossLink}} class.
	 *
	 * The loaded program can then be retrieved using the
	 * {{#crossLink "context.Loader/getProgram"}}getProgram{{/crossLink}}
	 * method.
	 *
	 * @method queueProgram
	 * @chainable
	 * @param id {String} The URL of the GLSL shaders to load, excluding the
	 * filename extension which is automatically appended (`.frag` for fragment
	 * shaders and `.vert` for vertex shaders).
	 * @param attributes {String[]} An array of attribute array variable names
	 * to associate to array indices. See the
	 * {{#crossLink "context.AjaxProgram"}}AjaxProgam{{/crossLink}} class for
	 * more information.
	 * @example
	 *	TODO
	 */
	this.queueProgram = function (id, attributes) {
		queue.push(function (data, textures, programs, callback, scope) {
			programs[id] = new context.AjaxProgram(id, attributes, function () {
				callback && callback.call(scope);
			});
		});
		return thisObject;
	};

	/**
	 * Queues asynchronous tasks that load, compile and link zero or more shader
	 * pairs, and return them as
	 * {{#crossLink "context.Program"}}Program{{/crossLink}} objects.
	 *
	 * Internally the `queuePrograms` method uses the
	 * {{#crossLink "context.AjaxProgram"}}AjaxProgram{{/crossLink}} class to
	 * load each shader pair.
	 *
	 * The loaded programs can then be retrieved using the
	 * {{#crossLink "context.Loader/getProgram"}}getProgram{{/crossLink}}
	 * method.
	 *
	 * @method queuePrograms
	 * @chainable
	 * @param map {Object} A dictionary object that associates shader pair URLs
	 * to attribute arrays. For example:
	 *
	 *	{
	 *		"glsl/box": ["in_Vertex", "in_TexCoord"]
	 *		"glsl/sphere": ["in_Vertex", "in_Normal", "in_TexCoord"]
	 *	}
	 *
	 * In this example we assumed there is a `glsl` directory containing two
	 * shaders pairs: `box.vert`, `box.frag`, `sphere.vert` and `sphere.frag`.
	 * Besides, the `box` shaders use two attribute arrays which are `in_Vertex`
	 * and `in_TexCoord`, while the `sphere` shaders use three attribute arrays
	 * which are `in_Vertex`, `in_Normal` and `in_TexCoord`.
	 * @example
	 *	TODO
	 */
	this.queuePrograms = function (map) {
		for (var id in map) {
			if (map.hasOwnProperty(id)) {
				queue.push((function (id, attributes) {
					return function (data, textures, programs, callback, scope) {
						programs[id] = new context.AjaxProgram(id, attributes, function () {
							callback && callback.call(scope);
						});
					};
				})(id, map[id]));
			}
		}
		return thisObject;
	};

	/**
	 * Represents a set of loaded assets, including textures, programs and
	 * generic data.
	 *
	 * Assets can be retrieved by the URLs from which they have been loaded and
	 * the entire set may be eventually discarded.
	 *
	 * This class cannot be instantiated directly; instances are returned by the
	 * {{#crossLink "context.Loader/loadAssets"}}loadAssets{{/crossLink}} method
	 * to its callback function.
	 *
	 * @class context.Loader.Assets
	 * @example
	 *	TODO
	 */
	function Assets(data, textures, programs) {
		/**
		 * Retrieves data previously loaded via the
		 * {{#crossLink "context.Loader/queueData"}}queueData{{/crossLink}} or
		 * {{#crossLink "context.Loader/queueJSON"}}queueJSON{{/crossLink}}
		 * method.
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
		 * Retrieves a {{#crossLink "context.Texture2D"}}Texture2D{{/crossLink}}
		 * object loaded from the image identified by the specified URL.
		 *
		 * @method getTexture
		 * @param id {String} The URL of a previously loaded texture image.
		 * @return {context.Texture2D} A `Texture2D` object representing the GL
		 * texture.
		 * @example
		 *	TODO
		 */
		this.getTexture = function (id) {
			if (textures.hasOwnProperty(id)) {
				return textures[id];
			}
		};

		/**
		 * Retrieves a {{#crossLink "context.Program"}}Program{{/crossLink}}
		 * object loaded from the shader pair identified by the specified URL.
		 *
		 * @method getProgram
		 * @param id {String} The URL of a previously loaded shader pair, not
		 * including the filename extension.
		 * @return {context.Program} A `Program` object representing the GL
		 * program.
		 * @example
		 *	TODO
		 */
		this.getProgram = function (id) {
			if (programs.hasOwnProperty(id)) {
				return programs[id];
			}
		};

		/**
		 * Discards all the assets managed by this object: textures and programs
		 * are destroyed and generic data is discarded.
		 *
		 * After the assets have been discarded they cannot be retrieved any
		 * more by the
		 * {{#crossLink "context.Loader.Assets/getData"}}getData{{/crossLink}},
		 * {{#crossLink "context.Loader.Assets/getTextures"}}getTextures{{/crossLink}}
		 * and
		 * {{#crossLink "context.Loader.Assets/getPrograms"}}getPrograms{{/crossLink}}
		 * methods.
		 */
		this.discard = function () {
			data = {};

			var id;

			for (id in textures) {
				if (textures.hasOwnProperty(id)) {
					textures[id]._delete();
				}
			}
			textures = {};

			for (id in programs) {
				if (programs.hasOwnProperty(id)) {
					programs[id]._delete();
				}
			}
			programs = {};
		};
	}

	/**
	 * TODO
	 *
	 * @method loadAssets
	 * @for context.Loader
	 * @chainable
	 * @param callback {Function} TODO
	 * @param [scope] {Object} TODO
	 */
	this.loadAssets = function (callback, scope) {
		var data = {};
		var textures = {};
		var programs = {};

		var boundTasks = queue.map(function (task) {
			return task.bind(null, data, textures, programs);
		});
		queue = [];

		OOGL.Async.parallel(boundTasks)(function () {
			callback.call(scope, new Assets(data, textures, programs));
		});
	};
};
