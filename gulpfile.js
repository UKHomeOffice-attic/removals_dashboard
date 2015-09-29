var gulp = require('gulp');
var mocha = require('gulp-mocha');

var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var streamify   = require('gulp-streamify');
var browserify  = require('browserify');

gulp.task('test', function() {
  return gulp
    .src('test/*.js')
    .pipe(mocha());
});

gulp.task('scripts', function() {
  return browserify('./assets/js/app.js').bundle()
    .pipe(source('all.min.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/'));
});

/*
gulp.task('default', ['test'], function() {
  gulp.watch(['public/js/*.js', 'test/*.js'], function() {
    gulp.run('test');
  });
});
*/

gulp.task('default', ['test','scripts']);
