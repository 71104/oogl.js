/*global OOGL: false, context: false */

/**
 * @module context
 */

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
 * @class context.Program
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
	 * Validates the program and throws an exception if the validation fails.
	 *
	 * Equivalent to calling `gl.validateProgram` and `gl.getProgramParameter`
	 * with `gl.VALIDATE_STATUS` subsequently.
	 *
	 * @method validateOrThrow
	 * @example
	 *	program.validateOrThrow();
	 */
	program.validateOrThrow = function () {
		context.validateProgram(program);
		if (!context.getProgramParameter(program, context.VALIDATE_STATUS)) {
			throw 'program validation failed.';
		}
	};

	/**
	 * Returns information about the `index`-th active attribute array.
	 *
	 * `gl.getActiveAttrib` equivalent.
	 *
	 * @method getActiveAttrib
	 * @param {Number} index The index of the attribute array.
	 * @return {WebGLActiveInfo} The requested information.
	 * @example
	 *	console.dir(program.getActiveAttrib(0));
	 */
	program.getActiveAttrib = function (index) {
		return context.getActiveAttrib(program, index);
	};

	/**
	 * Returns the number of active attribute variables.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with
	 * `gl.ACTIVE_ATTRIBUTES`.
	 *
	 * @method getNumberOfActiveAttributes
	 * @return {Number} The number of actie attribute variables.
	 * @example
	 *	console.log(program.getNumberOfActiveAttributes());
	 */
	program.getNumberOfActiveAttributes = function () {
		return context.getProgramParameter(program, context.ACTIVE_ATTRIBUTES);
	};

	/**
	 * Returns information about the `index`-th active uniform variable.
	 *
	 * `gl.getActiveUniform` equivalent.
	 *
	 * @method getActiveUniform
	 * @param {Number} index The index of the uniform variable.
	 * @return {WebGLActiveInfo} The requested information.
	 * @example
	 *	console.dir(program.getActiveUniform(0));
	 */
	program.getActiveUniform = function (index) {
		return context.getActiveUniform(program, index);
	};

	/**
	 * Returns the number of active uniform variables.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.ACTIVE_UNIFORMS`.
	 *
	 * @method getNumberOfActiveUniforms
	 * @return {Number} The number of actie uniform variables.
	 * @example
	 *	console.log(program.getNumberOfActiveUniforms());
	 */
	program.getNumberOfActiveUniforms = function () {
		return context.getProgramParameter(program, context.ACTIVE_UNIFORMS);
	};

	/**
	 * Returns the location of the named attribute.
	 *
	 * `gl.getAttribLocation` equivalent.
	 *
	 * @method getAttribLocation
	 * @param {String} name The name of the attribute.
	 * @return {Number} The location of the named attribute.
	 * @example
	 *	console.log(program.getAttribLocation('in_Vertex'));
	 */
	program.getAttribLocation = function (name) {
		return context.getAttribLocation(program, name);
	};

	/**
	 * Returns the current value of the specified uniform variable.
	 *
	 * `gl.getUniform` equivalent.
	 *
	 * The uniform variable can be identified either by name or location. When a
	 * name is specified, the location is automatically looked up in a location
	 * cache maintained by the `Program` class. This cache is automatically
	 * invalidated every time the program is linked using the provided `link`
	 * method.
	 *
	 * @method getUniform
	 * @param {Mixed} locationOrName Either the location or the name of the
	 *	uniform variable.
	 * @return {Mixed} The value of the uniform variable.
	 * @example
	 *	var angle = program.getUniform('Angle');
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
	 * Returns the location of the named uniform variable.
	 *
	 * `gl.getUniformLocation` equivalent.
	 *
	 * @method getUniformLocation
	 * @param {String} name The name of the uniform variable.
	 * @return {Number} The location of the uniform variable.
	 * @example
	 *	var location = program.getUniformLocation('Angle');
	 *	var angle = program.getUniform(location);
	 */
	program.getUniformLocation = getUniformLocation;

	/**
	 * TODO
	 *
	 * @method uniform
	 * @param {Object} map TODO
	 * @param {String} map[key].type TODO
	 * @param {Mixed} map[key].value TODO
	 * @example
	 *	TODO
	 */
	program.uniform = function (map) {
		for (var name in map) {
			if (map.hasOwnProperty(name)) {
				context['uniform' + map[name].type](getUniformLocation(name), map[name].value);
			}
		}
	};

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
	 *	program.uniform1f('Angle', 0);
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

	/**
	 * Specifies the value for an integer or boolean uniform variable.
	 *
	 * `gl.uniform1i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value.
	 * @example
	 *	TODO
	 */
	program.uniform1i = function (name, x) {
		context.uniform1i(getUniformLocation(name), x);
	};

	/**
	 * Specifies the value for an `ivec2` or `bvec2` uniform variable.
	 *
	 * `gl.uniform2i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @example
	 *	TODO
	 */
	program.uniform2i = function (name, x, y) {
		context.uniform2i(getUniformLocation(name), x, y);
	};

	/**
	 * Specifies the value for an `ivec3` or `bvec3` uniform variable.
	 *
	 * `gl.uniform3i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @example
	 *	TODO
	 */
	program.uniform3i = function (name, x, y, z) {
		context.uniform3i(getUniformLocation(name), x, y, z);
	};

	/**
	 * Specifies the value for an `ivec4` or `bvec4` uniform variable.
	 *
	 * `gl.uniform4i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @param {Number} w The new value for the fourth component.
	 * @example
	 *	TODO
	 */
	program.uniform4i = function (name, x, y, z, w) {
		context.uniform4i(getUniformLocation(name), x, y, z, w);
	};

	/**
	 * Specifies the value for an integer or boolean uniform variable as an
	 * array.
	 *
	 * `gl.uniform1iv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1iv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new value.
	 * @example
	 *	TODO
	 */
	program.uniform1iv = function (name, values) {
		context.uniform1iv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for an `ivec2` uniform variable as an array.
	 *
	 * `gl.uniform2iv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2iv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform2iv = function (name, values) {
		context.uniform2iv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for an `ivec3` uniform variable as an array.
	 *
	 * `gl.uniform3iv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3iv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform3iv = function (name, values) {
		context.uniform3iv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for an `ivec4` uniform variable as an array.
	 *
	 * `gl.uniform4iv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4iv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform4iv = function (name, values) {
		context.uniform4iv(getUniformLocation(name), values);
	};

	/**
	 * TODO
	 *
	 * @method uniformVec2
	 * @param {String} name TODO
	 * @param {OOGL.Vector2} v TODO
	 * @example
	 *	TODO
	 */
	program.uniformVec2 = function (name, v) {
		context.uniform2f(getUniformLocation(name), v.x, v.y);
	};

	/**
	 * TODO
	 *
	 * @method uniformVec3
	 * @param {String} name TODO
	 * @param {OOGL.Vector3} v TODO
	 * @example
	 *	TODO
	 */
	program.uniformVec3 = function (name, v) {
		context.uniform3f(getUniformLocation(name), v.x, v.y, v.z);
	};

	/**
	 * TODO
	 *
	 * @method uniformVec4
	 * @param {String} name TODO
	 * @param {OOGL.Vector4} v TODO
	 * @example
	 *	TODO
	 */
	program.uniformVec4 = function (name, v) {
		context.uniform2f(getUniformLocation(name), v.x, v.y, v.z, v.w);
	};

	/**
	 * TODO
	 *
	 * @method uniformMatrix2fv
	 * @param {String} name TODO
	 * @param {Number[]} values TODO
	 * @example
	 *	TODO
	 */
	program.uniformMatrix2fv = function (name, values) {
		context.uniformMatrix2fv(getUniformLocation(name), false, values);
	};

	/**
	 * TODO
	 *
	 * @method uniformMatrix3fv
	 * @param {String} name TODO
	 * @param {Number[]} values TODO
	 * @example
	 *	TODO
	 */
	program.uniformMatrix3fv = function (name, values) {
		context.uniformMatrix3fv(getUniformLocation(name), false, values);
	};

	/**
	 * TODO
	 *
	 * @method uniformMatrix4fv
	 * @param {String} name TODO
	 * @param {Number[]} values TODO
	 * @example
	 *	TODO
	 */
	program.uniformMatrix4fv = function (name, values) {
		context.uniformMatrix4fv(getUniformLocation(name), false, values);
	};

	/**
	 * TODO
	 *
	 * @method uniformMat2
	 * @param {String} name TODO
	 * @param {OOGL.Matrix2} matrix TODO
	 * @example
	 *	TODO
	 */
	program.uniformMat2 = function (name, matrix) {
		context.uniformMatrix2fv(getUniformLocation(name), false, [
			matrix[0], matrix[1],
			matrix[2], matrix[3]
		]);
	};

	/**
	 * TODO
	 *
	 * @method uniformMat3
	 * @param {String} name TODO
	 * @param {OOGL.Matrix3} matrix TODO
	 * @example
	 *	TODO
	 */
	program.uniformMat3 = function (name, matrix) {
		context.uniformMatrix3fv(getUniformLocation(name), false, [
			matrix[0], matrix[1], matrix[2],
			matrix[3], matrix[4], matrix[5],
			matrix[6], matrix[7], matrix[8]
		]);
	};

	/**
	 * TODO
	 *
	 * @method uniformMat4
	 * @param {String} name TODO
	 * @param {OOGL.Matrix4} matrix TODO
	 * @example
	 *	TODO
	 */
	program.uniformMat4 = function (name, matrix) {
		context.uniformMatrix4fv(getUniformLocation(name), false, [
			matrix[0], matrix[1], matrix[2], matrix[3],
			matrix[4], matrix[5], matrix[6], matrix[7],
			matrix[8], matrix[9], matrix[10], matrix[11],
			matrix[12], matrix[13], matrix[14], matrix[15]
		]);
	};

	/**
	 * Deletes this program.
	 *
	 * `gl.deleteProgram` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	program._delete();
	 */
	program._delete = function () {
		context.deleteProgram(program);
	};

	/**
	 * Returns the delete status of this program.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.DELETE_STATUS`.
	 *
	 * @method getDeleteStatus
	 * @return {Boolean} The delete status.
	 * @example
	 *	if (program.getDeleteStatus()) {
	 *		// the program has been deleted
	 *	}
	 */
	program.getDeleteStatus = function () {
		return context.getProgramParameter(program, context.DELETE_STATUS);
	};

	return program;
};

/**
 * A `Program` that automatically compiles and links using a pair of GLSL shader
 * sources. The info log is thrown if the program fails to compile or link.
 *
 * Before linking, the `AutoProgram` constructor also binds a specified set of
 * attribute variables to their respective indices using `bindAttribLocation`.
 *
 * @class context.AutoProgram
 * @extends context.Program
 * @constructor
 * @param {String} vertexSource The GLSL source code for the vertex shader.
 * @param {String} fragmentSource The GLSL source code for the fragment shader.
 * @param {String[]} attributes An array of attribute variable names that are
 *	automatically bound to their respective indices in the array before linking.
 * @example
 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoords']);
 */
context.AutoProgram = function (vertexSource, fragmentSource, attributes) {
	var program = new context.Program();
	var vertexShader = new context.VertexShader(vertexSource);
	var fragmentShader = new context.FragmentShader(fragmentSource);

	/**
	 * Returns the vertex shader automatically generated by the constructor.
	 *
	 * @method getVertexShader
	 * @return {context.VertexShader} The vertex shader.
	 * @example
	 *	TODO
	 */
	program.getVertexShader = function () {
		return vertexShader;
	};

	/**
	 * Returns the fragment shader automatically generated by the constructor.
	 *
	 * @method getFragmentShader
	 * @return {context.FragmentShader} The fragment shader.
	 * @example
	 *	TODO
	 */
	program.getFragmentShader = function () {
		return fragmentShader;
	};

	program.attachShader(vertexShader);
	program.attachShader(fragmentShader);
	program.bindAttribLocations(attributes);
	program.linkOrThrow();

	return program;
};


/**
 * A `Program` that loads the sources of a pair of shaders via AJAX and
 * automatically tries to compile and link; the info log is thrown if the
 * program fails to compile or link.
 *
 * The URLs to the GLSL shader sources are specified as a single path without
 * file name extension; the `.vert` and `.frag` extensions are automatically
 * appended to it.
 *
 * Before linking, the `AjaxProgram` constructor also binds a specified set of
 * attribute variables to their respective indices using `bindAttribLocation`.
 *
 * If the program is compiled and linked successfully, the specified `callback`
 * function is invoked using this `AjaxProgram` object as `this`.
 *
 * @class context.AjaxProgram
 * @extends context.Program
 * @constructor
 * @param {String} name The URL to the shader sources excluding the file name
 *	extension, which is automatically appended.
 * @param {String[]} attributes An array of attribute variable names that are
 *	automatically bound to their respective indices in the array before linking.
 * @param {Function} callback A user-defined callback function that is called
 *	after the program has been successfully compiled and linked.
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
		var vertexShader = new context.VertexShader(vertexSource);
		program.attachShader(vertexShader);
		OOGL.Ajax.get(name + '.frag', function (fragmentSource) {
			var fragmentShader = new context.FragmentShader(fragmentSource);
			program.attachShader(fragmentShader);

			/**
			 * Returns the vertex shader automatically generated by the
			 * constructor.
			 *
			 * @method getVertexShader
			 * @return {context.VertexShader} The vertex shader.
			 * @example
			 *	TODO
			 */
			program.getVertexShader = function () {
				return vertexShader;
			};

			/**
			 * Returns the fragment shader automatically generated by the
			 * constructor.
			 *
			 * @method getFragmentShader
			 * @return {context.FragmentShader} The fragment shader.
			 * @example
			 *	TODO
			 */
			program.getFragmentShader = function () {
				return fragmentShader;
			};

			program.bindAttribLocations(attributes);
			program.linkOrThrow();
			callback && callback.call(program);
		});
	});
	return program;
};
