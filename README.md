oogl.js
=======

A thin object-oriented layer above WebGL.

OOGL provides an extended GL context that adds object-oriented features allowing you to make GL calls more easily while keeping maximum possible performance.

OOGL is not another scene graph library: OOGL strongly focuses on performance and lets you do exactly what you would do in plain WebGL, just easier.

Getting started
===============

To get started with OOGL, include it using a `<script>` tag in the `<head>` of your document:

```html
<script type="text/javascript" src="http://cdn.oogljs.com/oogl-1.0.0.min.js"></script>
```

Then place a `<canvas>` in your DOM and create an OOGL context through JavaScript:

```html
<canvas id="canvas" width="800" height="600">
	<p>No browser support.</p>
</canvas>
<script type="text/javascript">
OOGL(function () {
	var oogl = new OOGL.Context('canvas');

	// example GL calls
	oogl.clearColor(0, 0, 0, 1);
	oogl.clear(oogl.COLOR_BUFFER_BIT);
	oogl.flush();
});
</script>
```

The `oogl` object now contains all the WebGL functions a normal `gl` object would contain, plus OOGL-specific features.

The first triangle
==================

Drawing with OOGL is easier than doing it with plain WebGL.

Let's first create a pair of shaders. Here's the vertex one:

```glsl
attribute vec2 in_Vertex;

void main() {
	gl_Position = vec4(in_Vertex, 0, 2);
}
```

And the fragment one:

```glsl
void main() {
	gl_FragColor = vec4(1);
}
```

Assume they are called `test.vert` and `test.frag`, respectively, and they are located in the same directory as the HTML page.

The OOGL calls needed to create a vertex array, load the shaders and make the drawing are as follows:

```javascript
OOGL(function () {
	var oogl = new OOGL.Context('canvas');
	oogl.clearColor(0, 0, 0, 1);
	oogl.clear(oogl.COLOR_BUFFER_BIT);
	var array = new oogl.AttributeArray2(0, 'float', [-1, 1, -1, -1, 1, -1]);
	array.bind();
	array.pointer();
	var program = new oogl.AjaxProgram('test', ['in_Vertex'], function () {
		program.use();
		oogl.drawArrays(oogl.TRIANGLES, 0, 3);
		oogl.flush();
	});
});
```

Here we use the `AjaxProgram` utility class to load the shader pair asynchronously. The constructed `AjaxProgram` object refers to the `test.vert` and `test.frag` files because of its `test` first argument; the `.vert` and `.frag` extensions are added automatically.

The last calls (`program.use()` through `oogl.flush()`) are made asynchronously in a callback function passed to the `AjaxProgram` constructor that is called after the shaders have been loaded and compiled and the program has been linked.

Should you wish to apply per-vertex interpolated colors, you first modify the shaders as follows:

```glsl
attribute vec2 in_Vertex;

void main() {
	gl_Position = vec4(in_Vertex, 0, 2);
}
```

```glsl
void main() {
	gl_FragColor = vec4(1);
}
```

And then use the `AttributeArrays` utility class in the JavaScript code:

```javascript
OOGL(function () {
	var oogl = new OOGL.Context('canvas');
	oogl.clearColor(0, 0, 0, 1);
	oogl.clear(oogl.COLOR_BUFFER_BIT);
	var arrays = new oogl.AttributeArrays(3);
	arrays.add2('float', [-1, 1, -1, -1, 1, -1]);
	arrays.add3('float', [0, 1, 0, 1, 0, 0, 0, 0, 1]);
	arrays.bindAndPointer();
	var program = new oogl.AjaxProgram('test', ['in_Vertex'], function () {
		program.use();
		arrays.drawTriangles();
		oogl.flush();
	});
});
```

Math stuff
==========

OOGL includes mutable vector and matrix classes that perfectly integrate with the provided program and shader classes; you can easily use them to exchange variables with your shaders.

For example you can specify a `vec3` uniform variable in this way:

```javascript
var v = new OOGL.Vector3(x, y, z);
program.uniformVec3(v);
```

OOGL provides classes to handle 2-, 3- and 4-component vectors and 2x2, 3x3 and 4x4 matrices.

OOGL math classes are developed with a strong focus on performances and can be used to perform physics or other vector and matrix computations in JavaScript at maximum speed.

jQuery
======

TBD

Credits
=======

OOGL was created by Alberto La Rocca and is licensed under the MIT License.
