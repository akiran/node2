"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('clean', function () {
    return del (['build/*'], function () {
	console.log('successfully deleted');
    });
});

gulp.task('copy', function () {

});

gulp.task('images', function () {
    return gulp.src(['client/css/**/*.{jpg,png}'])
	.pipe(gulp.dest('build/images'));
});

gulp.task('styl', function () {
  return  gulp.src(['client/css/**/*.styl'])
              .pipe(stylus({
                use: [autoprefixer({browsers: ['last 2 versions', 'ie 10']})]
              }))
              .pipe(gulp.dest('build/css'));
});

gulp.task('js', function (callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
	if(err) throw new gutil.PluginError('webpack.build', err);
	gutil.log('[webpack:build]', stats.toString({
	    colors:true
	}));
    });
});

gulp.task('build', function (cb) {
    runSequence('clean', ['copy', 'styl', 'js'], function () {
	cb();
    });
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['client/**/*.{styl}'], ['styl']);
    gulp.watch(['client/**/*.{js,jsx}'], ['js']);
});

gulp.task('default', ['watch']);
