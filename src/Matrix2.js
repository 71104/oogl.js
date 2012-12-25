/*global OOGL: false */

/**
 * A mutable 2x2 matrix.
 *
 * @class OOGL.Matrix2
 * @constructor
 * @param {Number[]} data A 4-element array of the floating point values to be
 *	put into the matrix.
 *
 *	The array is duplicated into the matrix, changes to the specified array will
 *	not affect the content of the newly created matrix.
 *
 *	An exception is thrown if the length of the `data` array is different from
 *	4.
 */
OOGL.Matrix2 = function (data) {
	if (data.length != 4) {
		throw 'A 2x2 matrix must have exactly 4 elements.';
	}
	return data.slice(0);
};

OOGL.Matrix2.prototype = {
	/**
	 * Returns the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based.
	 *
	 * @method get
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @return {Number} The value at the specified row and column.
	 */
	get: function (i, j) {
		return this[i * 2 + j];
	},

	/**
	 * Changes the element at the specified row and column in the matrix.
	 *
	 * @method put
	 * @param {Number} i TODO
	 * @param {Number} j TODO
	 * @param {Number} value TODO
	 */
	put: function (i, j, value) {
		this[i * 2 + j] = value;
		return this;
	},
	transpose: function () {
		var newArray = [this[0], this[2], this[1], this[3]];
		for (var i = 0; i < 4; i++) {
			this[i] = newArray[i];
		}
		return this;
	},
	getTransposed: function () {
		return new OOGL.Matrix2([this[0], this[2], this[1], this[3]]);
	},
	add: function (m) {
		for (var i = 0; i < 4; i++) {
			this[i] += m[i];
		}
		return this;
	},
	plus: function (m) {
		var newArray = [];
		for (var i = 0; i < 4; i++) {
			newArray.push(this[i] + m[i]);
		}
		return new OOGL.Matrix2(newArray);
	},
	subtract: function (m) {
		for (var i = 0; i < 4; i++) {
			this[i] -= m[i];
		}
		return this;
	},
	minus: function (m) {
		var newArray = [];
		for (var i = 0; i < 4; i++) {
			newArray.push(this[i] - m[i]);
		}
		return new OOGL.Matrix2(newArray);
	},
	multiply: function (x) {
		for (var i = 0; i < 4; i++) {
			this[i] *= x;
		}
		return this;
	},
	by: function (x) {
		if (x instanceof OOGL.Vector2) {
			return new OOGL.Vector2(
				this[0] * x.x + this[1] * x.y,
				this[2] * x.x + this[3] * x.y
				);
		} else {
			var newArray = [];
			for (var i = 0; i < 4; i++) {
				newArray.push(this[i] * x);
			}
			return new OOGL.Matrix2(newArray);
		}
	},
	determinant: function () {
		return this[0] * this[1] - this[2] * this[3];
	},
	invert: function () {
		var determinant = this[0] * this[1] - this[2] * this[3];
		var newArray = [
			this[3] / determinant,
			this[1] / determinant,
			this[2] / determinant,
			this[0] / determinant
		];
		for (var i = 0; i < 4; i++) {
			this[i] = newArray[i];
		}
		return this;
	},
	getInverse: function () {
		var determinant = this[0] * this[1] - this[2] * this[3];
		return new OOGL.Matrix2([
			this[3] / determinant,
			this[1] / determinant,
			this[2] / determinant,
			this[0] / determinant
		]);
	}
};

OOGL.Matrix2.NULL = new OOGL.Matrix2([0, 0, 0, 0]);
OOGL.Matrix2.IDENTITY = new OOGL.Matrix2([1, 0, 0, 1]);

OOGL.RotationMatrix2 = function (a) {
	var s = Math.sin(a);
	var c = Math.cos(a);
	return new OOGL.Matrix2([c, -s, s, c]);
};

OOGL.ScalingMatrix2 = function (x, y) {
	return new OOGL.Matrix2([x, 0, 0, y]);
};
