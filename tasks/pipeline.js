/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css',
  //'assets/scss/app.scss',
  //'stlyes/fonts.css',
  //'styles/icons.css',
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  //
  // *->    you might put other dependencies like jQuery or Angular here   <-*
  //

  

  // Load Angular
  'bower_components/angular/angular.js',
  
  // Load core sails socket stuff
  'bower_components/socket.io-client/dist/socket.io.min.js',
  'bower_components/sails.io.js/dist/sails.io.js',

  // Load Angular Sails
  'bower_components/angularSails/dist/ngsails.io.js',

  // Load Masonry and dist
  'bower_components/masonry/dist/masonry.pkgd.js',
  'bower_components/imagesloaded/imagesloaded.js',

  // OLD: Load angular sails bind
  //'bower_components/angular-sails-bind/dist/angular-sails-bind.js',
  
  // Load Angualr Zurb Foundation
  'bower_components/angular-foundation/mm-foundation-tpls.min.js',
  
  // Load angular ui-router
  'bower_components/angular-ui-router/release/angular-ui-router.js',
  'bower_components/angular-ui-utils/modules/route/route.js',
  
  // OLD: Load angular-sails 
  'bower_components/angular-sails/dist/angular-sails.js',
  
  // Load Angular Animate
  'bower_components/angular-animate/angular-animate.js',
  
  // Load Lodash
  'bower_components/lodash/dist/lodash.js',
  
  // Load Angular Moment
  'bower_components/moment/moment.js',
  'bower_components/angular-moment/angular-moment.js',

  // Load Angular Data & CacheFactory
  'bower_components/angular-data/dist/angular-data.min.js',
  'bower_components/angular-cache/dist/angular-cache.min.js',

  

  // Load angular Idle
  'bower_components/ng-idle/angular-idle.min.js',
  
  // Load angular translate (Future Use)
  'bower_components/angular-translate/angular-translate.js',
  'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',

  // Load ngProgress
  'bower_components/ngprogress/build/ngProgress.js',
  'bower_components/angular-scroll/angular-scroll.js',

  // Load D3
  'bower_components/d3-master/d3.js',
  'bower_components/d3-master/geom/geom.js',
  'bower_components/d3-master/layout/layout.js',
  'bower_components/d3-master/time/time.js',
  
  // Load X-Editable
  'bower_components/angular-xeditable/dist/js/xeditable.js',
  
  // Load NG tags
  'bower_components/ng-tags-input/ng-tags-input.js',
  
  // OLD: Load angular github
  'bower_components/angular-github-adapter/angular-github-adapter.js',
  
  // Load Showdown with Github ext. (For flavored markdown)
  'bower_components/showdown/src/showdown.js',
  'bower_components/showdown/src/extensions/github.js',
  'bower_components/showdown/src/extensions/table.js',
  'bower_components/angular-markdown/angular.markdown.js',

  // Load input match
  'bower_components/angular-input-match/dist/angular-input-match.js',

  // Load Timeline for roadmap
  //'bower_components/TimelineJs/build/js/timeline.js',
  //'bower_components/TimelineJs/build/js/storyjs-embed.js',
  
  // Load angular ui helpers
  'bower_components/angular-ui-utils/ui-utils.js',
  
  // Load Flow
  'bower_components/flow.js/dist/flow.js',
  'bower_components/ng-flow/dist/ng-flow.js',

  // Load Gridster
  'bower_components/angular-gridster/src/angular-gridster.js',
  
  // Load Core App.js
  'src/app/app.js',

  // All of the rest of your app scripts
  'src/**/*.js'
];

module.exports.jsFilesToInjectNoPathChange = jsFilesToInject;


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  // 'templates/**/*.html'
  'src/**/*.tpl.html'
];


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
