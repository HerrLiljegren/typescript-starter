var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

// The default command will build and start the express-server
gulp.task('default', ['server:start']);

// Build and start the express-server, rebuild on changes
gulp.task('server:start', ['build'], function () {
	nodemon({
		env: { 'NODE_ENV': 'development' },
		ext: 'ts',
		script: 'dist/index.js',
		tasks: ['build'],
	});
});

// Complete build-step
gulp.task('build', ['compile', 'copy-files', 'copy-public']);

// Compile the Typescript-code into Javascript
gulp.task('compile', () => {
	const tsResult = tsProject.src()
		.pipe(tsProject());
	return tsResult.js.pipe(gulp.dest('dist'));
});

// Copy public-folder
gulp.task('copy-public', () => {
	return gulp.src(['./src/public/**']).pipe(gulp.dest('dist/public'));
});

// Copy files
gulp.task('copy-files', () => {
	return gulp.src(['./src/data.json']).pipe(gulp.dest('dist'));
});
