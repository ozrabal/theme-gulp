var gulp = require('gulp'),
    gutil = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    preprocess = require('gulp-preprocess'),
    htmlv = require('gulp-html-validator'),
    rename = require('gulp-rename');

gulp.task('html', function () {
    return gulp.src(global.paths.htmlSrc + '/pages/*.html')
        .pipe(preprocess({context: {NODE_ENV: 'DEVELOPMENT', DEBUG: true, ROOT: '', THEME_PATH: 'wp-content/themes/amuz/', SEE: 'Link', DECACHE: Date.now()}}))
        .pipe(gulp.dest(global.paths.src))
        //.pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);
});

gulp.task('validator', function () {
    return gulp.src(global.paths.htmlSrc + '/pages/*.html')
        .pipe(preprocess({context: {NODE_ENV: 'DEVELOPMENT', DEBUG: true, ROOT: '', THEME_PATH: 'wp-content/themes/amuz/', SEE: 'Link', DECACHE: Date.now()}}))
        .pipe(htmlv({format: 'text'}))
        .pipe(rename({extname: '.txt'}))
        .pipe(gulp.dest('validator-results'));
});

gulp.task('htaccess', function () {
    return gulp.src(global.paths.src + '/.htaccess')
        .pipe(gulp.dest(global.paths.dist));
});

gulp.task('html-deploy', ['htaccess'], function () {
    return gulp.src(global.paths.htmlSrc + '/pages/*.html')
        .pipe(preprocess({context: {NODE_ENV: 'PRODUCTION', DEBUG: false, ROOT: '', THEME_PATH: 'wp-content/themes/amuz/', SEE: 'Link', DECACHE: Date.now()}}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(global.paths.dist));
});