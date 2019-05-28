'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
// const browserSync = require('browser-sync').create();

function style(){
    return gulp.src('./source/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dest/assets/css'));
}

exports.style = style;

exports.default = function() {
    gulp.watch('./source/sass/**/*.scss', style);
  };