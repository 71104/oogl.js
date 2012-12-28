/*global context: false */

/**
 * Wraps a GL buffer with a specified target, data type and usage settings.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createBuffer`. The returned `WebGLBuffer` object is extended by
 * OOGL-specific features and returned by the `Buffer` constructor.
 *
 * @class .Buffer
 * @extends WebGLBuffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param {Number} usage One of `gl.STATIC_DRAW`, `gl.STREAM_DRAW` or
 *	`gl.DYNAMIC_DRAW`; will be used when calling `gl.bufferData` through the
 *	provided `data` method.
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var buffer = new oogl.Buffer(oogl.ARRAY_BUFFER, 'float', oogl.STATIC_DRAW);
 */
context.Buffer = (function () {
	var types = {
		'byte': {
			constructor: Int8Array,
			size: 1
		},
		'ubyte': {
			constructor: Uint8Array,
			size: 1
		},
		'short': {
			constructor: Int16Array,
			size: 2
		},
		'ushort': {
			constructor: Uint16Array,
			size: 2
		},
		'float': {
			constructor: Float32Array,
			size: 4
		}
	};
	return function (target, type, usage) {
		var Constructor;
		if (types.hasOwnProperty(type)) {
			Constructor = types[type].constructor;
		} else {
			throw 'Invalid buffer type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
		}
		var buffer = context.createBuffer();

		/**
		 * Indicates whether this is a valid GL buffer.
		 *
		 * `gl.isBuffer` equivalent.
		 *
		 * @method is
		 * @return {Boolean} `true` if this is a valid GL buffer, `false`
		 *	otherwise.
		 * @example
		 *	if (buffer.is()) {
		 *		// ...
		 */
		buffer.is = function () {
			return context.isBuffer(buffer);
		};

		/**
		 * Queries a buffer-related parameter.
		 *
		 * `gl.getBufferParameter` equivalent.
		 *
		 * @method getParameter
		 * @param {Number} name The name of the parameter to query.
		 * @return {Mixed} The queried value.
		 * @example
		 *	var size = buffer.getParameter(oogl.BUFFER_SIZE);
		 */
		buffer.getParameter = function (name) {
			return context.getBufferParameter(target, name);
		};

		/**
		 * Queries the size of this buffer.
		 *
		 * Equivalent to calling `gl.getBufferParameter` with `gl.BUFFER_SIZE`.
		 *
		 * @method getSize
		 * @return {Number} The size of this buffer.
		 * @example
		 *	var size = buffer.getSize();
		 */
		buffer.getSize = function () {
			return context.getBufferParameter(target, context.BUFFER_SIZE);
		};

		/**
		 * Queries the usage settings for this buffer.
		 *
		 * Equivalent to calling `gl.getBufferParameter` with `gl.BUFFER_USAGE`.
		 *
		 * @method getUsage
		 * @return {Number} The usage settings for this buffer; will be one of
		 *	`gl.STATIC_DRAW`, `gl.STREAM_DRAW` or `gl.DYNAMIC_DRAW`.
		 * @example
		 *	var usage = buffer.getUsage();
		 */
		buffer.getUsage = function () {
			return context.getBufferParameter(target, context.BUFFER_USAGE);
		};

		/**
		 * Binds this buffer to its target.
		 *
		 * Equivalent to calling `gl.bindBuffer` with the target specified to
		 * the constructor.
		 *
		 * @method bind
		 * @example
		 *	buffer.bind();
		 */
		buffer.bind = function () {
			context.bindBuffer(target, buffer);
		};

		/**
		 * Allocates or specifies buffer data.
		 *
		 * Equivalent to calling `gl.bufferData` using the target and usage
		 * specified to the constructor.
		 *
		 * The specified argument is either the size to allocate or the data to
		 * store; in the latter case it is specified as a standard JavaScript
		 * array and automatically converted by OOGL to a typed array, depending
		 * on the `type` specified to the constructor.
		 *
		 * @method data
		 * @param {Mixed} sizeOrData Either a number representing the size to
		 *	allocate or a JavaScript `Array` containing the data to store.
		 * @example
		 *	buffer.data([1, 1, -1, 1, -1, -1, 1, -1]);
		 */
		buffer.data = function (sizeOrData) {
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new types[type].constructor(sizeOrData);
			}
			context.bufferData(target, sizeOrData, usage);
		};

		/**
		 * Binds this buffer to its target and then allocates or specifies
		 * buffer data.
		 *
		 * Equivalent to calling `bind` and `data` subsequently.
		 *
		 * @method bindAndData
		 * @param {Mixed} sizeOrData Either a number representing the size to
		 *	allocate or a JavaScript `Array` containing the data to store. See
		 *	the `bind` method.
		 * @example
		 *	buffer.bindAndData([1, 1, -1, 1, -1, -1, 1, -1]);
		 */
		buffer.bindAndData = function (sizeOrData) {
			context.bindBuffer(target, buffer);
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new types[type].constructor(sizeOrData);
			}
			context.bufferData(target, sizeOrData, usage);
		};

		/**
		 * Specifies buffer data.
		 *
		 * Equivalent to calling `gl.bufferSubData` with the target specified to
		 * the constructor.
		 *
		 * @method subData
		 * @param {Number} offset The index of the first element to overwrite.
		 * @param {Array} data A JavaScript `Array` containing the data to
		 *	store; the array will be automatically converted to a typed array,
		 *	depending on the `type` specified to the constructor.
		 * @example
		 *	buffer.data([1, 1, -1, 0, 0, 0, 0, 0]);
		 *	buffer.subData(3, [1, -1, -1, 1, -1]); // buffer now contains [1, 1, -1, 1, -1, -1, 1, -1]
		 */
		buffer.subData = function (offset, data) {
			context.bufferSubData(target, offset * types[type].size, new types[type].constructor(data));
		};

		/**
		 * Deletes this buffer.
		 *
		 * `gl.deleteBuffer` equivalent.
		 *
		 * @method _delete
		 * @example
		 *	buffer._delete();
		 */
		buffer._delete = function () {
			context.deleteBuffer(buffer);
		};

		return buffer;
	};
})();

