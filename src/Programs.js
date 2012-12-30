/*global OOGL: false, context: false */

/**
 * Wraps a GL program.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createProgram`. The returned `WebGLProgram` object is extended by
 * OOGL-specific features and returned by the `Program` constructor.
 *
 * `Program` objects also maintain an independent uniform location cache so that
 * uniform operations are sped up as `gl.getUniformLocation` calls are needed
 * only once per variable name. The cache is automatically invalidated when the
 * program is linked using the provided `link` or `linkOrThrow` methods.
 *
 * @class oogl.Program
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
	 * @param {String} name The name of the parameter to query.
	 * @return {Mixed} The queried value.
	 * @example
	 *	if (!program.getParameter(oogl.LINK_STATUS)) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.getParameter = function (name) {
		return context.getProgramParameter(program, name);
	};

	/**
	 * Attaches the specified shader to this program.
	 *
	 * `gl.attachShader` equivalent.
	 *
	 * @method attachShader
	 * @param {WebGLShader} shader The shader to attach. Can also be an OOGL
	 *	`Shader`.
	 * @example
	 *	var program = new oogl.Program();
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	program.linkOrThrow();
	 */
	program.attachShader = function (shader) {
		context.attachShader(program, shader);
	};

	/**
	 * Detaches the specified shader from this program.
	 *
	 * `gl.detachShader` equivalent.
	 *
	 * @method detachShader
	 * @param {WebGLShader} shader The shader to detach. Can also be an OOGL
	 *	`Shader`.
	 * @example
	 *	var vertexShader = new oogl.Shader(oogl.VERTEX_SHADER);
	 *	var program = new oogl.Program();
	 *	program.attachShader(vertexShader);
	 *	program.detachShader(vertexShader);
	 */
	program.detachShader = function (shader) {
		context.detachShader(program, shader);
	};

	/**
	 * Returns an array of `WebGLShader` representing the shaders currently
	 * attached to this program.
	 *
	 * `gl.getAttachedShaders` equivalent.
	 *
	 * @method getAttachedShaders
	 * @return {WebGLShader[]} An array of the currently attached shaders.
	 * @example
	 *	var program = new oogl.Program();
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	var shaders = program.getAttachedShaders(); // shaders now contains two elements
	 */
	program.getAttachedShaders = function () {
		return context.getAttachedShaders(program);
	};

	/**
	 * Returns the number of currently attached shaders.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with
	 * `gl.ATTACHED_SHADERS`.
	 *
	 * @method getNumberOfAttachedShaders
	 * @return {Number} The number of currently attached shaders.
	 * @example
	 *	var program = new oogl.Program();
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	var count = program.getNumberOfAttachedShaders(); // 2
	 */
	program.getNumberOfAttachedShaders = function () {
		return context.getProgramParameter(program, context.ATTACHED_SHADERS);
	};

	/**
	 * Binds the specified shader attribute variable `name` to the attribute
	 * array whose `index` is specified.
	 *
	 * `gl.bindAttribLocation` equivalent.
	 *
	 * @method bindAttribLocation
	 * @param {Number} index The index of the attribute array.
	 * @param {String} name The name of the shader attribute variable.
	 * @example
	 *	program.bindAttribLocation(0, 'in_Vertex');
	 *	program.bindAttribLocation(1, 'in_Color');
	 *	program.bindAttribLocation(2, 'in_TexCoords');
	 */
	program.bindAttribLocation = function (index, name) {
		context.bindAttribLocation(program, index, name);
	};

	/**
	 * Iterates over the specified `attributes` array of strings and binds each
	 * string to its index. For example, these calls:
	 *
	 *	program.bindAttribLocation(0, 'in_Vertex');
	 *	program.bindAttribLocation(1, 'in_Color');
	 *	program.bindAttribLocation(2, 'in_TexCoords');
	 *
	 * Can be made only once using `bindAttribLocations` like this:
	 *
	 *	program.bindAttribLocations(['in_Vertex', 'in_Color', 'in_TexCoords']);
	 *
	 * @method bindAttribLocations
	 * @param {String[]} attributes The array, or index-to-string map,
	 *	specifying the names to bind and their respective indices.
	 * @example
	 *	program.bindAttribLocations(['in_Vertex', 'in_Color', 'in_TexCoords']);
	 */
	program.bindAttribLocations = function (attributes) {
		for (var i in attributes) {
			context.bindAttribLocation(program, parseInt(i, 10), attributes[i]);
		}
	};

	/**
	 * Links the program and invalidates the uniform location cache used to
	 * speed up uniform operations.
	 *
	 * `gl.linkProgram` equivalent.
	 *
	 * @method link
	 * @example
	 *	program.link();
	 *	if (!program.getLinkStatus()) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.link = function () {
		locationCache = {};
		context.linkProgram(program);
	};

	/**
	 * Returns the link status of this program.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.LINK_STATUS`.
	 *
	 * @method getLinkStatus
	 * @return {Boolean} `true` if the program has been successuflly linked,
	 *	`false` otherwise.
	 * @example
	 *	program.link();
	 *	if (!program.getLinkStatus()) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.getLinkStatus = function () {
		return context.getProgramParameter(program, context.LINK_STATUS);
	};

	/**
	 * Returns the info log generated by the last link operation for this
	 * program.
	 *
	 * `gl.getProgramInfoLog` equivalent.
	 *
	 * @method getInfoLog
	 * @return {String} The info log.
	 * @example
	 *	program.link();
	 *	if (!program.getLinkStatus()) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.getInfoLog = function () {
		return context.getProgramInfoLog(program);
	};

	/**
	 * Links the program, invalidates the uniform location cache used to speed
	 * up uniform operations and checks the link status; throws the info log if
	 * the program did not link successfully.
	 *
	 * @method linkOrThrow
	 * @example
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	program.linkOrThrow();
	 */
	program.linkOrThrow = function () {
		locationCache = {};
		context.linkProgram(program);
		if (!context.getProgramParameter(program, context.LINK_STATUS)) {
			throw context.getProgramInfoLog(program);
		}
	};

	/**
	 * Uses the program in the GL pipeline.
	 *
	 * `gl.useProgram` equivalent.
	 *
	 * @method use
	 * @example
	 *	program.use();
	 */
	program.use = function () {
		context.useProgram(program);
	};

	/**
	 * Validates the program.
	 *
	 * `gl.validateProgram` equivalent.
	 *
	 * @method validate
	 * @example
	 *	program.validate();
	 *	if (!program.getValidateStatus()) {
	 *		throw 'program validation error';
	 *	}
	 */
	program.validate = function () {
		context.validateProgram(program);
	};

	/**
	 * Returns the validation status produced by the last validation operation
	 * for this program.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.VALIDATE_STATUS`.
	 *
	 * @method getValidateStatus
	 * @return {Boolean} The validation status.
	 * @example
	 *	program.validate();
	 *	if (!program.getValidateStatus()) {
	 *		throw 'program validation error';
	 *	}
	 */
	program.getValidateStatus = function () {
		return context.getProgramParameter(program, context.VALIDATE_STATUS);
	};

	/**
	 * TODO
	 *
	 * @method getActiveAttrib
	 * @param {Number} index TODO
	 * @return {WebGLActiveInfo} TODO
	 * @example
	 *	TODO
	 */
	program.getActiveAttrib = function (index) {
		return context.getActiveAttrib(program, index);
	};

	/**
	 * TODO
	 *
	 * @method getActiveUniform
	 * @param {Number} index TODO
	 * @return {WebGLActiveInfo} TODO
	 * @example
	 *	TODO
	 */
	program.getActiveUniform = function (index) {
		return context.getActiveUniform(program, index);
	};

	/**
	 * TODO
	 *
	 * @method getAttribLocation
	 * @param {String} name TODO
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	program.getAttribLocation = function (name) {
		return context.getAttribLocation(program, name);
	};

	/**
	 * TODO
	 *
	 * @method getUniform
	 * @param {Mixed} locationOrName TODO
	 * @return {Mixed} TODO
	 * @example
	 *	TODO
	 */
	program.getUniform = function (locationOrName) {
		if (typeof locationOrName !== 'string') {
			return context.getUniform(program, locationOrName);
		} else {
			return context.getUniform(program, locationCache[locationOrName] ||
				(locationCache[locationOrName] = context.getUniformLocation(program, locationOrName)));
		}
	};

	function getUniformLocation(name) {
		return locationCache[name] = context.getUniformLocation(program, name);
	}

	/**
	 * TODO
	 *
	 * @method getUniformLocation
	 * @param {String} name TODO
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	program.getUniformLocation = getUniformLocation;

	/**
	 * Specifies the value for a `float` uniform variable.
	 *
	 * `gl.uniform1f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value.
	 * @example
	 *	TODO
	 */
	program.uniform1f = function (name, x) {
		context.uniform1f(getUniformLocation(name), x);
	};

	/**
	 * Specifies the value for a `vec2` uniform variable.
	 *
	 * `gl.uniform2f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @example
	 *	TODO
	 */
	program.uniform2f = function (name, x, y) {
		context.uniform2f(getUniformLocation(name), x, y);
	};

	/**
	 * Specifies the value for a `vec3` uniform variable.
	 *
	 * `gl.uniform3f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @example
	 *	TODO
	 */
	program.uniform3f = function (name, x, y, z) {
		context.uniform3f(getUniformLocation(name), x, y, z);
	};


	/**
	 * Specifies the value for a `vec4` uniform variable.
	 *
	 * `gl.uniform4f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @param {Number} w The new value for the fourth component.
	 * @example
	 *	TODO
	 */
	program.uniform4f = function (name, x, y, z, w) {
		context.uniform4f(getUniformLocation(name), x, y, z, w);
	};

	/**
	 * Specifies the value for a `float` uniform variable as an array.
	 *
	 * `gl.uniform1fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new value.
	 * @example
	 *	TODO
	 */
	program.uniform1fv = function (name, values) {
		context.uniform1fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for a `vec2` uniform variable as an array.
	 *
	 * `gl.uniform2fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform2fv = function (name, values) {
		context.uniform2fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for a `vec3` uniform variable as an array.
	 *
	 * `gl.uniform3fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform3fv = function (name, values) {
		context.uniform3fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for a `vec4` uniform variable as an array.
	 *
	 * `gl.uniform4fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform4fv = function (name, values) {
		context.uniform4fv(getUniformLocation(name), values);
	};

	program.uniform1i = function (name, x) {
		context.uniform1i(getUniformLocation(name), x);
	};

	program.uniform2i = function (name, x, y) {
		context.uniform2i(getUniformLocation(name), x, y);
	};

	program.uniform3i = function (name, x, y, z) {
		context.uniform3i(getUniformLocation(name), x, y, z);
	};

	program.uniform4i = function (name, x, y, z, w) {
		context.uniform4i(getUniformLocation(name), x, y, z, w);
	};

	program.uniform1iv = function (name, values) {
		context.uniform1iv(getUniformLocation(name), values);
	};

	program.uniform2iv = function (name, values) {
		context.uniform2iv(getUniformLocation(name), values);
	};

	program.uniform3iv = function (name, values) {
		context.uniform3iv(getUniformLocation(name), values);
	};

	program.uniform4iv = function (name, values) {
		context.uniform4iv(getUniformLocation(name), values);
	};

	program.uniformVec2 = function (name, v) {
		context.uniform2f(getUniformLocation(name), v.x, v.y);
	};

	program.uniformVec3 = function (name, v) {
		context.uniform3f(getUniformLocation(name), v.x, v.y, v.z);
	};

	program.uniformVec4 = function (name, v) {
		context.uniform2f(getUniformLocation(name), v.x, v.y, v.z, v.w);
	};

	/**
	 * TODO
	 *
	 * @method _delete
	 * @example
	 *	program._delete();
	 */
	program._delete = function () {
		context.deleteProgram(program);
	};

	/**
	 * TODO
	 *
	 * @method getDeleteStatus
	 * @return {Boolean} TODO
	 * @example
	 *	TODO
	 */
	program.getDeleteStatus = function () {
		return context.getProgramParameter(program, context.DELETE_STATUS);
	};

	return program;
};

/**
 * TODO
 *
 * @class oogl.AutoProgram
 * @extends oogl.Program
 * @constructor
 * @param {String} vertexSource TODO
 * @param {String} fragmentSource TODO
 * @param {String[]} attributes TODO
 * @example
 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoords']);
 */
context.AutoProgram = function (vertexSource, fragmentSource, attributes) {
	var program = new context.Program();
	program.attachShader(new context.VertexShader(vertexSource));
	program.attachShader(new context.FragmentShader(fragmentSource));
	program.bindAttribLocations(attributes);
	program.linkOrThrow();
	return program;
};


/**
 * TODO
 *
 * @class oogl.AjaxProgram
 * @extends oogl.Program
 * @constructor
 * @param {String} name TODO
 * @param {String[]} attributes TODO
 * @param {Function} callback TODO
 * @example
 *	var arrays = new oogl.AttributeArrays(vertices.length);
 *	arrays.add3('float', vertices);
 *	arrays.add3('float', colors);
 *	arrays.add2('float', textureCoordinates);
 *	var program = new oogl.AjaxProgram('box', ['in_Vertex', 'in_Color', 'in_TexCoords'], function () {
 *		program.use();
 *		arrays.drawTriangles();
 *		oogl.flush();
 *	});
 */
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
