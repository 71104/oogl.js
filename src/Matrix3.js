/*global OOGL: false */

/**
 * A mutable 3x3 matrix.
 *
 * @class OOGL.Matrix3
 * @constructor
 * @param {Number[]} data A 9-element array of the floating point values to be
 *	put into the matrix.
 *
 * Matrix elements are specified in row-major order.
 *
 * The specified `data` array is duplicated into the matrix, changes to it will
 * not affect the content of the matrix.
 *
 * An exception is thrown if the length of the `data` array is not 9.
 * @example
 *	var matrix = new OOGL.Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]); // creates the 3x3 identity matrix
 */
OOGL.Matrix3 = function (data) {
	if (data.length != 9) {
		throw 'A 3x3 matrix must have exactly 9 elements.';
	}
	return data.slice(0);
};

OOGL.Matrix3.prototype = {
	/**
	 * Yields a new `Matrix4` object corresponding to a homogeneous 4x4 matrix
	 * equivalent to this matrix.
	 *
	 * The upper left block of the new 4x4 matrix is set using the values from
	 * this 3x3 matrix, while the lower right corner is set to 1 and the rest to
	 * 0.
	 *
	 * @method toHomogeneous
	 * @return {OOGL.Matrix4} The homogeneous matrix.
	 * @example
	 *	var m4 = m3.toHomogeneous();
	 */
	toHomogeneous: function () {
		return new OOGL.Matrix4([
			this[0], this[1], this[2], 0,
			this[3], this[4], this[5], 0,
			this[6], this[7], this[8], 0,
			0, 0, 0, 1
		]);
	},

	/**
	 * Returns the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * fetching the `i * 3 + j`-th element of the array:
	 *
	 *	matrix.get(i, j) == matrix[i * 3 + j] // true
	 *
	 * @method get
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @return {Number} The value at the specified row and column.
	 * @example
	 *	var m = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	if (m.get(2, 1) == m[7]) { // true
	 *		...
	 */
	get: function (i, j) {
		return this[i * 3 + j];
	},

	/**
	 * Changes the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * setting the `i * 3 + j`-th element of the array:
	 *
	 *	matrix.put(i, j, x);
	 *	matrix[i * 3 + j] = x; // same as previous
	 *
	 * @method put
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @param {Number} value The value to put at the specified row and column.
	 * @example
	 *	var matrix = new OOGL.Matrix3([3, 3, 0, 3, 3, 3, 3, 3, 3]);
	 *	matrix.put(1, 0, 3); // now matrix is [3, 3, 3, 3, 3, 3, 3, 3, 3]
	 */
	put: function (i, j, value) {
		this[i * 3 + j] = value;
		return this;
	},

	/**
	 * Transposes this matrix.
	 *
	 * @method transpose
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	matrix.transpose(); // matrix is now [1, 3, 2, 4, 5, 6, 7, 8, 9]
	 */
	transpose: function () {
		var newArray = [this[0], this[3], this[6], this[1], this[4], this[7], this[2], this[5], this[8]];
		for (var i = 0; i < 9; i++) {
			this[i] = newArray[i];
		}
		return this;
	},

	/**
	 * Computes the transposed matrix and returns it as a new `Matrix3` object.
	 * This matrix is not changed.
	 *
	 * @method getTransposed
	 * @return {OOGL.Matrix3} The transposed matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	var m2 = m1.getTransposed(); // [1, 4, 7, 2, 5, 8, 3, 6, 9]
	 */
	getTransposed: function () {
		return new OOGL.Matrix3([this[0], this[3], this[6], this[1], this[4], this[7], this[2], this[5], this[8]]);
	},

	/**
	 * Adds the specified matrix to this one.
	 *
	 * Each element of the specified matrix is added up to the respective
	 * element in this matrix. The specified `m` matrix is not changed.
	 *
	 * @method add
	 * @param {OOGL.Matrix3} m The matrix to add.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	matrix.add(new OOGL.Matrix3([9, 8, 7, 6, 5, 4, 3, 2, 1])); // matrix is now [10, 10, 10, 10, 10, 10, 10, 10, 10]
	 */
	add: function (m) {
		for (var i = 0; i < 9; i++) {
			this[i] += m[i];
		}
		return this;
	},

	/**
	 * Adds the specified matrix to this one and returns the sum as a new
	 * `Matrix3` object. This matrix is not changed.
	 *
	 * @method plus
	 * @param {OOGL.Matrix3} m The matrix to add.
	 * @return {OOGL.Matrix3} The sum matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	var m2 = new OOGL.Matrix3([9, 8, 7, 6, 5, 4, 3, 2, 1]);
	 *	var m3 = m1.plus(m2); // [10, 10, 10, 10, 10, 10, 10, 10, 10]
	 */
	plus: function (m) {
		var newArray = [];
		for (var i = 0; i < 9; i++) {
			newArray.push(this[i] + m[i]);
		}
		return new OOGL.Matrix3(newArray);
	},

	/**
	 * Subtracts the specified matrix to this one.
	 *
	 * Each element of the specified matrix is subtracted to the respective
	 * element in this matrix. The specified `m` matrix is not changed.
	 *
	 * @method subtract
	 * @param {OOGL.Matrix3} m The matrix to subtract.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix3([10, 10, 10, 10, 10, 10, 10, 10, 10]);
	 *	matrix.subtract(new OOGL.Matrix3([9, 8, 7, 6, 5, 4, 3, 2, 1])); // matrix is now [1, 2, 3, 4, 5, 6, 7, 8, 9]
	 */
	subtract: function (m) {
		for (var i = 0; i < 9; i++) {
			this[i] -= m[i];
		}
		return this;
	},

	/**
	 * Subtracts the specified matrix to this one and returns the difference as
	 * a new `Matrix3` object. This matrix is not changed.
	 *
	 * @method minus
	 * @param {OOGL.Matrix3} m The matrix to subtract.
	 * @return {OOGL.Matrix3} The difference matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix3([10, 10, 10, 10, 10, 10, 10, 10, 10]);
	 *	var m2 = new OOGL.Matrix3([9, 8, 7, 6, 5, 4, 3, 2, 1]);
	 *	var m3 = m1.minus(m2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
	 */
	minus: function (m) {
		var newArray = [];
		for (var i = 0; i < 9; i++) {
			newArray.push(this[i] - m[i]);
		}
		return new OOGL.Matrix3(newArray);
	},

	/**
	 * Multiplies this matrix by the specified constant factor. This method
	 * changes the original matrix.
	 *
	 * @method multiply
	 * @param {Number} x The multiplying factor.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	matrix.multiply(2); // matrix is now [2, 4, 6, 8, 10, 12, 14, 16, 18]
	 */
	multiply: function (x) {
		for (var i = 0; i < 9; i++) {
			this[i] *= x;
		}
		return this;
	},

	/**
	 * Multiplies this matrix by the specified constant factor and returns the
	 * product as a new `Matrix3` object. This matrix is not changed.
	 *
	 * @method by
	 * @param {Number} x The multiplying factor.
	 * @return {OOGL.Matrix3} The product matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	var m2 = m1.by(2); // [2, 4, 6, 8, 10, 12, 14, 16, 18]
	 */

	/**
	 * Left-multiplies this matrix by the specified `Vector3` object and returns
	 * the product as a new `Vector3` object. Neither this matrix nor the
	 * specified vector are changed.
	 *
	 * @method by
	 * @param {OOGL.Vector3} v The vector to multiply.
	 * @return {OOGL.Vector3} The product vector.
	 * @example
	 *	var m = new OOGL.Matrix3([2, 0, 0, 0, 3, 0, 0, 0, 4]);
	 *	var v = new OOGL.Vector3(3, 2, 1);
	 *	var w = m.by(v); // (6, 6, 4)
	 */
	by: function (x) {
		if (x instanceof OOGL.Vector3) {
			return new OOGL.Vector3(
				this[0] * x.x + this[1] * x.y + this[2] * x.z,
				this[3] * x.x + this[4] * x.y + this[5] * x.z,
				this[6] * x.x + this[7] * x.y + this[8] * x.z
				);
		} else {
			var newArray = [];
			for (var i = 0; i < 9; i++) {
				newArray.push(this[i] * x);
			}
			return new OOGL.Matrix3(newArray);
		}
	},

	/**
	 * Computes the determinant of this matrix.
	 *
	 * @method determinant
	 * @return {Number} The computed determinant.
	 * @example
	 *	var m = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	var d = m.determinant(); // 0
	 */
	determinant: function () {
		return this[0] * (this[4] * this[8] - this[5] * this[7]) -
			this[1] * (this[3] * this[8] - this[5] * this[6]) +
			this[2] * (this[3] * this[7] - this[4] * this[6]);
	},

	/**
	 * Inverts this matrix.
	 *
	 * @method invert
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix3([7, 6, 1, 1, 7, 6, 6, 7, 1]);
	 *	matrix.invert(); // matrix is now [0.5, -0.014, -0.414, -0.5, -0.014,  0.586, 0.5, 0.186, -0.614]
	 */
	invert: function () {
		var determinant = this[0] * (this[4] * this[8] - this[5] * this[7]) -
			this[1] * (this[3] * this[8] - this[5] * this[6]) +
			this[2] * (this[3] * this[7] - this[4] * this[6]);
		var newArray = [
			(this[4] * this[8] - this[5] * this[7]) / determinant,
			(this[2] * this[7] - this[1] * this[8]) / determinant,
			(this[1] * this[5] - this[2] * this[4]) / determinant,
			(this[5] * this[6] - this[3] * this[8]) / determinant,
			(this[0] * this[8] - this[2] * this[6]) / determinant,
			(this[2] * this[3] - this[0] * this[5]) / determinant,
			(this[3] * this[7] - this[4] * this[6]) / determinant,
			(this[1] * this[6] - this[0] * this[7]) / determinant,
			(this[0] * this[4] - this[1] * this[3]) / determinant
		];
		for (var i = 0; i < 9; i++) {
			this[i] = newArray[i];
		}
		return this;
	},

	/**
	 * Computes the inverse of this matrix and returns it as a new `Matrix3`
	 * object.
	 *
	 * @method getInverse
	 * @example
	 *	var m1 = new OOGL.Matrix3([7, 6, 1, 1, 7, 6, 6, 7, 1]);
	 *	var m2 = m1.getInverse(); // [0.5, -0.014, -0.414, -0.5, -0.014,  0.586, 0.5, 0.186, -0.614]
	 */
	getInverse: function () {
		var determinant = this[0] * (this[4] * this[8] - this[5] * this[7]) -
			this[1] * (this[3] * this[8] - this[5] * this[6]) +
			this[2] * (this[3] * this[7] - this[4] * this[6]);
		return new OOGL.Matrix3([
			(this[4] * this[8] - this[5] * this[7]) / determinant,
			(this[2] * this[7] - this[1] * this[8]) / determinant,
			(this[1] * this[5] - this[2] * this[4]) / determinant,
			(this[5] * this[6] - this[3] * this[8]) / determinant,
			(this[0] * this[8] - this[2] * this[6]) / determinant,
			(this[2] * this[3] - this[0] * this[5]) / determinant,
			(this[3] * this[7] - this[4] * this[6]) / determinant,
			(this[1] * this[6] - this[0] * this[7]) / determinant,
			(this[0] * this[4] - this[1] * this[3]) / determinant
		]);
	}
};

