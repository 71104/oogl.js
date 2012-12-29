/*global OOGL: false, context: false */

/**
 * Wraps a GL shader.
 *
 * @class oogl.Shader
 * @extends WebGLShader
 * @constructor
 * @param {Number} type The type of shader. Either `oogl.VERTEX_SHADER` or
 *	`oogl.FRAGMENT_SHADER`.
 * @example
 *	var vertexShader = new oogl.Shader(oogl.VERTEX_SHADER);
 *	vertexShader.source(vertexSource);
 *	vertexShader.compileOrThrow();
 */
context.Shader = function (type) {
	var shader = context.createShader(type);

	/**
	 * Queries a shader-related parameter.
	 *
	 * `gl.getShaderParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {String} name The parameter name.
	 * @return {Mixed} The queried value.
	 * @example
	 *	var shaderType = shader.getParameter(oogl.SHADER_TYPE);
	 */
	shader.getParameter = function (name) {
		return context.getShaderParameter(shader, name);
	};

	/**
	 * Returns the type of this shader, which is either `gl.VERTEX_SHADER` or
	 * `gl.FRAGMENT_SHADER`.
	 *
	 * Equivalent to calling `gl.getShaderParameter` with `gl.SHADER_TYPE`.
	 *
	 * @method getType
	 * @return {Number} The type of this shader.
	 * @example
	 *	var shaderType = shader.getType();
	 */
	shader.getType = function () {
		return context.getShaderParameter(shader, context.SHADER_TYPE);
	};

	/**
	 * Specifies the GLSL source code for this shader.
	 *
	 * `gl.shaderSource` equivalent.
	 *
	 * @method source
	 * @param {String} source The GLSL source code.
	 * @example
	 *	var shader = new oogl.Shader(oogl.VERTEX_SHADER);
	 *	shader.source(vertexSource);
	 */
	shader.source = function (source) {
		context.shaderSource(shader, source);
	};

	/**
	 * Returns the GLSL source code for this shader.
	 *
	 * Equivalent to calling `gl.getShaderParameter` with `gl.SHADER_SOURCE`.
	 *
	 * @method getSource
	 * @return {String} The GLSL source code.
	 * @example
	 *	var vertexSource = vertexShader.getSource();
	 */
	shader.getSource = function () {
		return context.getShaderParameter(shader, context.SHADER_SOURCE);
	};

	/**
	 * Compiles this shader.
	 *
	 * `gl.compileShader` equivalent.
	 *
	 * @method compile
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compile();
	 *	if (!shader.getCompileStatus()) {
	 *		throw shader.getInfoLog();
	 *	}
	 */
	shader.compile = function () {
		context.compileShader(shader);
	};

	/**
	 * Returns the compile status produced by the last compile operation for
	 * this shader.
	 *
	 * Equivalent to calling `gl.getShaderParameter` with `gl.COMPILE_STATUS`.
	 *
	 * @method getCompileStatus
	 * @return {Boolean} `true` if the shader was compiled successfully, `false`
	 *	otherwise.
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compile();
	 *	if (!shader.getCompileStatus()) {
	 *		throw shader.getInfoLog();
	 *	}
	 */
	shader.getCompileStatus = function () {
		return context.getShaderParameter(shader, context.COMPILE_STATUS);
	};

	/**
	 * Returns the info log produced by the last compile operation for this
	 * shader.
	 *
	 * `gl.getShaderInfoLog` equivalent.
	 *
	 * @method getInfoLog
	 * @return {String} The info log.
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compile();
	 *	if (!shader.getCompileStatus()) {
	 *		throw shader.getInfoLog();
	 *	}
	 */
	shader.getInfoLog = function () {
		return context.getShaderInfoLog(shader);
	};

	/**
	 * Compiles this shader, throws the info log if the shader does not compile
	 * successfully.
	 *
	 * @method compileOrThrow
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compileOrThrow();
	 */
	shader.compileOrThrow = function () {
		context.compileShader(shader);
		if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
			throw context.getShaderInfoLog(shader);
		}
	};

	/**
	 * Deletes this shader.
	 *
	 * @method _delete
	 * @example
	 *	shader._delete();
	 */
	shader._delete = function () {
		context.deleteShader(shader);
	};

	/**
	 * Returns the delete status for this shader.
	 *
	 * @method getDeleteStatus
	 * @return {Boolean} `true` if the shader has been deleted, `false`
	 *	otherwise.
	 * @example
	 *	if (shader.getDeleteStatus()) {
	 *		throw 'The shader has been deleted.';
	 *	}
	 */
	shader.getDeleteStatus = function () {
		return context.getShaderParameter(shader, context.DELETE_STATUS);
	};

	return shader;
};

/**
 * A `Shader` whose type is `gl.VERTEX_SHADER`.
 *
 * The `VertexShader` constructor optionally takes a string argument containing
 * the GLSL source code for the shader and tries to compile it through the
 * provided `compileOrThrow` method.
 *
 * @class oogl.VertexShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} [source] The optional GLSL source code for the shader.
 * @example
 *	var vertexShader = new oogl.VertexShader(vertexSource);
 */
context.VertexShader = function (source) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	if (source) {
		shader.source(source);
		shader.compileOrThrow();
	}
	return shader;
};

/**
 * A `Shader` whose type is `gl.FRAGMENT_SHADER`.
 *
 * The `FragmentShader` constructor optionally takes a string argument
 * containing the GLSL source code for the shader and tries to compile it
 * through the provided `compileOrThrow` method.
 *
 * @class oogl.FragmentShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} [source] The optional GLSL source code for the shader.
 * @example
 *	var fragmentShader = new oogl.FragmentShader(fragmentSource);
 */
context.FragmentShader = function (source) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	if (source) {
		shader.source(source);
		shader.compileOrThrow();
	}
	return shader;
};

/**
 * A vertex shader which tries to load its GLSL source code using AJAX.
 *
 * The `AjaxVertexShader` constructor also tries to compile the shader using the
 * provided `compileOrThrow` method. After the source code has been loaded and
 * compiled successfully the specified callback function is invoked.
 *
 * @class oogl.AjaxVertexShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} url A URL referring to the GLSL source code.
 * @param {Function} [callback] The callback function.
 * @example
 *	var program = new oogl.Program();
 *	var vertexShader = new oogl.AjaxVertexShader('vert/box.vert', function () {
 *		program.attachShader(vertexShader);
 *	});
 */
context.AjaxVertexShader = function (url, callback) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	OOGL.Ajax.get(url, function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};

/**
 * A fragment shader which tries to load its GLSL source code using AJAX.
 *
 * The `AjaxFragmentShader` constructor also tries to compile the shader using
 * the provided `compileOrThrow` method. After the source code has been loaded
 * and compiled successfully the specified callback function is invoked.
 *
 * @class oogl.AjaxFragmentShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} url A URL referring to the GLSL source code.
 * @param {Function} [callback] The callback function.
 * @example
 *	var program = new oogl.Program();
 *	var fragmentShader = new oogl.AjaxFragmentShader('frag/box.frag', function () {
 *		program.attachShader(fragmentShader);
 *	});
 */
context.AjaxFragmentShader = function (url, callback) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	OOGL.Ajax.get(url, function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};
