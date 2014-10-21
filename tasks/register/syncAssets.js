module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'html2js:dev',
		//'less:dev',
		'compass:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
