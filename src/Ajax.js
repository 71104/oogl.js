OOGL.Ajax = (function () {
	var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	var errorCallback = function () {};
	this.onError = function (callback) {
		errorCallback = callback || function () {};
	};
	this.get = function (name, callback) {
		// TODO
	};
	this.getJSON = function (name, callback) {
		// TODO
	};
	this.post = function (name, callback) {
		// TODO
	};
	this.postJSON = function (name, callback) {
		// TODO
	};
	this.put = function (name, callback) {
		// TODO
	};
	this.putJSON = function (name, callback) {
		// TODO
	};
	this._delete = function (name, callback) {
		// TODO
	};
	this.deleteJSON = function (name, callback) {
		// TODO
	};
})();
