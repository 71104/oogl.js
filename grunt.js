module.exports = function (grunt) {
	var files = [
		'<banner>',
		'src/OOGL.js',
		'src/Ajax.js',
		'src/Vector2.js',
		'src/Vector3.js',
		'src/Vector4.js',
		'src/Matrix2.js',
		'src/Matrix3.js',
		'src/Matrix4.js',
		'src/ContextBegin.js',
		'src/Buffers.js',
		'src/Textures.js',
		'src/Shaders.js',
		'src/Programs.js',
		'src/Framebuffer.js',
		'src/Renderbuffer.js',
		'src/ContextEnd.js'
		];
	grunt.initConfig({
		meta: {
			version: '1.0.0',
			banner: '/*! Object-Oriented Graphics Library - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* Released under the MIT License\n' +
				'* http://oogljs.com/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> Alberto La Rocca */'
		},
		lint: {
			files: [
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
				]
		},
		jshint: {
			options: {
				camelcase: true,
				curly: true,
				immed: true,
				indent: 4,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: false,
				trailing: true,
				boss: true,
				debug: true,
				expr: true,
				loopfunc: true,
				multistr: true,
				supernew: true,
				browser: true
			},
			globals: {
				ActiveXObject: false
			}
		},
		concat: {
			dist: {
				src: files,
				dest: 'oogl-<%= meta.version %>.js'
			}
		},
		min: {
			dist: {
				src: files,
				dest: 'oogl-<%= meta.version %>.min.js'
			}
		}
	});
	grunt.registerTask('default', 'min');
	grunt.registerTask('debug', 'lint concat');
};
