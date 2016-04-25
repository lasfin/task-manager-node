'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');


gulp.task('sass', () => {
    return gulp.src([
            '../node_modules/angular-ui-notification/dist/angular-ui-notification.css',
            '../node_modules/ng-dialog/css/ngDialog.css',
            '../node_modules/ng-dialog/css/ngDialog-theme-default.css',
            './stylesheets/**/*.scss'
        ])
        .pipe(concat('main.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});


gulp.task('libs-js', () => {
    return gulp.src([
        '../node_modules/jquery/dist/jquery.js',
        '../node_modules/materialize-css/dist/js/materialize.js',
        '../node_modules/angular/angular.js',
        '../node_modules/angular-ui-router/release/angular-ui-router.js',
        '../node_modules/angular-ui-notification/dist/angular-ui-notification.js',
        '../node_modules/angular-utils-pagination/dirPagination.js',
        '../node_modules/ng-dialog/js/ngDialog.js',
        '../node_modules/highcharts/highcharts'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('app-js', () => {
    return gulp.src(['./js/app.js', 'js/**/*.js'])
        .pipe(concat('application.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build/js/'));
});



gulp.task('watch', ['app-js', 'sass'],  () => {
    gulp.watch('js/**/*.js', ['app-js']);
    gulp.watch('./stylesheets/**/*.scss', ['sass']);
});


gulp.task('default', ['sass', 'libs-js', 'app-js', 'watch']);