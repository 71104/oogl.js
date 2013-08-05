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
				strict: false,
				trailing: true,
				boss: true,
				debug: true,
				expr: true,
				loopfunc: true,
				multistr: true,
				smarttabs: true,
				supernew: true,
				browser: true,
				globals: {
					ActiveXObject: false
				}
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
				'bin/oogl-<%= pkg.version %>.js': files
			}
		},

		uglify: {
			options: {
				wrap: 'OOGL',
			},
			dist: {
				'bin/oogl-<%= pkg.version %>.min.js': files
			}
		},

		yuidoc: {
			compile: {
				name: 'OOGL.js',
				description: 'A thin object oriented layer above WebGL.',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/',
					outdir: 'doc/',
					linkNatives: 'true'
				}
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