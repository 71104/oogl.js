var OOGL = function (callback) {
	if (typeof callback === 'function') {
		document.addEventListener('DOMContentLoaded', callback, false);
	}
};

if (typeof $ === 'undefined') {
	$ = OOGL;
}

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
	return context;
};
