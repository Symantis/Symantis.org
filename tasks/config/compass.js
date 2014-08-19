// tasks/config/compass.js
// --------------------------------
// compass task configuration.

module.exports = function(grunt) {

  // We use the grunt.config api's set method to configure an
  // object to the defined string. In this case the task
  // 'compass' will be configured based on the object below.
  grunt.config.set('compass', {
    
    dist: {
      options: {
        //expand: true,
        httpPath: '/',
        importPath: ['assets/bower_components/foundation/scss'],
        //importPath: 'assets/bower_components/foundation/scss',
        sassDir: ['assets/scss'],
        //cssDir: 'assets/css',
        cssDir: '.tmp/public/styles/',
        imagesDir: 'assets/img',
        //javascriptsDir: 'assets/js'
        //,force: true
        //,watch: true 
      }
    }
  });

  // load npm module for handlebars.
  grunt.loadNpmTasks('grunt-contrib-compass');
};