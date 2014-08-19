module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'html2js:dev',
		//'less:dev',
		'compass:dist',
		'sync:dev',
		'coffee:dev'
	]);
};
