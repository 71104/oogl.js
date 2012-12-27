/*global OOGL: false */

/**
 * A mutable 4-component vector. This is usually the homogeneous version of a
 * 3-component vector.
 *
 * @class OOGL.Vector4
 * @constructor
 * @param {Number} x The X component.
 * @param {Number} y The Y component.
 * @param {Number} z The Z component.
 * @param {Number} w The homogeneous W component.
 * @example
 *	var v = new OOGL.Vector4(3, 4, 5, 1);
 */
OOGL.Vector4 = function (x, y, z, w) {
	/**
	 * The X component.
	 *
	 * @property x
	 * @type Number
	 */
	this.x = x;

	/**
	 * The y component.
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

	/**
	 * The homogeneous W component.
	 *
	 * @property w
	 * @type Number
	 */
	this.w = w;
};

OOGL.Vector4.prototype = {
	toStandard: function () {
		return new OOGL.Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
	}
};
