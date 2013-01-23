/*global OOGL: false */

/**
 * @module OOGL
 */

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
	/**
	 * Clones this vector and returns the new one.
	 *
	 * @method clone
	 * @return {OOGL.Vector4} The new vector.
	 * @example
	 *	var w = v.clone();
	 */
	clone: function () {
		return new OOGL.Vector4(this.x, this.y, this.z, this.w);
	},

	/**
	 * Returns this vector as an array of four elements.
	 *
	 * @method toArray
	 * @return {Number[]} An array containing the X, Y, Z and W components of
	 *	this vector.
	 * @example
	 *	var v = new OOGL.Vector4(1, 2, 3, 1);
	 *	program.uniform4fv('Position', v.toArray());
	 */
	toArray: function () {
		return [this.x, this.y, this.z, this.w];
	},

	/**
	 * Converts this homogeneous vector to a 3-component standard vector
	 * dividing the X, Y and Z components by the W component. This method
	 * produces a new `OOGL.Vector3` object, while this vector is not changed.
	 *
	 * @method toStandard
	 * @return {OOGL.Vector3} The computed standard vector.
	 * @example
	 *	var w = new OOGL.Vector4(2, 4, 6, 2);
	 *	var v = w.toStandard(); // v is (1, 2, 3)
	 */
	toStandard: function () {
		return new OOGL.Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
	}
};
