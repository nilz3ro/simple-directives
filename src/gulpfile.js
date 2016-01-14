'use strict';
var gulp = require('gulp');
var babel = require('gulp-babel');


gulp.task('default', ['build:js']);

gulp.task('build:js', function() {
  gulp.src('./simple-table-directives.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('../dist'));
});

