/*global context: false */

context.Program = function () {
	var program = context.createProgram();
	return {
		underlying: function () {
			return program;
		},
		getParameter: function (name) {
			return context.getProgramParameter(program, name);
		},
		attachShader: function (shader) {
			context.attachShader(program, shader.underlying());
		},
		detachShader: function (shader) {
			context.detachShader(program, shader.underlying());
		},
		bindAttribLocation: function (index, name) {
			context.bindAttribLocation(program, index, name);
		},
		link: function () {
			context.linkProgram(program);
		},
		getLinkStatus: function () {
			return context.getProgramParameter(program, context.LINK_STATUS);
		},
		getInfoLog: function () {
			return context.getProgramInfoLog(program);
		},
		linkOrThrow: function () {
			context.linkProgram(program);
			if (!context.getProgramParameter(program, context.LINK_STATUS)) {
				throw context.getProgramInfoLog(program);
			}
		},
		use: function () {
			context.useProgram(program);
		},
		validate: function () {
			context.validateProgram(program);
			return context.getProgramParameter(program, context.VALIDATE_STATUS);
		},
		_delete: function () {
			context.deleteProgram(program);
		},
		getDeleteStatus: function () {
			return context.getProgramParameter(program, context.DELETE_STATUS);
		}
	};
};

context.DefaultProgram = function (name, attributes, callback) {
	var program = new context.Program();
	var vertexShader = new context.VertexShader(name, function () {
		program.attachShader(vertexShader);
		var fragmentShader = new context.FragmentShader(name, function () {
			program.attachShader(fragmentShader);
			for (var i = 0; i < attributes.length; i++) {
				program.bindAttribLocation(i, attributes[i]);
			}
			program.linkOrThrow();
			callback && callback();
		});
	});
	return program;
};
