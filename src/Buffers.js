/*global context: false */

/**
 * Wraps a GL buffer with a specified target, data type and usage settings.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createBuffer` with the specified target. Subsequent GL `bufferData` and
 * `bufferSubData` calls will be made using the specified usage.
 *
 * @class .Buffer
 * @extends WebGLBuffer
 * @constructor
 * @param target TODO
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of data to put in the buffer.
 * @param usage TODO
 * @example
 *	var buffer = new oogl.Buffer(oogl.ARRAY_BUFFER, 'float', oogl.STATIC_DRAW);
 */
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
		 * Queries a parameter related to this buffer.
		 *
		 * `gl.getBufferParameter` equivalent.
		 *
		 * @method getParameter
		 * @param name TODO
		 * @return {Mixed} TODO
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
		 * @return {Number} TODO
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
		 * array and automatically converted by OOGL to the appropriate typed
		 * array, depending on the data type you specified to the `Buffer`
		 * constructor.
		 *
		 * @method data
		 * @param {Mixed} sizeOrData Either a number representing the size to
		 *	allocate or a JavaScript `Array` containing the data to store.
		 * @example
		 *	buffer.data([1, 1, -1, 1, -1, -1, 1, -1]);
		 */
		buffer.data = function (sizeOrData) {
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new Constructor(sizeOrData);
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
		 * @param {Number} offset TODO
		 * @param {Array} data TODO
		 */
		buffer.subData = function (offset, data) {
			context.bufferSubData(target, offset, new Constructor(data));
		};

		/**
		 * Deletes this buffer.
		 *
		 * `gl.deleteBuffer` equivalent.
		 *
		 * @method _delete
		 * @example
		 *	buffer.delete();
		 */
		buffer._delete = function () {
			context.deleteBuffer(buffer);
		};

		return buffer;
	};
})();

context.StaticBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STATIC_DRAW);
};
context.StreamBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STREAM_DRAW);
};
context.DynamicBuffer = function (target, type) {
	return new context.Buffer(target, type, context.DYNAMIC_DRAW);
};

context.ArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ARRAY_BUFFER, type, usage);
};
context.ElementArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ELEMENT_ARRAY_BUFFER, type, usage);
};

context.StaticArrayBuffer = function (type) {
	return new context.StaticBuffer(context.ARRAY_BUFFER, type);
};
context.StaticElementArrayBuffer = function (type) {
	return new context.StaticBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};
context.StreamArrayBuffer = function (type) {
	return new context.StreamBuffer(context.ARRAY_BUFFER, type);
};
context.StreamElementArrayBuffer = function (type) {
	return new context.StreamBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};
context.DynamicArrayBuffer = function (type) {
	return new context.DynamicBuffer(context.ARRAY_BUFFER, type);
};
context.DynamicElementArrayBuffer = function (type) {
	return new context.DynamicBuffer(context.ELEMENT_ARRAY_BUFFER, type);
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
