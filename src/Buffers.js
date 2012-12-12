/*global context: false */

context.Buffer = (function () {
	var types = {
		'byte': Int8Array,
		'ubyte': Uint8Array,
		'short': Int16Array,
		'ushort': Uint16Array,
		'float': Float32Array
	};
	return function (target, type, usage) {
		var Constructor;
		if (types.hasOwnProperty(type)) {
			Constructor = types[type];
		} else {
			throw 'Invalid buffer type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
		}
		var buffer = context.createBuffer(target);
		buffer.getParameter = function (name) {
			return context.getBufferParameter(target, name);
		};
		buffer.getSize = function () {
			return context.getBufferParameter(target, context.BUFFER_SIZE);
		};
		buffer.getUsage = function () {
			return context.getBufferParameter(target, context.BUFFER_USAGE);
		};
		buffer.bind = function () {
			context.bindBuffer(target, buffer);
		};
		buffer.data = function (sizeOrData) {
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new Constructor(sizeOrData);
			}
			context.bufferData(target, sizeOrData, usage);
		};
		buffer.subData = function (offset, data) {
			context.bufferSubData(target, offset, new Constructor(data));
		};
		buffer._delete = function () {
			context.deleteBuffer(buffer);
		};
		return buffer;
	};
})();

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
