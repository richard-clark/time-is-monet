var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  js: ['./src/**/*.js'],
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'scripts']);

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['scripts']);
});

gulp.task('scripts', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./www/'));
});
