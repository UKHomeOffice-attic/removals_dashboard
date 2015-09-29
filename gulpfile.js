var gulp = require('gulp');
var mocha = require('gulp-mocha');

var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var browserify  = require('browserify');
//var uglify      = require('gulp-uglify');
//var streamify   = require('gulp-streamify');

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

gulp.task('default', ['test', 'scripts'], function() {
  gulp.watch(['assets/js/*.js', 'test/*.js'],['test','scripts']);
});

//gulp.task('default', ['test','scripts']);
