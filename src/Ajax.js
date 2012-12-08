OOGL.Ajax = (function () {
	var xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	var errorCallback = function () {};
	this.onError = function (callback) {
		errorCallback = callback || function () {};
	};
	this.getPlain = function (name, callback) {
		// TODO
	};
	this.getJSON = function (name, callback) {
		// TODO
	};
})();
