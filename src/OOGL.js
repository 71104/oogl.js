var OOGL = function (callback) {
	if (typeof callback === 'function') {
		document.addEventListener('DOMContentLoaded', callback, false);
	}
};

if (typeof $ === 'undefined') {
	$ = OOGL;
}

OOGL.Context = function (canvasOrId) {
	var canvas;
	if (typeof canvasOrId !== 'string') {
		canvas = document.getElementById(canvasOrId);
	} else {
		canvas = canvasOrId;
	}
	var context = canvas.getContext('webgl');
	if (!context) {
		context = canvas.getContext('experimental-webgl');
	}
	if (!context) {
		throw 'WebGL not supported.';
	}
	return context;
};
