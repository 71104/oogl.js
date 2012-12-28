/*global OOGL: false, context: false */

/**
 * Wraps a GL shader.
 *
 * @class .Shader
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
	shader.source = function (source) {
		context.shaderSource(shader, source);
	};
	shader.getSource = function () {
		return context.getShaderParameter(shader, context.SHADER_SOURCE);
	};
	shader.compile = function () {
		context.compileShader(shader);
	};
	shader.getCompileStatus = function () {
		return context.getShaderParameter(shader, context.COMPILE_STATUS);
	};
	shader.getInfoLog = function () {
		return context.getShaderInfoLog(shader);
	};
	shader.compileOrThrow = function () {
		context.compileShader(shader);
		if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
			throw context.getShaderInfoLog(shader);
		}
	};
	shader._delete = function () {
		context.deleteShader(shader);
	};
	shader.getDeleteStatus = function () {
		return context.getShaderParameter(shader, context.DELETE_STATUS);
	};
	return shader;
};

/**
 * TODO
 *
 * @class .VertexShader
 * @extends .Shader
 * @constructor
 * @param {String} [source] TODO
 * @example
 *	TODO
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
 * TODO
 *
 * @class .FragmentShader
 * @extends .Shader
 * @constructor
 * @param {String} [source] TODO
 * @example
 *	TODO
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
 * TODO
 *
 * @class .AjaxVertexShader
 * @extends .Shader
 * @constructor
 * @param {String} name TODO
 * @param {Function} callback TODO
 * @example
 *	TODO
 */
context.AjaxVertexShader = function (name, callback) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	OOGL.Ajax.get(name + '.vert', function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};

/**
 * TODO
 *
 * @class .AjaxFragmentShader
 * @extends .Shader
 * @constructor
 * @param {String} name TODO
 * @param {Function} callback TODO
 * @example
 *	TODO
 */
context.AjaxFragmentShader = function (name, callback) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	OOGL.Ajax.get(name + '.frag', function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};
