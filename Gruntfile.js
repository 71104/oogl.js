module.exports = function (grunt) {
	var files = [
		'<banner>',
		'src/OOGL.js',
		'src/Timing.js',
		'src/Ajax.js',
		'src/Loader.js',
		'src/Vector2.js',
		'src/Vector3.js',
		'src/Vector4.js',
		'src/Matrix2.js',
		'src/Matrix3.js',
		'src/Matrix4.js',
		'src/ContextBegin.js',
		'src/Buffers.js',
		'src/Arrays.js',
		'src/Textures.js',
		'src/Shaders.js',
		'src/Programs.js',
		'src/Framebuffer.js',
		'src/Renderbuffer.js',
		'src/ContextEnd.js',
		'src/RenderLoop.js',
		];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! Object-Oriented Graphics Library - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* Released under the MIT License\n' +
				'* http://oogljs.com/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> Alberto La Rocca */'
		},
		jshint: {
			options: {
				camelcase: true,
				curly: true,
				forin: true,
				immed: true,
				indent: 4,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: true,
				trailing: true,
				boss: true,
				debug: true,
				expr: true,
				// loopfunc: true,
				multistr: true,
				smarttabs: true,
				supernew: true,
				browser: true
			},
			dist: [
				'src/OOGL.js',
				'src/Ajax.js',
				'src/Vector2.js',
				'src/Vector3.js',
				'src/Vector4.js',
				'src/Loader.js',
				'src/Matrix2.js',
				'src/Matrix3.js',
				'src/Matrix4.js',
				'src/Buffers.js',
				'src/Arrays.js',
				'src/Textures.js',
				'src/Shaders.js',
				'src/Programs.js',
				'src/Framebuffer.js',
				'src/Renderbuffer.js',
				'src/RenderLoop.js',
				'src/Timing.js',
			]
		},
		concat: {
			dist: {
				src: files,
				dest: 'bin/oogl-<%= pkg.version %>.js'
			}
		},
		uglify: {
			options: {
				wrap: 'OOGL',
			},
			dist: {
				src: files,
				dest: 'bin/oogl-<%= pkg.version %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');

	grunt.registerTask('default', ['uglify']);
	grunt.registerTask('debug', ['jshint', 'concat']);
};
