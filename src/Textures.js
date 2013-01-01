/*global context: false */

/**
 * Wraps a GL texture with a specified target.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createTexture`. The returned `WebGLTexture` object is extended by
 * OOGL-specific features and returned by the `Texture` constructor.
 *
 * @class oogl.Texture
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
	 * Sets the minifying filter for this texture.
	 *
	 * Equivalent to calling `gl.texParameteri` with `gl.TEXTURE_MIN_FILTER`.
	 *
	 * @method setMinFilter
	 * @param {Number} filter The minifying filter; can be `gl.NEAREST`,
	 *	`gl.LINEAR`, `gl.NEAREST_MIPMAP_NEAREST`, `gl.LINEAR_MIPMAP_NEAREST`,
	 *	`gl.NEAREST_MIPMAP_LINEAR` or `gl.LINEAR_MIPMAP_LINEAR`.
	 * @example
	 *	texture.setMinFilter(oogl.LINEAR);
	 */
	texture.setMinFilter = function (filter) {
		context.texParameteri(target, context.TEXTURE_MIN_FILTER, filter);
	};

	/**
	 * Sets the magnifying filter for this texture.
	 *
	 * Equivalent to calling `gl.texParameteri` with `gl.TEXTURE_MAG_FILTER`.
	 *
	 * @method setMagFilter
	 * @param {Number} filter The magnifying filter; can be `gl.NEAREST` or
	 *	`gl.LINEAR`.
	 * @example
	 *	texture.setMagFilter(oogl.LINEAR);
	 */
	texture.setMagFilter = function (filter) {
		context.texParameteri(target, context.TEXTURE_MAG_FILTER, filter);
	};

	/**
	 * Sets the S wrapping setting for this texture.
	 *
	 * Equivalent to calling `gl.texParameteri` with `gl.TEXTURE_WRAP_S`.
	 *
	 * @method setWrapS
	 * @param {Number} wrap The S wrapping setting; can be `gl.CLAMP_TO_EDGE`,
	 *	`gl.MIRRORED_REPEAT` or `gl.REPEAT`.
	 * @example
	 *	texture.setWrapS(oogl.REPEAT);
	 */
	texture.setWrapS = function (wrap) {
		context.texParameteri(target, context.TEXTURE_WRAP_S, wrap);
	};

	/**
	 * Sets the T wrapping setting for this texture.
	 *
	 * Equivalent to calling `gl.texParameteri` with `gl.TEXTURE_WRAP_T`.
	 *
	 * @method setWrapT
	 * @param {Number} wrap The T wrapping setting; can be `gl.CLAMP_TO_EDGE`,
	 *	`gl.MIRRORED_REPEAT` or `gl.REPEAT`.
	 * @example
	 *	texture.setWrapT(oogl.REPEAT);
	 */
	texture.setWrapT = function (wrap) {
		context.texParameteri(target, context.TEXTURE_WRAP_T, wrap);
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
	 * Specifies an image, canvas or video for this texture.
	 *
	 * `gl.texImage2D` equivalent.
	 *
	 * @method image2D
	 * @param {Number} level The mipmap reduction level.
	 * @param {Number} format The texel format; can be `gl.ALPHA`, `gl.RGB`,
	 *	`gl.RGBA`, `gl.LUMINANCE` or `gl.LUMINANCE_ALPHA`.
	 * @param {Number} type The binary data type; can be `gl.UNSIGNED_BYTE`,
	 *	`gl.UNSIGNED_SHORT_5_6_5`, `gl.UNSIGNED_SHORT_4_4_4_4` or
	 *	`gl.UNSIGNED_SHORT_5_5_5_1`.
	 * @param {Mixed} object A DOM image, canvas or video element to use as
	 *	texture image.
	 * @example
	 *	texture.image2D(0, oogl.RGBA, oogl.UNSIGNED_BYTE, image);
	 */
	texture.image2D = function (level, format, type, object) {
		context.texImage2D(target, level, format, format, type, object);
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
 * A texture whose target is `gl.TEXTURE_2D`.
 *
 * @class oogl.Texture2D
 * @extends oogl.Texture
 * @constructor
 * @example
 *	var texture = new oogl.Texture2D();
 *	texture.bind();
 *	texture.setMagFilter(oogl.LINEAR);
 *	texture.setMinFilter(oogl.LINEAR);
 *	texture.image2D(0, oogl.RGBA, oogl.UNSIGNED_BYTE, image);
 */
context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};

/**
 * Creates a texture from a DOM image, canvas or video element.
 *
 * The `ImageTexture` constructor automatically binds the texture to the
 * `gl.TEXTURE_2D` target, sets minifying and magnifying filters and passes the
 * image to `gl.texImage2D`.
 *
 * @class oogl.ImageTexture
 * @extends oogl.Texture2D
 * @constructor
 * @param {Mixed} object A DOM image, canvas or video element to use as the
 *	texture image.
 * @param {Number} [magFilter=gl.LINEAR] An optional value for the magnifying
 *	filter.
 * @param {Number} [minFilter=gl.LINEAR] An optional value for the minifying
 *	filter.
 * @example
 *	var arrays = new oogl.AttributeArrays(vertices.length);
 *	// add arrays here
 *	var texture = new oogl.ImageTexture(image);
 *	arrays.drawTriangles();
 *	oogl.flush();
 */
context.AutoTexture = function (object, magFilter, minFilter) {
	var texture = new context.Texture2D();
	texture.bind();
	if (arguments.length > 1) {
		texture.setMagFilter(magFilter);
		if (arguments.length > 2) {
			texture.setMinFilter(minFilter);
		} else {
			texture.setMinFilter(context.LINEAR);
		}
	} else {
		texture.setMagFilter(context.LINEAR);
		texture.setMinFilter(context.LINEAR);
	}
	texture.image2D(0, context.RGBA, context.UNSIGNED_BYTE, object);
	return texture;
};

/**
 * A texture whose type is `gl.TEXTURE_CUBE_MAP`.
 *
 * TODO
 *
 * @class oogl.CubeMap
 * @extends oogl.Texture
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
 * @class oogl.Textures
 * @constructor
 * @param {Object[]} [textures] TODO
 * @example
 *	var textures = new oogl.Textures({
 *		'Texture': texture,
 *		'BumpMap': bumpMap
 *	});
 */
context.Textures = function (textures) {
	var names = {};
	var entries = [];
	for (var name in textures) {
		names[name] = true;
		entries.push({
			name: name,
			texture: textures[name]
		});
	}
	return {
		/**
		 * Adds a `Texture` to this set.
		 *
		 * The texture is automatically assigned a texture unit, but the set
		 * must be re-bound (using the `bind` method) before its textures can be
		 * used in programs.
		 *
		 * @method add
		 * @param {oogl.Texture} texture The OOGL texture to add.
		 * @example
		 *	TODO
		 */
		add: function (name, texture) {
			if (names.hasOwnProperty(name)) {
				throw 'the specified name is already in use.';
			} else {
				entries.push({
					name: name,
					texture: texture
				});
			}
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
		 *	textures.bind();
		 */
		bind: function () {
			for (var i = 0; i < entries.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				entries[i].texture.bind();
			}
		},

		/**
		 * TODO
		 *
		 * @method uniform
		 * @param {oogl.Program} program TODO
		 * @param {String[]} names TODO
		 * @example
		 *	var textures = new oogl.Textures({
		 *		'Texture': texture,
		 *		'BumpMap': bumpMap
		 *	});
		 *	textures.bind();
		 *	textures.uniform(program);
		 */
		uniform: function (program) {
			for (var i = 0; i < entries.length; i++) {
				program.uniform1i(entries[i].name, i);
			}
		},

		/**
		 * TODO
		 *
		 * @method bindAndUniform
		 * @param {oogl.Program} program TODO
		 * @example
		 *	var textures = new oogl.Textures({
		 *		'Texture': texture,
		 *		'BumpMap': bumpMap
		 *	});
		 *	textures.bindAnduniform(program);
		 */
		bindAndUniform: function (program) {
			for (var i = 0; i < entries.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				entries[i].texture.bind();
				program.uniform1i(entries[i].name, i);
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
		 *	textures._delete();
		 */
		_delete: function () {
			for (var i in entries) {
				entries[i].texture._delete();
			}
			names = {};
			entries = [];
		}
	};
};
