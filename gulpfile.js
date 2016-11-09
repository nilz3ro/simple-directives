'use strict'
var gulp = require('gulp')
var concat = require('gulp-concat-util')

gulp.task('default', ['build:js'])

gulp.task('build:js', function () {
  gulp.src('./src/modules/*.js')
    .pipe(concat('simple-directives.js', { sep: ';' }))
    .pipe(gulp.dest('./dist'))

  gulp.src('./LICENSE')
    .pipe(gulp.dest('./dist'))
})
