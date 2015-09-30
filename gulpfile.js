var gulp = require('gulp');
var mocha = require('gulp-mocha');

var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var browserify  = require('browserify');
//var uglify      = require('gulp-uglify');
//var streamify   = require('gulp-streamify');

var sass = require('gulp-sass');

gulp.task('test', function() {
  return gulp
    .src('test/*.js')
    .pipe(mocha());
});

gulp.task('scripts', function() {
  return browserify('./assets/js/app.js').bundle()
    .pipe(source('all.js'))
    //.pipe(source('all.min.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function() {
  gulp.src('./assets/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['test', 'scripts', 'sass'], function() {
  gulp.watch(['assets/js/*.js', 'test/*.js'],['test','scripts']);
  gulp.watch('./assets/scss/*.scss', ['sass']);
});
