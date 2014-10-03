
module.exports = function(grunt) {

	var sourceFiles = ['dev/src/mobileCheck.js','dev/src/element.js','dev/src/awards.js','dev/src/util.js',
						'dev/src/ether.js','dev/src/trophy.js','dev/src/world.js','dev/src/hub.js',
						'dev/src/audio.js','dev/src/upgrade.js','dev/src/engine.js'];

	//config
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		sass : {
			dist : {
				options: {                       // Target options
					style: 'expanded'
				},
				files : {
					'game/index.css' : 'dev/styles/main.scss'
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
		uglify: {
		    my_target: {
				files: {
				'game/script.min.js': '<%= concat.dist.dest %>'
				}
		    }
		},
		'ftp-deploy' : {
			build : {
				auth : {
					host : 'ftp.anthonyladson.com',
					port : 21,
					authKey : "key1"
				},
				src : 'game',
				dest : 'quintessence',
				exclusions : ['.*']
			}
		}
	});

	//load task
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ftp-deploy')

	//register task
	grunt.registerTask('default', ['sass','concat','uglify']);
	grunt.registerTask('css',['sass']);
	grunt.registerTask('deploy',['default','ftp-deploy']);

};