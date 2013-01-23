/*global OOGL: false */

/**
 * @module OOGL
 */

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
