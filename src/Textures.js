/*global context: false */

/**
 * Wraps a GL texture with a specified target.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createTexture`. The returned `WebGLTexture` object is extended by
 * OOGL-specific features and returned by the `Texture` constructor.
 *
 * @class .Texture
 * @extends WebGLTexture
 * @constructor
 * @param {Number} target The target against which this texture will be bound
 *	when the provided `bind` method is used. Either `gl.TEXTURE_2D` or
 *	`gl.TEXTURE_CUBE_MAP`.
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var texture = new oogl.Texture(oogl.TEXTURE_2D);
 */
context.Texture = function (target) {
	var texture = context.createTexture();

	/**
	 * Indicates whether this is a valid GL texture.
	 *
	 * `gl.isTexture` equivalent.
	 *
	 * @method is
	 * @return {Boolean} `true` if this is a valid GL texture, `false`
	 *	otherwise.
	 * @example
	 *	if (texture.is()) {
	 *		// ...
	 */
	texture.is = function () {
		return context.isTexture(texture);
	};

	/**
	 * Binds this texture to its target.
	 *
	 * `gl.bindTexture` equivalent.
	 *
	 * @method bind
	 * @example
	 *	texture.bind();
	 */
	texture.bind = function () {
		context.bindTexture(target, texture);
	};

	/**
	 * Queries a texture-related parameter.
	 *
	 * `gl.getTexParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {Number} name The name of the parameter to query.
	 * @return {Mixed} The queried value.
	 * @example
	 *	var wrapS = texture.getParameter(oogl.TEXTURE_WRAP_S);
	 */
	texture.getParameter = function (name) {
		return context.getTexParameter(target, name);
	};

	/**
	 * Queries the "min filter" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_MIN_FILTER`.
	 *
	 * @method getMinFilter
	 * @return {Number} The "min filter" parameter; one of `gl.NEAREST`,
	 *	`gl.LINEAR`, `gl.NEAREST_MIPMAP_NEAREST`, `gl.LINEAR_MIPMAP_NEAREST`,
	 *	`gl.NEAREST_MIPMAP_LINEAR` or `gl.LINEAR_MIPMAP_LINEAR`.
	 * @example
	 *	var minFilter = texture.getMinFilter();
	 */
	texture.getMinFilter = function () {
		return context.getTexParameter(target, context.TEXTURE_MIN_FILTER);
	};

	/**
	 * Queries the "mag filter" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_MAG_FILTER`.
	 *
	 * @method getMagFilter
	 * @return {Number} The "mag filter" parameter; one of `gl.NEAREST`,
	 *	`gl.LINEAR`.
	 * @example
	 *	var magFilter = texture.getMagFilter();
	 */
	texture.getMagFilter = function () {
		return context.getTexParameter(target, context.TEXTURE_MAG_FILTER);
	};

	/**
	 * Queries the "wrap S" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_WRAP_S`.
	 *
	 * @method getWrapS
	 * @return {Number} The "wrap S" parameter; one of `gl.CLAMP_TO_EDGE`,
	 *	`gl.MIRRORED_REPEAT` or `gl.REPEAT`.
	 * @example
	 *	var wrapS = texture.getWrapS();
	 */
	texture.getWrapS = function () {
		return context.getTexParameter(target, context.TEXTURE_WRAP_S);
	};


	/**
	 * Queries the "wrap T" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_WRAP_T`.
	 *
	 * @method getWrapT
	 * @return {Number} The "wrap T" parameter; one of `gl.CLAMP_TO_EDGE`,
	 *	`gl.MIRRORED_REPEAT` or `gl.REPEAT`.
	 * @example
	 *	var wrapT = texture.getWrapT();
	 */
	texture.getWrapT = function () {
		return context.getTexParameter(target, context.TEXTURE_WRAP_T);
	};

	/**
	 * TODO
	 *
	 * @method parameterf
	 * @param {Number} name TODO
	 * @param {Number} value TODO
	 * @example
	 *	TODO
	 */
	texture.parameterf = function (name, value) {
		context.texParameterf(target, name, value);
	};

	/**
	 * TODO
	 *
	 * @method parameteri
	 * @param {Number} name TODO
	 * @param {Number} value TODO
	 * @example
	 *	TODO
	 */
	texture.parameteri = function (name, value) {
		context.texParameteri(target, name, value);
	};

	/**
	 * TODO
	 *
	 * `gl.generateMipmap` equivalent.
	 *
	 * @method generateMipmap
	 * @example
	 *	TODO
	 */
	texture.generateMipmap = function () {
		context.generateMipmap(target);
	};

	/**
	 * TODO
	 *
	 * @method image2D
	 * @example
	 *	TODO
	 */
	texture.image2D = function () {
		// TODO
	};

	/**
	 * TODO
	 *
	 * @method subImage2D
	 * @example
	 *	TODO
	 */
	texture.subImage2D = function () {
		// TODO
	};

	/**
	 * TODO
	 *
	 * `gl.copyTexImage2D` equivalent.
	 *
	 * @method copyImage2D
	 * @param {Number} level TODO
	 * @param {Number} internalFormat TODO
	 * @param {Number} x TODO
	 * @param {Number} y TODO
	 * @param {Number} width TODO
	 * @param {Number} height TODO
	 * @param {Number} border TODO
	 * @example
	 *	TODO
	 */
	texture.copyImage2D = function (level, internalFormat, x, y, width, height, border) {
		context.copyTexImage2D(target, level, internalFormat, x, y, width, height, border || 0);
	};

	/**
	 * TODO
	 *
	 * `gl.copyTexSubImage2D` equivalent.
	 *
	 * @method copySubImage2D
	 * @param {Number} level TODO
	 * @param {Number} xoffset TODO
	 * @param {Number} yoffset TODO
	 * @param {Number} x TODO
	 * @param {Number} y TODO
	 * @param {Number} width TODO
	 * @param {Number} height TODO
	 * @example
	 *	TODO
	 */
	texture.copySubImage2D = function (level, xoffset, yoffset, x, y, width, height) {
		context.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
	};

	/**
	 * Deletes this texture.
	 *
	 * `gl.deleteTexture` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	texture._delete();
	 */
	texture._delete = function () {
		context.deleteTexture(texture);
	};

	return texture;
};

