/**
 * This is OOGL's main namespace object and contains all the OOGL classes.
 *
 * All OOGL-specific class constructors are contained in this object. For
 * example, to create an `OOGL.RenderLoop` object you construct it in this way:
 *
 *	var loop = new OOGL.RenderLoop( ... );
 *
 * The `OOGL` object may also be invoked as a function, in which it expectes
 * exactly one function argument which is a user-defined callback function that
 * gets invoked as soon as the DOM of the page has loaded (this is accomplished
 * using the `DOMCOntentLoaded` JavaScript event):
 *
 *	OOGL(function () {
 *		// here the DOM has fully loaded
 *	});
 *
 * This is typically the right place to put WebGL/OOGL initialization code, such
 * as GLSL shader and other asset loading code, as well as GLSL program
 * compilation and linking.
 *
 * @module OOGL
 * @main OOGL
 * @example
 *	OOGL(function () {
 *		var oogl = new OOGL.Context('canvas'); // suppose our canvas element's id is "canvas"
 *		var program = new oogl.AjaxProgram('shader', ['in_Vertex', 'in_Color'], function () {
 *			program.use();
 *			(new OOGL.RenderLoop(function () {
 *				oogl.clear(oogl.COLOR_BUFFER_BIT);
 *				// draw triangles here
 *				oogl.flush();
 *			})).start();
 *		});
 *	});
 */
var OOGL = function (callback) {
	if (typeof callback === 'function') {
		document.addEventListener('DOMContentLoaded', function () {
			callback.call(OOGL, OOGL);
		}, false);
	}
};

if (typeof $ === 'undefined') {
	/*jshint undef: false */
	$ = OOGL;
}

/**
 * TODO
 *
 * @module context
 * @main context
 */
