OOGL.Context.prototype.Buffer = function (target, usage) {
	var gl = this;
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

OOGL.Context.prototype.StaticBuffer = function (target) {
	return new this.Buffer(target, this.STATIC_DRAW);
};
OOGL.Context.prototype.StreamBuffer = function (target) {
	return new this.Buffer(target, this.STREAM_DRAW);
};
OOGL.Context.prototype.DynamicBuffer = function (target) {
	return new this.Buffer(target, this.DYNAMIC_DRAW);
};

OOGL.Context.prototype.ArrayBuffer = function (usage) {
	return new this.Buffer(this.ARRAY_BUFFER, usage);
};
OOGL.Context.prototype.ElementArrayBuffer = function (usage) {
	return new this.Buffer(this.ELEMENT_ARRAY_BUFFER, usage);
};

OOGL.Context.prototype.StaticArrayBuffer = function () {
	return new this.StaticBuffer(this.ARRAY_BUFFER);
};
OOGL.Context.prototype.StaticElementArrayBuffer = function () {
	return new this.StaticBuffer(this.ELEMENT_ARRAY_BUFFER);
};
OOGL.Context.prototype.StreamArrayBuffer = function () {
	return new this.StreamBuffer(this.ARRAY_BUFFER);
};
OOGL.Context.prototype.StreamElementArrayBuffer = function () {
	return new this.StreamBuffer(this.ELEMENT_ARRAY_BUFFER);
};
OOGL.Context.prototype.DynamicArrayBuffer = function () {
	return new this.DynamicBuffer(this.ARRAY_BUFFER);
};
OOGL.Context.prototype.DynamicElementArrayBuffer = function () {
	return new this.DynamicBuffer(this.ELEMENT_ARRAY_BUFFER);
};

OOGL.Context.prototype.VertexArray = function () {
	var buffer = new this.StaticArrayBuffer();
	// TODO
	return buffer;
};
OOGL.Context.prototype.IndexArray = function () {
	var buffer = new this.StaticElementArrayBuffer();
	// TODO
	return buffer;
};
