/*global context: false */

context.Renderbuffer = function () {
	var renderbuffer = context.createRenderbuffer();
	renderbuffer.getParameter = function (name) {
		return context.getRenderbufferParameter(context.RENDERBUFFER, name);
	};
	renderbuffer.getWidth = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_WIDTH);
	};
	renderbuffer.getHeight = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_HEIGHT);
	};
	renderbuffer.getInternalFormat = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_INTERNAL_FORMAT);
	};
	renderbuffer.getRedSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_RED_SIZE);
	};
	renderbuffer.getGreenSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_GREEN_SIZE);
	};
	renderbuffer.getBlueSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_BLUE_SIZE);
	};
	renderbuffer.getAlphaSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_ALPHA_SIZE);
	};
	renderbuffer.getDepthSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_DEPTH_SIZE);
	};
	renderbuffer.getStencilSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_STENCIL_SIZE);
	};
	renderbuffer.bind = function () {
		context.bindRenderbuffer(context.RENDERBUFFER, renderbuffer);
	};
	renderbuffer.storage = function (internalFormat, width, height) {
		context.renderbufferStorage(context.RENDERBUFFER, internalFormat, width, height);
	};
	renderbuffer._delete = function () {
		context.deleteRenderbuffer(renderbuffer);
	};
	return renderbuffer;
};
