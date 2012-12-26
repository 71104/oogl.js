/*! Object-Oriented Graphics Library - v1.0.0 - 2012-12-26
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

/*global OOGL: false */

OOGL.Vector3 = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

OOGL.Vector3.prototype = {
	toHomogeneous: function () {
		return new OOGL.Vector4(this.x, this.y, this.z, 1);
	},
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},
	normalize: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x /= length;
		this.y /= length;
		this.z /= length;
		return this;
	},
	getNormal: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return new OOGL.Vector3(this.x / length, this.y / length, this.z / length);
	},
	add: function (v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	},
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

OOGL.Vector4 = function (x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};

OOGL.Vector4.prototype = {
	toStandard: function () {
		return new OOGL.Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
	}
};

/*global OOGL: false */

/**
 * A mutable 2x2 matrix.
 *
 * @class OOGL.Matrix2
 * @extends Array
 * @constructor
 * @param {Number[]} data A 4-element array of the floating point values to be
 *	put into the matrix.
 *
 * Matrix elements are specified in row-major order.
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
	return data.slice(0);
};

OOGL.Matrix2.prototype = {
	/**
	 * Returns the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * fetching the `i * 2 + j`-th element of the array:
	 *
	 *	matrix.get(i, j) == matrix[i * 2 + j] // true
	 *
	 * @method get
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @return {Number} The value at the specified row and column.
	 * @example
	 *	var m = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var determinant = m.get(0, 0) * m.get(1, 1) - m.get(0, 1) * m.get(1, 0);
	 */
	get: function (i, j) {
		return this[i * 2 + j];
	},

	/**
	 * Changes the element at the specified row and column in the matrix.
	 *
	 * Row and column indices are zero-based. This method is equivalent to
	 * setting the `i * 2 + j`-th element of the array:
	 *
	 *	matrix.put(i, j, x);
	 *	matrix[i * 2 + j] = x; // same as previous
	 *
	 * @method put
	 * @param {Number} i The row index.
	 * @param {Number} j The column index.
	 * @param {Number} value The value to put at the specified row and column.
	 * @example
	 *	var matrix = new OOGL.Matrix2([3, 3, 0, 3]);
	 *	matrix.put(1, 0, 3); // now matrix is [3, 3, 3, 3]
	 */
	put: function (i, j, value) {
		this[i * 2 + j] = value;
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
		return this[0] * this[1] - this[2] * this[3];
	},

	/**
	 * Inverts this matrix.
	 *
	 * @method invert
	 * @chainable
	 * @example
	 *	var matrix = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	matrix.invert(); // matrix is now [-2, -1, -1.5, -0.5]
	 */
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

	/**
	 * Computes the inverse matrix and returns it as a new `Matrix2` object.
	 * This matrix is not changed.
	 *
	 * @method getInverse
	 * @return {OOGL.Matrix2} The inverse matrix.
	 * @example
	 *	var m1 = new OOGL.Matrix2([1, 2, 3, 4]);
	 *	var m2 = m1.getInverse(); // [-2, -1, -1.5, -0.5]
	 */
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
	return new OOGL.Matrix2([c, -s, s, c]);
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

/*global OOGL: false */

/**
 * A mutable 4x4 matrix.
 *
 * @class OOGL.Matrix4
 * @constructor
 * @param {Number[]} data TODO
 * @example
 *	TODO
 */
OOGL.Matrix4 = function (data) {
	if (data.length != 16) {
		throw 'A 4x4 matrix must have exactly 16 elements.';
	}
	return data.slice(0);
};

OOGL.Matrix4.prototype = {
	/**
	 * TODO
	 *
	 * @method get
	 * @param {Number} i TODO
	 * @param {Number} j TODO
	 * @return {Number} TODO
	 * @example
	 *	TODO
	 */
	get: function (i, j) {
		return this[i * 4 + j];
	},

	/**
	 * TODO
	 *
	 * @method put
	 * @param {Number} i TODO
	 * @param {Number} j TODO
	 * @param {Number} value TODO
	 * @example
	 *	TODO
	 */
	put: function (i, j, value) {
		this[i * 4 + j] = value;
		return this;
	}
	// TODO
};

