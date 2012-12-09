OOGL.Context.prototype.Shader = function (type) {
	var gl = this;
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

OOGL.Context.prototype.VertexShader = function () {
	return new this.Shader(this.VERTEX_SHADER);
}
OOGL.Context.prototype.FragmentShader = function () {
	return new this.Shader(this.FRAGMENT_SHADER);
}
