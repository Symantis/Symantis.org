module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'html2js:dev',
		'less:dev',
		'compass:dist',
		'copy:dev',
		'coffee:dev'
	]);
};
