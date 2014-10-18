// tasks/config/compass.js
// --------------------------------
// compass task configuration.

module.exports = function(grunt) {

  // We use the grunt.config api's set method to configure an
  // object to the defined string. In this case the task
  // 'compass' will be configured based on the object below.
  grunt.config.set('compass', {
    
    dev: {
      options: {
        //expand: true,
        httpPath: '/',
        importPath: ['assets/bower_components/foundation/scss'],
        sassDir: ['assets/scss'],
        cssDir: '.tmp/public/styles/',
        imagesDir: 'assets/img',
      }
    },
    prod: {
      options: {
        //expand: true,
        httpPath: '/',
        importPath: ['assets/bower_components/foundation/scss'],
        sassDir: ['assets/scss'],
        cssDir: '.tmp/public/styles/',
        imagesDir: 'assets/img',
      }
    }
  });

  // load npm module for handlebars.
  grunt.loadNpmTasks('grunt-contrib-compass');
};