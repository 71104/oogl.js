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
		// TODO other gets
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
