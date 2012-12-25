/*global context: false */

/**
 * Wraps a GL framebuffer object.
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
	 * @method
	 * @param
	 * @return
	 * @example
	 *	framebuffer.bind();
	 */
	framebuffer.bind = function () {
		context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 */
	framebuffer.checkStatus = function () {
		return context.checkFramebufferStatus(context.FRAMEBUFFER);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 */
	framebuffer.renderbuffer = function (attachment, renderbuffer) {
		context.framebufferRenderbuffer(context.FRAMEBUFFER, attachment, context.RENDERBUFFER, renderbuffer);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 */
	framebuffer.texture2D = function (attachment, textarget, texture, level) {
		context.framebufferTexture2D(context.FRAMEBUFFER, attachment, textarget, texture, level);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 *	framebuffer._delete();
	 */
	framebuffer._delete = function () {
		context.deleteFramebuffer(framebuffer);
	};

	return framebuffer;
};
