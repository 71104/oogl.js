module.exports = function (grunt) {
	grunt.initConfig({
		meta: {
			version: '1.0.0',
			banner: '/*! Object-Oriented Graphics Library - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://oogljs.com/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Alberto La Rocca */',
		},
		lint: {
			// TODO
		},
		concat: {
			// TODO
		},
	});
	grunt.registerTask('default', 'lint concat min');
};
