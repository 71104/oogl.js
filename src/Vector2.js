/*global OOGL: false */

/**
 * A mutable 2-component vector.
 *
 * @class OOGL.Vector2
 * @constructor
 * @param {Number} x The X component.
 * @param {Number} y The Y component.
 * @example
 *	var v = new OOGL.Vector2(2, 3);
 */
OOGL.Vector2 = function (x, y) {
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
};

OOGL.Vector2.prototype = {
	/**
	 * Computes the modulus of the vector. This is computed as
	 * `Math.sqrt(x * x + y * y)`.
	 *
	 * @method length
	 * @return {Number} The computed value.
	 * @example
	 *	var v = new OOGL.Vector2(3, 4);
	 *	var l = v.length(); // 5
	 */
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	/**
	 * Normalizes this vector so that its length becomes 1.
	 *
	 * @method normalize
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector2(3, 4);
	 *	v.normalize(); // v is now (0.6, 0.8)
	 */
	normalize: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= length;
		this.y /= length;
		return this;
	},

	/**
	 * Computes the normalized vector and returns it as a new `Vector2` object.
	 * This vector is not changed.
	 *
	 * @method getNormal
	 * @return OOGL.Vector2
	 * @example
	 *	var v1 = new OOGL.Vector2(3, 4);
	 *	var v2 = v1.getNormalized(); // (0.6, 0.8)
	 */
	getNormalized: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		return new OOGL.Vector2(this.x / length, this.y / length);
	},

	/**
	 * Adds the specified 2-component vector to this one.
	 *
	 * @method add
	 * @param {OOGL.Vector2} v The vector to add.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector2(3, 4);
	 *	v.add(new OOGL.Vector2(1, 2)); // v is now (4, 6)
	 */
	add: function (v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},

	/**
	 * Adds the specified 2-component vector to this one and returns the sum as
	 * a new `Vector2` object. This vector is not changed.
	 *
	 * @method plus
	 * @param {OOGL.Vector2} v The vector to add.
	 * @return {OOGL.Vector2} The sum vector.
	 * @example
	 *	var v1 = new OOGL.Vector(3, 4);
	 *	var v2 = new OOGL.Vector2(1, 2);
	 *	var v3 = v1.plus(v2); // (4, 6)
	 */
	plus: function (v) {
		return new OOGL.Vector2(this.x + v.x, this.y + v.y);
	},

	/**
	 * Subtracts the specified 2-component vector to this one.
	 *
	 * @method subtract
	 * @param {OOGL.Vector2} v The vector to subtract.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector2(3, 4);
	 *	v.subtract(new OOGL.Vector2(1, 2)); // v is now (2, 2)
	 */
	subtract: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},

	/**
	 * Subtracts the specified 2-component vector to this one and returns the
	 * difference as a new `Vector2` object. This vector is not changed.
	 *
	 * @method minus
	 * @param {OOGL.Vector2} v The vector to subtract.
	 * @return {OOGL.Vector2} The difference vector.
	 * @example
	 *	var v1 = new OOGL.Vector(3, 4);
	 *	var v2 = new OOGL.Vector2(1, 2);
	 *	var v3 = v1.minus(v2); // (2, 2)
	 */
	minus: function (v) {
		return new OOGL.Vector2(this.x - v.x, this.y - v.y);
	},

	/**
	 * Multiplies this vector by the specified constant factor.
	 *
	 * @method multiply
	 * @param {Number} f The constant factor.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector(3, 4);
	 *	v.multiply(2); // v is now (6, 8)
	 */
	multiply: function (f) {
		this.x *= f;
		this.y *= f;
		return this;
	},

	/**
	 * Divides this vector by the specified constant factor.
	 *
	 * @method divide
	 * @param {Number} f The constant factor.
	 * @chainable
	 * @example
	 *	var v = new OOGL.Vector(6, 8);
	 *	v.multiply(2); // v is now (3, 4)
	 */
	divide: function (f) {
		this.x /= f;
		this.y /= f;
		return this;
	},
	by: function (f) {
		return new OOGL.Vector2(this.x * f, this.y * f);
	},
	dot: function (v) {
		return this.x * v.x + this.y * v.y;
	},
	reflect: function (n) {
		var dot = this.x * n.x + this.y * n.y;
		this.x -= 2 * dot * n.x;
		this.y -= 2 * dot * n.y;
		return this;
	},
	getReflected: function (n) {
		var dot = this.x * n.x + this.y * n.y;
		return new OOGL.Vector2(this.x - 2 * dot * n.x, this.y - 2 * dot * n.y);
	},
	refract: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			this.x = 0;
			this.y = 0;
		} else {
			this.x = eta * this.x - (eta * dot + Math.sqrt(k)) * n.x;
			this.y = eta * this.y - (eta * dot + Math.sqrt(k)) * n.y;
		}
		return this;
	},
	getRefracted: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			return OOGL.Vector2.NULL;
		} else {
			return new OOGL.Vector2(
				eta * this.x - (eta * dot + Math.sqrt(k)) * n.x,
				eta * this.y - (eta * dot + Math.sqrt(k)) * n.y
				);
		}
	}
};

/**
 * The null vector `(0, 0)`.
 *
 * @property NULL
 * @static
 * @type OOGL.Vector2
 */
OOGL.Vector2.NULL = new OOGL.Vector2(0, 0);

/**
 * The `(1, 0)` vector.
 *
 * @property I
 * @static
 * @type OOGL.Vector2
 */
OOGL.Vector2.I = new OOGL.Vector2(1, 0);

/**
 * The `(0, 1)` vector.
 *
 * @property J
 * @static
 * @type OOGL.Vector2
 */
OOGL.Vector2.J = new OOGL.Vector2(0, 1);
