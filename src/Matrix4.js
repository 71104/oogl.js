/*global OOGL: false */

/**
 * @module OOGL
 */

/**
 * A mutable 4x4 matrix.
 *
 * @class OOGL.Matrix4
 * @constructor
 * @param {Number[]} data A 16-element array of the floating point values to be
 *	put into the matrix.
 *
 * Matrix elements are specified in column-major order.
 *
 * The specified `data` array is duplicated into the matrix, changes to it will
 * not affect the content of the matrix.
 *
 * An exception is thrown if the length of the `data` array is not 16.
 * @example
 *	// create the 4x4 identity matrix
 *	var matrix = new OOGL.Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
 */
OOGL.Matrix4 = function (data) {
	if (data.length != 16) {
		throw 'A 4x4 matrix must have exactly 16 elements.';
	}

	// TODO documentare singoli elementi

	for (var i = 0; i < 16; i++) {
		this[i] = data[i];
	}
};

OOGL.Matrix4.prototype = {
	/**
	 * TODO
	 *
	 * @method clone
	 * @return {OOGL.Matrix4} TODO
	 * @example
	 *	TODO
	 */
	clone: function () {
		return new OOGL.Matrix4([
			this[0], this[1], this[2], this[3],
			this[4], this[5], this[6], this[7],
			this[8], this[9], this[10], this[11],
			this[12], this[13], this[14], this[15]
		]);
	},

	/**
	 * Returns the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * fetching the `j * 4 + i`-th element of the array:
	 *
	 *	matrix.get(i, j) == matrix[j * 4 + i] // true
	 *
	 * @method get
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @return {Number} The value at the specified row and column.
	 * @example
	 *	var m = new OOGL.Matrix4([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
	 *	if (m.get(2, 3) == m[8]) { // true
	 *		...
	 */
	get: function (i, j) {
		return this[j * 4 + i];
	},

	/**
	 * Changes the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * setting the `j * 4 + i`-th element of the array:
	 *
	 *	matrix.put(i, j, x);
	 *	matrix[j * 4 + i] = x; // same as previous
	 *
	 * @method put
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @param {Number} value The value to put at the specified row and column.
	 * @example
	 *	var matrix = new OOGL.Matrix4([0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
	 *	matrix.put(0, 0, 3); // now matrix is [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
	 */
	put: function (i, j, value) {
		this[j * 4 + i] = value;
		return this;
	}
};

/**
 * Creates a 3D translation matrix.
 *
 * @class OOGL.TranslationMatrix4
 * @extends OOGL.Matrix4
 * @constructor
 * @param {Number} x The X component of the translation vector.
 * @param {Number} y The Y component of the translation vector.
 * @param {Number} z The Z component of the translation vector.
 * @example
 *	// translate by 3 units on the X axis, 4 on the Y axis and 5 on the Z axis
 *	var m = new OOGL.TranslationMatrix4(3, 4, 5);
 */
OOGL.TranslationMatrix4 = function (x, y, z) {
	return new OOGL.Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
};

/**
 * Creates a 3D rotation matrix that rotates everything counterclockwise about
 * the specified `(x, y, z)` axis by the specified `a` angle.
 *
 * The specified `x`, `y` and `z` components must form a unit-length vector.
 *
 * The created matrix is identical to a rotation matrix created by using
 * `OOGL.RotationMatrix3` and converted using its `toHomogeneous` method.
 *
 * @class OOGL.RotationMatrix4
 * @extends OOGL.Matrix4
 * @constructor
 * @param {Number} x The X component of the rotation axis.
 * @param {Number} y The Y component of the rotation axis.
 * @param {Number} z The Z component of the rotation axis.
 * @param {Number} a The rotation angle.
 * @example
 *	var m = new OOGL.RotationMatrix4(0, 1, 0, Math.PI / 2); // 90 degrees horizontal rotation
 */
