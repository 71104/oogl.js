/*global context: false */

context.Framebuffer = function () {
	var framebuffer = context.createFramebuffer();
	return {
		underlying: function () {
			return framebuffer;
		},
		getAttachmentParameter: function (attachment, name) {
			return context.getFramebufferAttachmentParameter(context.FRAMEBUFFER, attachment, name);
		},
		bind: function () {
			context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
		},
		checkStatus: function () {
			return context.checkFramebufferStatus(context.FRAMEBUFFER);
		},
		renderbuffer: function (attachment, renderbuffer) {
			context.framebufferRenderbuffer(context.FRAMEBUFFER, attachment, context.RENDERBUFFER, renderbuffer.underlying());
		},
		texture2D: function (attachment, textarget, texture, level) {
			context.framebufferTexture2D(context.FRAMEBUFFER, attachment, textarget, texture.underlying(), level);
		},
		_delete: function () {
			context.deleteFramebuffer(framebuffer);
		}
	};
};
