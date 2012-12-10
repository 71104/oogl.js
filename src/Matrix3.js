/*global OOGL: false */

OOGL.Matrix3 = function (data) {
	if (data.length != 9) {
		throw 'A 3x3 matrix must have exactly 9 elements.';
	}
	return data.slice(0);
};

OOGL.Matrix3.prototype = {
	toHomogeneous: function () {
		return new OOGL.Matrix4([
			this[0], this[1], this[2], 0,
			this[3], this[4], this[5], 0,
			this[6], this[7], this[8], 0,
			0, 0, 0, 1
		]);
	},
	get: function (i, j) {
		return this[i * 3 + j];
	},
	put: function (i, j, value) {
		this[i * 3 + j] = value;
		return this;
	},
	transpose: function () {
		var newArray = [this[0], this[3], this[6], this[1], this[4], this[7], this[2], this[5], this[8]];
		for (var i = 0; i < 9; i++) {
			this[i] = newArray[i];
		}
		return this;
	},
	getTransposed: function () {
		return new OOGL.Matrix3([this[0], this[3], this[6], this[1], this[4], this[7], this[2], this[5], this[8]]);
	},
	add: function (m) {
		for (var i = 0; i < 9; i++) {
			this[i] += m[i];
		}
		return this;
	},
	plus: function (m) {
		var newArray = [];
		for (var i = 0; i < 9; i++) {
			newArray.push(this[i] + m[i]);
		}
		return new OOGL.Matrix3(newArray);
	},
	subtract: function (m) {
		for (var i = 0; i < 9; i++) {
			this[i] -= m[i];
		}
		return this;
	},
	minus: function (m) {
		var newArray = [];
		for (var i = 0; i < 9; i++) {
			newArray.push(this[i] - m[i]);
		}
		return new OOGL.Matrix3(newArray);
	},
	multiply: function (x) {
		for (var i = 0; i < 9; i++) {
			this[i] *= x;
		}
		return this;
	},
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
	determinant: function () {
		return this[0] * (this[4] * this[8] - this[5] * this[7]) -
			this[1] * (this[3] * this[8] - this[5] * this[6]) +
			this[2] * (this[3] * this[7] - this[4] * this[6]);
	},
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

OOGL.Matrix3.NULL = new OOGL.Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
OOGL.Matrix3.IDENTITY = new OOGL.Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]);

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

OOGL.ScalingMatrix3 = function (x, y, z) {
	return new OOGL.Matrix3([x, 0, 0, 0, y, 0, 0, 0, z]);
};