/**
 * A texture whose type is `gl.TEXTURE_2D`.
 *
 * TODO
 *
 * @class .Texture2D
 * @extends .Texture
 * @constructor
 * @example
 *	TODO
 */
context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};

/**
 * A texture whose type is `gl.TEXTURE_CUBE_MAP`.
 *
 * TODO
 *
 * @class .CubeMap
 * @extends .Texture
 * @constructor
 * @example
 *	TODO
 */
context.CubeMap = function () {
	return new context.Texture(context.TEXTURE_CUBE_MAP);
};

/**
 * A utility class that aids in the management of multiple textures.
 *
 * One `Textures` objects represents a set of textures that must be
 * simultaneously bound (to different texture units) for use by the same
 * program. The `Textures` object automatically assigns textures to texture
 * units.
 *
 * A `Texture` object may also belong to several `Textures` sets at the same
 * time, so that it can be used by several programs.
 *
 * @class .Textures
 * @constructor
 * @param {.Texture[]} [textures] An optional array of OOGL texture objects to
 *	add to the set. If you specify an empty array or not specify one at all you
 *	can later add textures using the `add` method.
 * @example
 *	TODO
 */
context.Textures = function (textures) {
	textures = textures && textures.slice(0) || [];
	return {
		/**
		 * Adds a `Texture` to this set.
		 *
		 * The texture is automatically assigned a texture unit, but the set
		 * must be re-bound (using the `bind` method) before its textures can be
		 * used in programs.
		 *
		 * @method add
		 * @param {.Texture} texture The OOGL texture to add.
		 * @example
		 *	TODO
		 */
		add: function (texture) {
			textures.push(texture);
		},

		/**
		 * Binds all the textures in this sets to their target in their
		 * respective texture unit.
		 *
		 * Equivalent to calling `gl.activeTexture` and `gl.bindTexture` for
		 * each texture.
		 *
		 * @method bind
		 * @example
		 *	TODO
		 */
		bind: function () {
			for (var i = 0; i < textures.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				textures[i].bind();
			}
		},

		/**
		 * TODO
		 *
		 * @method uniform
		 * @param {.Program} program TODO
		 * @param {String[]} names TODO
		 * @example
		 *	TODO
		 */
		uniform: function (program, names) {
			for (var i = 0; i < textures.length; i++) {
				program.uniform1i(names[i], i);
			}
		},

		/**
		 * Deletes all the textures that have been added to this set and resets
		 * it to an empty set.
		 *
		 * `Textures` objects may be used again after deletion.
		 *
		 * @method _delete
		 * @example
		 *	TODO
		 */
		_delete: function () {
			for (var i in textures) {
				textures[i]._delete();
			}
			textures = [];
		}
	};
};
