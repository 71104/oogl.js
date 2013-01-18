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

	/**
	 * Subtracts the specified 3-component vector to this one.
	 *
	 * @method subtract
	 * @param {OOGL.Vector3} v The vector to subtract.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector3(4, 5, 6);
	 *	v.subtract(new OOGL.Vector2(1, 2, 3)); // v is now (3, 3, 3)
	 */
	subtract: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	},

	/**
	 * Subtracts the specified 3-component vector to this one and returns the
	 * difference as a new `Vector3` object. This vector is not changed.
	 *
	 * @method minus
	 * @param {OOGL.Vector3} v The vector to subtract.
	 * @return {OOGL.Vector3} The difference vector.
	 * @example
	 *	var v1 = new OOGL.Vector3(4, 5, 6);
	 *	var v2 = new OOGL.Vector3(1, 2, 3);
	 *	var v3 = v1.minus(v2); // (3, 3, 3)
	 */
	minus: function (v) {
		return new OOGL.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	},

	/**
	 * Multiplies this vector by the specified constant factor.
	 *
	 * @method multiply
	 * @param {Number} f The constant factor.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector3(3, 4, 5);
	 *	v.multiply(2); // v is now (6, 8, 10)
	 */
	multiply: function (f) {
		this.x *= f;
		this.y *= f;
		this.z *= f;
		return this;
	},

	/**
	 * Divides this vector by the specified constant factor.
	 *
	 * @method divide
	 * @param {Number} f The constant factor.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector3(6, 8, 10);
	 *	v.multiply(2); // v is now (3, 4, 5)
	 */
	divide: function (f) {
		this.x /= f;
		this.y /= f;
		this.z /= f;
		return this;
	},

	/**
	 * Multiplies this vector by the specified constant factor and returns the
	 * product as a new `Vector3` object. This vector is not changed.
	 *
	 * @method by
	 * @param {Number} f The constant factor.
	 * @return {OOGL.Vector3} The product vector.
	 * @example
	 *	var v1 = new OOGL.Vector3(3, 4, 5);
	 *	var v2 = v1.by(2); // (6, 8, 10)
	 */
	by: function (f) {
		return new OOGL.Vector3(this.x * f, this.y * f, this.z * f);
	},

	/**
	 * Computes the dot product between this vector and the specified one.
	 *
	 * @method dot
	 * @param {OOGL.Vector3} v The other vector.
	 * @return {Number} The computed dot product.
	 * @example
	 *	var v1 = new OOGL.Vector3(1, 2, 3);
	 *	var v2 = new OOGL.Vector3(4, 5, 6);
	 *	var dot = v1.dot(v2); // 32
	 */
	dot: function (v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	/**
	 * Cross multiplies this vector by the specified one.
	 *
	 * @method cross
	 * @chainable
	 * @param {OOGL.Vector3} v The vector to cross-multiply.
	 * @example
	 *	var v = new OOGL.Vector3(1, 2, 3);
	 *	v.cross(new OOGL.Vector3(4, 5, 6)); // v is now (-3, 6, -3)
	 */
	cross: function (v) {
		var x = this.y * v.z - this.z * v.y;
		var y = this.z * v.x - this.x * v.z;
		var z = this.x * v.y - this.y * v.x;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	},

	/**
	 * Computes the cross product between this vector and the specified one and
	 * returns it as a new `Vector3` object. This vector is not changed.
	 *
	 * @method getCrossProduct
	 * @param {OOGL.Vector3} v The vector to cros-multiply.
	 * @return {OOGL.Vector3} The cross product.
	 * @example
	 *	var u = new OOGL.Vector3(1, 2, 3);
	 *	var v = new OOGL.Vector3(4, 5, 6);
	 *	var w = u.getCrossProduct(w); // (-3, 6, -3)
	 */
	getCrossProduct: function (v) {
		return new OOGL.Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	},

	/**
	 * Reflects this vector against a line whose normal vector is specified. The
	 * reflection of a vector `v` is computed as:
	 *
	 *	v - 2 * (v.n) * n
	 *
	 * where `v.n` is the dot product between the vector and the normal.
	 *
	 * This method modifies the original object.
	 *
	 * @method reflect
	 * @param {OOGL.Vector3} n The normal vector.
	 * @chainable
	 * @example
	 *	// reflects a velocity vector against a floor
	 *	velocity.reflect(new OOGL.Vector3(0, 1, 0));
	 */
	reflect: function (n) {
		var dot = this.x * n.x + this.y * n.y + this.z * n.z;
		this.x -= 2 * dot * n.x;
		this.y -= 2 * dot * n.y;
		this.z -= 2 * dot * n.z;
		return this;
	},

	/**
	 * Computes the reflection of this vector against a line whose normal vector
	 * is specified. The reflection of a vector `v` is computed as:
	 *
	 *	v - 2 * (v.n) * n
	 *
	 * where `v.n` is the dot product between the vector and the normal.
	 *
	 * The computed vector is returned as a new `Vector3` object, this vector is
	 * not changed.
	 *
	 * @method getReflected
	 * @param {OOGL.Vector3} n The normal vector.
	 * @return {OOGL.Vector3} The computed reflected vector.
	 * @example
	 *	// reflects a velocity vector against a floor
	 *	var newVelocity = velocity.getReflected(new OOGL.Vector3(0, 1, 0));
	 */
	getReflected: function (n) {
		var dot = this.x * n.x + this.y * n.y + this.z * n.z;
		return new OOGL.Vector3(this.x - 2 * dot * n.x, this.y - 2 * dot * n.y, this.z - 2 * dot * n.z);
	},

	/**
	 * Refracts this vector given a surface normal `n` and the `eta` ratio
	 * between refraction indices.
	 *
	 * This method modifies the original object.
	 *
	 * @method refract
	 * @chainable
	 * @param {OOGL.Vector3} n The surface normal at the incidence point.
	 * @param {Number} eta The ratio between refraction indices.
	 * @example
	 *	var v = new OOGL.Vector3(0.3, -1, 0);
	 *	var n = new OOGL.Vector3(0, 1, 0);
	 *	v.refract(n, 1.3);
	 */
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

	/**
	 * Refracts this vector given a surface normal `n` and the `eta` ratio
	 * between refraction indices; the computed vector is returned as a new
	 * `OOGL.Vector3` object, this object is not changed.
	 *
	 * @method getRefracted
	 * @param {OOGL.Vector3} n The surface normal at the incidence point.
	 * @param {Number} eta The ratio between refraction indices.
	 * @return {OOGL.Vector3} The refracted vector.
	 * @example
	 *	var v = new OOGL.Vector3(0.3, -1, 0);
	 *	var n = new OOGL.Vector3(0, 1, 0);
	 *	var w = v.getRefracted(n, 1.3);
	 */
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

/**
 * The null vector `(0, 0, 0)`.
 *
 * @property NULL
 * @static
 * @type OOGL.Vector3
 * @example
 *	var position = OOGL.Vector3.NULL.clone();
 */
OOGL.Vector3.NULL = new OOGL.Vector3(0, 0, 0);

/**
 * The `(1, 0, 0)` vector.
 *
 * @property I
 * @static
 * @type OOGL.Vector3
 * @example
 *	var position = new OOGL.Vector3.NULL.clone();
 *	var heading = new OOGL.RotationMatrix3(yaw);
 *
 *	position.add(heading.by(OOGL.Vector3.I));
 */
OOGL.Vector3.I = new OOGL.Vector3(1, 0, 0);

/**
 * The `(0, 1, 0)` vector.
 *
 * @property J
 * @static
 * @type OOGL.Vector3
 * @example
 *	var position = new OOGL.Vector3.NULL.clone();
 *	var heading = new OOGL.RotationMatrix3(yaw);
 *
 *	position.add(heading.by(OOGL.Vector3.J));
 */
OOGL.Vector3.J = new OOGL.Vector3(0, 1, 0);

/**
 * The `(0, 0, 1)` vector.
 *
 * @property K
 * @static
 * @type OOGL.Vector3
 * @example
 *	var position = new OOGL.Vector3.NULL.clone();
 *	var heading = new OOGL.RotationMatrix3(yaw);
 *
 *	position.add(heading.by(OOGL.Vector3.K));
 */
OOGL.Vector3.K = new OOGL.Vector3(0, 0, 1);
