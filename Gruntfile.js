
module.exports = function(grunt) {

	var sourceFiles = ['dev/src/element.js','dev/src/awards.js','dev/src/util.js',
						'dev/src/ether.js','dev/src/world.js','dev/src/hub.js',
						'dev/src/audio.js','dev/src/engine.js'];

	//config
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		sass : {
			dist : {
				options: {                       // Target options
					style: 'expanded'
				},
				files : {
					'index.css' : 'dev/styles/main.scss'
				}
			}
		},
		concat: {
			options : {
				stripBanners : true,
				banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */',
				separator : ';'
			},
			dist : {
				src : sourceFiles,
				dest : 'dev/src/script.js'
			}
		},
		'closure-compiler' : {
			frontend : {
				closurePath : 'dev/tools/closure-compiler',
				js : '<%= concat.dist.dest %>',
				jsOutputFile : 'script.min.js',
				maxBuffer : 500,
				options : {
					compilation_level : 'SIMPLE_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT'
				}
			}
		},
	});

	//load task
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-closure-compiler');

	//register task
	grunt.registerTask('default', ['sass','concat','closure-compiler']);
	grunt.registerTask('css',['sass']);

};