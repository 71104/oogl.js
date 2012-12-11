/*global context: false */

context.Texture = function (target) {
	var texture = context.createTexture();
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
		subImage2D: function () {
			// TODO
		},
		copyImage2D: function () {
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

context.Textures = function (textures) {
	var textures = textures.slice(0);
	return {
		add: function (texture) {
			textures.push(texture);
		},
		bind: function () {
			for (var i = 0; i < textures.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				textures[i].bind();
			}
		},
		uniform: function (program, names) {
			for (var i = 0; i < textures.length; i++) {
				// TODO
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
