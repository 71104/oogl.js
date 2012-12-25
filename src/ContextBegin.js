/**
 * Requests a new WebGL context on the specified canvas and wraps it in a new
 * OOGL object. An exception is thrown if WebGL is not supported or the GPU is
 * blacklisted.
 *
 * @class OOGL.Context
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
