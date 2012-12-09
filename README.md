oogl.js
=======

A thin object-oriented layer above WebGL.

OOGL provides an augmented GL context that adds object-oriented features that allow you to make GL calls more easily while keeping maximum possible performance.

Getting started
===============

To get started with OOGL, place a <canvas> in your DOM and create an OOGL context through JavaScript:

	<canvas id="canvas" width="800" height="600">
		<p>No browser support.</p>
	</canvas>
	<script type="text/javascript">
	$(function () {
		var oogl = new $.Context('canvas');
		// GL calls...
	});
	</script>

The oogl object now contains all the functions a normal gl object would contain, plus OOGL-specific features.
