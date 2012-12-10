/*global context: false */

context.Texture = function (target) {
	var texture = context.createTexture();
	context.bindTexture(target, texture);
	return {
		underlying: function () {
			return texture;
		},
		bind: function () {
			context.bindTexture(target, texture);
		},
		getParameter: function (name) {
			return context.getTexParameter(target, name);
		},
		parameterf: function (name, value) {
			context.texParameterf(target, name, value);
		},
		parameteri: function (name, value) {
			context.texParameteri(target, name, value);
		},
		generateMipmap: function () {
			context.generateMipmap(target);
		},
		image2D: function () {
			// TODO
		},
		_delete: function () {
			context.deleteTexture(texture);
		}
	};
};

context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};
context.CubeMap = function () {
	return new context.Texture(context.TEXTURE_CUBE_MAP);
};
