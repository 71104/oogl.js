OOGL.Context.prototype.Program = function () {
	var gl = this;
	var program = gl.createProgram();
	return {
		underlying: function () {
			return program;
		},
		getParameter: function (name) {
			return gl.getProgramParameter(program, name);
		},
		attachShader: function (shader) {
			gl.attachShader(program, shader.underlying());
		},
		detachShader: function (shader) {
			gl.detachShader(program, shader.underlying());
		},
		bindAttribLocation: function (index, name) {
			gl.bindAttribLocation(program, index, name);
		},
		link: function () {
			gl.linkProgram(program);
		},
		getLinkStatus: function () {
			return gl.getProgramParameter(program, gl.LINK_STATUS);
		},
		getInfoLog: function () {
			return gl.getProgramInfoLog(program);
		},
		linkOrThrow: function () {
			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				throw gl.getProgramInfoLog(program);
			}
		},
		use: function () {
			gl.useProgram(program);
		},
		validate: function () {
			gl.validateProgram(program);
			return gl.getProgramParameter(program, gl.VALIDATE_STATUS);
		},
		_delete: function () {
			gl.deleteProgram(program);
		},
		getDeleteStatus: function () {
			return gl.getProgramParameter(program, gl.DELETE_STATUS);
		}
	};
};

OOGL.Context.prototype.DefaultProgram = function (name, attributes, callback) {
	var program = new this.Program();
	var vertexShader = new this.VertexShader(name, function () {
		program.attachShader(vertexShader);
		var fragmentShader = new this.FragmentShader(name, function () {
			program.attachShader(fragmentShader);
			for (var i = 0; i < attributes.length; i++) {
				// TODO bind attribute location
			}
			program.linkOrThrow();
			callback && callback();
		});
	});
	return program;
};
