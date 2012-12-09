oogl.js
=======

A thin object-oriented layer above WebGL.

OOGL provides an augmented GL context that adds object-oriented features that allow you to make GL calls more easily while keeping maximum possible performance.

Getting started
===============

To get started with OOGL, include it using a &lt;script&gt; tag in the &lt;head&gt; of your document:

	<script type="text/javascript" src="http://cdn.oogljs.com/oogl-1.0.0.min.js"></script>

Then place a &lt;canvas&gt; in your DOM and create an OOGL context through JavaScript:

	<canvas id="canvas" width="800" height="600">
		<p>No browser support.</p>
	</canvas>
	<script type="text/javascript">
	$(function () {
		var oogl = new $.Context('canvas');

		// example GL calls
		oogl.clearColor(0, 0, 0, 1);
		oogl.clear(oogl.COLOR_BUFFER_BIT);
		oogl.flush();
	});
	</script>

The oogl object now contains all the functions a normal gl object would contain, plus OOGL-specific features.

The first triangle
==================

Drawing with OOGL is easier than doing it with plain WebGL.

Let's first create a pair of shaders. Here's the vertex one:

	attribute vec2 in_Vertex;

	void main() {
		gl_Position = vec4(in_Vertex, 0, 2);
	}

And the fragment one:

	void main() {
		gl_FragColor = vec4(1);
	}

Assume they are called 'test.vert' and 'test.frag', respectively, and they are located in the same directory as the HTML page.

The OOGL calls needed to create a vertex array, load the shaders and make the drawing are as follows:

	<script type="text/javascript">
	$(function () {
		var oogl = new $.Context('canvas');
		oogl.clearColor(0, 0, 0, 1);
		oogl.clear(oogl.COLOR_BUFFER_BIT);
		var array = new oogl.VertexArray(0, 2, [-1, 1, -1, -1, 1, -1]);
		var program = new oogl.DefaultProgram('test', ['in_Vertex'], function () {
			program.use();
			oogl.drawArrays(oogl.TRIANGLES, 0, 3);
			oogl.flush();
		});
	});
	</script>

The constructed DefaultProgram object refers to the test.vert and test.frag files because of its 'test' first argument; the '.vert' and '.frag' extensions are added automatically.

The last calls (program.use() through oogl.flush()) are made asynchronously in a callback function passed to the DefaultProgram constructor because the shader files need to be loaded asynchronously through AJAX.

Math stuff
==========

TBD

jQuery
======

TBD

Credits
=======

OOGL was created by Alberto La Rocca and is licensed under the MIT License.
