/*global context: false */

/**
 * @module context
 */

/**
 * Creates an array buffer with static draw usage representing a single
 * component vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the provided
 * `enable` and `disable` methods enable and disable the `index`-th attribute
 * array calling `gl.enableVertexAttribArray` and `gl.disableVertexAttribArray`
 * and the provided `pointer` method invokes `gl.vertexAttribPointer` with the
 * specified `index` and `type`.
 *
 * @class context.AttributeArray1
 * @extends context.StaticArrayBuffer
 * @constructor
 * @param index {Number} The attribute array index.
 * @param type {String} One of `byte`, `ubyte`, `short`, `ushort` or `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param data {Number[]} A JavaScript `Array` containing the array data; it
 *	will be automatically converted to a typed array.
 * @param [normalize=false] {Boolean} Indicates whether the elements of the
 *	array must be automatically normalized by the GL (see the explanation for
 *	the equivalent argument in `gl.vertexAttribPointer`).
 * @example
 *	var array = new oogl.AttributeArray1(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
 */
context.AttributeArray1 = function (index, type, data, normalize) {
	var types = {
		'byte': {
			glType: context.BYTE,
			size: 1
		},
		'ubyte': {
			glType: context.UNSIGNED_BYTE,
			size: 1
		},
		'short': {
			glType: context.SHORT,
			size: 2
		},
		'ushort': {
			glType: context.UNSIGNED_SHORT,
			size: 2
		},
		'float': {
			glType: context.FLOAT,
			size: 4
		}
	};
	if (!types.hasOwnProperty(type)) {
		throw 'Invalid attribute type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
	}

	var buffer = new context.StaticArrayBuffer(type);
	buffer.bindAndData(data);

	/**
	 * Enables the `index`-th vertex attribute array.
	 *
	 * `gl.enableVertexAttribArray` equivalent.
	 *
	 * @method enable
	 * @example
	 *	TODO
	 */
	buffer.enable = function () {
		context.enableVertexAttribArray(index);
	};

	/**
	 * Disables the `index`-th vertex attribute array.
	 *
	 * `gl.disableVertexAttribArray` equivalent.
	 *
	 * @method disable
	 * @example
	 *	TODO
	 */
	buffer.disable = function () {
		context.disableVertexAttribArray(index);
	};

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	var array = new oogl.AttributeArray1(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
	 *	array.bind();
	 *	array.pointer();
	 */
	buffer.pointer = function (stride, offset) {
		context.vertexAttribPointer(index, 1, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * Binds this buffer to its target and then specifies its pointer for the
	 * `index`-th vertex attribute array.
	 *
	 * You may optionally specify `stride` and `offset` parameters.
	 *
	 * Equivalent to calling `bind` and `pointer` subsequently.
	 *
	 * @method bindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 1, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * TODO
	 *
	 * @method enableBindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	TODO
	 */
	buffer.enableBindAndPointer = function (stride, offset) {
		context.enableVertexAttribArray(index);
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 1, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Creates an array buffer with static draw usage representing a 2-component
 * vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the provided
 * `enable` and `disable` methods enable and disable the `index`-th attribute
 * array calling `gl.enableVertexAttribArray` and `gl.disableVertexAttribArray`
 * and the provided `pointer` method invokes `gl.vertexAttribPointer` with the
 * specified `index` and `type`.
 *
 * @class context.AttributeArray2
 * @extends context.StaticArrayBuffer
 * @constructor
 * @param index {Number} The attribute array index.
 * @param type {String} One of `byte`, `ubyte`, `short`, `ushort` or `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param data {Number[]} A JavaScript `Array` containing the array data; it
 *	will be automatically converted to a typed array.
 * @param [normalize=false] {Boolean} Indicates whether the elements of the
 *	array must be automatically normalized by the GL (see the explanation for
 *	the equivalent argument in `gl.vertexAttribPointer`).
 * @example
 *	var array = new oogl.AttributeArray2(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
 */
context.AttributeArray2 = function (index, type, data, normalize) {
	var types = {
		'byte': {
			glType: context.BYTE,
			size: 1
		},
		'ubyte': {
			glType: context.UNSIGNED_BYTE,
			size: 1
		},
		'short': {
			glType: context.SHORT,
			size: 2
		},
		'ushort': {
			glType: context.UNSIGNED_SHORT,
			size: 2
		},
		'float': {
			glType: context.FLOAT,
			size: 4
		}
	};
	if (!types.hasOwnProperty(type)) {
		throw 'Invalid attribute type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
	}

	var buffer = new context.StaticArrayBuffer(type);
	buffer.bindAndData(data);

	/**
	 * Enables the `index`-th vertex attribute array.
	 *
	 * `gl.enableVertexAttribArray` equivalent.
	 *
	 * @method enable
	 * @example
	 *	TODO
	 */
	buffer.enable = function () {
		context.enableVertexAttribArray(index);
	};

	/**
	 * Disables the `index`-th vertex attribute array.
	 *
	 * `gl.disableVertexAttribArray` equivalent.
	 *
	 * @method disable
	 * @example
	 *	TODO
	 */
	buffer.disable = function () {
		context.disableVertexAttribArray(index);
	};

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	var array = new oogl.AttributeArray2(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
	 *	array.bind();
	 *	array.pointer();
	 */
	buffer.pointer = function (stride, offset) {
		context.vertexAttribPointer(index, 2, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * Binds this buffer to its target and then specifies its pointer for the
	 * `index`-th vertex attribute array.
	 *
	 * You may optionally specify `stride` and `offset` parameters.
	 *
	 * Equivalent to calling `bind` and `pointer` subsequently.
	 *
	 * @method bindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 2, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * TODO
	 *
	 * @method enableBindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	TODO
	 */
	buffer.enableBindAndPointer = function (stride, offset) {
		context.enableVertexAttribArray(index);
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 2, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Creates an array buffer with static draw usage representing a 3-component
 * vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the provided
 * `enable` and `disable` methods enable and disable the `index`-th attribute
 * array calling `gl.enableVertexAttribArray` and `gl.disableVertexAttribArray`
 * and the provided `pointer` method invokes `gl.vertexAttribPointer` with the
 * specified `index` and `type`.
 *
 * @class context.AttributeArray3
 * @extends context.StaticArrayBuffer
 * @constructor
 * @param index {Number} The attribute array index.
 * @param type {String} One of `byte`, `ubyte`, `short`, `ushort` or `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param data {Number[]} A JavaScript `Array` containing the array data; it
 *	will be automatically converted to a typed array.
 * @param [normalize=false] {Boolean} Indicates whether the elements of the
 *	array must be automatically normalized by the GL (see the explanation for
 *	the equivalent argument in `gl.vertexAttribPointer`).
 * @example
 *	var array = new oogl.AttributeArray3(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
 */
context.AttributeArray3 = function (index, type, data, normalize) {
	var types = {
		'byte': {
			glType: context.BYTE,
			size: 1
		},
		'ubyte': {
			glType: context.UNSIGNED_BYTE,
			size: 1
		},
		'short': {
			glType: context.SHORT,
			size: 2
		},
		'ushort': {
			glType: context.UNSIGNED_SHORT,
			size: 2
		},
		'float': {
			glType: context.FLOAT,
			size: 4
		}
	};
	if (!types.hasOwnProperty(type)) {
		throw 'Invalid attribute type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
	}

	var buffer = new context.StaticArrayBuffer(type);
	buffer.bindAndData(data);

	/**
	 * Enables the `index`-th vertex attribute array.
	 *
	 * `gl.enableVertexAttribArray` equivalent.
	 *
	 * @method enable
	 * @example
	 *	TODO
	 */
	buffer.enable = function () {
		context.enableVertexAttribArray(index);
	};

	/**
	 * Disables the `index`-th vertex attribute array.
	 *
	 * `gl.disableVertexAttribArray` equivalent.
	 *
	 * @method disable
	 * @example
	 *	TODO
	 */
	buffer.disable = function () {
		context.disableVertexAttribArray(index);
	};

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	var array = new oogl.AttributeArray3(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
	 *	array.bind();
	 *	array.pointer();
	 */
	buffer.pointer = function (stride, offset) {
		context.vertexAttribPointer(index, 3, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * Binds this buffer to its target and then specifies its pointer for the
	 * `index`-th vertex attribute array.
	 *
	 * You may optionally specify `stride` and `offset` parameters.
	 *
	 * Equivalent to calling `bind` and `pointer` subsequently.
	 *
	 * @method bindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 3, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * TODO
	 *
	 * @method enableBindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	TODO
	 */
	buffer.enableBindAndPointer = function (stride, offset) {
		context.enableVertexAttribArray(index);
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 3, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Creates an array buffer with static draw usage representing a 4-component
 * vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the provided
 * `enable` and `disable` methods enable and disable the `index`-th attribute
 * array calling `gl.enableVertexAttribArray` and `gl.disableVertexAttribArray`
 * and the provided `pointer` method invokes `gl.vertexAttribPointer` with the
 * specified `index` and `type`.
 *
 * @class context.AttributeArray4
 * @extends context.StaticArrayBuffer
 * @constructor
 * @param index {Number} The attribute array index.
 * @param type {String} One of `byte`, `ubyte`, `short`, `ushort` or `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param data {Number[]} A JavaScript `Array` containing the array data; it
 *	will be automatically converted to a typed array.
 * @param [normalize=false] {Boolean} Indicates whether the elements of the
 *	array must be automatically normalized by the GL (see the explanation for
 *	the equivalent argument in `gl.vertexAttribPointer`).
 * @example
 *	var array = new oogl.AttributeArray4(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
 */
context.AttributeArray4 = function (index, type, data, normalize) {
	var types = {
		'byte': {
			glType: context.BYTE,
			size: 1
		},
		'ubyte': {
			glType: context.UNSIGNED_BYTE,
			size: 1
		},
		'short': {
			glType: context.SHORT,
			size: 2
		},
		'ushort': {
			glType: context.UNSIGNED_SHORT,
			size: 2
		},
		'float': {
			glType: context.FLOAT,
			size: 4
		}
	};
	if (!types.hasOwnProperty(type)) {
		throw 'Invalid attribute type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
	}

	var buffer = new context.StaticArrayBuffer(type);
	buffer.bindAndData(data);

	/**
	 * Enables the `index`-th vertex attribute array.
	 *
	 * `gl.enableVertexAttribArray` equivalent.
	 *
	 * @method enable
	 * @example
	 *	TODO
	 */
	buffer.enable = function () {
		context.enableVertexAttribArray(index);
	};

	/**
	 * Disables the `index`-th vertex attribute array.
	 *
	 * `gl.disableVertexAttribArray` equivalent.
	 *
	 * @method disable
	 * @example
	 *	TODO
	 */
	buffer.disable = function () {
		context.disableVertexAttribArray(index);
	};

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * You may optionally specify `stride` and `offset` parameters.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	var array = new oogl.AttributeArray4(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
	 *	array.bind();
	 *	array.pointer();
	 */
	buffer.pointer = function (stride, offset) {
		context.vertexAttribPointer(index, 4, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * Binds this buffer to its target and then specifies its pointer for the
	 * `index`-th vertex attribute array.
	 *
	 * You may optionally specify `stride` and `offset` parameters.
	 *
	 * Equivalent to calling `bind` and `pointer` subsequently.
	 *
	 * @method bindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 4, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	/**
	 * TODO
	 *
	 * @method enableBindAndPointer
	 * @param [stride=0] {Number} The stride between consecutive elements in the
	 *	array (see the explanation for the equivalent argument in
	 *	`gl.vertexAttribPointer`).
	 * @param [offset=0] {Number} The index of the first element of the
	 *	underlying buffer to be used for the attribute array.
	 *
	 * This value is multiplied by the data type size and used as the `pointer`
	 * parameter in the `gl.vertexAttribPointer` call.
	 * @example
	 *	TODO
	 */
	buffer.enableBindAndPointer = function (stride, offset) {
		context.enableVertexAttribArray(index);
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 4, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Represents a set of vertex attribute arrays; simplifies the management of
 * multiple arrays.
 *
 * @class context.AttributeArrays
 * @constructor
 * @param count {Number} The number of vertex attributes each array will
 *	contain.
 * @example
 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoord']);
 *	var arrays = new oogl.AttributeArrays(vertices.length / 3);
 *	arrays.add3('float', vertices);
 *	arrays.add3('float', colors);
 *	arrays.add2('float', textureCoordinates);
 *	arrays.bindAndPointer();
 *	program.use();
 *	arrays.drawTriangles();
 */
context.AttributeArrays = function (count) {
	var arrays = [];
	return {
		/**
		 * Adds a single component vertex attribute array to the set.
		 *
		 * @method add1
		 * @param type {String} The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1('float', [1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add1: function (type, data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a single signed byte component vertex attribute array to the
		 * set.
		 *
		 * @method add1b
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1b([1, 2, 3, 4, -1, -2, -3, -4]);
		 */
		add1b: function (data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, 'byte', data, normalize));
		},

		/**
		 * Adds a single unsigned byte component vertex attribute array to the
		 * set.
		 *
		 * @method add1ub
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1ub([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add1ub: function (data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, 'ubyte', data, normalize));
		},

		/**
		 * Adds a single signed short integer component vertex attribute array
		 * to the set.
		 *
		 * @method add1s
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1s([1, 2, 3, 4, -1, -2, -3, -4]);
		 */
		add1s: function (data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, 'short', data, normalize));
		},

		/**
		 * Adds a single unsigned short integer component vertex attribute array
		 * to the set.
		 *
		 * @method add1us
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1us([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add1us: function (data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, 'ushort', data, normalize));
		},

		/**
		 * Adds a single floating point component vertex attribute array to the
		 * set.
		 *
		 * @method add1f
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1f([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add1f: function (data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, 'float', data, normalize));
		},

		/**
		 * Adds a 2-component vertex attribute array to the set.
		 *
		 * @method add2
		 * @param type {String} The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2('float', [1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add2: function (type, data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a two signed byte component vertex attribute array to the set.
		 *
		 * @method add2b
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2b([1, 2, 3, 4, -1, -2, -3, -4]);
		 */
		add2b: function (data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, 'byte', data, normalize));
		},

		/**
		 * Adds a two unsigned byte component vertex attribute array to the set.
		 *
		 * @method add2ub
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2ub([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add2ub: function (data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, 'ubyte', data, normalize));
		},

		/**
		 * Adds a two signed short integer component vertex attribute array to
		 * the set.
		 *
		 * @method add2s
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2s([1, 2, 3, 4, -1, -2, -3, -4]);
		 */
		add2s: function (data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, 'short', data, normalize));
		},

		/**
		 * Adds a two unsigned short integer component vertex attribute array to
		 * the set.
		 *
		 * @method add2us
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2us([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add2us: function (data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, 'ushort', data, normalize));
		},

		/**
		 * Adds a two floating point component vertex attribute array to the
		 * set.
		 *
		 * @method add2f
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2f([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add2f: function (data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, 'float', data, normalize));
		},

		/**
		 * Adds a 3-component vertex attribute array to the set.
		 *
		 * @method add3
		 * @param type {String} The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3('float', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
		 */
		add3: function (type, data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a three signed byte component vertex attribute array to the set.
		 *
		 * @method add3b
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3b([1, 2, 3, -1, -2, -3]);
		 */
		add3b: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'byte', data, normalize));
		},

		/**
		 * Adds a three unsigned byte component vertex attribute array to the
		 * set.
		 *
		 * @method add3ub
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3ub([1, 2, 3, 4, 5, 6]);
		 */
		add3ub: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'ubyte', data, normalize));
		},

		/**
		 * Adds a three signed short integer component vertex attribute array to
		 * the set.
		 *
		 * @method add3s
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3s([1, 2, 3, -1, -2, -3]);
		 */
		add3s: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'short', data, normalize));
		},

		/**
		 * Adds a three unsigned short integer component vertex attribute array
		 * to the set.
		 *
		 * @method add3us
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3us([1, 2, 3, 4, 5, 6]);
		 */
		add3us: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'ushort', data, normalize));
		},

		/**
		 * Adds a three floating point component vertex attribute array to the
		 * set.
		 *
		 * @method add3f
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3f([1, 2, 3, 4, 5, 6]);
		 */
		add3f: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'float', data, normalize));
		},

		/**
		 * Adds a 4-component vertex attribute array to the set.
		 *
		 * @method add4
		 * @param type {String} The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param data {Array} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4('float', [1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add4: function (type, data, normalize) {
			arrays.push(new context.AttributeArray4(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a four signed byte component vertex attribute array to the set.
		 *
		 * @method add4b
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4b([1, 2, 3, 4, -1, -2, -3, -4]);
		 */
		add4b: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'byte', data, normalize));
		},

		/**
		 * Adds a four unsigned byte component vertex attribute array to the set.
		 *
		 * @method add4ub
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4ub([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add4ub: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'ubyte', data, normalize));
		},

		/**
		 * Adds a four signed short integer component vertex attribute array to
		 * the set.
		 *
		 * @method add4s
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4s([1, 2, 3, 4, -5, -6, -7, -8]);
		 */
		add4s: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'short', data, normalize));
		},

		/**
		 * Adds a four unsigned short integer component vertex attribute array
		 * to the set.
		 *
		 * @method add4us
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4us([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add4us: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'ushort', data, normalize));
		},

		/**
		 * Adds a four floating point component vertex attribute array to the
		 * set.
		 *
		 * @method add4f
		 * @param data {Number[]} A standard JavaScript array containing the
		 *	attribute data.
		 * @param [normalize=false] {Boolean} Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4f([1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add4f: function (data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, 'float', data, normalize));
		},

		/**
		 * TODO
		 *
		 * @method enable
		 * @example
		 *	TODO
		 */
		enable: function () {
			for (var i = 0; i < arrays.length; i++) {
				context.enableVertexAttribArray(i);
			}
		},

		/**
		 * TODO
		 *
		 * @method disable
		 * @example
		 *	TODO
		 */
		disable: function () {
			for (var i = 0; i < arrays.length; i++) {
				context.disableVertexAttribArray(i);
			}
		},

		/**
		 * Binds each array in the set to its buffer target (which is always
		 * `gl.ARRAY_BUFFER`) and specifies its pointer for the attribute array
		 * associated to its index. This is typically used to prepare all the
		 * arrays used by a program with just one call.
		 *
		 * You may optionally specify `stride` and `offset` parameters.
		 *
		 * @method bindAndPointer
		 * @param [stride=0] {Number} The stride between consecutive elements in
		 *	the array (see the explanation for the equivalent argument in
		 *	`gl.vertexAttribPointer`).
		 * @param [offset=0] {Number} The index of the first element of the
		 *	underlying buffer to be used for the attribute array.
		 *
		 * This value is multiplied by the data type size and used as the
		 * `pointer` parameter in the `gl.vertexAttribPointer` call.
		 * @example
		 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoord']);
		 *	var arrays = new oogl.AttributeArrays();
		 *	arrays.add3('float', vertices);
		 *	arrays.add3('float', colors);
		 *	arrays.add2('float', textureCoordinates);
		 *	arrays.enable();
		 *	arrays.bindAndPointer();
		 *	program.use();
		 *	arrays.drawTriangles();
		 */
		bindAndPointer: function (stride, offset) {
			for (var i in arrays) {
				if (arrays.hasOwnProperty(i)) {
					arrays[i].bindAndPointer(stride, offset);
				}
			}
		},

		/**
		 * TODO
		 *
		 * @method enableBindAndPointer
		 * @example
		 *	TODO
		 */
		enableBindAndPointer: function (stride, offset) {
			for (var i = 0; i < arrays.length; i++) {
				context.enableVertexAttribArray(i);
				arrays[i].bindAndPointer(stride, offset);
			}
		},

		/**
		 * Draws the arrays in `gl.TRIANGLES` mode.
		 *
		 * Equivalent to calling `gl.drawArrays` with `gl.TRIANGLES`.
		 *
		 * You may optionally specify `offset` and `count` parameters.
		 *
		 * @method drawTriangles
		 * @param [offset=0] {Number} The index of the first vertex attribute to
		 *	draw.
		 * @param [count] {Number} The number of vertex attributes to draw. When
		 *	not specified defaults to the `count` parameter passed to the
		 *	`AttributeArrays` constructor.
		 * @example
		 *	arrays.bindAndPointer();
		 *	arrays.drawTriangles();
		 */
		drawTriangles: (function (all) {
			return function (offset, count) {
				if (arguments.length < 2) {
					count = all;
					if (arguments.length < 1) {
						offset = 0;
					}
				}
				context.drawArrays(context.TRIANGLES, offset, count);
			};
		})(count),

		/**
		 * Draws the arrays in `gl.TRIANGLE_FAN` mode.
		 *
		 * Equivalent to calling `gl.drawArrays` with `gl.TRIANGLE_FAN`.
		 *
		 * You may optionally specify `offset` and `count` parameters.
		 *
		 * @method drawTriangleFan
		 * @param [offset=0] {Number} The index of the first vertex attribute to
		 *	draw.
		 * @param [count] {Number} The number of vertex attributes to draw. When
		 *	not specified defaults to the `count` parameter passed to the
		 *	`AttributeArrays` constructor.
		 * @example
		 *	arrays.bindAndPointer();
		 *	arrays.drawTriangleFan();
		 */
		drawTriangleFan: (function (all) {
			return function (offset, count) {
				if (arguments.length < 2) {
					count = all;
					if (arguments.length < 1) {
						offset = 0;
					}
				}
				context.drawArrays(context.TRIANGLE_FAN, offset, count);
			};
		})(count),

		/**
		 * Draws the arrays in `gl.TRIANGLE_STRIP` mode.
		 *
		 * Equivalent to calling `gl.drawArrays` with `gl.TRIANGLE_STRIP`.
		 *
		 * You may optionally specify `offset` and `count` parameters.
		 *
		 * @method drawTriangleStrip
		 * @param [offset=0] {Number} The index of the first vertex attribute to
		 *	draw.
		 * @param [count] {Number} The number of vertex attributes to draw. When
		 *	not specified defaults to the `count` parameter passed to the
		 *	`AttributeArrays` constructor.
		 * @example
		 *	arrays.bindAndPointer();
		 *	arrays.drawTriangleStrip();
		 */
		drawTriangleStrip: (function (all) {
			return function (offset, count) {
				if (arguments.length < 2) {
					count = all;
					if (arguments.length < 1) {
						offset = 0;
					}
				}
				context.drawArrays(context.TRIANGLE_STRIP, offset, count);
			};
		})(count),

		/**
		 * Deletes all the arrays in the set.
		 *
		 * @method _delete
		 * @example
		 *	arrays._delete();
		 */
		_delete: function () {
			for (var i in arrays) {
				if (arrays.hasOwnProperty(i)) {
					arrays[i]._delete();
				}
			}
		}
	};
};

/**
 * Represents an element array.
 *
 * This class inherits `StaticElementArrayBuffer` and introduces utility
 * methods.
 *
 * @class context.ElementArray
 * @extends context.StaticElementArrayBuffer
 * @constructor
 * @param indices {Number[]} The element indices.
 * @param [type='ushort'] {String} The type of each index. It can be either
 * `'ubyte'` or `'ushort'` and defaults to `'ushort'` so that indices greater
 *	than `255` are not wrapped to the `0-255` range.
 * @example
 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoord']);
 *	var arrays = new oogl.AttributeArrays();
 *	arrays.add3('float', vertices);
 *	arrays.add3('float', colors);
 *	arrays.add2('float', textureCoordinates);
 *	arrays.bindAndPointer();
 *	var elements = new oogl.ElementArray(indices);
 *	elements.bind();
 *	program.use();
 *	elements.drawTriangles();
 */
context.ElementArray = function (indices, type) {
	if (!type) {
		type = 'ushort';
	}
	var count = indices.length;

	var types = {
		'ubyte': context.UNSIGNED_BYTE,
		'ushort': context.UNSIGNED_SHORT
	};
	if (!types.hasOwnProperty(type)) {
		throw 'Invalid element type, must be either "ubyte" or "ushort".';
	}

	var buffer = new context.StaticElementArrayBuffer(type);
	buffer.bindAndData(indices);

	/**
	 * Draws the elements in `gl.TRIANGLES` mode.
	 *
	 * Equivalent to calling `gl.drawElements` with `gl.TRIANGLES`.
	 *
	 * @method drawTriangles
	 * @param [offset=0] {Number} The index of the first element to draw.
	 * @param [count] {Number} The number of elements to draw. When not
	 *	specified defaults to the `count` parameter passed to the `ElementArray`
	 *	constructor.
	 * @example
	 */
	buffer.drawTriangles = (function (all) {
		return function (offset, count) {
			if (arguments.length < 2) {
				count = all;
				if (arguments.length < 1) {
					offset = 0;
				}
			}
			context.drawElements(context.TRIANGLES, count, types[type], offset);
		};
	})(count);

	/**
	 * Draws the elements in `gl.TRIANGLE_FAN` mode.
	 *
	 * Equivalent to calling `gl.drawElements` with `gl.TRIANGLE_FAN`.
	 *
	 * @method drawTriangleFan
	 * @param [offset=0] {Number} The index of the first element to draw.
	 * @param [count] {Number} The number of elements to draw. When not
	 *	specified defaults to the `count` parameter passed to the `ElementArray`
	 *	constructor.
	 * @example
	 */
	buffer.drawTriangleFan = (function (all) {
		return function (offset, count) {
			if (arguments.length < 2) {
				count = all;
				if (arguments.length < 1) {
					offset = 0;
				}
			}
			context.drawElements(context.TRIANGLE_FAN, count, types[type], offset);
		};
	})(count);

	/**
	 * Draws the elements in `gl.TRIANGLE_STRIP` mode.
	 *
	 * Equivalent to calling `gl.drawElements` with `gl.TRIANGLE_STRIP`.
	 *
	 * @method drawTriangleStrip
	 * @param [offset=0] {Number} The index of the first element to draw.
	 * @param [count] {Number} The number of elements to draw. When not
	 *	specified defaults to the `count` parameter passed to the `ElementArray`
	 *	constructor.
	 * @example
	 */
	buffer.drawTriangleStrip = (function (all) {
		return function (offset, count) {
			if (arguments.length < 2) {
				count = all;
				if (arguments.length < 1) {
					offset = 0;
				}
			}
			context.drawElements(context.TRIANGLE_STRIP, count, types[type], offset);
		};
	})(count);

	return buffer;
};
