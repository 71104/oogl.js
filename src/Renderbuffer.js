OOGL.Renderbuffer = function (gl) {
	var renderbuffer = gl.createRenderbuffer();
	return {
		underlying: function () {
			return renderbuffer;
		},
		getParameter: function (name) {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, name);
		},
		getWidth: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_WIDTH);
		},
		getHeight: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_HEIGHT);
		},
		getInternalFormat: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_INTERNAL_FORMAT);
		},
		getRedSize: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_RED_SIZE);
		},
		getGreenSize: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_GREEN_SIZE);
		},
		getBlueSize: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_BLUE_SIZE);
		},
		getAlphaSize: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_ALPHA_SIZE);
		},
		getDepthSize: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_DEPTH_SIZE);
		},
		getStencilSize: function () {
			return gl.getRenderbufferParameter(gl.RENDERBUFFER, gl.RENDERBUFFER_STENCIL_SIZE);
		},
		bind: function () {
			gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
		},
		storage: function (internalFormat, width, height) {
			gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);
		},
		_delete: function () {
			gl.deleteRenderbuffer(renderbuffer);
		}
	};
};
