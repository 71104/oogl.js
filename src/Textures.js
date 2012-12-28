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

	texture.parameterf = function (name, value) {
		context.texParameterf(target, name, value);
	};
	texture.parameteri = function (name, value) {
		context.texParameteri(target, name, value);
	};
	texture.generateMipmap = function () {
		context.generateMipmap(target);
	};
	texture.image2D = function () {
		// TODO
	};
	texture.subImage2D = function () {
		// TODO
	};
	texture.copyImage2D = function (level, internalFormat, x, y, width, height, border) {
		context.copyTexImage2D(target, level, internalFormat, x, y, width, height, border || 0);
	};
	texture.copySubImage2D = function (level, xoffset, yoffset, x, y, width, height) {
		context.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
	};
	texture._delete = function () {
		context.deleteTexture(texture);
	};
	return texture;
};

context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};
context.CubeMap = function () {
	return new context.Texture(context.TEXTURE_CUBE_MAP);
};

context.Textures = function (textures) {
	textures = textures.slice(0);
	return {
		bind: function () {
			for (var i = 0; i < textures.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				textures[i].bind();
			}
		},
		uniform: function (program, names) {
			for (var i = 0; i < textures.length; i++) {
				program.uniform1i(names[i], i);
			}
		},
		_delete: function () {
			for (var i in textures) {
				textures[i]._delete();
			}
			textures = [];
		}
	};
};
