/*global OOGL: false */

/**
 * A mutable 3-component vector.
 *
 * @class OOGL.Vector3
 * @constructor
 * @param {Number} x The X component.
 * @param {Number} y The Y component.
 * @param {Number} z The Z component.
 * @example
 *	var v = new OOGL.Vector3(3, 4, 5);
 */
OOGL.Vector3 = function (x, y, z) {
	/**
	 * The X component.
	 *
	 * @property x
	 * @type Number
	 */
	this.x = x;

	/**
	 * The Y component.
	 *
	 * @property y
	 * @type Number
	 */
	this.y = y;

	/**
	 * The Z component.
	 *
	 * @property z
	 * @type Number
	 */
	this.z = z;
};

OOGL.Vector3.prototype = {
	/**
	 * Clones this vector and returns the new one.
	 *
	 * @method clone
	 * @return {OOGL.Vector3} The new vector.
	 * @example
	 *	var position = OOGL.Vector3.NULL.clone();
	 */
	clone: function () {
		return new OOGL.Vector3(this.x, this.y, this.z);
	},

	/**
	 * Returns this vector as an array of three elements.
	 *
	 * @method toArray
	 * @return {Number[]} An array containing the X, Y and Z components of this
	 *	vector.
	 * @example
	 *	var v = new OOGL.Vector3(1, 2, 3);
	 *	program.uniform3fv('Position', v.toArray());
	 */
	toArray: function () {
		return [this.x, this.y, this.z];
	},

	/**
	 * Creates a homogeneous version of this vector by adding a unitary `w`
	 * coordinate and returns it as a new `Vector4` object. This vector is not
	 * changed.
	 *
	 * @method toHomogeneous
	 * @return {OOGL.Vector4} A homogeneous vector corresponding to this vector.
	 * @example
	 *	var v = new OOGL.Vector3(1, 2, 3);
	 *	var w = v.toHomogeneous(); // (1, 2, 3, 1)
	 */
	toHomogeneous: function () {
		return new OOGL.Vector4(this.x, this.y, this.z, 1);
	},

	/**
	 * Computes the modulus of the vector. This is computed as
	 * `Math.sqrt(x * x + y * y + z * z)`.
	 *
	 * @method length
	 * @return {Number} The computed value.
	 * @example
	 *	var v = new OOGL.Vector3(1, 2, 2);
	 *	var l = v.length(); // 3
	 */
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	/**
	 * Normalizes this vector so that its length becomes 1.
	 *
	 * @method normalize
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector3(1, 2, 2);
	 *	v.normalize(); // v is now (0.33, 0.66, 0.66)
	 */
	normalize: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x /= length;
		this.y /= length;
		this.z /= length;
		return this;
	},

	/**
	 * Computes the normalized vector and returns it as a new `Vector3` object.
	 * This vector is not changed.
	 *
	 * @method getNormalized
	 * @return OOGL.Vector3
	 * @example
	 *	var v1 = new OOGL.Vector3(1, 2, 2);
	 *	var v2 = v1.getNormalized(); // (0.33, 0.66, 0.66)
	 */
	getNormal: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return new OOGL.Vector3(this.x / length, this.y / length, this.z / length);
	},

	/**
	 * Adds the specified 2-component vector to this one.
	 *
	 * @method add
	 * @param {OOGL.Vector3} v The vector to add.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector3(4, 5, 6);
	 *	v.add(new OOGL.Vector3(1, 2, 3)); // v is now (5, 7, 9)
	 */
	add: function (v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	},

	/**
	 * Adds the specified 2-component vector to this one and returns the sum as
	 * a new `Vector3` object. This vector is not changed.
	 *
	 * @method plus
	 * @param {OOGL.Vector3} v The vector to add.
	 * @return {OOGL.Vector3} The sum vector.
	 * @example
	 *	var v1 = new OOGL.Vector3(4, 5, 6);
	 *	var v2 = new OOGL.Vector3(1, 2, 3);
	 *	var v3 = v1.plus(v2); // (5, 7, 9)
	 */
	plus: function (v) {
		return new OOGL.Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	},
	subtract: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	},
	minus: function (v) {
		return new OOGL.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	},
	multiply: function (f) {
		this.x *= f;
		this.y *= f;
		this.z *= f;
		return this;
	},
	divide: function (f) {
		this.x /= f;
		this.y /= f;
		this.z /= f;
		return this;
	},
	by: function (f) {
		return new OOGL.Vector3(this.x * f, this.y * f, this.z * f);
	},
	dot: function (v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	cross: function (v) {
		var x = this.y * v.z - this.z * v.y;
		var y = this.z * v.x - this.x * v.z;
		var z = this.x * v.y - this.y * v.x;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	},
	getCrossProduct: function (v) {
		return new OOGL.Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	},
	reflect: function (n) {
		var dot = this.x * n.x + this.y * n.y + this.z * n.z;
		this.x -= 2 * dot * n.x;
		this.y -= 2 * dot * n.y;
		this.z -= 2 * dot * n.z;
		return this;
	},
	getReflected: function (n) {
		var dot = this.x * n.x + this.y * n.y + this.z * n.z;
		return new OOGL.Vector3(this.x - 2 * dot * n.x, this.y - 2 * dot * n.y, this.z - 2 * dot * n.z);
	},
	refract: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y + this.z * n.z;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		} else {
			this.x = eta * this.x - (eta * dot + Math.sqrt(k)) * n.x;
			this.y = eta * this.y - (eta * dot + Math.sqrt(k)) * n.y;
			this.z = eta * this.z - (eta * dot + Math.sqrt(k)) * n.z;
		}
		return this;
	},
	getRefracted: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y + this.z * n.z;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			return OOGL.Vector3.NULL;
		} else {
			return new OOGL.Vector3(
				eta * this.x - (eta * dot + Math.sqrt(k)) * n.x,
				eta * this.y - (eta * dot + Math.sqrt(k)) * n.y,
				eta * this.z - (eta * dot + Math.sqrt(k)) * n.z
				);
		}
	}
};

OOGL.Vector3.NULL = new OOGL.Vector3(0, 0, 0);
OOGL.Vector3.I = new OOGL.Vector3(1, 0, 0);
OOGL.Vector3.J = new OOGL.Vector3(0, 1, 0);
OOGL.Vector3.K = new OOGL.Vector3(0, 0, 1);
