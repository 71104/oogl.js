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
			files: ['src/*.js']
		},
		concat: {
			dist: {
				src: [
					'src/OOGL.js',
					'src/Ajax.js',
					'src/Vector2.js',
					'src/Vector3.js',
					'src/Vector4.js',
					'src/Matrix2.js',
					'src/Matrix3.js',
					'src/Matrix4.js',
					'src/Buffers.js',
					'src/Textures.js',
					'src/Shaders.js',
					'src/Programs.js',
					'src/Framebuffer.js',
					'src/Renderbuffer.js'
					],
				dest: 'oogl-<%= meta.version %>.js'
			},
		}
	});
	grunt.registerTask('default', 'lint concat');
};
