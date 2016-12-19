var gulp = require('gulp');
var server = require('gulp-develop-server');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

// Copy files
gulp.task('copy-files', () => {
	return gulp.src(['./src/data.json']).pipe(gulp.dest('dist'));
});

gulp.task('copy-public', () => {
	return gulp.src(['./src/public/**']).pipe(gulp.dest('dist/public'));
});

// Transpile the Typescript-code into Javascript
gulp.task('scripts', () => {
	const tsResult = tsProject.src()
		.pipe(tsProject());
	return tsResult.js.pipe(gulp.dest('dist'));
});

// Setup watch on all .ts, .js and public-files
gulp.task('watch', ['scripts'], () => {
	gulp.watch(['src/**/*.ts'], ['scripts']);
	gulp.watch(['src/public/**'], ['copy-public']);
	gulp.watch(['./dist/index.js'], [server.restart]);
});

gulp.task('build', ['scripts', 'copy-files', 'copy-public']);

// Start the express-server
gulp.task('server:start', () => {
	server.listen({ path: './dist/index.js' });
});

// The default command will build and start the express-server
gulp.task('default', ['server:start']);
