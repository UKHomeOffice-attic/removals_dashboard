var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  return gulp
    .src('test/*.js')
    .pipe(mocha());
});

/*
gulp.task('default', ['test'], function() {
  gulp.watch(['public/js/*.js', 'test/*.js'], function() {
    gulp.run('test');
  });
});
*/

gulp.task('default', ['test']);
