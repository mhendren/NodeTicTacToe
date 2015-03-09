/**
 * Created by mhendren on 3/4/15.
 */
var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', function() {
    gulp.src('css/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets'));
});