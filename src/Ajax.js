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
	var thisObject = this;

	var errorCallback = function () {};

	/**
	 * Lets the user define a callback function that gets called when an error
	 * related to an AJAX request occurs.
	 *
	 * @method onError
	 * @chainable
	 * @param callback {Function} A user-defined callback function that gets
	 * called in case of an error in an AJAX request.
	 * @example
	 *	OOGL.Ajax.onError(function () {
	 *		alert('AJAX error occurred.');
	 *	});
	 */
	this.onError = function (callback) {
		errorCallback = callback || function () {};
		return thisObject;
	};

	function XHR(handler) {
		var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.onreadystatechange = handler;
		return xhr;
	}

	function makeRequest(method, settings) {
		var callback = settings.callback;
		var json = (settings.type === 'json');
		if (json) {
			settings.type = ''; // XXX the "json" type is not supported by the major browsers
		}
		var xhr = new XHR(function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					if (callback) {
						if (json) {
							callback(JSON.parse(xhr.responseText));
						} else {
							callback(xhr.response);
						}
					}
				} else {
					errorCallback();
				}
			}
		});
		var async = true;
		if (settings.hasOwnProperty('async')) {
			async = settings.async;
		}
		if (settings.hasOwnProperty('data')) {
			var encodedData = (function () {
				var parameters = {};
				(function encode(prefix, object) {
					if (typeof object !== 'object') {
						parameters[prefix] = '' + object;
					} else if (Array.isArray(object)) {
						if (object.length) {
							for (var i in object) {
								if (object.hasOwnProperty(i)) {
									encode(prefix + '[' + i + ']', object[i]);
								}
							}
						} else {
							parameters[prefix] = '[]';
						}
					} else if (object !== null) {
						if (Object.keys(object).length) {
							for (var key in object) {
								if (object.hasOwnProperty(key)) {
									if (/^\w+$/.test(key)) {
										encode(prefix + '.' + key, object[key]);
									} else {
										encode(prefix + '[\"' + key.replace('\"', '\\\"') + '\"]', object[key]);
									}
								}
							}
						} else {
							parameters[prefix] = '{}';
						}
					} else {
						parameters[prefix] = 'null';
					}
				})('', settings.data);
				return (function (first) {
					var query = '';
					for (var name in parameters) {
						if (parameters.hasOwnProperty(name)) {
							if (first) {
								first = false;
							} else {
								query += '&';
							}
							query += encodeURIComponent(name) + '=' + encodeURIComponent(parameters[name]);
						}
					}
					return query;
				})(true);
			})();
			if (/^get$/i.test(method)) {
				var url = settings.url + '?' + encodedData;
				if (settings.hasOwnProperty('user')) {
					if (settings.hasOwnProperty('password')) {
						xhr.open(method, url, async, settings.user, settings.password);
					} else {
						xhr.open(method, url, async, settings.user);
					}
				} else {
					xhr.open(method, url, async);
				}
				if (settings.hasOwnProperty('type')) {
					xhr.responseType = settings.type;
					if ((settings.type === 'document') && xhr.overrideMimeType) {
						xhr.overrideMimeType('text/xml');
					}
				}
				xhr.send();
			} else {
				if (settings.hasOwnProperty('user')) {
					if (settings.hasOwnProperty('password')) {
						xhr.open(method, settings.url, async, settings.user, settings.password);
					} else {
						xhr.open(method, settings.url, async, settings.user);
					}
				} else {
					xhr.open(method, settings.url, async);
				}
				if (settings.hasOwnProperty('type')) {
					xhr.responseType = settings.type;
					if ((settings.type === 'document') && xhr.overrideMimeType) {
						xhr.overrideMimeType('text/xml');
					}
				}
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(encodedData);
			}
		} else {
			if (settings.hasOwnProperty('user')) {
				if (settings.hasOwnProperty('password')) {
					xhr.open(method, settings.url, async, settings.user, settings.password);
				} else {
					xhr.open(method, settings.url, async, settings.user);
				}
			} else {
				xhr.open(method, settings.url, async);
			}
			if (settings.hasOwnProperty('type')) {
				xhr.responseType = settings.type;
				if ((settings.type === 'document') && xhr.overrideMimeType) {
					xhr.overrideMimeType('text/xml');
				}
			}
			xhr.send();
		}
	}

	function bindRequest(method) {
		function invalidArguments() {
			throw 'invalid arguments for ' + method + ' AJAX request';
		}
		return function (url, data, callback, type) {
			if (typeof url !== 'object') {
				var settings = {
					url: '' + url
				};
				if (typeof data !== 'object') {
					if (typeof data !== 'function') {
						invalidArguments();
					} else {
						settings.callback = data;
						settings.type = '' + callback;
						makeRequest(method, settings);
					}
				} else {
					settings.data = data;
					if (typeof callback !== 'function') {
						settings.type = '' + callback;
						makeRequest(method, settings);
					} else {
						settings.callback = callback;
						if (arguments.length > 3) {
							settings.type = '' + type;
						}
						makeRequest(method, settings);
					}
				}
			} else {
				makeRequest(method, url);
			}
			return thisObject;
		};
	}

	function bindJSONRequest(method) {
		function invalidArguments() {
			throw 'invalid arguments for ' + method + ' AJAX request';
		}
		return function (url, data, callback) {
			var settings = {
				url: '' + url,
				type: 'json'
			};
			if (typeof data !== 'object') {
				if (typeof data !== 'function') {
					invalidArguments();
				} else {
					settings.callback = data;
					makeRequest(method, settings);
				}
			} else {
				settings.data = data;
				if (arguments.length > 2) {
					settings.callback = callback;
				}
				makeRequest(method, settings);
			}
			return thisObject;
		};
	}

	/**
	 * Performs a GET AJAX request.
	 *
	 * The data returned from the server is passed to a user-defined callback
	 * function.
	 *
	 * @method get
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and attached to the URL using a `?`
	 * character.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Mixed} The response object returned by the
	 * server and passed to the callback function. Its type depends on the
	 * specified `type` parameter; for example, it is a DOM `Document` object if
	 * `type` is `document` or a plain JavaScript object if `type` is `json`.
	 * @param [type=''] {String} The type of the returned data, used to set
	 * `XHR.responseType`. It can be `arraybuffer`, `blob`, `document`, `json`,
	 * `text` or an empty string; an empty string equals `text`.
	 * @example
	 *	OOGL.Ajax.get('shaders/frag/box.frag', function (source) {
	 *		fragmentShader = new oogl.FragmentShader(source);
	 *		// ...
	 *	});
	 */
	this.get = bindRequest('GET');

	/**
	 * Performs a GET AJAX request. The data returned from the server is parsed
	 * as JSON and passed to a user-defined callback function.
	 *
	 * @method getJSON
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and attached to the URL using a `?`
	 * character.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Object} The response object returned by the
	 * server and passed to the callback function.
	 * @example
	 *	OOGL.Ajax.getJSON('meshes/box.json', function (box) {
	 *		vertices = new oogl.VertexArray(0, 3, box.vertices);
	 *		textureCoordinates = new oogl.VertexArray(1, 2, box.textureCoordinates);
	 *		// ...
	 *	});
	 */
	this.getJSON = bindJSONRequest('GET');

	/**
	 * Performs a POST AJAX request. The data returned from the server is passed
	 * to a user-defined callback function.
	 *
	 * @method post
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and sent in the request body.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Mixed} The response object returned by the
	 * server and passed to the callback function. Its type depends on the
	 * specified `type` parameter; for example, it is a DOM `Document` object if
	 * `type` is `document` or a plain JavaScript object if `type` is `json`.
	 * @param [type=''] {String} The type of the returned data, used to set
	 * `XHR.responseType`. It can be `arraybuffer`, `blob`, `document`, `json`,
	 * `text` or an empty string; an empty string equals `text`.
	 * @example
	 *	TODO
	 */
	this.post = bindRequest('POST');

	/**
	 * Performs a POST AJAX request. The data returned from the server is parsed
	 * as JSON and passed to a user-defined callback function.
	 *
	 * @method postJSON
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and sent in the request body.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Object} The response object returned by the
	 * server and passed to the callback function.
	 * @example
	 *	TODO
	 */
	this.postJSON = bindJSONRequest('POST');

	/**
	 * Performs a PUT AJAX request. The data returned from the server is passed
	 * to a user-defined callback function.
	 *
	 * @method put
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and sent in the request body.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Mixed} The response object returned by the
	 * server and passed to the callback function. Its type depends on the
	 * specified `type` parameter; for example, it is a DOM `Document` object if
	 * `type` is `document` or a plain JavaScript object if `type` is `json`.
	 * @param [type=''] {String} The type of the returned data, used to set
	 * `XHR.responseType`. It can be `arraybuffer`, `blob`, `document`, `json`,
	 * `text` or an empty string; an empty string equals `text`.
	 * @example
	 *	TODO
	 */
	this.put = bindRequest('PUT');

	/**
	 * Performs a PUT AJAX request. The data returned from the server is parsed
	 * as JSON and passed to a user-defined callback function.
	 *
	 * @method putJSON
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and sent in the request body.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Object} The response object returned by the
	 * server and passed to the callback function.
	 * @example
	 *	TODO
	 */
	this.putJSON = bindJSONRequest('PUT');

	/**
	 * Performs a DELETE AJAX request. The data returned from the server is
	 * passed to a user-defined callback function.
	 *
	 * @method _delete
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and sent in the request body.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Mixed} The response object returned by the
	 * server and passed to the callback function. Its type depends on the
	 * specified `type` parameter; for example, it is a DOM `Document` object if
	 * `type` is `document` or a plain JavaScript object if `type` is `json`.
	 * @param [type=''] {String} The type of the returned data, used to set
	 * `XHR.responseType`. It can be `arraybuffer`, `blob`, `document`, `json`,
	 * `text` or an empty string; an empty string equals `text`.
	 * @example
	 *	TODO
	 */
	this._delete = bindRequest('DELETE');

	/**
	 * Performs a DELETE AJAX request. The data returned from the server is
	 * parsed as JSON and passed to a user-defined callback function.
	 *
	 * @method deleteJSON
	 * @chainable
	 * @param url {String} The URL to request.
	 * @param [data] {Object} An optional object containing parameters to pass
	 * to the server.
	 *
	 * The object is deeply examined, so it may contain nested objects and
	 * arrays at any level.
	 *
	 * The parameters are URL-encoded and sent in the request body.
	 * @param [callback] {Function} An optional one-argument user-defined
	 * callback function that is invoked when the request completes
	 * successfully.
	 * @param callback.response {Object} The response object returned by the
	 * server and passed to the callback function.
	 * @example
	 *	TODO
	 */
	this.deleteJSON = bindJSONRequest('DELETE');
})();
