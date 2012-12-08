OOGL.Framebuffer = function (gl) {
	var framebuffer = gl.createFramebuffer();
	return {
		underlying: function () {
			return framebuffer;
		},
		// TODO
		_delete: function () {
			gl.deleteFramebuffer(framebuffer);
		}
	};
};
