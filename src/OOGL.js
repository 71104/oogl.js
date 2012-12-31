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
