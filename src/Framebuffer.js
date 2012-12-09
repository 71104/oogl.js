OOGL.Context.prototype.Framebuffer = function () {
	var gl = this;
	var framebuffer = gl.createFramebuffer();
	return {
		underlying: function () {
			return framebuffer;
		},
		getAttachmentParameter: function (attachment, name) {
			return gl.getFramebufferAttachmentParameter(gl.FRAMEBUFFER, attachment, name);
		},
		bind: function () {
			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		},
		checkStatus: function () {
			return gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		},
		renderbuffer: function (attachment, renderbuffer) {
			gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.underlying());
		},
		texture2D: function (attachment, textarget, texture, level) {
			gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, textarget, texture.underlying(), level);
		},
		_delete: function () {
			gl.deleteFramebuffer(framebuffer);
		}
	};
};
