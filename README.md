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
		oogl.clearColor(0, 0, 0, 1);
		oogl.clear(oogl.COLOR_BUFFER_BIT);
		// other GL calls...
		oogl.flush();
	});
	</script>

The oogl object now contains all the functions a normal gl object would contain, plus OOGL-specific features.
