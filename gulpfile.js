'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', ['build:js']);

gulp.task('build:js', function() {
  gulp.src('./src/modules/*.js')
    .pipe(concat('simple-directives.js'))
    .pipe(gulp.dest('./build'));
});

