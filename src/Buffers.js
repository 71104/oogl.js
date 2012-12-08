OOGL.Buffer = function (gl, target, usage) {
	var buffer = gl.createBuffer(target);
	return {
		underlying: function () {
			return buffer;
		},
		getParameter: function (name) {
			return gl.getBufferParameter(target, name);
		},
		getSize: function () {
			return gl.getBufferParameter(target, gl.BUFFER_SIZE);
		},
		getUsage: function () {
			return gl.getBufferParameter(target, gl.BUFFER_USAGE);
		},
		bind: function () {
			gl.bindBuffer(target, buffer);
		},
		data: function (sizeOrData) {
			gl.bufferData(target, sizeOrData, usage);
		},
		subData: function (offset, data) {
			gl.bufferSubData(target, offset, data);
		},
		_delete: function () {
			gl.deleteBuffer(buffer);
		}
	};
};

OOGL.StaticBuffer = function (gl, target) {
	return new OOGL.Buffer(gl, target, gl.STATIC_DRAW);
};
OOGL.StreamBuffer = function (gl, target) {
	return new OOGL.Buffer(gl, target, gl.STREAM_DRAW);
};
OOGL.DynamicBuffer = function (gl, target) {
	return new OOGL.Buffer(gl, target, gl.DYNAMIC_DRAW);
};

OOGL.ArrayBuffer = function (gl, usage) {
	return new OOGL.Buffer(gl, gl.ARRAY_BUFFER, usage);
};
OOGL.ElementArrayBuffer = function (gl, usage) {
	return new OOGL.Buffer(gl, gl.ELEMENT_ARRAY_BUFFER, usage);
};

OOGL.StaticArrayBuffer = function (gl) {
	return new OOGL.StaticBuffer(gl, gl.ARRAY_BUFFER);
};
OOGL.StaticElementArrayBuffer = function (gl) {
	return new OOGL.StaticBuffer(gl, gl.ELEMENT_ARRAY_BUFFER);
};
OOGL.StreamArrayBuffer = function (gl) {
	return new OOGL.StreamBuffer(gl, gl.ARRAY_BUFFER);
};
OOGL.StreamElementArrayBuffer = function (gl) {
	return new OOGL.StreamBuffer(gl, gl.ELEMENT_ARRAY_BUFFER);
};
OOGL.DynamicArrayBuffer = function (gl) {
	return new OOGL.DynamicBuffer(gl, gl.ARRAY_BUFFER);
};
OOGL.DynamicElementArrayBuffer = function (gl) {
	return new OOGL.DynamicBuffer(gl, gl.ELEMENT_ARRAY_BUFFER);
};

OOGL.VertexArray = OOGL.StaticArrayBuffer;
OOGL.IndexArray = OOGL.StaticElementArrayBuffer;
