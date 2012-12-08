OOGL.Shader = function (gl, type) {
	var shader = gl.createShader(type);
	return {
		underlying: function () {
			return shader;
		},
		getParameter: function (name) {
			return gl.getShaderParameter(shader, name);
		},
		getType: function () {
			return gl.getShaderParameter(shader, gl.SHADER_TYPE);
		},
		source: function (source) {
			gl.shaderSource(shader, source);
		},
		getSource: function () {
			return gl.getShaderParameter(shader, gl.SHADER_SOURCE);
		},
		compile: function () {
			gl.compileShader(shader);
		},
		getCompileStatus: function () {
			return gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		},
		getInfoLog: function () {
			return gl.getShaderInfoLog(shader);
		},
		compileOrThrow: function () {
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				throw gl.getShaderInfoLog(shader);
			}
		},
		_delete: function () {
			gl.deleteShader(shader);
		},
		getDeleteStatus: function () {
			return gl.getShaderParameter(shader, gl.DELETE_STATUS);
		}
	};
}

OOGL.VertexShader = function (gl) {
	return new Shader(gl, gl.VERTEX_SHADER);
}
OOGL.FragmentShader = function (gl) {
	return new Shader(gl, gl.FRAGMENT_SHADER);
}
