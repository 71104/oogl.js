OOGL.Context.prototype.Texture = function (target) {
	var gl = this;
	var texture = gl.createTexture();
	gl.bindTexture(target, texture);
	return {
		underlying: function () {
			return texture;
		},
		bind: function () {
			gl.bindTexture(target, texture);
		},
		getParameter: function (name) {
			return gl.getTexParameter(target, name);
		},
		parameterf: function (name, value) {
			gl.texParameterf(target, name, value);
		},
		parameteri: function (name, value) {
			gl.texParameteri(target, name, value);
		},
		generateMipmap: function () {
			gl.generateMipmap(target);
		},
		image2D: function () {
			// TODO
		},
		_delete: function () {
			gl.deleteTexture(texture);
		}
	};
};

OOGL.Context.prototype.Texture2D = function () {
	return new this.Texture(this.TEXTURE_2D);
};
OOGL.Context.prototype.CubeMap = function () {
	return new this.Texture(this.TEXTURE_CUBE_MAP);
};
