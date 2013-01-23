/*global context: false */

/**
 * Wraps a GL renderbuffer.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createRenderbuffer`. The returned `WebGLRenderbuffer` object is extended by
 * OOGL-specific features and returned by the `Renderbuffer` constructor.
 *
 * @class context.Renderbuffer
 * @constructor
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var renderbuffer = new oogl.Renderbuffer();
 */
context.Renderbuffer = function () {
	var renderbuffer = context.createRenderbuffer();

	/**
	 * Indicates whether this is a valid GL renderbuffer.
	 *
	 * `gl.isRenderbuffer` equivalent.
	 *
	 * @method is
	 * @return {Boolean} `true` is this is a valid GL renderbuffer, `false`
	 *	otherwise.
	 * @example
	 *	if (renderbuffer.is()) {
	 *		// ...
	 */
	renderbuffer.is = function () {
		return context.isRenderbuffer(renderbuffer);
	};

	/**
	 * Queries a renderbuffer-related parameter.
	 *
	 * `gl.getRenderbufferParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {String} name TODO
	 * @return {Mixed} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getParameter = function (name) {
		return context.getRenderbufferParameter(context.RENDERBUFFER, name);
	};

	/**
	 * TODO
	 *
	 * @method getWidth
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getWidth = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_WIDTH);
	};

	/**
	 * TODO
	 *
	 * @method getHeight
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getHeight = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_HEIGHT);
	};

	/**
	 * TODO
	 *
	 * @method getInternalFormat
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getInternalFormat = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_INTERNAL_FORMAT);
	};

	/**
	 * TODO
	 *
	 * @method getRedSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getRedSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_RED_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getGreenSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getGreenSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_GREEN_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getBlueSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getBlueSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_BLUE_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getAlphaSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getAlphaSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_ALPHA_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getDepthSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getDepthSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_DEPTH_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getStencilSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getStencilSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_STENCIL_SIZE);
	};

	/**
	 * Binds this renderbuffer.
	 *
	 * `gl.bindRenderbuffer` equivalent.
	 *
	 * @method bind
	 * @example
	 *	renderbuffer.bind();
	 */
	renderbuffer.bind = function () {
		context.bindRenderbuffer(context.RENDERBUFFER, renderbuffer);
	};

	/**
	 * TODO
	 *
	 * @method storage
	 * @param {Number} internalFormat TODO
	 * @param {Number} width TODO
	 * @param {Number} height TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.storage = function (internalFormat, width, height) {
		context.renderbufferStorage(context.RENDERBUFFER, internalFormat, width, height);
	};

	/**
	 * Deletes this renderbuffer.
	 *
	 * `gl.deleteRenderbuffer` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	renderbuffer._delete();
	 */
	renderbuffer._delete = function () {
		context.deleteRenderbuffer(renderbuffer);
	};

	return renderbuffer;
};
