/*global OOGL: false, context: false */

context.Program = function () {
	var program = context.createProgram();
	var locationCache = {};
	program.getParameter = function (name) {
		return context.getProgramParameter(program, name);
	};
	program.attachShader = function (shader) {
		context.attachShader(program, shader);
	};
	program.detachShader = function (shader) {
		context.detachShader(program, shader);
	};
	program.bindAttribLocation = function (index, name) {
		context.bindAttribLocation(program, index, name);
	};
	program.bindAttribLocations = function (attributes) {
		for (var i = 0; i < attributes.length; i++) {
			context.bindAttribLocation(program, i, attributes[i]);
		}
	};
	program.link = function () {
		locationCache = {};
		context.linkProgram(program);
	};
	program.getLinkStatus = function () {
		return context.getProgramParameter(program, context.LINK_STATUS);
	};
	program.getInfoLog = function () {
		return context.getProgramInfoLog(program);
	};
	program.linkOrThrow = function () {
		context.linkProgram(program);
		if (!context.getProgramParameter(program, context.LINK_STATUS)) {
			throw context.getProgramInfoLog(program);
		}
	};
	program.use = function () {
		context.useProgram(program);
	};
	program.validate = function () {
		context.validateProgram(program);
		return context.getProgramParameter(program, context.VALIDATE_STATUS);
	};
	program.getActiveAttrib = function (index) {
		return context.getActiveAttrib(program, index);
	};
	program.getActiveUniform = function (index) {
		return context.getActiveUniform(program, index);
	};
	program.getAttribLocation = function (name) {
		return context.getAttribLocation(program, name);
	};
	program.getUniform = function (locationOrName) {
		if (typeof locationOrName !== 'string') {
			return context.getUniform(program, locationOrName);
		} else {
			return context.getUniform(program, locationCache[locationOrName] ||
				(locationCache[locationOrName] = context.getUniformLocation(program, locationOrName)));
		}
	};
	program.getUniformLocation = function (name) {
		return locationCache[name] = context.getUniformLocation(program, name);
	};
	// TODO uniform
	program._delete = function () {
		context.deleteProgram(program);
	};
	program.getDeleteStatus = function () {
		return context.getProgramParameter(program, context.DELETE_STATUS);
	};
	return program;
};

context.AutoProgram = function (vertexSource, fragmentSource, attributes) {
	var program = new context.Program();
	program.attachShader(new context.VertexShader(vertexSource));
	program.attachShader(new context.FragmentShader(fragmentSource));
	program.bindAttribLocations(attributes);
	program.linkOrThrow();
	return program;
};

context.AjaxProgram = function (name, attributes, callback) {
	var program = new context.Program();
	OOGL.Ajax.get(name + '.vert', function (vertexSource) {
		program.attachShader(new context.VertexShader(vertexSource));
		OOGL.Ajax.get(name + '.frag', function (fragmentSource) {
			program.attachShader(new context.FragmentShader(fragmentSource));
			program.bindAttribLocations(attributes);
			program.linkOrThrow();
			callback && callback();
		});
	});
	return program;
};
