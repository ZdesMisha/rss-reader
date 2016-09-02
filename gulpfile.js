var gulp   = require('gulp');
var webpack = require('webpack-stream');

gulp.task('hello', function() {
    console.log('Hello Zell');
});

gulp.task('pack', function() {
    return gulp.src('./src/main/webapp/static/custom/jsx/main.jsx')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./src/main/webapp/static/custom/js/'));
});