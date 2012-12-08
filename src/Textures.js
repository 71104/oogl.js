OOGL.Texture = function (gl, target) {
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

OOGL.Texture2D = function (gl) {
	return new OOGL.Texture(gl, gl.TEXTURE_2D);
};
OOGL.CubeMap = function (gl) {
	return new OOGL.Texture(gl, gl.TEXTURE_CUBE_MAP);
};
