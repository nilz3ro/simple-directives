'use strict';
var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', ['build:js']);

gulp.task('build:js', function() {
  gulp.src('./src/modules/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('simple-directives.js'))
    .pipe(gulp.dest('./build'));
});

