OOGL.Ajax = new (function () {
	var errorCallback = function () {};

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

	this.get = function (url, callback) {
		makeRequest('GET', url, callback);
	};
	this.getJSON = function (url, callback) {
		makeJSONRequest('GET', url, callback);
	};
	this.post = function (url, callback) {
		makeRequest('POST', url, callback);
	};
	this.postJSON = function (url, callback) {
		makeJSONRequest('POST', url, callback);
	};
	this.put = function (url, callback) {
		makeRequest('PUT', url, callback);
	};
	this.putJSON = function (url, callback) {
		makeJSONRequest('PUT', url, callback);
	};
	this._delete = function (url, callback) {
		makeRequest('DELETE', url, callback);
	};
	this.deleteJSON = function (url, callback) {
		makeJSONRequest('DELETE', url, callback);
	};
})();
