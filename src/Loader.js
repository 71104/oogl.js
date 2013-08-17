/*global OOGL: false */
/*global context: false */

/**
 * @module context
 */

/**
 * Manages asynchronous asset loading with progress feedback.
 *
 * @class context.Loader
 * @extends OOGL.TaskQueue
 * @constructor
 * @param tasks* {Function} Zero or more asynchronous tasks to queue. See the
 * {{#crossLink "OOGL.TaskQueue"}}TaskQueue{{/crossLink}} description for more
 * information.
 * @example
 *	TODO
 */
context.Loader = function () {
	OOGL.TaskQueue.apply(this, arguments);
	var thisObject = this;

	var textures = {};
	var programs = {};

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
	this.queueTexture = function (id, minFilter, magFilter) {
		if (arguments.length < 2) {
			magFilter = context.LINEAR;
			minFilter = context.LINEAR;
		} else if (arguments.length < 3) {
			minFilter = context.LINEAR;
		}
		return thisObject.queue(function (next) {
			textures[id] = new context.AsyncTexture(id, next, minFilter, magFilter);
		});
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
	 * @example
	 *	TODO
	 */
	this.queueTextures = function (ids) {
		return thisObject.queue.apply(thisObject, ids.map(function (id) {
			return function (next) {
				textures[id] = new context.AsyncTexture(id, next);
			};
		}));
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
		return thisObject.queue(function (next) {
			programs[id] = new context.AjaxProgram(id, attributes, next);
		});
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
				thisObject.queue((function (id, attributes) {
					return function (next) {
						programs[id] = new context.AjaxProgram(id, attributes, next);
					};
				})(id, map[id]));
			}
		}
		return thisObject;
	};

	/**
	 * Retrieves a {{#crossLink "context.Program"}}Program{{/crossLink}} object
	 * loaded from the shader pair identified by the specified URL.
	 *
	 * @method getProgram
	 * @param id {String} The URL of a previously loaded shader pair, not
	 * including the filename extension.
	 * @return {context.Program} A `Program` object representing the GL program.
	 * @example
	 *	TODO
	 */
	this.getProgram = function (id) {
		if (programs.hasOwnProperty(id)) {
			return programs[id];
		}
	};
};