/**
 * The null 3x3 matrix.
 *
 * @property NULL
 * @static
 * @type OOGL.Matrix3
 */
OOGL.Matrix3.NULL = new OOGL.Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);

/**
 * The 3x3 identity matrix.
 *
 * @property IDENTITY
 * @static
 * @type OOGL.Matrix3
 */
OOGL.Matrix3.IDENTITY = new OOGL.Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]);

/**
 * Creates a 3D rotation matrix that rotates everything counterclockwise about
 * the specified `(x, y, z)` axis by the specified `a` angle.
 *
 * The specified `x`, `y` and `z` components must form a unit-length vector.
 *
 * @class OOGL.RotationMatrix3
 * @extends OOGL.Matrix3
 * @constructor
 * @param {Number} x The X component of the rotation axis.
 * @param {Number} y The Y component of the rotation axis.
 * @param {Number} z The Z component of the rotation axis.
 * @example
 *	var m = new OOGL.RotationMatrix3(0, 1, 0, Math.PI / 2); // 90 degrees horizontal rotation
 */
OOGL.RotationMatrix3 = function (x, y, z, a) {
	var s = Math.sin(a);
	var c = Math.cos(a);
	return new OOGL.Matrix3([
		c + x * x * (1 - c),
		y * x * (1 - c) + z * s,
		z * x * (1 - c) - y * s,
		x * y * (1 - c) - z * s,
		c + y * y * (1 - c),
		z * y * (1 - c) + x * s,
		x * z * (1 - c) + y * s,
		y * z * (1 - c) - x * s,
		c + z * z * (1 - c)
	]);
};

/**
 * Creates a 3D scaling matrix using the specified `x`, `y` and `z` scaling
 * factors.
 *
 * @class OOGL.ScalingMatrix3
 * @extends OOGL.Matrix3
 * @constructor
 * @param {Number} x The X scaling factor.
 * @param {Number} y The Y scaling factor.
 * @param {Number} z The Z scaling factor.
 * @example
 *	var m = new OOGL.ScalingMatrix3(0.5, 0.5, 0.5); // halves the size of everything
 */
OOGL.ScalingMatrix3 = function (x, y, z) {
	return new OOGL.Matrix3([x, 0, 0, 0, y, 0, 0, 0, z]);
};