OOGL.RotationMatrix4 = function (x, y, z, a) {
	var s = Math.sin(a);
	var c = Math.cos(a);
	return new OOGL.Matrix4([
		c + x * x * (1 - c),
		x * y * (1 - c) - z * s,
		x * z * (1 - c) + y * s,
		0,
		y * x * (1 - c) + z * s,
		c + y * y * (1 - c),
		y * z * (1 - c) - x * s,
		0,
		z * x * (1 - c) - y * s,
		z * y * (1 - c) + x * s,
		c + z * z * (1 - c),
		0,
		0,
		0,
		0,
		1
	]);
};

/**
 * Creates a 3D scaling matrix using the specified `x`, `y` and `z` scaling
 * factors.
 *
 * The created matrix is identical to a scaling matrix created by using
 * `OOGL.ScalingMatrix3` and converted using its `toHomogeneous` method.
 *
 * @class OOGL.ScalingMatrix4
 * @extends OOGL.Matrix4
 * @constructor
 * @param {Number} x The X scaling factor.
 * @param {Number} y The Y scaling factor.
 * @param {Number} z The Z scaling factor.
 * @example
 *	var m = new OOGL.ScalingMatrix4(0.5, 0.5, 0.5); // halves the size of everything
 */
OOGL.ScalingMatrix4 = function (x, y, z) {
	return new OOGL.Matrix4([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
};

/**
 * Creates an orthographic projection matrix using the specified screen ratio.
 *
 * The created matrix has the following form, in row-major order:
 *
 *	1	0	0	0
 *	0	r	0	0
 *	0	0	1	0
 *	0	0	0	1
 *
 * where `r` is the screen ratio.
 *
 * @class OOGL.OrthogonalProjection
 * @extends OOGL.Matrix4
 * @constructor
 * @param {Number} [screenRatio=1] The screen ratio, e.g. the screen width
 *	divided by the screen height. Defaults to 1:1.
 * @example
 *	program.uniformMat4(new OOGL.OrthogonalProjection(4 / 3));
 */
OOGL.OrthogonalProjection = function (screenRatio) {
	if (arguments.length < 1) {
		screenRatio = 1;
	}
	return new OOGL.Matrix4([1, 0, 0, 0, 0, screenRatio, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

/**
 * Creates an isometric projection matrix using the specified span parameter and
 * screen ratio.
 *
 * TODO
 *
 * @class OOGL.IsometricProjection
 * @extends OOGL.Matrix4
 * @constructor
 * @param {Number} span TODO
 * @param {Number} [screenRatio=1] The screen ratio, e.g. the screen width
 *	divided by the screen height. Defaults to 1:1.
 * @example
 *	program.uniformMat4('Projection', new OOGL.IsometricProjection(50));
 */
OOGL.IsometricProjection = function () {
	// TODO
};

/**
 * Creates a perspective projection matrix with the specified focal angle and
 * screen ratio.
 *
 * The created matrix has the following form, in row-major order:
 *
 *	h	0		0	0
 *	0	h * r	0	0
 *	0	0		0	1
 *	0	0		1	h
 *
 * where `r` is the screen ratio and `h` is defined by:
 *
 *	h = Math.cos(focus / 2);
 *
 * @class OOGL.PerspectiveProjection
 * @extends OOGL.Matrix4
 * @constructor
 * @param {Number} [screenRatio=1] The screen ratio, e.g. the screen width
 *	divided by the screen height. Defaults to 1:1.
 * @param {Number} [focus=Math.PI / 2] The focal angle, in radians; defaults to
 *	PI / 2 radians (90 degrees).
 * @example
 *	program.uniformMat4('Projection', new OOGL.PerspectiveProjection(4 / 3, Math.PI / 3));
 */
OOGL.PerspectiveProjection = function (screenRatio, focus) {
	if (arguments.length < 2) {
		focus = Math.PI / 2;
		if (arguments.length < 1) {
			screenRatio = 1;
		}
	}
	var h = Math.cos(focus / 2);
	return new OOGL.Matrix4([h, 0, 0, 0, 0, h * screenRatio, 0, 0, 0, 0, 0, 1, 0, 0, 1, h]);
};
