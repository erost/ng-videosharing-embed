var karma = require('karma');


module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    datetime: Date.now(),
 
    concat: {
      'myproject': {
        src: [ 'src/angular-embedplayer.js', 
            'src/filters/whitelist.js', 
            'src/filters/videosettings.js',
            'src/directives/embedvideo.js'],
        dest: 'temp/ng-videosharing-embed.js'
      }
    },
 
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.description %> - ' +
        'built <%= grunt.template.today("yyyy-mm-dd") %> - License <%= pkg.license %> (http://www.opensource.org/licenses/<%= pkg.license %>) */\n',
        mangle: {toplevel: true},
        squeeze: {dead_code: false},
        codegen: {quote_keys: true}
      },
      'myproject': {
        src: 'temp/ng-videosharing-embed.js',
        dest: 'build/ng-videosharing-embed.min.js'
      }
    },
    karma: {
        unit: {
            configFile: 'config/karma.conf.js'
        },
        unitc9: {
            configFile: 'config/karma.conf.c9.js'
        }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
 
  // Default task.
  grunt.registerTask('default', ['concat:myproject', 'uglify:myproject']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-c9', ['karma:unitc9']);
};