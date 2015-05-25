var gulp = require('gulp'),
		gutil = require('gulp-util')
		server = require('gulp-express')
		open = require('gulp-open');


jsSources =[
	'app.js',
	'routes.js',
	'client/controllers/*.js',
	'client/factories/*.js',
	'client/directives/*.js',
	'client/app.js',
	'api/**/*.js',
	'config/*.js'
];
htmlSources = [
	'client/index.html',
	'client/partials/*.html'
	
];

cssSources = [
	'client/app.css'
];

gulp.task('server', function() {
	
	// start server
	server.run(['app.js']);

	// restart server when file changes
	gulp.watch(htmlSources, server.notify);
	gulp.watch(cssSources, server.notify);
	gulp.watch(jsSources, server.notify);
	
});

gulp.task('url', function() {
	var options = {
		url: 'http://localhost:4000'
	}
	gulp.src('client/index.html')
	.pipe(open('', options));
});




gulp.task('default', ['server', 'url']);
