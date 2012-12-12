/*global context: false */

context.Texture = function (target) {
	var texture = context.createTexture();
	texture.bind = function () {
		context.bindTexture(target, texture);
	};
	texture.getParameter = function (name) {
		return context.getTexParameter(target, name);
	};
	texture.parameterf = function (name, value) {
		context.texParameterf(target, name, value);
	};
	texture.parameteri = function (name, value) {
		context.texParameteri(target, name, value);
	};
	texture.generateMipmap = function () {
		context.generateMipmap(target);
	};
	texture.image2D = function () {
		// TODO
	};
	texture.subImage2D = function () {
		// TODO
	};
	texture.copyImage2D = function () {
		// TODO
	};
	texture._delete = function () {
		context.deleteTexture(texture);
	};
	return texture;
};

context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};
context.CubeMap = function () {
	return new context.Texture(context.TEXTURE_CUBE_MAP);
};

context.Textures = function (textures) {
	textures = textures.slice(0);
	return {
		bind: function () {
			for (var i = 0; i < textures.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				textures[i].bind();
			}
		},
		uniform: function (program, names) {
			for (var i = 0; i < textures.length; i++) {
				program.uniform1i(names[i], i);
			}
		},
		_delete: function () {
			for (var i in textures) {
				textures[i]._delete();
			}
			textures = [];
		}
	};
};
