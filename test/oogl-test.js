/*! Object-Oriented Graphics Library - v1.0.0 - 2012-12-31
* Released under the MIT License
* http://oogljs.com/
* Copyright (c) 2012 Alberto La Rocca */

var OOGL = function (callback) {
	if (typeof callback === 'function') {
		document.addEventListener('DOMContentLoaded', callback, false);
	}
};

if (typeof $ === 'undefined') {
	/*jshint undef: false */
	$ = OOGL;
}

/*global OOGL: false */

/**
 * Provides methods for performing AJAX requests. Useful for loading assets such
 * as shaders.
 *
 * @class OOGL.Ajax
 * @static
 */
OOGL.Ajax = new (function () {
	var errorCallback = function () {};

	/**
	 * Lets the user define a callback function that gets called when an error
	 * related to an AJAX request occurs.
	 *
	 * @method onError
	 * @param {Function} callback A user-defined callback function that gets
	 *	called in case of an error in an AJAX request.
	 * @example
	 *	OOGL.Ajax.onError(function () {
	 *		alert('AJAX error occurred.');
	 *	});
	 */
	this.onError = function (callback) {
		errorCallback = callback || function () {};
	};

	function XHR(handler) {
		var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.onreadystatechange = handler;
		return xhr;
	}

	function makeRequest(method, url, callback) {
		var xhr = new XHR(function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					callback(xhr.responseText);
				} else {
					errorCallback();
				}
			}
		});
		xhr.open(method, url);
		xhr.send();
	}
	function makeJSONRequest(method, url, callback) {
		var xhr = new XHR(function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					callback(JSON.parse(xhr.responseText));
				} else {
					errorCallback();
				}
			}
		});
		xhr.open(method, url);
		xhr.send();
	}

	/**
	 * Performs a GET AJAX request. The data returned from the server is passed
	 * to a user-defined callback function.
	 *
	 * @method get
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 * @example
	 *	OOGL.Ajax.get('shaders/frag/box.frag', function (source) {
	 *		fragmentShader = new oogl.FragmentShader(source);
	 *		// ...
	 *	});
	 */
	this.get = function (url, callback) {
		makeRequest('GET', url, callback);
	};

	/**
	 * Performs a GET AJAX request. The data returned from the server is parsed
	 * as JSON and passed to a user-defined callback function.
	 *
	 * @method getJSON
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 * @example
	 *	OOGL.Ajax.getJSON('meshes/box.json', function (box) {
	 *		vertices = new oogl.VertexArray(0, 3, box.vertices);
	 *		textureCoordinates = new oogl.VertexArray(1, 2, box.textureCoordinates);
	 *		// ...
	 *	});
	 */
	this.getJSON = function (url, callback) {
		makeJSONRequest('GET', url, callback);
	};

	/**
	 * Performs a POST AJAX request. The data returned from the server is passed
	 * to a user-defined callback function.
	 *
	 * @method post
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 */
	this.post = function (url, callback) {
		makeRequest('POST', url, callback);
	};

	/**
	 * Performs a POST AJAX request. The data returned from the server is parsed
	 * as JSON and passed to a user-defined callback function.
	 *
	 * @method postJSON
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 */
	this.postJSON = function (url, callback) {
		makeJSONRequest('POST', url, callback);
	};

	/**
	 * Performs a PUT AJAX request. The data returned from the server is passed
	 * to a user-defined callback function.
	 *
	 * @method put
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 */
	this.put = function (url, callback) {
		makeRequest('PUT', url, callback);
	};

	/**
	 * Performs a PUT AJAX request. The data returned from the server is parsed
	 * as JSON and passed to a user-defined callback function.
	 *
	 * @method putJSON
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 */
	this.putJSON = function (url, callback) {
		makeJSONRequest('PUT', url, callback);
	};

	/**
	 * Performs a DELETE AJAX request. The data returned from the server is
	 * passed to a user-defined callback function.
	 *
	 * @method _delete
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 */
	this._delete = function (url, callback) {
		makeRequest('DELETE', url, callback);
	};

	/**
	 * Performs a DELETE AJAX request. The data returned from the server is
	 * parsed as JSON and passed to a user-defined callback function.
	 *
	 * @method deleteJSON
	 * @param {String} url The URL to request.
	 * @param {Function} callback A one-argument user-defined callback function
	 *	that is invoked when the request completes successfully.
	 */
	this.deleteJSON = function (url, callback) {
		makeJSONRequest('DELETE', url, callback);
	};
})();

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
	 * Returns this vector as an array of two elements.
	 *
	 * @method toArray
	 * @return {Number[]} An array containing the X and Y components of this
	 *	vector.
	 * @example
	 *	var v = new OOGL.Vector2(1, 2);
	 *	program.uniform2fv('Position', v.toArray());
	 */
	toArray: function () {
		return [this.x, this.y];
	},

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
	 * @method getNormalized
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
	 *	var v1 = new OOGL.Vector2(3, 4);
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

	/**
	 * Multiplies this vector by the specified constant factor and returns the
	 * product as a new `Vector2` object. This vector is not changed.
	 *
	 * @method by
	 * @param {Number} f The constant factor.
	 * @return {OOGL.Vector2} The product vector.
	 * @example
	 *	var v1 = new OOGL.Vector2(3, 4);
	 *	var v2 = v1.by(2); // (6, 8)
	 */
	by: function (f) {
		return new OOGL.Vector2(this.x * f, this.y * f);
	},

	/**
	 * Computes the dot product between this vector and the specified one.
	 *
	 * @method dot
	 * @param {OOGL.Vector2} v The other vector.
	 * @return {Number} The computed dot product.
	 * @example
	 *	var v1 = new OOGL.Vector2(1, 2);
	 *	var v2 = new OOGL.Vector2(3, 4);
	 *	var dot = v1.dot(v2); // 11
	 */
	dot: function (v) {
		return this.x * v.x + this.y * v.y;
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
	 * @param {OOGL.Vector2} n The normal vector.
	 * @chainable
	 * @example
	 *	// reflects a velocity vector against a floor
	 *	velocity.reflect(new OOGL.Vector2(0, 1));
	 */
	reflect: function (n) {
		var dot = this.x * n.x + this.y * n.y;
		this.x -= 2 * dot * n.x;
		this.y -= 2 * dot * n.y;
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
	 * The computed vector is returned as a new `Vector2` object, this vector is
	 * not changed.
	 *
	 * @method getReflected
	 * @param {OOGL.Vector2} n The normal vector.
	 * @return {OOGL.Vector2} The computed reflected vector.
	 * @example
	 *	// reflects a velocity vector against a floor
	 *	var newVelocity = velocity.getReflected(new OOGL.Vector2(0, 1));
	 */
	getReflected: function (n) {
		var dot = this.x * n.x + this.y * n.y;
		return new OOGL.Vector2(this.x - 2 * dot * n.x, this.y - 2 * dot * n.y);
	},

	/**
	 * Refracts this vector given a surface normal `n` and the `eta` ratio
	 * between refraction indices.
	 *
	 * This method modifies the original object.
	 *
	 * @method refract
	 * @chainable
	 * @param {OOGL.Vector2} n The surface normal at the incidence point.
	 * @param {Number} eta The ratio between refraction indices.
	 * @example
	 *	var v = new OOGL.Vector2(0.3, -1);
	 *	var n = new OOGL.Vector2(0, 1);
	 *	v.refract(n, 1.3);
	 */
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

	/**
	 * Refracts this vector given a surface normal `n` and the `eta` ratio
	 * between refraction indices; the computed vector is returned as a new
	 * `OOGL.Vector2` object, this object is not changed.
	 *
	 * @method getRefracted
	 * @param {OOGL.Vector2} n The surface normal at the incidence point.
	 * @param {Number} eta The ratio between refraction indices.
	 * @return {OOGL.Vector2} The refracted vector.
	 * @example
	 *	var v = new OOGL.Vector2(0.3, -1);
	 *	var n = new OOGL.Vector2(0, 1);
	 *	var w = v.getRefracted(n, 1.3);
	 */
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

/*global OOGL: false */

/**
 * A mutable 2x2 matrix.
 *
 * @class OOGL.Matrix2
 * @constructor
 * @param {Number[]} data A 4-element array of the floating point values to be
 *	put into the matrix.
 *
 * Matrix elements are specified in column-major order.
 *
 * The specified `data` array is duplicated into the matrix, changes to it will
 * not affect the content of the matrix.
 *
 * An exception is thrown if the length of the `data` array is not 4.
 * @example
 *	var matrix = new OOGL.Matrix2([1, 0, 0, 1]); // creates the 2x2 identity matrix
 */
OOGL.Matrix2 = function (data) {
	if (data.length != 4) {
		throw 'A 2x2 matrix must have exactly 4 elements.';
	}

	/**
	 * The element at cell (0, 0) of this matrix.
	 *
	 * @property 0
	 * @type Number
	 * @example
	 *	var a00 = matrix[0];
	 */

	/**
	 * The element at cell (1, 0) of this matrix.
	 *
	 * @property 1
	 * @type Number
	 * @example
	 *	var a10 = matrix[1];
	 */

	/**
	 * The element at cell (0, 1) of this matrix.
	 *
	 * @property 2
	 * @type Number
	 * @example
	 *	var a01 = matrix[2];
	 */

	/**
	 * The element at cell (1, 1) of this matrix.
	 *
	 * @property 3
	 * @type Number
	 * @example
	 *	var a11 = matrix[3];
	 */
	for (var i = 0; i < 4; i++) {
		this[i] = data[i];
	}
};

OOGL.Matrix2.prototype = {
	/**
	 * Returns the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * fetching the `j * 2 + i`-th element of the array:
	 *
	 *	matrix.get(i, j) == matrix[j * 2 + i] // true
	 *
	 * @method get
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @return {Number} The value at the specified row and column.
	 * @example
	 *	var m = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var determinant = m.get(0, 0) * m.get(1, 1) - m.get(0, 1) * m.get(1, 0); // -5
	 */
	get: function (i, j) {
		return this[j * 2 + i];
	},

	/**
	 * Changes the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * setting the `j * 2 + i`-th element of the array:
	 *
	 *	matrix.put(i, j, x);
	 *	matrix[j * 2 + i] = x; // same as previous
	 *
	 * @method put
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @param {Number} value The value to put at the specified row and column.
	 * @example
	 *	var matrix = new OOGL.Matrix2([3, 3, 0, 3]);
	 *	matrix.put(0, 1, 3); // now matrix is [3, 3, 3, 3]
	 */
	put: function (i, j, value) {
		this[j * 2 + i] = value;
		return this;
	},

	/**
	 * Transposes this matrix.
	 *
	 * @method transpose
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	matrix.transpose(); // matrix is now [1, 3, 2, 4]
	 */
	transpose: function () {
		var newArray = [this[0], this[2], this[1], this[3]];
		for (var i = 0; i < 4; i++) {
			this[i] = newArray[i];
		}
		return this;
	},

	/**
	 * Computes the transposed matrix and returns it as a new `Matrix2` object.
	 * This matrix is not changed.
	 *
	 * @method getTransposed
	 * @return {OOGL.Matrix2} The transposed matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var m2 = m1.getTransposed(); // m2 is [1, 3, 2, 4], m1 is still [1, 2, 3, 4]
	 */
	getTransposed: function () {
		return new OOGL.Matrix2([this[0], this[2], this[1], this[3]]);
	},

	/**
	 * Adds the specified matrix to this one.
	 *
	 * Each element of the specified matrix is added up to the respective
	 * element in this matrix. The specified `m` matrix is not changed.
	 *
	 * @method add
	 * @param {OOGL.Matrix2} m The matrix to add.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	matrix.add(new OOGL.Matrix2([4, 3, 2, 1])); // matrix is now [5, 5, 5, 5]
	 */
	add: function (m) {
		for (var i = 0; i < 4; i++) {
			this[i] += m[i];
		}
		return this;
	},

	/**
	 * Adds the specified matrix to this one and returns the sum as a new
	 * `Matrix2` object. This matrix is not changed.
	 *
	 * @method plus
	 * @param {OOGL.Matrix2} m The matrix to add.
	 * @return {OOGL.Matrix2} The sum matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var m2 = new OOGL.Matrix2([4, 3, 2, 1]);
	 *	var m3 = m1.plus(m2); // [5, 5, 5, 5]
	 */
	plus: function (m) {
		var newArray = [];
		for (var i = 0; i < 4; i++) {
			newArray.push(this[i] + m[i]);
		}
		return new OOGL.Matrix2(newArray);
	},

	/**
	 * Subtracts the specified matrix to this one.
	 *
	 * Each element of the specified matrix is subtracted to the respective
	 * element in this matrix. The specified `m` matrix is not changed.
	 *
	 * @method subtract
	 * @param {OOGL.Matrix2} m The matrix to subtract.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix2([5, 5, 5, 5]);
	 *	matrix.subtract(new OOGL.Matrix2([4, 3, 2, 1])); // matrix is now [1, 2, 3, 4]
	 */
	subtract: function (m) {
		for (var i = 0; i < 4; i++) {
			this[i] -= m[i];
		}
		return this;
	},

	/**
	 * Subtracts the specified matrix to this one and returns the difference as
	 * a new `Matrix2` object. This matrix is not changed.
	 *
	 * @method minus
	 * @param {OOGL.Matrix2} m The matrix to subtract.
	 * @return {OOGL.Matrix2} The difference matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([5, 5, 5, 5]);
	 *	var m2 = new OOGL.Matrix2([4, 3, 2, 1]);
	 *	var m3 = m1.minus(m2); // [1, 2, 3, 4]
	 */
	minus: function (m) {
		var newArray = [];
		for (var i = 0; i < 4; i++) {
			newArray.push(this[i] - m[i]);
		}
		return new OOGL.Matrix2(newArray);
	},

	/**
	 * Multiplies this matrix by the specified constant factor. This method
	 * changes the original matrix.
	 *
	 * @method multiply
	 * @param {Number} x The multiplying factor.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	matrix.multiply(2); // matrix is now [2, 4, 6, 8]
	 */
	multiply: function (x) {
		for (var i = 0; i < 4; i++) {
			this[i] *= x;
		}
		return this;
	},

	/**
	 * Multiplies this matrix by the specified constant factor and returns the
	 * product as a new `Matrix2` object. This matrix is not changed.
	 *
	 * @method by
	 * @param {Number} x The multiplying factor.
	 * @return {OOGL.Matrix2} The product matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var m2 = m1.by(2); // [2, 4, 6, 8]
	 */

	/**
	 * Left-multiplies this matrix by the specified `Vector2` object and returns
	 * the product as a new `Vector2` object. Neither this matrix nor the
	 * specified vector are changed.
	 *
	 * @method by
	 * @param {OOGL.Vector2} v The vector to multiply.
	 * @return {OOGL.Vector2} The product vector.
	 * @example
	 *	var m = new OOGL.Matrix2([2, 0, 0, 2]);
	 *	var v = new OOGL.Vector2(2, 2);
	 *	var w = m.by(v); // (4, 4)
	 */

	/**
	 * Left-multiplies this matrix by the specified `Matrix2` object and returns
	 * the product as a new `Matrix2` object. Neither this matrix nor the
	 * specified one are changed.
	 *
	 * @method by
	 * @param {OOGL.Matrix2} v The matrix to multiply.
	 * @return {OOGL.Matrix2} The product matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([2, 0, 0, 2]);
	 *	var m2 = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var m3 = m1.by(m2); // (2, 4, 6, 8)
	 */
	by: function (x) {
		if (x instanceof OOGL.Vector2) {
			return new OOGL.Vector2(
				this[0] * x.x + this[2] * x.y,
				this[1] * x.x + this[3] * x.y
				);
		} else if (x instanceof OOGL.Matrix2) {
			return new OOGL.Matrix2([
				this[0] * x[0] + this[2] * x[1],
				this[1] * x[0] + this[3] * x[1],
				this[0] * x[2] + this[2] * x[3],
				this[1] * x[2] + this[3] * x[3]
			]);
		} else {
			var newArray = [];
			for (var i = 0; i < 4; i++) {
				newArray.push(this[i] * x);
			}
			return new OOGL.Matrix2(newArray);
		}
	},

	/**
	 * Computes the determinant of this matrix.
	 *
	 * @method determinant
	 * @return {Number} The computed determinant.
	 * @example
	 *	var m = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var d = m.determinant(); // -2
	 */
	determinant: function () {
		return this[0] * this[3] - this[1] * this[2];
	},

	/**
	 * Inverts this matrix.
	 *
	 * @method invert
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	matrix.invert(); // matrix is now [-0.5, -1, -1.5, -2]
	 */
	invert: function () {
		var determinant = this[0] * this[3] - this[1] * this[2];
		var newArray = [
			this[3] / determinant,
			this[2] / determinant,
			this[1] / determinant,
			this[0] / determinant
		];
		for (var i = 0; i < 4; i++) {
			this[i] = newArray[i];
		}
		return this;
	},

	/**
	 * Computes the inverse matrix and returns it as a new `Matrix2` object.
	 * This matrix is not changed.
	 *
	 * @method getInverse
	 * @return {OOGL.Matrix2} The inverse matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var m2 = m1.getInverse(); // [-0.5, -1, -1.5, -2]
	 */
	getInverse: function () {
		var determinant = this[0] * this[3] - this[1] * this[2];
		return new OOGL.Matrix2([
			this[3] / determinant,
			this[2] / determinant,
			this[1] / determinant,
			this[0] / determinant
		]);
	}
};

/**
 * The 2x2 null matrix.
 *
 * @property OOGL.Matrix2.NULL
 * @static
 * @type OOGL.Matrix2
 */
OOGL.Matrix2.NULL = new OOGL.Matrix2([0, 0, 0, 0]);

/**
 * The 2x2 identity matrix.
 *
 * @property OOGL.Matrix2.IDENTITY
 * @static
 * @type OOGL.Matrix2
 */
OOGL.Matrix2.IDENTITY = new OOGL.Matrix2([1, 0, 0, 1]);

/**
 * Creates a 2D rotation matrix with the specified angle.
 *
 * @class OOGL.RotationMatrix2
 * @extends OOGL.Matrix2
 * @constructor
 * @param {Number} a The (counterclockwise) rotation angle, in radians.
 * @example
 *	var rotation = new OOGL.RotationMatrix2(30 * Math.PI / 180); // 30 degrees rotation
 */
OOGL.RotationMatrix2 = function (a) {
	var s = Math.sin(a);
	var c = Math.cos(a);
	return new OOGL.Matrix2([c, s, -s, c]);
};

/**
 * Creates a 2D scaling matrix with the specified X and Y scaling factors.
 *
 * @class OOGL.ScalingMatrix2
 * @extends OOGL.Matrix2
 * @constructor
 * @param {Number} x The X scaling factor.
 * @param {Number} y The Y scaling factor.
 * @example
 *	var scaling = new OOGL.ScalingMatrix2(0.5, 0.5); // halves the size of anything
 */
OOGL.ScalingMatrix2 = function (x, y) {
	return new OOGL.Matrix2([x, 0, 0, y]);
};

/*global OOGL: false */

/**
 * A mutable 3x3 matrix.
 *
 * @class OOGL.Matrix3
 * @constructor
 * @param {Number[]} data A 9-element array of the floating point values to be
 *	put into the matrix.
 *
 * Matrix elements are specified in column-major order.
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

	// TODO documentare elementi

	for (var i = 0; i < 9; i++) {
		this[i] = data[i];
	}
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
	 * fetching the `j * 3 + i`-th element of the array:
	 *
	 *	matrix.get(i, j) == matrix[j * 3 + i] // true
	 *
	 * @method get
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @return {Number} The value at the specified row and column.
	 * @example
	 *	var m = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	if (m.get(2, 1) == m[6]) { // true
	 *		...
	 */
	get: function (i, j) {
		return this[j * 3 + i];
	},

	/**
	 * Changes the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * setting the `j * 3 + i`-th element of the array:
	 *
	 *	matrix.put(i, j, x);
	 *	matrix[j * 3 + i] = x; // same as previous
	 *
	 * @method put
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @param {Number} value The value to put at the specified row and column.
	 * @example
	 *	var matrix = new OOGL.Matrix3([3, 3, 0, 3, 3, 3, 3, 3, 3]);
	 *	matrix.put(0, 1, 3); // now matrix is [3, 3, 3, 3, 3, 3, 3, 3, 3]
	 */
	put: function (i, j, value) {
		this[j * 3 + i] = value;
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

	/**
	 * Multiplies this matrix by the specified `Matrix3` object. This method
	 * changes the original matrix.
	 *
	 * @method multiply
	 * @param {OOGL.Matrix3} x The multiplying matrix.
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	matrix.multiply(new OOGL.Matrix3([2, 0, 0, 0, 2, 0, 0, 0, 2])); // matrix is now [2, 4, 6, 8, 10, 12, 14, 16, 18]
	 */
	multiply: function (x) {
		var i;
		if (x instanceof OOGL.Matrix3) {
			var newArray = [
				this[0] * x[0] + this[3] * x[1] + this[6] * x[2],
				this[1] * x[0] + this[4] * x[1] + this[7] * x[2],
				this[2] * x[0] + this[5] * x[1] + this[8] * x[2],
				this[0] * x[3] + this[3] * x[4] + this[6] * x[5],
				this[1] * x[3] + this[4] * x[4] + this[7] * x[5],
				this[2] * x[3] + this[5] * x[4] + this[8] * x[5],
				this[0] * x[6] + this[3] * x[7] + this[6] * x[8],
				this[1] * x[6] + this[4] * x[7] + this[7] * x[8],
				this[2] * x[6] + this[5] * x[7] + this[8] * x[8]
			];
			for (i = 0; i < 9; i++) {
				this[i] = newArray[i];
			}
		} else {
			for (i = 0; i < 9; i++) {
				this[i] *= x;
			}
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

	/**
	 * Left-multiplies this matrix by the specified `Matrix3` object and returns
	 * the product as a new `Matrix3` object. Neither this matrix nor the
	 * specified one are changed.
	 *
	 * @method by
	 * @param {OOGL.Matrix3} v The matrix to multiply.
	 * @return {OOGL.Matrix3} The product matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	 *	var m2 = new OOGL.Matrix3([2, 0, 0, 0, 2, 0, 0, 0, 2]);
	 *	var m3 = m1.by(m2); // [2, 4, 6, 8, 10, 12, 14, 16, 18]
	 */
	by: function (x) {
		if (x instanceof OOGL.Matrix3) {
			return new OOGL.Matrix3([
				this[0] * x[0] + this[3] * x[1] + this[6] * x[2],
				this[1] * x[0] + this[4] * x[1] + this[7] * x[2],
				this[2] * x[0] + this[5] * x[1] + this[8] * x[2],
				this[0] * x[3] + this[3] * x[4] + this[6] * x[5],
				this[1] * x[3] + this[4] * x[4] + this[7] * x[5],
				this[2] * x[3] + this[5] * x[4] + this[8] * x[5],
				this[0] * x[6] + this[3] * x[7] + this[6] * x[8],
				this[1] * x[6] + this[4] * x[7] + this[7] * x[8],
				this[2] * x[6] + this[5] * x[7] + this[8] * x[8]
			]);
		} else if (x instanceof OOGL.Vector3) {
			return new OOGL.Vector3(
				this[0] * x.x + this[3] * x.y + this[6] * x.z,
				this[1] * x.x + this[4] * x.y + this[7] * x.z,
				this[2] * x.x + this[5] * x.y + this[8] * x.z
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
			this[3] * (this[1] * this[8] - this[2] * this[7]) +
			this[6] * (this[1] * this[5] - this[2] * this[4]);
	},

	/**
	 * Inverts this matrix.
	 *
	 * @method invert
	 * @chainable
	 * @example
	 *	TODO
	 */
	invert: function () {
		var determinant = this[0] * (this[4] * this[8] - this[5] * this[7]) -
			this[3] * (this[1] * this[8] - this[2] * this[7]) +
			this[6] * (this[1] * this[5] - this[2] * this[4]);
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
	 *	TODO
	 */
	getInverse: function () {
		var determinant = this[0] * (this[4] * this[8] - this[5] * this[7]) -
			this[3] * (this[1] * this[8] - this[2] * this[7]) +
			this[6] * (this[1] * this[5] - this[2] * this[4]);
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
 * @param {Number} a The rotation angle.
 * @example
 *	var m = new OOGL.RotationMatrix3(0, 1, 0, Math.PI / 2); // 90 degrees horizontal rotation
 */
OOGL.RotationMatrix3 = function (x, y, z, a) {
	var s = Math.sin(a);
	var c = Math.cos(a);
	return new OOGL.Matrix3([
		c + x * x * (1 - c),
		x * y * (1 - c) - z * s,
		x * z * (1 - c) + y * s,
		y * x * (1 - c) + z * s,
		c + y * y * (1 - c),
		y * z * (1 - c) - x * s,
		z * x * (1 - c) - y * s,
		z * y * (1 - c) + x * s,
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

/*global OOGL: false */

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
 * Requests a new WebGL context on the specified canvas and wraps it in a new
 * OOGL object. An exception is thrown if WebGL is not supported or the GPU is
 * blacklisted.
 *
 * The constructed OOGL object extends a normal WebGL rendering context, so you
 * can use all the GL properties and functions just like you were using a normal
 * `gl` object returned by `canvas.getContext('webgl')`:
 *
 *	var oogl = new OOGL.Context('canvas');
 *	oogl.clearColor(0, 0, 0, 1);
 *	oogl.clear(oogl.COLOR_BUFFER_BIT);
 *	oogl.flush();
 *
 * Furthermore the OOGL object includes OOGL-specific subclasses like `Program`
 * and `Shader`, so that you can say, for example:
 *
 *	var fragmentShader = new oogl.Shader(oogl.FRAGMENT_SHADER);
 *	fragmentShader.source(fragmentSource);
 *	fragmentShader.compile();
 *	if (!fragmentShader.getParameter(oogl.COMPILE_STATUS)) {
 *		throw fragmentShader.getInfoLog();
 *	}
 *	var vertexShader = new oogl.Shader(oogl.VERTEX_SHADER);
 *	vertexShader.source(vertexSource);
 *	vertexShader.compile();
 *	if (!vertexShader.getParameter(oogl.COMPILE_STATUS)) {
 *		throw vertexShader.getInfoLog();
 *	}
 *	var program = new oogl.Program();
 *	program.attachShader(fragmentShader);
 *	program.attachShader(vertexShader);
 *	program.bindAttribLocation(0, 'in_Vertex');
 *	program.bindAttribLocation(1, 'in_TexCoord');
 *	program.link();
 *	if (!program.getParameter(oogl.LINK_STATUS)) {
 *		throw program.getInfoLog();
 *	}
 *	program.use();
 *
 * Or, simpler:
 *
 *	// automatically compiles and links, throws if an error occurs
 *	var program = new oogl.AutoProgram(fragmentSource, vertexSource, ['in_Vertex, in_TexCoord']);
 *	program.use();
 *
 * @class OOGL.Context
 * @extends WebGLRenderingContext
 * @constructor
 * @param {Mixed} canvasOrId An HTMLCanvasElement DOM object, or a string
 *	containing its `id` attribute, representing the canvas whose WebGL context
 *	has to be wrapped.
 * @param {Object} [attributes] WebGL attributes to pass to `canvas.getContext`.
 * @example
 *	var oogl = new OOGL.Context('canvas', {
 *		stencil: true
 *	});
 */
OOGL.Context = function (canvasOrId, attributes) {
	var canvas;
	if (typeof canvasOrId !== 'string') {
		canvas = canvasOrId;
	} else {
		canvas = document.getElementById(canvasOrId);
	}
	var context = canvas.getContext('webgl', attributes);
	if (!context) {
		context = canvas.getContext('experimental-webgl', attributes);
	}
	if (!context) {
		throw 'WebGL not supported.';
	}

/*global context: false */

/**
 * Wraps a GL buffer with a specified target, data type and usage settings.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createBuffer`. The returned `WebGLBuffer` object is extended by
 * OOGL-specific features and returned by the `Buffer` constructor.
 *
 * @class oogl.Buffer
 * @extends WebGLBuffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param {Number} usage One of `gl.STATIC_DRAW`, `gl.STREAM_DRAW` or
 *	`gl.DYNAMIC_DRAW`; will be used when calling `gl.bufferData` through the
 *	provided `data` method.
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var buffer = new oogl.Buffer(oogl.ARRAY_BUFFER, 'float', oogl.STATIC_DRAW);
 */
context.Buffer = (function () {
	var types = {
		'byte': {
			constructor: Int8Array,
			size: 1
		},
		'ubyte': {
			constructor: Uint8Array,
			size: 1
		},
		'short': {
			constructor: Int16Array,
			size: 2
		},
		'ushort': {
			constructor: Uint16Array,
			size: 2
		},
		'float': {
			constructor: Float32Array,
			size: 4
		}
	};
	return function (target, type, usage) {
		var Constructor;
		if (types.hasOwnProperty(type)) {
			Constructor = types[type].constructor;
		} else {
			throw 'Invalid buffer type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
		}
		var buffer = context.createBuffer();

		/**
		 * Indicates whether this is a valid GL buffer.
		 *
		 * `gl.isBuffer` equivalent.
		 *
		 * @method is
		 * @return {Boolean} `true` if this is a valid GL buffer, `false`
		 *	otherwise.
		 * @example
		 *	if (buffer.is()) {
		 *		// ...
		 */
		buffer.is = function () {
			return context.isBuffer(buffer);
		};

		/**
		 * Queries a buffer-related parameter.
		 *
		 * `gl.getBufferParameter` equivalent.
		 *
		 * @method getParameter
		 * @param {Number} name The name of the parameter to query.
		 * @return {Mixed} The queried value.
		 * @example
		 *	var size = buffer.getParameter(oogl.BUFFER_SIZE);
		 */
		buffer.getParameter = function (name) {
			return context.getBufferParameter(target, name);
		};

		/**
		 * Queries the size of this buffer.
		 *
		 * Equivalent to calling `gl.getBufferParameter` with `gl.BUFFER_SIZE`.
		 *
		 * @method getSize
		 * @return {Number} The size of this buffer.
		 * @example
		 *	var size = buffer.getSize();
		 */
		buffer.getSize = function () {
			return context.getBufferParameter(target, context.BUFFER_SIZE);
		};

		/**
		 * Queries the usage settings for this buffer.
		 *
		 * Equivalent to calling `gl.getBufferParameter` with `gl.BUFFER_USAGE`.
		 *
		 * @method getUsage
		 * @return {Number} The usage settings for this buffer; will be one of
		 *	`gl.STATIC_DRAW`, `gl.STREAM_DRAW` or `gl.DYNAMIC_DRAW`.
		 * @example
		 *	var usage = buffer.getUsage();
		 */
		buffer.getUsage = function () {
			return context.getBufferParameter(target, context.BUFFER_USAGE);
		};

		/**
		 * Binds this buffer to its target.
		 *
		 * Equivalent to calling `gl.bindBuffer` with the target specified to
		 * the constructor.
		 *
		 * @method bind
		 * @example
		 *	buffer.bind();
		 */
		buffer.bind = function () {
			context.bindBuffer(target, buffer);
		};

		/**
		 * Allocates or specifies buffer data.
		 *
		 * Equivalent to calling `gl.bufferData` using the target and usage
		 * specified to the constructor.
		 *
		 * The specified argument is either the size to allocate or the data to
		 * store; in the latter case it is specified as a standard JavaScript
		 * array and automatically converted by OOGL to a typed array, depending
		 * on the `type` specified to the constructor.
		 *
		 * @method data
		 * @param {Mixed} sizeOrData Either a number representing the size to
		 *	allocate or a JavaScript `Array` containing the data to store.
		 * @example
		 *	buffer.data([1, 1, -1, 1, -1, -1, 1, -1]);
		 */
		buffer.data = function (sizeOrData) {
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new types[type].constructor(sizeOrData);
			}
			context.bufferData(target, sizeOrData, usage);
		};

		/**
		 * Binds this buffer to its target and then allocates or specifies
		 * buffer data.
		 *
		 * Equivalent to calling `bind` and `data` subsequently.
		 *
		 * @method bindAndData
		 * @param {Mixed} sizeOrData Either a number representing the size to
		 *	allocate or a JavaScript `Array` containing the data to store. See
		 *	the `bind` method.
		 * @example
		 *	buffer.bindAndData([1, 1, -1, 1, -1, -1, 1, -1]);
		 */
		buffer.bindAndData = function (sizeOrData) {
			context.bindBuffer(target, buffer);
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new types[type].constructor(sizeOrData);
			}
			context.bufferData(target, sizeOrData, usage);
		};

		/**
		 * Specifies buffer data.
		 *
		 * Equivalent to calling `gl.bufferSubData` with the target specified to
		 * the constructor.
		 *
		 * @method subData
		 * @param {Number} offset The index of the first element to overwrite.
		 * @param {Array} data A JavaScript `Array` containing the data to
		 *	store; the array will be automatically converted to a typed array,
		 *	depending on the `type` specified to the constructor.
		 * @example
		 *	buffer.data([1, 1, -1, 0, 0, 0, 0, 0]);
		 *	buffer.subData(3, [1, -1, -1, 1, -1]); // buffer now contains [1, 1, -1, 1, -1, -1, 1, -1]
		 */
		buffer.subData = function (offset, data) {
			context.bufferSubData(target, offset * types[type].size, new types[type].constructor(data));
		};

		/**
		 * Deletes this buffer.
		 *
		 * `gl.deleteBuffer` equivalent.
		 *
		 * @method _delete
		 * @example
		 *	buffer._delete();
		 */
		buffer._delete = function () {
			context.deleteBuffer(buffer);
		};

		return buffer;
	};
})();

/**
 * Wraps a GL buffer whose usage is set to `gl.STATIC_DRAW`.
 *
 * @class oogl.StaticBuffer
 * @extends oogl.Buffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StaticBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.StaticBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STATIC_DRAW);
};

/**
 * Wraps a GL buffer whose usage is set to `gl.STREAM_DRAW`.
 *
 * @class oogl.StreamBuffer
 * @extends oogl.Buffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StreamBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.StreamBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STREAM_DRAW);
};

/**
 * Wraps a GL buffer whose usage is set to `gl.DYNAMIC_DRAW`.
 *
 * @class oogl.DynamicBuffer
 * @extends oogl.Buffer
 * @constructor
 * @param {Number} target The target against which this buffer will be bound
 *	when the provided `bind` method is used. Either `gl.ARRAY_BUFFER` or
 *	`gl.ELEMENT_ARRAY_BUFFER`.
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.DynamicBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.DynamicBuffer = function (target, type) {
	return new context.Buffer(target, type, context.DYNAMIC_DRAW);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER`.
 *
 * @class oogl.ArrayBuffer
 * @extends oogl.Buffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param {Number} usage One of `gl.STATIC_DRAW`, `gl.STREAM_DRAW` or
 *	`gl.DYNAMIC_DRAW`; will be used when calling `gl.bufferData` through the
 *	provided `data` method.
 * @example
 *	var buffer = new oogl.ArrayBuffer('float', oogl.STATIC_DRAW);
 */
context.ArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ARRAY_BUFFER, type, usage);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER`.
 *
 * @class oogl.ElementArrayBuffer
 * @extends oogl.Buffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @param {Number} usage One of `gl.STATIC_DRAW`, `gl.STREAM_DRAW` or
 *	`gl.DYNAMIC_DRAW`; will be used when calling `gl.bufferData` through the
 *	provided `data` method.
 * @example
 *	var buffer = new oogl.ElementArrayBuffer('float', oogl.STATIC_DRAW);
 */
context.ElementArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ELEMENT_ARRAY_BUFFER, type, usage);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER` and usage to
 * `gl.STATIC_DRAW`.
 *
 * @class oogl.StaticArrayBuffer
 * @extends oogl.StaticBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StaticArrayBuffer('float');
 */
context.StaticArrayBuffer = function (type) {
	return new context.StaticBuffer(context.ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER` and usage
 * to `gl.STATIC_DRAW`.
 *
 * @class oogl.StaticElementArrayBuffer
 * @extends oogl.StaticBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StaticElementArrayBuffer('float');
 */
context.StaticElementArrayBuffer = function (type) {
	return new context.StaticBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER` and usage to
 * `gl.STREAM_DRAW`.
 *
 * @class oogl.StreamArrayBuffer
 * @extends oogl.StreamBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StreamArrayBuffer('float');
 */
context.StreamArrayBuffer = function (type) {
	return new context.StreamBuffer(context.ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER` and usage
 * to `gl.STREAM_DRAW`.
 *
 * @class oogl.StreamElementArrayBuffer
 * @extends oogl.StreamBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.StreamElementArrayBuffer('float');
 */
context.StreamElementArrayBuffer = function (type) {
	return new context.StreamBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER` and usage to
 * `gl.DYNAMIC_DRAW`.
 *
 * @class oogl.DynamicArrayBuffer
 * @extends oogl.DynamicBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.DynamicArrayBuffer('float');
 */
context.DynamicArrayBuffer = function (type) {
	return new context.DynamicBuffer(context.ARRAY_BUFFER, type);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER` and usage
 * to `gl.DYNAMIC_DRAW`.
 *
 * @class oogl.DynamicElementArrayBuffer
 * @extends oogl.DynamicBuffer
 * @constructor
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of the data that will be put in the buffer.
 * @example
 *	var buffer = new oogl.DynamicElementArrayBuffer('float');
 */
context.DynamicElementArrayBuffer = function (type) {
	return new context.DynamicBuffer(context.ELEMENT_ARRAY_BUFFER, type);
};

/*global context: false */

/**
 * Creates an array buffer with static draw usage representing a single
 * component vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the
 * `AttributeArray` constructor enables the `index`-th attribute array calling
 * `gl.enableVertexAttribArray` and the provided `pointer` method invokes
 * `gl.vertexAttribPointer` with the specified `index` and `type`.
 *
 * @class oogl.AttributeArray1
 * @extends oogl.StaticArrayBuffer
 * @constructor
 * @param {Number} index The attribute array index.
 * @param {String} type TODO
 * @param {Array} data TODO
 * @param {Boolean} [normalize=false] TODO
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
	context.enableVertexAttribArray(index);

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
	 * @example
	 *	var array = new oogl.AttributeArray(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
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
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 1, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Creates an array buffer with static draw usage representing a 2-component
 * vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the
 * `AttributeArray` constructor enables the `index`-th attribute array calling
 * `gl.enableVertexAttribArray` and the provided `pointer` method invokes
 * `gl.vertexAttribPointer` with the specified `index` and `type`.
 *
 * @class oogl.AttributeArray2
 * @extends oogl.StaticArrayBuffer
 * @constructor
 * @param {Number} index The attribute array index.
 * @param {String} type TODO
 * @param {Array} data TODO
 * @param {Boolean} [normalize=false] TODO
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
	context.enableVertexAttribArray(index);

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
	 * @example
	 *	var array = new oogl.AttributeArray(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
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
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 2, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Creates an array buffer with static draw usage representing a 3-component
 * vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the
 * `AttributeArray` constructor enables the `index`-th attribute array calling
 * `gl.enableVertexAttribArray` and the provided `pointer` method invokes
 * `gl.vertexAttribPointer` with the specified `index` and `type`.
 *
 * @class oogl.AttributeArray3
 * @extends oogl.StaticArrayBuffer
 * @constructor
 * @param {Number} index The attribute array index.
 * @param {String} type TODO
 * @param {Array} data TODO
 * @param {Boolean} [normalize=false] TODO
 * @example
 *	var array = new oogl.AttributeArray(0, 'float', [1, 2, 3, 4, 5, 6, 7, 8]);
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
	context.enableVertexAttribArray(index);

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
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
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 3, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Creates an array buffer with static draw usage representing a 4-component
 * vertex attribute array.
 *
 * The attribute array is associated to the specified `index`: the
 * `AttributeArray` constructor enables the `index`-th attribute array calling
 * `gl.enableVertexAttribArray` and the provided `pointer` method invokes
 * `gl.vertexAttribPointer` with the specified `index` and `type`.
 *
 * @class oogl.AttributeArray4
 * @extends oogl.StaticArrayBuffer
 * @constructor
 * @param {Number} index The attribute array index.
 * @param {String} type TODO
 * @param {Array} data TODO
 * @param {Boolean} [normalize=false] TODO
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
	context.enableVertexAttribArray(index);

	/**
	 * Specifies a pointer to this buffer for the `index`-th vertex attribute
	 * array.
	 *
	 * You may optionally specify `stride` and `offset` parameters.
	 *
	 * `gl.vertexAttribPointer` equivalent.
	 *
	 * @method pointer
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
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
	 * @param {Number} [stride=0] TODO
	 * @param {Number} [offset=0] TODO
	 * @example
	 *	buffer.bindAndPointer();
	 */
	buffer.bindAndPointer = function (stride, offset) {
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.vertexAttribPointer(index, 4, types[type].glType, !!normalize, (stride || 0) * types[type].size, (offset || 0) * types[type].size);
	};

	return buffer;
};

/**
 * Represents a set of vertex attribute arrays; simplifies the management of
 * multiple arrays.
 *
 * @class oogl.AttributeArrays
 * @constructor
 * @param {Number} count The number of vertex attributes each array will
 *	contain.
 * @example
 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoord']);
 *	var arrays = new oogl.AttributeArrays();
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
		 * @param {String} type The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param {Array} data A standard JavaScript array containing the
		 *	attribute data.
		 * @param {Boolean} [normalize=false] Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add1('float', [1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add1: function (type, data, normalize) {
			arrays.push(new context.AttributeArray1(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a 2-component vertex attribute array to the set.
		 *
		 * @method add2
		 * @param {String} type The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param {Array} data A standard JavaScript array containing the
		 *	attribute data.
		 * @param {Boolean} [normalize=false] Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add2('float', [1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add2: function (type, data, normalize) {
			arrays.push(new context.AttributeArray2(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a 3-component vertex attribute array to the set.
		 *
		 * @method add3
		 * @param {String} type The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param {Array} data A standard JavaScript array containing the
		 *	attribute data.
		 * @param {Boolean} [normalize=false] Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add3('float', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
		 */
		add3: function (type, data, normalize) {
			arrays.push(new context.AttributeArray3(arrays.length, type, data, normalize));
		},

		/**
		 * Adds a 4-component vertex attribute array to the set.
		 *
		 * @method add4
		 * @param {String} type The type of the data in the array. Must be one
		 *	of `byte`, `ubyte`, `short`, `ushort` and `float`.
		 * @param {Array} data A standard JavaScript array containing the
		 *	attribute data.
		 * @param {Boolean} [normalize=false] Indicates whether attribute data
		 *	must be normalized by the GL.
		 * @example
		 *	arrays.add4('float', [1, 2, 3, 4, 5, 6, 7, 8]);
		 */
		add4: function (type, data, normalize) {
			arrays.push(new context.AttributeArray4(arrays.length, type, data, normalize));
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
		 * @param {Number} [stride=0] TODO
		 * @param {Number} [offset=0] TODO
		 * @example
		 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoord']);
		 *	var arrays = new oogl.AttributeArrays();
		 *	arrays.add3('float', vertices);
		 *	arrays.add3('float', colors);
		 *	arrays.add2('float', textureCoordinates);
		 *	arrays.bindAndPointer();
		 *	program.use();
		 *	arrays.drawTriangles();
		 */
		bindAndPointer: function (stride, offset) {
			for (var i in arrays) {
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
		 * @param {Number} [offset=0] The index of the first vertex attribute to
		 *	draw.
		 * @param {Number} [count] The number of vertex attributes to draw. When
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
		 * @method drawTriangles
		 * @param {Number} [offset=0] The index of the first vertex attribute to
		 *	draw.
		 * @param {Number} [count] The number of vertex attributes to draw. When
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
		 * @method drawTriangles
		 * @param {Number} [offset=0] The index of the first vertex attribute to
		 *	draw.
		 * @param {Number} [count] The number of vertex attributes to draw. When
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
				arrays[i]._delete();
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
 * @class oogl.ElementArray
 * @extends oogl.StaticElementArrayBuffer
 * @constructor
 * @param {Number[]} indices The element indices.
 * @param {String} [type='ushort'] TODO
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
	var count = indices.length;

	var types = {
		'ubyte': context.UNSIGNED_BYTE,
		'ushort': context.UNSIGNED_SHORT
	};
	if (!types.hasOwnProperty(type || 'ushort')) {
		throw 'Invalid element type, must be either "ubyte" or "ubyte".';
	}

	var buffer = new context.StaticElementArrayBuffer(types[type]);
	buffer.bindAndData(indices);

	/**
	 * Draws the elements in `gl.TRIANGLES` mode.
	 *
	 * Equivalent to calling `gl.drawElements` with `gl.TRIANGLES`.
	 *
	 * @method drawTriangles
	 * @param {Number} [offset=0] The index of the first element to draw.
	 * @param {Number} [count] The number of elements to draw. When not
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
	 * @method drawTriangles
	 * @param {Number} [offset=0] The index of the first element to draw.
	 * @param {Number} [count] The number of elements to draw. When not
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
	 * @param {Number} [offset=0] The index of the first element to draw.
	 * @param {Number} [count] The number of elements to draw. When not
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

/*global context: false */

/**
 * Wraps a GL texture with a specified target.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createTexture`. The returned `WebGLTexture` object is extended by
 * OOGL-specific features and returned by the `Texture` constructor.
 *
 * @class oogl.Texture
 * @extends WebGLTexture
 * @constructor
 * @param {Number} target The target against which this texture will be bound
 *	when the provided `bind` method is used. Either `gl.TEXTURE_2D` or
 *	`gl.TEXTURE_CUBE_MAP`.
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var texture = new oogl.Texture(oogl.TEXTURE_2D);
 */
context.Texture = function (target) {
	var texture = context.createTexture();

	/**
	 * Indicates whether this is a valid GL texture.
	 *
	 * `gl.isTexture` equivalent.
	 *
	 * @method is
	 * @return {Boolean} `true` if this is a valid GL texture, `false`
	 *	otherwise.
	 * @example
	 *	if (texture.is()) {
	 *		// ...
	 */
	texture.is = function () {
		return context.isTexture(texture);
	};

	/**
	 * Binds this texture to its target.
	 *
	 * `gl.bindTexture` equivalent.
	 *
	 * @method bind
	 * @example
	 *	texture.bind();
	 */
	texture.bind = function () {
		context.bindTexture(target, texture);
	};

	/**
	 * Queries a texture-related parameter.
	 *
	 * `gl.getTexParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {Number} name The name of the parameter to query.
	 * @return {Mixed} The queried value.
	 * @example
	 *	var wrapS = texture.getParameter(oogl.TEXTURE_WRAP_S);
	 */
	texture.getParameter = function (name) {
		return context.getTexParameter(target, name);
	};

	/**
	 * Queries the "min filter" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_MIN_FILTER`.
	 *
	 * @method getMinFilter
	 * @return {Number} The "min filter" parameter; one of `gl.NEAREST`,
	 *	`gl.LINEAR`, `gl.NEAREST_MIPMAP_NEAREST`, `gl.LINEAR_MIPMAP_NEAREST`,
	 *	`gl.NEAREST_MIPMAP_LINEAR` or `gl.LINEAR_MIPMAP_LINEAR`.
	 * @example
	 *	var minFilter = texture.getMinFilter();
	 */
	texture.getMinFilter = function () {
		return context.getTexParameter(target, context.TEXTURE_MIN_FILTER);
	};

	/**
	 * Queries the "mag filter" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_MAG_FILTER`.
	 *
	 * @method getMagFilter
	 * @return {Number} The "mag filter" parameter; one of `gl.NEAREST`,
	 *	`gl.LINEAR`.
	 * @example
	 *	var magFilter = texture.getMagFilter();
	 */
	texture.getMagFilter = function () {
		return context.getTexParameter(target, context.TEXTURE_MAG_FILTER);
	};

	/**
	 * Queries the "wrap S" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_WRAP_S`.
	 *
	 * @method getWrapS
	 * @return {Number} The "wrap S" parameter; one of `gl.CLAMP_TO_EDGE`,
	 *	`gl.MIRRORED_REPEAT` or `gl.REPEAT`.
	 * @example
	 *	var wrapS = texture.getWrapS();
	 */
	texture.getWrapS = function () {
		return context.getTexParameter(target, context.TEXTURE_WRAP_S);
	};


	/**
	 * Queries the "wrap T" parameter of this texture.
	 *
	 * Equivalent to calling `gl.getTexParameter` with `gl.TEXTURE_WRAP_T`.
	 *
	 * @method getWrapT
	 * @return {Number} The "wrap T" parameter; one of `gl.CLAMP_TO_EDGE`,
	 *	`gl.MIRRORED_REPEAT` or `gl.REPEAT`.
	 * @example
	 *	var wrapT = texture.getWrapT();
	 */
	texture.getWrapT = function () {
		return context.getTexParameter(target, context.TEXTURE_WRAP_T);
	};

	/**
	 * TODO
	 *
	 * @method parameterf
	 * @param {Number} name TODO
	 * @param {Number} value TODO
	 * @example
	 *	TODO
	 */
	texture.parameterf = function (name, value) {
		context.texParameterf(target, name, value);
	};

	/**
	 * TODO
	 *
	 * @method parameteri
	 * @param {Number} name TODO
	 * @param {Number} value TODO
	 * @example
	 *	TODO
	 */
	texture.parameteri = function (name, value) {
		context.texParameteri(target, name, value);
	};

	/**
	 * TODO
	 *
	 * `gl.generateMipmap` equivalent.
	 *
	 * @method generateMipmap
	 * @example
	 *	TODO
	 */
	texture.generateMipmap = function () {
		context.generateMipmap(target);
	};

	/**
	 * TODO
	 *
	 * @method image2D
	 * @example
	 *	TODO
	 */
	texture.image2D = function () {
		// TODO
	};

	/**
	 * TODO
	 *
	 * @method subImage2D
	 * @example
	 *	TODO
	 */
	texture.subImage2D = function () {
		// TODO
	};

	/**
	 * TODO
	 *
	 * `gl.copyTexImage2D` equivalent.
	 *
	 * @method copyImage2D
	 * @param {Number} level TODO
	 * @param {Number} internalFormat TODO
	 * @param {Number} x TODO
	 * @param {Number} y TODO
	 * @param {Number} width TODO
	 * @param {Number} height TODO
	 * @param {Number} border TODO
	 * @example
	 *	TODO
	 */
	texture.copyImage2D = function (level, internalFormat, x, y, width, height, border) {
		context.copyTexImage2D(target, level, internalFormat, x, y, width, height, border || 0);
	};

	/**
	 * TODO
	 *
	 * `gl.copyTexSubImage2D` equivalent.
	 *
	 * @method copySubImage2D
	 * @param {Number} level TODO
	 * @param {Number} xoffset TODO
	 * @param {Number} yoffset TODO
	 * @param {Number} x TODO
	 * @param {Number} y TODO
	 * @param {Number} width TODO
	 * @param {Number} height TODO
	 * @example
	 *	TODO
	 */
	texture.copySubImage2D = function (level, xoffset, yoffset, x, y, width, height) {
		context.copyTexSubImage2D(target, level, xoffset, yoffset, x, y, width, height);
	};

	/**
	 * Deletes this texture.
	 *
	 * `gl.deleteTexture` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	texture._delete();
	 */
	texture._delete = function () {
		context.deleteTexture(texture);
	};

	return texture;
};

/**
 * A texture whose type is `gl.TEXTURE_2D`.
 *
 * TODO
 *
 * @class oogl.Texture2D
 * @extends oogl.Texture
 * @constructor
 * @example
 *	TODO
 */
context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};

/**
 * A texture whose type is `gl.TEXTURE_CUBE_MAP`.
 *
 * TODO
 *
 * @class oogl.CubeMap
 * @extends oogl.Texture
 * @constructor
 * @example
 *	TODO
 */
context.CubeMap = function () {
	return new context.Texture(context.TEXTURE_CUBE_MAP);
};

/**
 * A utility class that aids in the management of multiple textures.
 *
 * One `Textures` objects represents a set of textures that must be
 * simultaneously bound (to different texture units) for use by the same
 * program. The `Textures` object automatically assigns textures to texture
 * units.
 *
 * A `Texture` object may also belong to several `Textures` sets at the same
 * time, so that it can be used by several programs.
 *
 * @class oogl.Textures
 * @constructor
 * @param {.Texture[]} [textures] An optional array of OOGL texture objects to
 *	add to the set. If you specify an empty array or not specify one at all you
 *	can later add textures using the `add` method.
 * @example
 *	TODO
 */
context.Textures = function (textures) {
	textures = textures && textures.slice(0) || [];
	return {
		/**
		 * Adds a `Texture` to this set.
		 *
		 * The texture is automatically assigned a texture unit, but the set
		 * must be re-bound (using the `bind` method) before its textures can be
		 * used in programs.
		 *
		 * @method add
		 * @param {.Texture} texture The OOGL texture to add.
		 * @example
		 *	TODO
		 */
		add: function (texture) {
			textures.push(texture);
		},

		/**
		 * Binds all the textures in this sets to their target in their
		 * respective texture unit.
		 *
		 * Equivalent to calling `gl.activeTexture` and `gl.bindTexture` for
		 * each texture.
		 *
		 * @method bind
		 * @example
		 *	TODO
		 */
		bind: function () {
			for (var i = 0; i < textures.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				textures[i].bind();
			}
		},

		/**
		 * TODO
		 *
		 * @method uniform
		 * @param {.Program} program TODO
		 * @param {String[]} names TODO
		 * @example
		 *	TODO
		 */
		uniform: function (program, names) {
			for (var i = 0; i < textures.length; i++) {
				program.uniform1i(names[i], i);
			}
		},

		/**
		 * Deletes all the textures that have been added to this set and resets
		 * it to an empty set.
		 *
		 * `Textures` objects may be used again after deletion.
		 *
		 * @method _delete
		 * @example
		 *	TODO
		 */
		_delete: function () {
			for (var i in textures) {
				textures[i]._delete();
			}
			textures = [];
		}
	};
};

/*global OOGL: false, context: false */

/**
 * Wraps a GL shader.
 *
 * @class oogl.Shader
 * @extends WebGLShader
 * @constructor
 * @param {Number} type The type of shader. Either `oogl.VERTEX_SHADER` or
 *	`oogl.FRAGMENT_SHADER`.
 * @example
 *	var vertexShader = new oogl.Shader(oogl.VERTEX_SHADER);
 *	vertexShader.source(vertexSource);
 *	vertexShader.compileOrThrow();
 */
context.Shader = function (type) {
	var shader = context.createShader(type);

	/**
	 * Queries a shader-related parameter.
	 *
	 * `gl.getShaderParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {String} name The parameter name.
	 * @return {Mixed} The queried value.
	 * @example
	 *	var shaderType = shader.getParameter(oogl.SHADER_TYPE);
	 */
	shader.getParameter = function (name) {
		return context.getShaderParameter(shader, name);
	};

	/**
	 * Returns the type of this shader, which is either `gl.VERTEX_SHADER` or
	 * `gl.FRAGMENT_SHADER`.
	 *
	 * Equivalent to calling `gl.getShaderParameter` with `gl.SHADER_TYPE`.
	 *
	 * @method getType
	 * @return {Number} The type of this shader.
	 * @example
	 *	var shaderType = shader.getType();
	 */
	shader.getType = function () {
		return context.getShaderParameter(shader, context.SHADER_TYPE);
	};

	/**
	 * Specifies the GLSL source code for this shader.
	 *
	 * `gl.shaderSource` equivalent.
	 *
	 * @method source
	 * @param {String} source The GLSL source code.
	 * @example
	 *	var shader = new oogl.Shader(oogl.VERTEX_SHADER);
	 *	shader.source(vertexSource);
	 */
	shader.source = function (source) {
		context.shaderSource(shader, source);
	};

	/**
	 * Returns the GLSL source code for this shader.
	 *
	 * Equivalent to calling `gl.getShaderParameter` with `gl.SHADER_SOURCE`.
	 *
	 * @method getSource
	 * @return {String} The GLSL source code.
	 * @example
	 *	var vertexSource = vertexShader.getSource();
	 */
	shader.getSource = function () {
		return context.getShaderParameter(shader, context.SHADER_SOURCE);
	};

	/**
	 * Compiles this shader.
	 *
	 * `gl.compileShader` equivalent.
	 *
	 * @method compile
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compile();
	 *	if (!shader.getCompileStatus()) {
	 *		throw shader.getInfoLog();
	 *	}
	 */
	shader.compile = function () {
		context.compileShader(shader);
	};

	/**
	 * Returns the compile status produced by the last compile operation for
	 * this shader.
	 *
	 * Equivalent to calling `gl.getShaderParameter` with `gl.COMPILE_STATUS`.
	 *
	 * @method getCompileStatus
	 * @return {Boolean} `true` if the shader was compiled successfully, `false`
	 *	otherwise.
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compile();
	 *	if (!shader.getCompileStatus()) {
	 *		throw shader.getInfoLog();
	 *	}
	 */
	shader.getCompileStatus = function () {
		return context.getShaderParameter(shader, context.COMPILE_STATUS);
	};

	/**
	 * Returns the info log produced by the last compile operation for this
	 * shader.
	 *
	 * `gl.getShaderInfoLog` equivalent.
	 *
	 * @method getInfoLog
	 * @return {String} The info log.
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compile();
	 *	if (!shader.getCompileStatus()) {
	 *		throw shader.getInfoLog();
	 *	}
	 */
	shader.getInfoLog = function () {
		return context.getShaderInfoLog(shader);
	};

	/**
	 * Compiles this shader, throws the info log if the shader does not compile
	 * successfully.
	 *
	 * @method compileOrThrow
	 * @example
	 *	shader.source(shaderSource);
	 *	shader.compileOrThrow();
	 */
	shader.compileOrThrow = function () {
		context.compileShader(shader);
		if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
			throw context.getShaderInfoLog(shader);
		}
	};

	/**
	 * Deletes this shader.
	 *
	 * @method _delete
	 * @example
	 *	shader._delete();
	 */
	shader._delete = function () {
		context.deleteShader(shader);
	};

	/**
	 * Returns the delete status for this shader.
	 *
	 * @method getDeleteStatus
	 * @return {Boolean} `true` if the shader has been deleted, `false`
	 *	otherwise.
	 * @example
	 *	if (shader.getDeleteStatus()) {
	 *		throw 'The shader has been deleted.';
	 *	}
	 */
	shader.getDeleteStatus = function () {
		return context.getShaderParameter(shader, context.DELETE_STATUS);
	};

	return shader;
};

/**
 * A `Shader` whose type is `gl.VERTEX_SHADER`.
 *
 * The `VertexShader` constructor optionally takes a string argument containing
 * the GLSL source code for the shader and tries to compile it through the
 * provided `compileOrThrow` method.
 *
 * @class oogl.VertexShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} [source] The optional GLSL source code for the shader.
 * @example
 *	var vertexShader = new oogl.VertexShader(vertexSource);
 */
context.VertexShader = function (source) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	if (source) {
		shader.source(source);
		shader.compileOrThrow();
	}
	return shader;
};

/**
 * A `Shader` whose type is `gl.FRAGMENT_SHADER`.
 *
 * The `FragmentShader` constructor optionally takes a string argument
 * containing the GLSL source code for the shader and tries to compile it
 * through the provided `compileOrThrow` method.
 *
 * @class oogl.FragmentShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} [source] The optional GLSL source code for the shader.
 * @example
 *	var fragmentShader = new oogl.FragmentShader(fragmentSource);
 */
context.FragmentShader = function (source) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	if (source) {
		shader.source(source);
		shader.compileOrThrow();
	}
	return shader;
};

/**
 * A vertex shader which tries to load its GLSL source code using AJAX.
 *
 * The `AjaxVertexShader` constructor also tries to compile the shader using the
 * provided `compileOrThrow` method. After the source code has been loaded and
 * compiled successfully the specified callback function is invoked.
 *
 * @class oogl.AjaxVertexShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} url A URL referring to the GLSL source code.
 * @param {Function} [callback] The callback function.
 * @example
 *	var program = new oogl.Program();
 *	var vertexShader = new oogl.AjaxVertexShader('vert/box.vert', function () {
 *		program.attachShader(vertexShader);
 *	});
 */
context.AjaxVertexShader = function (url, callback) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	OOGL.Ajax.get(url, function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};

/**
 * A fragment shader which tries to load its GLSL source code using AJAX.
 *
 * The `AjaxFragmentShader` constructor also tries to compile the shader using
 * the provided `compileOrThrow` method. After the source code has been loaded
 * and compiled successfully the specified callback function is invoked.
 *
 * @class oogl.AjaxFragmentShader
 * @extends oogl.Shader
 * @constructor
 * @param {String} url A URL referring to the GLSL source code.
 * @param {Function} [callback] The callback function.
 * @example
 *	var program = new oogl.Program();
 *	var fragmentShader = new oogl.AjaxFragmentShader('frag/box.frag', function () {
 *		program.attachShader(fragmentShader);
 *	});
 */
context.AjaxFragmentShader = function (url, callback) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	OOGL.Ajax.get(url, function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};

/*global OOGL: false, context: false */

/**
 * Wraps a GL program.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createProgram`. The returned `WebGLProgram` object is extended by
 * OOGL-specific features and returned by the `Program` constructor.
 *
 * `Program` objects also maintain an independent uniform location cache so that
 * uniform operations are sped up as `gl.getUniformLocation` calls are needed
 * only once per variable name. The cache is automatically invalidated when the
 * program is linked using the provided `link` or `linkOrThrow` methods.
 *
 * @class oogl.Program
 * @extends WebGLProgram
 * @constructor
 * @example
 *	var program = new oogl.Program();
 *	program.attachShader(vertexShader); // either a WebGLShader or OOGL.VertexShader object
 *	program.attachShader(fragmentShader); // either a WebGLShader or OOGL.VertexShader object
 *	program.linkOrThrow();
 */
context.Program = function () {
	var program = context.createProgram();
	var locationCache = {};

	/**
	 * Queries a program-related parameter.
	 *
	 * `gl.getProgramParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {String} name The name of the parameter to query.
	 * @return {Mixed} The queried value.
	 * @example
	 *	if (!program.getParameter(oogl.LINK_STATUS)) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.getParameter = function (name) {
		return context.getProgramParameter(program, name);
	};

	/**
	 * Attaches the specified shader to this program.
	 *
	 * `gl.attachShader` equivalent.
	 *
	 * @method attachShader
	 * @param {WebGLShader} shader The shader to attach. Can also be an OOGL
	 *	`Shader`.
	 * @example
	 *	var program = new oogl.Program();
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	program.linkOrThrow();
	 */
	program.attachShader = function (shader) {
		context.attachShader(program, shader);
	};

	/**
	 * Detaches the specified shader from this program.
	 *
	 * `gl.detachShader` equivalent.
	 *
	 * @method detachShader
	 * @param {WebGLShader} shader The shader to detach. Can also be an OOGL
	 *	`Shader`.
	 * @example
	 *	var vertexShader = new oogl.Shader(oogl.VERTEX_SHADER);
	 *	var program = new oogl.Program();
	 *	program.attachShader(vertexShader);
	 *	program.detachShader(vertexShader);
	 */
	program.detachShader = function (shader) {
		context.detachShader(program, shader);
	};

	/**
	 * Returns an array of `WebGLShader` representing the shaders currently
	 * attached to this program.
	 *
	 * `gl.getAttachedShaders` equivalent.
	 *
	 * @method getAttachedShaders
	 * @return {WebGLShader[]} An array of the currently attached shaders.
	 * @example
	 *	var program = new oogl.Program();
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	var shaders = program.getAttachedShaders(); // shaders now contains two elements
	 */
	program.getAttachedShaders = function () {
		return context.getAttachedShaders(program);
	};

	/**
	 * Returns the number of currently attached shaders.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with
	 * `gl.ATTACHED_SHADERS`.
	 *
	 * @method getNumberOfAttachedShaders
	 * @return {Number} The number of currently attached shaders.
	 * @example
	 *	var program = new oogl.Program();
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	var count = program.getNumberOfAttachedShaders(); // 2
	 */
	program.getNumberOfAttachedShaders = function () {
		return context.getProgramParameter(program, context.ATTACHED_SHADERS);
	};

	/**
	 * Binds the specified shader attribute variable `name` to the attribute
	 * array whose `index` is specified.
	 *
	 * `gl.bindAttribLocation` equivalent.
	 *
	 * @method bindAttribLocation
	 * @param {Number} index The index of the attribute array.
	 * @param {String} name The name of the shader attribute variable.
	 * @example
	 *	program.bindAttribLocation(0, 'in_Vertex');
	 *	program.bindAttribLocation(1, 'in_Color');
	 *	program.bindAttribLocation(2, 'in_TexCoords');
	 */
	program.bindAttribLocation = function (index, name) {
		context.bindAttribLocation(program, index, name);
	};

	/**
	 * Iterates over the specified `attributes` array of strings and binds each
	 * string to its index. For example, these calls:
	 *
	 *	program.bindAttribLocation(0, 'in_Vertex');
	 *	program.bindAttribLocation(1, 'in_Color');
	 *	program.bindAttribLocation(2, 'in_TexCoords');
	 *
	 * Can be made only once using `bindAttribLocations` like this:
	 *
	 *	program.bindAttribLocations(['in_Vertex', 'in_Color', 'in_TexCoords']);
	 *
	 * @method bindAttribLocations
	 * @param {String[]} attributes The array, or index-to-string map,
	 *	specifying the names to bind and their respective indices.
	 * @example
	 *	program.bindAttribLocations(['in_Vertex', 'in_Color', 'in_TexCoords']);
	 */
	program.bindAttribLocations = function (attributes) {
		for (var i in attributes) {
			context.bindAttribLocation(program, parseInt(i, 10), attributes[i]);
		}
	};

	/**
	 * Links the program and invalidates the uniform location cache used to
	 * speed up uniform operations.
	 *
	 * `gl.linkProgram` equivalent.
	 *
	 * @method link
	 * @example
	 *	program.link();
	 *	if (!program.getLinkStatus()) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.link = function () {
		locationCache = {};
		context.linkProgram(program);
	};

	/**
	 * Returns the link status of this program.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.LINK_STATUS`.
	 *
	 * @method getLinkStatus
	 * @return {Boolean} `true` if the program has been successuflly linked,
	 *	`false` otherwise.
	 * @example
	 *	program.link();
	 *	if (!program.getLinkStatus()) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.getLinkStatus = function () {
		return context.getProgramParameter(program, context.LINK_STATUS);
	};

	/**
	 * Returns the info log generated by the last link operation for this
	 * program.
	 *
	 * `gl.getProgramInfoLog` equivalent.
	 *
	 * @method getInfoLog
	 * @return {String} The info log.
	 * @example
	 *	program.link();
	 *	if (!program.getLinkStatus()) {
	 *		throw program.getInfoLog();
	 *	}
	 */
	program.getInfoLog = function () {
		return context.getProgramInfoLog(program);
	};

	/**
	 * Links the program, invalidates the uniform location cache used to speed
	 * up uniform operations and checks the link status; throws the info log if
	 * the program did not link successfully.
	 *
	 * @method linkOrThrow
	 * @example
	 *	program.attachShader(new oogl.VertexShader(vertexSource));
	 *	program.attachShader(new oogl.FragmentShader(fragmentSource));
	 *	program.linkOrThrow();
	 */
	program.linkOrThrow = function () {
		locationCache = {};
		context.linkProgram(program);
		if (!context.getProgramParameter(program, context.LINK_STATUS)) {
			throw context.getProgramInfoLog(program);
		}
	};

	/**
	 * Uses the program in the GL pipeline.
	 *
	 * `gl.useProgram` equivalent.
	 *
	 * @method use
	 * @example
	 *	program.use();
	 */
	program.use = function () {
		context.useProgram(program);
	};

	/**
	 * Validates the program.
	 *
	 * `gl.validateProgram` equivalent.
	 *
	 * @method validate
	 * @example
	 *	program.validate();
	 *	if (!program.getValidateStatus()) {
	 *		throw 'program validation error';
	 *	}
	 */
	program.validate = function () {
		context.validateProgram(program);
	};

	/**
	 * Returns the validation status produced by the last validation operation
	 * for this program.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.VALIDATE_STATUS`.
	 *
	 * @method getValidateStatus
	 * @return {Boolean} The validation status.
	 * @example
	 *	program.validate();
	 *	if (!program.getValidateStatus()) {
	 *		throw 'program validation error';
	 *	}
	 */
	program.getValidateStatus = function () {
		return context.getProgramParameter(program, context.VALIDATE_STATUS);
	};

	/**
	 * TODO
	 *
	 * @method getActiveAttrib
	 * @param {Number} index TODO
	 * @return {WebGLActiveInfo} TODO
	 * @example
	 *	TODO
	 */
	program.getActiveAttrib = function (index) {
		return context.getActiveAttrib(program, index);
	};

	/**
	 * TODO
	 *
	 * @method getActiveUniform
	 * @param {Number} index TODO
	 * @return {WebGLActiveInfo} TODO
	 * @example
	 *	TODO
	 */
	program.getActiveUniform = function (index) {
		return context.getActiveUniform(program, index);
	};

	/**
	 * TODO
	 *
	 * @method getAttribLocation
	 * @param {String} name TODO
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	program.getAttribLocation = function (name) {
		return context.getAttribLocation(program, name);
	};

	/**
	 * TODO
	 *
	 * @method getUniform
	 * @param {Mixed} locationOrName TODO
	 * @return {Mixed} TODO
	 * @example
	 *	TODO
	 */
	program.getUniform = function (locationOrName) {
		if (typeof locationOrName !== 'string') {
			return context.getUniform(program, locationOrName);
		} else {
			return context.getUniform(program, locationCache[locationOrName] ||
				(locationCache[locationOrName] = context.getUniformLocation(program, locationOrName)));
		}
	};

	function getUniformLocation(name) {
		return locationCache[name] = context.getUniformLocation(program, name);
	}

	/**
	 * TODO
	 *
	 * @method getUniformLocation
	 * @param {String} name TODO
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	program.getUniformLocation = getUniformLocation;

	/**
	 * Specifies the value for a `float` uniform variable.
	 *
	 * `gl.uniform1f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value.
	 * @example
	 *	TODO
	 */
	program.uniform1f = function (name, x) {
		context.uniform1f(getUniformLocation(name), x);
	};

	/**
	 * Specifies the value for a `vec2` uniform variable.
	 *
	 * `gl.uniform2f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @example
	 *	TODO
	 */
	program.uniform2f = function (name, x, y) {
		context.uniform2f(getUniformLocation(name), x, y);
	};

	/**
	 * Specifies the value for a `vec3` uniform variable.
	 *
	 * `gl.uniform3f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @example
	 *	TODO
	 */
	program.uniform3f = function (name, x, y, z) {
		context.uniform3f(getUniformLocation(name), x, y, z);
	};


	/**
	 * Specifies the value for a `vec4` uniform variable.
	 *
	 * `gl.uniform4f` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4f
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @param {Number} w The new value for the fourth component.
	 * @example
	 *	TODO
	 */
	program.uniform4f = function (name, x, y, z, w) {
		context.uniform4f(getUniformLocation(name), x, y, z, w);
	};

	/**
	 * Specifies the value for a `float` uniform variable as an array.
	 *
	 * `gl.uniform1fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new value.
	 * @example
	 *	TODO
	 */
	program.uniform1fv = function (name, values) {
		context.uniform1fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for a `vec2` uniform variable as an array.
	 *
	 * `gl.uniform2fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform2fv = function (name, values) {
		context.uniform2fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for a `vec3` uniform variable as an array.
	 *
	 * `gl.uniform3fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform3fv = function (name, values) {
		context.uniform3fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for a `vec4` uniform variable as an array.
	 *
	 * `gl.uniform4fv` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4fv
	 * @param {String} name The name of the uniform variable.
	 * @param {Number[]} values An array containing the new values.
	 * @example
	 *	TODO
	 */
	program.uniform4fv = function (name, values) {
		context.uniform4fv(getUniformLocation(name), values);
	};

	/**
	 * Specifies the value for an integer or boolean uniform variable.
	 *
	 * `gl.uniform1i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform1i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value.
	 * @example
	 *	TODO
	 */
	program.uniform1i = function (name, x) {
		context.uniform1i(getUniformLocation(name), x);
	};

	/**
	 * Specifies the value for an `ivec2` or `bvec2` uniform variable.
	 *
	 * `gl.uniform2i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform2i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @example
	 *	TODO
	 */
	program.uniform2i = function (name, x, y) {
		context.uniform2i(getUniformLocation(name), x, y);
	};

	/**
	 * Specifies the value for an `ivec3` or `bvec3` uniform variable.
	 *
	 * `gl.uniform3i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform3i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @example
	 *	TODO
	 */
	program.uniform3i = function (name, x, y, z) {
		context.uniform3i(getUniformLocation(name), x, y, z);
	};

	/**
	 * Specifies the value for an `ivec4` or `bvec4` uniform variable.
	 *
	 * `gl.uniform4i` equivalent.
	 *
	 * `Program` objects have an internal location cache used by `uniform`
	 * methods to set uniform variables without retrieving their location each
	 * time. The cache is invalidated every time the program is relinked using
	 * the provided `link` method.
	 *
	 * @method uniform4i
	 * @param {String} name The name of the uniform variable.
	 * @param {Number} x The new value for the first component.
	 * @param {Number} y The new value for the second component.
	 * @param {Number} z The new value for the third component.
	 * @param {Number} w The new value for the fourth component.
	 * @example
	 *	TODO
	 */
	program.uniform4i = function (name, x, y, z, w) {
		context.uniform4i(getUniformLocation(name), x, y, z, w);
	};

	program.uniform1iv = function (name, values) {
		context.uniform1iv(getUniformLocation(name), values);
	};

	program.uniform2iv = function (name, values) {
		context.uniform2iv(getUniformLocation(name), values);
	};

	program.uniform3iv = function (name, values) {
		context.uniform3iv(getUniformLocation(name), values);
	};

	program.uniform4iv = function (name, values) {
		context.uniform4iv(getUniformLocation(name), values);
	};

	program.uniformVec2 = function (name, v) {
		context.uniform2f(getUniformLocation(name), v.x, v.y);
	};

	program.uniformVec3 = function (name, v) {
		context.uniform3f(getUniformLocation(name), v.x, v.y, v.z);
	};

	program.uniformVec4 = function (name, v) {
		context.uniform2f(getUniformLocation(name), v.x, v.y, v.z, v.w);
	};

	program.uniformMatrix2fv = function (name, matrix) {
		context.uniformMatrix2fv(getUniformLocation(name), matrix);
	};

	program.uniformMatrix3fv = function (name, matrix) {
		context.uniformMatrix3fv(getUniformLocation(name), matrix);
	};

	program.uniformMatrix4fv = function (name, matrix) {
		context.uniformMatrix4fv(getUniformLocation(name), matrix);
	};

	/**
	 * Deletes this program.
	 *
	 * `gl.deleteProgram` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	program._delete();
	 */
	program._delete = function () {
		context.deleteProgram(program);
	};

	/**
	 * Returns the delete status of this program.
	 *
	 * Equivalent to calling `gl.getProgramParameter` with `gl.DELETE_STATUS`.
	 *
	 * @method getDeleteStatus
	 * @return {Boolean} The delete status.
	 * @example
	 *	if (program.getDeleteStatus()) {
	 *		// the program has been deleted
	 *	}
	 */
	program.getDeleteStatus = function () {
		return context.getProgramParameter(program, context.DELETE_STATUS);
	};

	return program;
};

/**
 * TODO
 *
 * @class oogl.AutoProgram
 * @extends oogl.Program
 * @constructor
 * @param {String} vertexSource TODO
 * @param {String} fragmentSource TODO
 * @param {String[]} attributes TODO
 * @example
 *	var program = new oogl.AutoProgram(vertexSource, fragmentSource, ['in_Vertex', 'in_Color', 'in_TexCoords']);
 */
context.AutoProgram = function (vertexSource, fragmentSource, attributes) {
	var program = new context.Program();
	program.attachShader(new context.VertexShader(vertexSource));
	program.attachShader(new context.FragmentShader(fragmentSource));
	program.bindAttribLocations(attributes);
	program.linkOrThrow();
	return program;
};


/**
 * TODO
 *
 * @class oogl.AjaxProgram
 * @extends oogl.Program
 * @constructor
 * @param {String} name TODO
 * @param {String[]} attributes TODO
 * @param {Function} callback TODO
 * @example
 *	var arrays = new oogl.AttributeArrays(vertices.length);
 *	arrays.add3('float', vertices);
 *	arrays.add3('float', colors);
 *	arrays.add2('float', textureCoordinates);
 *	var program = new oogl.AjaxProgram('box', ['in_Vertex', 'in_Color', 'in_TexCoords'], function () {
 *		program.use();
 *		arrays.drawTriangles();
 *		oogl.flush();
 *	});
 */
context.AjaxProgram = function (name, attributes, callback) {
	var program = new context.Program();
	OOGL.Ajax.get(name + '.vert', function (vertexSource) {
		program.attachShader(new context.VertexShader(vertexSource));
		OOGL.Ajax.get(name + '.frag', function (fragmentSource) {
			program.attachShader(new context.FragmentShader(fragmentSource));
			program.bindAttribLocations(attributes);
			program.linkOrThrow();
			callback && callback();
		});
	});
	return program;
};

/*global context: false */

/**
 * Wraps a GL framebuffer object.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createFramebuffer`. The returned `WebGLFramebuffer` object is extended by
 * OOGL-specific features and returned by the `Framebuffer` constructor.
 *
 * @class oogl.Framebuffer
 * @constructor
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var framebuffer = new oogl.Framebuffer();
 */
context.Framebuffer = function () {
	var framebuffer = context.createFramebuffer();

	/**
	 * Indicates whether this is a valid GL framebuffer.
	 *
	 * `gl.isFramebuffer` equivalent.
	 *
	 * @method is
	 * @return {Boolean} `true` if this is a valid GL framebuffer, `false`
	 *	otherwise.
	 * @example
	 *	if (framebuffer.is()) {
	 *		// ...
	 */
	framebuffer.is = function () {
		return context.isFramebuffer(framebuffer);
	};

	/**
	 * TODO
	 *
	 * `gl.getAttachmentParameter` equivalent.
	 *
	 * @method getAttachmentParameter
	 * @param {Number} attachment TODO
	 * @param {Number} name TODO
	 * @return {Mixed} TODO
	 * @example
	 *	var attachmentType = framebuffer.getAttachmentParameter(oogl.COLOR_ATTACHMENT0, oogl.FRAMEBUFFER_ATTACHMENT_TYPE);
	 */
	framebuffer.getAttachmentParameter = function (attachment, name) {
		return context.getFramebufferAttachmentParameter(context.FRAMEBUFFER, attachment, name);
	};

	/**
	 * TODO
	 *
	 * `gl.bindFramebuffer` equivalent.
	 *
	 * @method bind
	 * @example
	 *	framebuffer.bind();
	 */
	framebuffer.bind = function () {
		context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
	};

	/**
	 * TODO
	 *
	 * `gl.checkFramebufferStatus` equivalent.
	 *
	 * @method checkStatus
	 * @return {Number} TODO
	 * @example
	 *	var status = framebuffer.checkStatus();
	 */
	framebuffer.checkStatus = function () {
		return context.checkFramebufferStatus(context.FRAMEBUFFER);
	};

	/**
	 * TODO
	 *
	 * `gl.framebufferRenderbuffer` equivalent.
	 *
	 * @method renderbuffer
	 * @param {Number} attachment TODO
	 * @param {WebGLRenderbuffer} renderbuffer TODO
	 * @example
	 *	TODO
	 */
	framebuffer.renderbuffer = function (attachment, renderbuffer) {
		context.framebufferRenderbuffer(context.FRAMEBUFFER, attachment, context.RENDERBUFFER, renderbuffer);
	};

	/**
	 * TODO
	 *
	 * `gl.framebufferTexture2D` equivalent.
	 *
	 * @method texture2D
	 * @param {Number} attachment TODO
	 * @param {Number} textarget TODO
	 * @param {WebGLTexture} texture TODO
	 * @param {Number} level TODO
	 * @example
	 *	TODO
	 */
	framebuffer.texture2D = function (attachment, textarget, texture, level) {
		context.framebufferTexture2D(context.FRAMEBUFFER, attachment, textarget, texture, level);
	};

	/**
	 * TODO
	 *
	 * `gl.deleteFramebuffer` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	framebuffer._delete();
	 */
	framebuffer._delete = function () {
		context.deleteFramebuffer(framebuffer);
	};

	return framebuffer;
};

/*global context: false */

/**
 * Wraps a GL renderbuffer.
 *
 * Instancing an object of this class is equivalent to calling the GL function
 * `createRenderbuffer`. The returned `WebGLRenderbuffer` object is extended by
 * OOGL-specific features and returned by the `Renderbuffer` constructor.
 *
 * @class oogl.Renderbuffer
 * @constructor
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var renderbuffer = new oogl.Renderbuffer();
 */
context.Renderbuffer = function () {
	var renderbuffer = context.createRenderbuffer();

	/**
	 * Indicates whether this is a valid GL renderbuffer.
	 *
	 * `gl.isRenderbuffer` equivalent.
	 *
	 * @method is
	 * @return {Boolean} `true` is this is a valid GL renderbuffer, `false`
	 *	otherwise.
	 * @example
	 *	if (renderbuffer.is()) {
	 *		// ...
	 */
	renderbuffer.is = function () {
		return context.isRenderbuffer(renderbuffer);
	};

	/**
	 * Queries a renderbuffer-related parameter.
	 *
	 * `gl.getRenderbufferParameter` equivalent.
	 *
	 * @method getParameter
	 * @param {String} name TODO
	 * @return {Mixed} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getParameter = function (name) {
		return context.getRenderbufferParameter(context.RENDERBUFFER, name);
	};

	/**
	 * TODO
	 *
	 * @method getWidth
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getWidth = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_WIDTH);
	};

	/**
	 * TODO
	 *
	 * @method getHeight
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getHeight = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_HEIGHT);
	};

	/**
	 * TODO
	 *
	 * @method getInternalFormat
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getInternalFormat = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_INTERNAL_FORMAT);
	};

	/**
	 * TODO
	 *
	 * @method getRedSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getRedSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_RED_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getGreenSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getGreenSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_GREEN_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getBlueSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getBlueSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_BLUE_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getAlphaSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getAlphaSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_ALPHA_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getDepthSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getDepthSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_DEPTH_SIZE);
	};

	/**
	 * TODO
	 *
	 * @method getStencilSize
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.getStencilSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_STENCIL_SIZE);
	};

	/**
	 * Binds this renderbuffer.
	 *
	 * `gl.bindRenderbuffer` equivalent.
	 *
	 * @method bind
	 * @example
	 *	renderbuffer.bind();
	 */
	renderbuffer.bind = function () {
		context.bindRenderbuffer(context.RENDERBUFFER, renderbuffer);
	};

	/**
	 * TODO
	 *
	 * @method storage
	 * @param {Number} internalFormat TODO
	 * @param {Number} width TODO
	 * @param {Number} height TODO
	 * @example
	 *	TODO
	 */
	renderbuffer.storage = function (internalFormat, width, height) {
		context.renderbufferStorage(context.RENDERBUFFER, internalFormat, width, height);
	};

	/**
	 * Deletes this renderbuffer.
	 *
	 * `gl.deleteRenderbuffer` equivalent.
	 *
	 * @method _delete
	 * @example
	 *	renderbuffer._delete();
	 */
	renderbuffer._delete = function () {
		context.deleteRenderbuffer(renderbuffer);
	};

	return renderbuffer;
};

	return context;
};

/*global OOGL: false */

/**
 * Efficient render loop implementation that uses `requestAnimationFrame` where
 * available and transparently falls back on `setInterval`.
 *
 * @class OOGL.RenderLoop
 * @constructor
 * @param {Function} tick A user-defined callback function that is invoked at
 *	each iteration of the loop. It typically contains (OO)GL calls that render
 *	the full scene.
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	// setup the pipeline here, create programs and arrays
 *	var loop = new OOGL.RenderLoop(function () {
 *		oogl.clear(oogl.COLOR_BUFFER_BIT | oogl.DEPTH_BUFFER_BIT);
 *		arrays.drawTriangles();
 *		oogl.flush();
 *	});
 *	loop.start();
 */
OOGL.RenderLoop = (function () {
	var type = 'auto';
	var rate = 60;

	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.msCancelAnimationFrame;

	var RenderLoop = (function (type, rate) {
		var period = Math.floor(1000 / rate);
		return function (tick) {
			var running = false;
			var banned = false;

			var counter = 0;
			var timestamp;
			var offset = 0;
			var suspendTimestamp;

			function RequestBasedLoop() {
				var request = null;
				this.start = function () {
					if (request === null) {
						request = requestAnimationFrame(function loop() {
							counter++;
							tick();
							request = requestAnimationFrame(loop);
						});
					}
				};
				this.stop = function () {
					if (request !== null) {
						cancelAnimationFrame(request);
						request = null;
					}
				};
			}

			function IntervalBasedLoop() {
				var interval = null;
				this.start = function () {
					if (interval === null) {
						interval = setInterval(function () {
							counter++;
							tick();
						}, period);
					}
				};
				this.stop = function () {
					if (interval !== null) {
						clearInterval(interval);
						interval = null;
					}
				};
			}

			var loop;
			switch (type) {
			case 'request':
				loop = new RequestBasedLoop();
				break;
			case 'interval':
				loop = new IntervalBasedLoop();
				break;
			default: // auto
				if (requestAnimationFrame) {
					type = 'request';
					loop = new RequestBasedLoop();
				} else {
					type = 'interval';
					loop = new IntervalBasedLoop();
				}
				break;
			}

			/**
			 * Returns the type of this loop as a string; the return value can
			 * be either `'request'` or `'interval'`.
			 *
			 * @method getType
			 * @return {String} The type of this loop; either `'request'` or
			 *	`'interval'`.
			 * @example
			 *	OOGL.RenderLoop.setType('auto');
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	if (loop.getType() === 'interval') {
			 *		// apparently rAF is not supported
			 *	}
			 */
			this.getType = function () {
				return type;
			};

			/**
			 * The frame rate of this loop.
			 *
			 * Note that this value is meaningless if `requestAnimationFrame` is
			 * being used by this loop.
			 *
			 * @method getRate
			 * @return {Number} The frame rate of this loop.
			 * @example
			 *	var rate = loop.getRate();
			 */
			this.getRate = function () {
				return rate;
			};

			/**
			 * The period of this loop, in milliseconds. It is computed using the formula:
			 *
			 *	period = Math.floor(1000 / rate);
			 *
			 * This value is also used in `setInterval`-based loops.
			 *
			 * @method getPeriod
			 * @return {Number} The period of this loop, in milliseconds.
			 * @example
			 *	OOGL.RenderLoop.setRate(100);
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	var period = loop.getPeriod(); // 10
			 */
			this.getPeriod = function () {
				return period;
			};

			/**
			 * Returns the _actual_ frame rate for this loop. This is
			 * potentially different from the value returned by `getRate`
			 * because the former is the measured frame rate while the latter is
			 * the rate manually set using the static `setRate` method.
			 *
			 * The actual frame rate is measured as the number of loop
			 * iterations since the last time `getActualFrameRate` was called
			 * divided by the timespan.
			 *
			 * The measuring system automatically discards time spans during
			 * which the loop was suspended.
			 *
			 * @method getActualRate
			 * @return {Number} The measured actual frame rate.
			 * @example
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	loop.start();
			 *	setInterval(function () {
			 *		rateDisplay.innerText = loop.getActualRate();
			 *	}, 1000);
			 */
			this.getActualRate = function () {
				var now;
				if (banned) {
					now = suspendTimestamp;
				} else {
					now = Date.now();
				}
				var result = counter / (now - timestamp - offset);
				counter = 0;
				timestamp = now;
				offset = 0;
				return result;
			};

			/**
			 * Starts the loop.
			 *
			 * @method start
			 * @example
			 *	var loop = new OOGL.RenderLoop(function () {
			 *		// ...
			 *	});
			 *	loop.start();
			 */
			this.start = function () {
				if (!running && !banned) {
					running = true;
					timestamp = Date.now();
					loop.start();
				}
			};

			/**
			 * Suspends the execution of the loop. There is no effect if the
			 * loop is not running.
			 *
			 * @method suspend
			 * @example
			 *	loop.suspend();
			 */
			this.suspend = function () {
				if (running) {
					banned = true;
					suspendTimestamp = Date.now();
					loop.stop();
				}
			};

			/**
			 * Resume the execution of the loop. There is no effect if the loop
			 * has not been previously suspended by the `suspend` method.
			 *
			 * @method resume
			 * @example
			 *	loop.resume();
			 */
			this.resume = function () {
				if (running) {
					banned = false;
					offset += Date.now() - suspendTimestamp;
					loop.start();
				}
			};

			/**
			 * Permanently stops the execution of the loop, whether it is
			 * suspended or not. There is no effect if the loop has not been
			 * started yet.
			 *
			 * The execution of this render loop cannot be restarted after it
			 * has been stopped.
			 *
			 * @method stop
			 * @example
			 *	loop.stop();
			 */
			this.stop = function () {
				running = false;
				banned = true;
				suspendTimestamp = Date.now();
				loop.stop();
			};
		};
	})(type, rate);

	/**
	 * Indicates whether `requestAnimationFrame` is supported.
	 *
	 * @method isRequestAnimationFrameSupported
	 * @static
	 * @return {Boolean} `true` if `requestAnimationFrame` is supported, `false`
	 *	otherwise.
	 * @example
	 *	if (OOGL.RenderLoop.isRequestAnimationFrameSupported()) {
	 *		OOGL.RenderLoop.setType('request');
	 *	} else {
	 *		throw 'requestAnimationFrame not supported';
	 *	}
	 */
	RenderLoop.isRequestAnimationFrameSupported = function () {
		return !!requestAnimationFrame;
	};

	/**
	 * Returns the currently configured loop type.
	 *
	 * @method getType
	 * @static
	 * @return {String} The loop type; can be `request`, `interval` or `auto`.
	 * @example
	 *	var currentType = RenderLoop.getType();
	 */
	RenderLoop.getType = function () {
		return type;
	};

	/**
	 * Sets the loop type; can be `request`, `interval` or `auto`.
	 *
	 * When the loop type is `request` the `RenderLoop` constructor constructs
	 * `requestAnimationFrame`-based loops.
	 *
	 * When the loop type is `interval` the `RenderLoop` constructor constructs
	 * `setInterval`-based loops.
	 *
	 * When the loop type is `auto` the `RenderLoop` constructor constructs
	 * `requestAnimationFrame`-based loops if the `requestAnimationFrame` API is
	 * supported, `setInterval`-based loops otherwise.
	 *
	 * @method setType
	 * @static
	 * @param {String} newType The loop type; can be `request`, `interval` or
	 *	`auto`.
	 * @example
	 *	RenderLoop.setType('request');
	 */
	RenderLoop.setType = function (newType) {
		if ({
			request: true,
			interval: true,
			auto: true
		}.hasOwnProperty(type)) {
			type = newType;
		} else {
			throw 'invalid loop type, must be one of `request`, `interval` or `auto`.';
		}
	};

	/**
	 * TODO
	 *
	 * @method getRate
	 * @static
	 * @return {Number} TODO
	 * @example
	 *	var currentRate = RenderLoop.getRate();
	 */
	RenderLoop.getRate = function () {
		return rate;
	};

	/**
	 * TODO
	 *
	 * @method getPeriod
	 * @static
	 * @return {Number} TODO
	 * @example
	 *	OOGL.RenderLoop.setRate(100);
	 *	var period = OOGL.RenderLoop.getPeriod(); // 10
	 */
	RenderLoop.getPeriod = function () {
		return Math.floor(1000 / rate);
	};

	/**
	 * TODO
	 *
	 * @method setRate
	 * @static
	 * @param {Number} newRate TODO
	 * @example
	 *	RenderLoop.setRate(100);
	 */
	RenderLoop.setRate = function (newRate) {
		rate = newRate;
	};

	return RenderLoop;
})();