/**
 * Wraps a GL buffer whose usage is set to `gl.STATIC_DRAW`.
 *
 * @class .StaticBuffer
 * @extends .Buffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StaticBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.StaticBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STATIC_DRAW);
};

/**
 * Wraps a GL buffer whose usage is set to `gl.STREAM_DRAW`.
 *
 * @class .StreamBuffer
 * @extends .Buffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StreamBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.StreamBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STREAM_DRAW);
};

/**
 * Wraps a GL buffer whose usage is set to `gl.DYNAMIC_DRAW`.
 *
 * @class .DynamicBuffer
 * @extends .Buffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.DynamicBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.DynamicBuffer = function (target, type) {
	return new context.Buffer(target, type, context.DYNAMIC_DRAW);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER`.
 *
 * @class .ArrayBuffer
 * @extends .Buffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param {Number} usage One of `gl.STATIC_DRAW`, `gl.STREAM_DRAW` or
 *	`gl.DYNAMIC_DRAW`; will be used when calling `gl.bufferData` through the
 *	provided `data` method.
 * @example
 *	var buffer = new oogl.ArrayBuffer('float', oogl.STATIC_DRAW);
 */
context.ArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ARRAY_BUFFER, type, usage);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER`.
 *
 * @class .ElementArrayBuffer
 * @extends .Buffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param {Number} usage One of `gl.STATIC_DRAW`, `gl.STREAM_DRAW` or
 *	`gl.DYNAMIC_DRAW`; will be used when calling `gl.bufferData` through the
 *	provided `data` method.
 * @example
 *	var buffer = new oogl.ElementArrayBuffer('float', oogl.STATIC_DRAW);
 */
context.ElementArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ELEMENT_ARRAY_BUFFER, type, usage);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER` and usage to
 * `gl.STATIC_DRAW`.
 *
 * @class .StaticArrayBuffer
 * @extends .StaticBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StaticArrayBuffer('float');
 */
context.StaticArrayBuffer = function (type) {
	return new context.StaticBuffer(context.ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER` and usage
 * to `gl.STATIC_DRAW`.
 *
 * @class .StaticElementArrayBuffer
 * @extends .StaticBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StaticElementArrayBuffer('float');
 */
context.StaticElementArrayBuffer = function (type) {
	return new context.StaticBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER` and usage to
 * `gl.STREAM_DRAW`.
 *
 * @class .StreamArrayBuffer
 * @extends .StreamBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StreamArrayBuffer('float');
 */
context.StreamArrayBuffer = function (type) {
	return new context.StreamBuffer(context.ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER` and usage
 * to `gl.STREAM_DRAW`.
 *
 * @class .StreamElementArrayBuffer
 * @extends .StreamBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StreamElementArrayBuffer('float');
 */
context.StreamElementArrayBuffer = function (type) {
	return new context.StreamBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER` and usage to
 * `gl.DYNAMIC_DRAW`.
 *
 * @class .DynamicArrayBuffer
 * @extends .DynamicBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.DynamicArrayBuffer('float');
 */
context.DynamicArrayBuffer = function (type) {
	return new context.DynamicBuffer(context.ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER` and usage
 * to `gl.DYNAMIC_DRAW`.
 *
 * @class .DynamicElementArrayBuffer
 * @extends .DynamicBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.DynamicElementArrayBuffer('float');
 */
context.DynamicElementArrayBuffer = function (type) {
	return new context.DynamicBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};