OOGL.TranslationMatrix4 = function (x, y, z) {
	return new OOGL.Matrix4([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
};

OOGL.RotationMatrix4 = function (x, y, z, a) {
	var s = Math.sin(a);
	var c = Math.cos(a);
	return new OOGL.Matrix4([
		c + x * x * (1 - c),
		y * x * (1 - c) + z * s,
		z * x * (1 - c) - y * s,
		0,
		x * y * (1 - c) - z * s,
		c + y * y * (1 - c),
		z * y * (1 - c) + x * s,
		0,
		x * z * (1 - c) + y * s,
		y * z * (1 - c) - x * s,
		c + z * z * (1 - c),
		0,
		0,
		0,
		0,
		1
	]);
};

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
 * @param {Object} attributes WebGL attributes to pass to `canvas.getContext`.
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
 * `createBuffer` with the specified target. Subsequent GL `bufferData` and
 * `bufferSubData` calls will be made by this buffer using the specified usage.
 *
 * @class .Buffer
 * @extends WebGLBuffer
 * @constructor
 * @param target TODO
 * @param {String} type One of `byte`, `ubyte`, `short`, `ushort` and `float`;
 *	indicates the type of data to put in the buffer.
 * @param usage TODO
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var buffer = new oogl.Buffer(oogl.ARRAY_BUFFER, 'float', oogl.STATIC_DRAW);
 */
context.Buffer = (function () {
	var types = {
		'byte': Int8Array,
		'ubyte': Uint8Array,
		'short': Int16Array,
		'ushort': Uint16Array,
		'float': Float32Array
	};
	return function (target, type, usage) {
		var Constructor;
		if (types.hasOwnProperty(type)) {
			Constructor = types[type];
		} else {
			throw 'Invalid buffer type, must be one of "byte", "ubyte", "short", "ushort" and "float".';
		}
		var buffer = context.createBuffer(target);

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
		 * Queries a parameter related to this buffer.
		 *
		 * `gl.getBufferParameter` equivalent.
		 *
		 * @method getParameter
		 * @param name TODO
		 * @return {Mixed} TODO
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
		 * @return {Number} TODO
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
		 * array and automatically converted by OOGL to the appropriate typed
		 * array, depending on the data type you specified to the `Buffer`
		 * constructor.
		 *
		 * @method data
		 * @param {Mixed} sizeOrData Either a number representing the size to
		 *	allocate or a JavaScript `Array` containing the data to store.
		 * @example
		 *	buffer.data([1, 1, -1, 1, -1, -1, 1, -1]);
		 */
		buffer.data = function (sizeOrData) {
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new Constructor(sizeOrData);
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
		 * @param {Mixed} sizeOrData TODO
		 * @example
		 *	TODO
		 */
		buffer.bindAndData = function (sizeOrData) {
			context.bindBuffer(target, buffer);
			if (typeof sizeOrData !== 'number') {
				sizeOrData = new Constructor(sizeOrData);
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
		 * @param {Number} offset TODO
		 * @param {Array} data TODO
		 */
		buffer.subData = function (offset, data) {
			context.bufferSubData(target, offset, new Constructor(data));
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
 * @class .StaticBuffer
 * @extends .Buffer
 * @constructor
 * @param {Number} target TODO
 * @param {String} type TODO
 * @example
 *	var buffer = new oogl.StaticBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.StaticBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STATIC_DRAW);
};

/**
 * Wraps a GL buffer whose usage is set to `gl.STREAM_DRAW`.
 *
 * @class .StreamBuffer
 * @extends .Buffer
 * @constructor
 * @param {Number} target TODO
 * @param {String} type TODO
 * @example
 *	var buffer = new oogl.StreamBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.StreamBuffer = function (target, type) {
	return new context.Buffer(target, type, context.STREAM_DRAW);
};

/**
 * Wraps a GL buffer whose usage is set to `gl.DYNAMIC_DRAW`.
 *
 * @class .DynamicBuffer
 * @extends .Buffer
 * @constructor
 * @param {Number} target TODO
 * @param {String} type TODO
 * @example
 *	var buffer = new oogl.DynamicBuffer(oogl.ARRAY_BUFFER, 'float');
 */
context.DynamicBuffer = function (target, type) {
	return new context.Buffer(target, type, context.DYNAMIC_DRAW);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ARRAY_BUFFER`.
 *
 * @class .ArrayBuffer
 * @extends .Buffer
 * @constructor
 * @param {String} type TODO
 * @param {Number} usage TODO
 * @example
 *	var buffer = new oogl.ArrayBuffer('float', oogl.STATIC_DRAW);
 */
context.ArrayBuffer = function (type, usage) {
	return new context.Buffer(context.ARRAY_BUFFER, type, usage);
};

/**
 * Wraps a GL buffer whose target is set to `gl.ELEMENT_ARRAY_BUFFER`.
 *
 * @class .ElementArrayBuffer
 * @extends .Buffer
 * @constructor
 * @param {String} type TODO
 * @param {Number} usage TODO
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
 * @class .StaticArrayBuffer
 * @extends .StaticBuffer
 * @constructor
 * @param {String} type TODO
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
 * @class .StaticElementArrayBuffer
 * @extends .StaticBuffer
 * @constructor
 * @param {String} type TODO
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
 * @class .StreamArrayBuffer
 * @extends .StreamBuffer
 * @constructor
 * @param {String} type TODO
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
 * @class .StreamElementArrayBuffer
 * @extends .StreamBuffer
 * @constructor
 * @param {String} type TODO
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
 * @class .DynamicArrayBuffer
 * @extends .DynamicBuffer
 * @constructor
 * @param {String} type TODO
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
 * @class .DynamicElementArrayBuffer
 * @extends .DynamicBuffer
 * @constructor
 * @param {String} type TODO
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
 * @class .AttributeArray1
 * @extends .StaticArrayBuffer
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
	buffer.bind();
	buffer.data(data);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 1, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 1, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
 * @class .AttributeArray2
 * @extends .StaticArrayBuffer
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
	buffer.bind();
	buffer.data(data);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 2, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 2, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
 * @class .AttributeArray3
 * @extends .StaticArrayBuffer
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
	buffer.bind();
	buffer.data(data);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 3, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 3, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
 * @class .AttributeArray4
 * @extends .StaticArrayBuffer
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
	buffer.bind();
	buffer.data(data);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 4, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
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
		if (arguments.length < 2) {
			offset = 0;
			if (arguments.length < 1) {
				stride = 0;
			}
		}
		context.vertexAttribPointer(index, 4, types[type].glType, !!normalize, stride * types[type].size, offset * types[type].size);
	};

	return buffer;
};

/**
 * Represents a set of vertex attribute arrays; simplifies the management of
 * multiple arrays.
 *
 * @class .AttributeArrays
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
 * @class .ElementArray
 * @extends .StaticElementArrayBuffer
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
	buffer.bind();
	buffer.data(indices);

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

context.Texture = function (target) {
	var texture = context.createTexture();
	texture.bind = function () {
		context.bindTexture(target, texture);
	};
	texture.getParameter = function (name) {
		return context.getTexParameter(target, name);
	};
	texture.parameterf = function (name, value) {
		context.texParameterf(target, name, value);
	};
	texture.parameteri = function (name, value) {
		context.texParameteri(target, name, value);
	};
	texture.generateMipmap = function () {
		context.generateMipmap(target);
	};
	texture.image2D = function () {
		// TODO
	};
	texture.subImage2D = function () {
		// TODO
	};
	texture.copyImage2D = function () {
		// TODO
	};
	texture._delete = function () {
		context.deleteTexture(texture);
	};
	return texture;
};

context.Texture2D = function () {
	return new context.Texture(context.TEXTURE_2D);
};
context.CubeMap = function () {
	return new context.Texture(context.TEXTURE_CUBE_MAP);
};

context.Textures = function (textures) {
	textures = textures.slice(0);
	return {
		bind: function () {
			for (var i = 0; i < textures.length; i++) {
				context.activeTexture(context.TEXTURE0 + i);
				textures[i].bind();
			}
		},
		uniform: function (program, names) {
			for (var i = 0; i < textures.length; i++) {
				program.uniform1i(names[i], i);
			}
		},
		_delete: function () {
			for (var i in textures) {
				textures[i]._delete();
			}
			textures = [];
		}
	};
};

/*global OOGL: false, context: false */

context.Shader = function (type) {
	var shader = context.createShader(type);
	shader.getParameter = function (name) {
		return context.getShaderParameter(shader, name);
	};
	shader.getType = function () {
		return context.getShaderParameter(shader, context.SHADER_TYPE);
	};
	shader.source = function (source) {
		context.shaderSource(shader, source);
	};
	shader.getSource = function () {
		return context.getShaderParameter(shader, context.SHADER_SOURCE);
	};
	shader.compile = function () {
		context.compileShader(shader);
	};
	shader.getCompileStatus = function () {
		return context.getShaderParameter(shader, context.COMPILE_STATUS);
	};
	shader.getInfoLog = function () {
		return context.getShaderInfoLog(shader);
	};
	shader.compileOrThrow = function () {
		context.compileShader(shader);
		if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
			throw context.getShaderInfoLog(shader);
		}
	};
	shader._delete = function () {
		context.deleteShader(shader);
	};
	shader.getDeleteStatus = function () {
		return context.getShaderParameter(shader, context.DELETE_STATUS);
	};
	return shader;
};

context.VertexShader = function (source) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	if (source) {
		shader.source(source);
		shader.compileOrThrow();
	}
	return shader;
};
context.FragmentShader = function (source) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	if (source) {
		shader.source(source);
		shader.compileOrThrow();
	}
	return shader;
};

context.AjaxVertexShader = function (name, callback) {
	var shader = new context.Shader(context.VERTEX_SHADER);
	OOGL.Ajax.get(name + '.vert', function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};
context.AjaxFragmentShader = function (name, callback) {
	var shader = new context.Shader(context.FRAGMENT_SHADER);
	OOGL.Ajax.get(name + '.frag', function (source) {
		shader.source(source);
		shader.compileOrThrow();
		callback && callback();
	});
	return shader;
};

/*global OOGL: false, context: false */

context.Program = function () {
	var program = context.createProgram();
	var locationCache = {};
	program.getParameter = function (name) {
		return context.getProgramParameter(program, name);
	};
	program.attachShader = function (shader) {
		context.attachShader(program, shader);
	};
	program.detachShader = function (shader) {
		context.detachShader(program, shader);
	};
	program.bindAttribLocation = function (index, name) {
		context.bindAttribLocation(program, index, name);
	};
	program.bindAttribLocations = function (attributes) {
		for (var i = 0; i < attributes.length; i++) {
			context.bindAttribLocation(program, i, attributes[i]);
		}
	};
	program.link = function () {
		locationCache = {};
		context.linkProgram(program);
	};
	program.getLinkStatus = function () {
		return context.getProgramParameter(program, context.LINK_STATUS);
	};
	program.getInfoLog = function () {
		return context.getProgramInfoLog(program);
	};
	program.linkOrThrow = function () {
		context.linkProgram(program);
		if (!context.getProgramParameter(program, context.LINK_STATUS)) {
			throw context.getProgramInfoLog(program);
		}
	};
	program.use = function () {
		context.useProgram(program);
	};
	program.validate = function () {
		context.validateProgram(program);
		return context.getProgramParameter(program, context.VALIDATE_STATUS);
	};
	program.getActiveAttrib = function (index) {
		return context.getActiveAttrib(program, index);
	};
	program.getActiveUniform = function (index) {
		return context.getActiveUniform(program, index);
	};
	program.getAttribLocation = function (name) {
		return context.getAttribLocation(program, name);
	};
	program.getUniform = function (locationOrName) {
		if (typeof locationOrName !== 'string') {
			return context.getUniform(program, locationOrName);
		} else {
			return context.getUniform(program, locationCache[locationOrName] ||
				(locationCache[locationOrName] = context.getUniformLocation(program, locationOrName)));
		}
	};
	program.getUniformLocation = function (name) {
		return locationCache[name] = context.getUniformLocation(program, name);
	};
	// TODO uniform
	program._delete = function () {
		context.deleteProgram(program);
	};
	program.getDeleteStatus = function () {
		return context.getProgramParameter(program, context.DELETE_STATUS);
	};
	return program;
};

context.AutoProgram = function (vertexSource, fragmentSource, attributes) {
	var program = new context.Program();
	program.attachShader(new context.VertexShader(vertexSource));
	program.attachShader(new context.FragmentShader(fragmentSource));
	program.bindAttribLocations(attributes);
	program.linkOrThrow();
	return program;
};

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
 * @class .Framebuffer
 * @constructor
 * @example
 *	var oogl = new OOGL.Context('canvas');
 *	var framebuffer = new oogl.Framebuffer();
 */
context.Framebuffer = function () {
	var framebuffer = context.createFramebuffer();

	/**
	 * TODO
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
	 * @method
	 * @param
	 * @return
	 * @example
	 *	framebuffer.bind();
	 */
	framebuffer.bind = function () {
		context.bindFramebuffer(context.FRAMEBUFFER, framebuffer);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 */
	framebuffer.checkStatus = function () {
		return context.checkFramebufferStatus(context.FRAMEBUFFER);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 */
	framebuffer.renderbuffer = function (attachment, renderbuffer) {
		context.framebufferRenderbuffer(context.FRAMEBUFFER, attachment, context.RENDERBUFFER, renderbuffer);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 */
	framebuffer.texture2D = function (attachment, textarget, texture, level) {
		context.framebufferTexture2D(context.FRAMEBUFFER, attachment, textarget, texture, level);
	};

	/**
	 * TODO
	 *
	 * @method
	 * @param
	 * @return
	 * @example
	 *	framebuffer._delete();
	 */
	framebuffer._delete = function () {
		context.deleteFramebuffer(framebuffer);
	};

	return framebuffer;
};

/*global context: false */

context.Renderbuffer = function () {
	var renderbuffer = context.createRenderbuffer();
	renderbuffer.getParameter = function (name) {
		return context.getRenderbufferParameter(context.RENDERBUFFER, name);
	};
	renderbuffer.getWidth = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_WIDTH);
	};
	renderbuffer.getHeight = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_HEIGHT);
	};
	renderbuffer.getInternalFormat = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_INTERNAL_FORMAT);
	};
	renderbuffer.getRedSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_RED_SIZE);
	};
	renderbuffer.getGreenSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_GREEN_SIZE);
	};
	renderbuffer.getBlueSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_BLUE_SIZE);
	};
	renderbuffer.getAlphaSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_ALPHA_SIZE);
	};
	renderbuffer.getDepthSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_DEPTH_SIZE);
	};
	renderbuffer.getStencilSize = function () {
		return context.getRenderbufferParameter(context.RENDERBUFFER, context.RENDERBUFFER_STENCIL_SIZE);
	};
	renderbuffer.bind = function () {
		context.bindRenderbuffer(context.RENDERBUFFER, renderbuffer);
	};
	renderbuffer.storage = function (internalFormat, width, height) {
		context.renderbufferStorage(context.RENDERBUFFER, internalFormat, width, height);
	};
	renderbuffer._delete = function () {
		context.deleteRenderbuffer(renderbuffer);
	};
	return renderbuffer;
};

	return context;
};
