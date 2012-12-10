/*global OOGL: false, context: false */

context.Shader = function (type) {
	var shader = context.createShader(type);
	return {
		underlying: function () {
			return shader;
		},
		getParameter: function (name) {
			return context.getShaderParameter(shader, name);
		},
		getType: function () {
			return context.getShaderParameter(shader, context.SHADER_TYPE);
		},
		source: function (source) {
			context.shaderSource(shader, source);
		},
		getSource: function () {
			return context.getShaderParameter(shader, context.SHADER_SOURCE);
		},
		compile: function () {
			context.compileShader(shader);
		},
		getCompileStatus: function () {
			return context.getShaderParameter(shader, context.COMPILE_STATUS);
		},
		getInfoLog: function () {
			return context.getShaderInfoLog(shader);
		},
		compileOrThrow: function () {
			context.compileShader(shader);
			if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
				throw context.getShaderInfoLog(shader);
			}
		},
		_delete: function () {
			context.deleteShader(shader);
		},
		getDeleteStatus: function () {
			return context.getShaderParameter(shader, context.DELETE_STATUS);
		}
	};
};

context.VertexShader = function (name, callback) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	OOGL.Ajax.get(name + '.vert', function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};
context.FragmentShader = function (name, callback) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	OOGL.Ajax.get(name + '.frag', function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};
