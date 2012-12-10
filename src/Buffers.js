context.Buffer = function (target, usage) {
	var buffer = context.createBuffer(target);
	return {
		underlying: function () {
			return buffer;
		},
		getParameter: function (name) {
			return context.getBufferParameter(target, name);
		},
		getSize: function () {
			return context.getBufferParameter(target, context.BUFFER_SIZE);
		},
		getUsage: function () {
			return context.getBufferParameter(target, context.BUFFER_USAGE);
		},
		bind: function () {
			context.bindBuffer(target, buffer);
		},
		data: function (sizeOrData) {
			context.bufferData(target, sizeOrData, usage);
		},
		subData: function (offset, data) {
			context.bufferSubData(target, offset, data);
		},
		_delete: function () {
			context.deleteBuffer(buffer);
		}
	};
};

context.StaticBuffer = function (target) {
	return new context.Buffer(target, context.STATIC_DRAW);
};
context.StreamBuffer = function (target) {
	return new context.Buffer(target, context.STREAM_DRAW);
};
context.DynamicBuffer = function (target) {
	return new context.Buffer(target, context.DYNAMIC_DRAW);
};

context.ArrayBuffer = function (usage) {
	return new context.Buffer(context.ARRAY_BUFFER, usage);
};
context.ElementArrayBuffer = function (usage) {
	return new context.Buffer(context.ELEMENT_ARRAY_BUFFER, usage);
};

context.StaticArrayBuffer = function () {
	return new context.StaticBuffer(context.ARRAY_BUFFER);
};
context.StaticElementArrayBuffer = function () {
	return new context.StaticBuffer(context.ELEMENT_ARRAY_BUFFER);
};
context.StreamArrayBuffer = function () {
	return new context.StreamBuffer(context.ARRAY_BUFFER);
};
context.StreamElementArrayBuffer = function () {
	return new context.StreamBuffer(context.ELEMENT_ARRAY_BUFFER);
};
context.DynamicArrayBuffer = function () {
	return new context.DynamicBuffer(context.ARRAY_BUFFER);
};
context.DynamicElementArrayBuffer = function () {
	return new context.DynamicBuffer(context.ELEMENT_ARRAY_BUFFER);
};

context.VertexArray = function () {
	var buffer = new context.StaticArrayBuffer();
	// TODO
	return buffer;
};
context.IndexArray = function () {
	var buffer = new context.StaticElementArrayBuffer();
	// TODO
	return buffer;
};
