/*global context: false */

/**
 * Wraps a GL framebuffer object.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createFramebuffer`. The returned `WebGLFramebuffer` object is extended by
 * OOGL-specific features and returned by the `Framebuffer` constructor.
 *
 * @class .Framebuffer
 * @constructor
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var framebuffer = new oogl.Framebuffer();
 */
context.Framebuffer = function () {
	var framebuffer = context.createFramebuffer();

	/**
	 * TODO
	 *
	 * `gl.getAttachmentParameter` equivalent.
	 *
	 * @method getAttachmentParameter
	 * @param {Number} attachment TODO
	 * @param {Number} name TODO
	 * @return {Mixed} TODO
	 * @example
	 *	var attachmentType = framebuffer.getAttachmentParameter(oogl.COLOR_ATTACHMENT0, oogl.FRAMEBUFFER_ATTACHMENT_TYPE);
	 */
	framebuffer.getAttachmentParameter = function (attachment, name) {
		return context.getFramebufferAttachmentParameter(context.FRAMEBUFFER, attachment, name);
	};

	/**
	 * TODO
	 *
	 * `gl.bindFramebuffer` equivalent.
	 *
	 * @method bind
	 * @example
	 *	framebuffer.bind();
	 */
	framebuffer.bind = function () {
		context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
	};

	/**
	 * TODO
	 *
	 * `gl.checkFramebufferStatus` equivalent.
	 *
	 * @method checkStatus
	 * @return {Number} TODO
	 * @example
	 *	var status = framebuffer.checkStatus();
	 */
	framebuffer.checkStatus = function () {
		return context.checkFramebufferStatus(context.FRAMEBUFFER);
	};

	/**
	 * TODO
	 *
	 * `gl.framebufferRenderbuffer` equivalent.
	 *
	 * @method renderbuffer
	 * @param {Number} attachment TODO
	 * @param {WebGLRenderbuffer} renderbuffer TODO
	 * @example
	 *	TODO
	 */
	framebuffer.renderbuffer = function (attachment, renderbuffer) {
		context.framebufferRenderbuffer(context.FRAMEBUFFER, attachment, context.RENDERBUFFER, renderbuffer);
	};

	/**
	 * TODO
	 *
	 * `gl.framebufferTexture2D` equivalent.
	 *
	 * @method texture2D
	 * @param {Number} attachment TODO
	 * @param {Number} textarget TODO
	 * @param {WebGLTexture} texture TODO
	 * @param {Number} level TODO
	 * @example
	 *	TODO
	 */
	framebuffer.texture2D = function (attachment, textarget, texture, level) {
		context.framebufferTexture2D(context.FRAMEBUFFER, attachment, textarget, texture, level);
	};

	/**
	 * TODO
	 *
	 * `gl.deleteFramebuffer` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	framebuffer._delete();
	 */
	framebuffer._delete = function () {
		context.deleteFramebuffer(framebuffer);
	};

	return framebuffer;
};
