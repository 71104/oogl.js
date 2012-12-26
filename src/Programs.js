/*global OOGL: false, context: false */

/**
 * Wraps a GL program.
 *
 * `Program` objects also maintain an independent uniform location cache so that
 * uniform operations are sped up as `gl.getUniformLocation` calls are needed
 * only once per variable name. The cache is automatically invalidated when the
 * program is linked using the provided `link` or `linkOrThrow` methods.
 *
 * @class .Program
 * @extends WebGLProgram
 * @constructor
 * @example
 *	var program = new oogl.Program();
 *	program.attachShader(vertexShader); // either a WebGLShader or OOGL.VertexShader object
 *	program.attachShader(fragmentShader); // either a WebGLShader or OOGL.VertexShader object
 *	program.linkOrThrow();
 */
context.Program = function () {
	var program = context.createProgram();
	var locationCache = {};

	/**
	 * Queries a program-related parameter.
	 *
	 * `gl.getProgramParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {String} name TODO
	 * @return {Mixed} TODO
	 * @example
	 *	TODO
	 */
	program.getParameter = function (name) {
		return context.getProgramParameter(program, name);
	};
	program.attachShader = function (shader) {
		context.attachShader(program, shader);
	};
	program.detachShader = function (shader) {
		context.detachShader(program, shader);
	};
	program.bindAttribLocation = function (index, name) {
		context.bindAttribLocation(program, index, name);
	};
	program.bindAttribLocations = function (attributes) {
		for (var i = 0; i < attributes.length; i++) {
			context.bindAttribLocation(program, i, attributes[i]);
		}
	};
	program.link = function () {
		locationCache = {};
		context.linkProgram(program);
	};
	program.getLinkStatus = function () {
		return context.getProgramParameter(program, context.LINK_STATUS);
	};
	program.getInfoLog = function () {
		return context.getProgramInfoLog(program);
	};
	program.linkOrThrow = function () {
		context.linkProgram(program);
		if (!context.getProgramParameter(program, context.LINK_STATUS)) {
			throw context.getProgramInfoLog(program);
		}
	};
	program.use = function () {
		context.useProgram(program);
	};
	program.validate = function () {
		context.validateProgram(program);
		return context.getProgramParameter(program, context.VALIDATE_STATUS);
	};
	program.getActiveAttrib = function (index) {
		return context.getActiveAttrib(program, index);
	};
	program.getActiveUniform = function (index) {
		return context.getActiveUniform(program, index);
	};
	program.getAttribLocation = function (name) {
		return context.getAttribLocation(program, name);
	};
	program.getUniform = function (locationOrName) {
		if (typeof locationOrName !== 'string') {
			return context.getUniform(program, locationOrName);
		} else {
			return context.getUniform(program, locationCache[locationOrName] ||
				(locationCache[locationOrName] = context.getUniformLocation(program, locationOrName)));
		}
	};
	program.getUniformLocation = function (name) {
		return locationCache[name] = context.getUniformLocation(program, name);
	};
	// TODO uniform
	program._delete = function () {
		context.deleteProgram(program);
	};
	program.getDeleteStatus = function () {
		return context.getProgramParameter(program, context.DELETE_STATUS);
	};
	return program;
};

context.AutoProgram = function (vertexSource, fragmentSource, attributes) {
	var program = new context.Program();
	program.attachShader(new context.VertexShader(vertexSource));
	program.attachShader(new context.FragmentShader(fragmentSource));
	program.bindAttribLocations(attributes);
	program.linkOrThrow();
	return program;
};

context.AjaxProgram = function (name, attributes, callback) {
	var program = new context.Program();
	OOGL.Ajax.get(name + '.vert', function (vertexSource) {
		program.attachShader(new context.VertexShader(vertexSource));
		OOGL.Ajax.get(name + '.frag', function (fragmentSource) {
			program.attachShader(new context.FragmentShader(fragmentSource));
			program.bindAttribLocations(attributes);
			program.linkOrThrow();
			callback && callback();
		});
	});
	return program;
};
