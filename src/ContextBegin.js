/**
 * @module OOGL
 */

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
 * @param canvasOrId {Mixed} An HTMLCanvasElement DOM object, or a string
 *	containing its `id` attribute, representing the canvas whose WebGL context
 *	has to be wrapped.
 * @param [attributes] {Object} WebGL attributes to pass to `canvas.getContext`.
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
