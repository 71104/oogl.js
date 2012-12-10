/*global context: false */

context.Renderbuffer = function () {
	var renderbuffer = context.createRenderbuffer();
	return {
		underlying: function () {
			return renderbuffer;
		},
		getParameter: function (name) {
			return context.getRenderbufferParameter(context.RENDERBUFFER, name);
		},
		getWidth: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_WIDTH);
		},
		getHeight: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_HEIGHT);
		},
		getInternalFormat: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_INTERNAL_FORMAT);
		},
		getRedSize: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_RED_SIZE);
		},
		getGreenSize: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_GREEN_SIZE);
		},
		getBlueSize: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_BLUE_SIZE);
		},
		getAlphaSize: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_ALPHA_SIZE);
		},
		getDepthSize: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_DEPTH_SIZE);
		},
		getStencilSize: function () {
			return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_STENCIL_SIZE);
		},
		bind: function () {
			context.bindRenderbuffer(context.RENDERBUFFER, renderbuffer);
		},
		storage: function (internalFormat, width, height) {
			context.renderbufferStorage(context.RENDERBUFFER, internalFormat, width, height);
		},
		_delete: function () {
			context.deleteRenderbuffer(renderbuffer);
		}
	};
};
