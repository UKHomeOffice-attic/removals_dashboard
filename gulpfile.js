var fs = require('fs');
var gulp = require('gulp');
var mocha = require('gulp-mocha');

var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var browserify  = require('browserify');
//var uglify      = require('gulp-uglify');
//var streamify   = require('gulp-streamify');

var sass = require('gulp-sass');

var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var hogan = require('gulp-hogan-compile');

var ensureExists = function(path, mask, callback) {
  if (typeof mask == 'function') { // allow the `mask` parameter to be optional
    callback = mask;
    mask = 0777;
  }
  fs.mkdir(path, mask, function(err) {
    if (err) {
      if (err.code == 'EEXIST') callback(null); // ignore the error if the folder already exists
      else callback(err); // something else went wrong
    } else callback(null); // successfully created folder
  });
};

gulp.task('test', ['scripts'], function() {
  return gulp
    .src('test/*.js')
    .pipe(mocha());
});

gulp.task('scripts', ['templates'], function() {
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

gulp.task('hbs', function() {
  var templateData = {
    "title": "IRC Bed Management",
    "headerClass": "with-proposition",
    "assetPath": "",
    "cookieMessage": "This website uses cookies."
  };

  var options = {
    ignorePartials: true,
    batch : ['./views']
  };

  return gulp.src('./views/layout.hbs')
    .pipe(handlebars(templateData,options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function() {
  gulp.src('./assets/templates/**/*.html')
    .pipe(hogan('templates.js',{
      wrapper: 'commonjs'
    }))
    .pipe(gulp.dest('./assets/generated'));
});

gulp.task('copy', function() {
  gulp.src('./assets/json/*.json').pipe(gulp.dest('./dist'));
  gulp.src('./node_modules/govuk_template_mustache/assets/images/*.**').pipe(gulp.dest('./dist/images'));
  gulp.src('./node_modules/govuk_template_mustache/assets/javascripts/*/**').pipe(gulp.dest('./dist/js'));
  gulp.src('./node_modules/govuk_template_mustache/assets/javascripts/*.js').pipe(gulp.dest('./dist/js'));
  gulp.src('./node_modules/govuk_template_mustache/assets/stylesheets/*/**').pipe(gulp.dest('./dist/css'));
  gulp.src('./node_modules/govuk_template_mustache/assets/stylesheets/*.css').pipe(gulp.dest('./dist/css'));
});

gulp.task('build', ['scripts', 'sass', 'hbs', 'copy']);

gulp.task('default', ['scripts', 'test', 'sass', 'hbs', 'copy']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['./assets/js/**/*.js', './test/*.js'],['scripts','test']);
  gulp.watch(['./assets/scss/*.scss'], ['sass']);
});

gulp.task('watch:test', ['test'], function() {
  gulp.watch(['./assets/js/**/*.js', './test/*.js'],['test']);
});

gulp.task('env', function() {
  ensureExists('dist', function(err) {
    if (err) {
      console.log(err);
    }
    else {
      ensureExists('dist/__', function(err) {
        if (err) {
          console.log(err);
        } else {
          var path = 'dist/__/env.js';
          var contents = "window.API_ENDPOINT = window.API_ENDPOINT || 'http://localhost:8080';";
          fs.writeFile(path, contents, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Wrote %s', path);
            }
          });
        }
      });
    }
  });
});
