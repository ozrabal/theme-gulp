var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    scriptsOrder = [
        'index.js'
    ],
    vendor = [

        'bootstrap',
        'bootstrap-accessibility.min',
        'jquery.cookie',
        'jquery.cycle2.min',
        'jquery.cycle2.swipe.min',
        'table-fixed-header',
        'jquery.fancybox-1.3.4'
    ],
    vendorOrder = [
        'jquery.fancybox-1.3.4.js',
        'bootstrap.js',
        'bootstrap-accessibility.min.js',
        'jquery.cookie.js',
        'jquery.cycle2.min.js',
        'jquery.cycle2.swipe.min.js',
        'table-fixed-header.js',

    ];

gulp.task('scripts', function () {
    return gulp.src([
            global.paths.scriptSrc
        ])
        .pipe(sourcemaps.init())
        .pipe(order(scriptsOrder))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './src'}))
        .pipe(gulp.dest(global.paths.src + '/js'))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);
});

gulp.task('scripts-theme', function () {
    return gulp.src(global.paths.src + '/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './src'}))
        .pipe(gulp.dest(global.paths.theme + '/js'));
});

gulp.task('scripts-deploy', ['scripts'], function () {
    return gulp.src(global.paths.src + '/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest(global.paths.dist + '/js'));
});



/*gulp.task('vendor',['vendor-concat'] , function () {
    return gulp.src(vendor.map(function (f) {
        return global.paths.vendorSrc + '/' + f + '.js';
    }))
        .pipe(gulp.dest(global.paths.src + '/js'))
});*/

/*gulp.task('vendor-deploy', function() {
    return gulp.src(vendor.map(function(f) {
        return global.paths.vendorSrc + '/' + f + '.js';
    }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.theme + '/js'))
});*/

gulp.task('vendor', function () {
    return gulp.src(vendor.map(function(f) {
            return global.paths.vendorSrc + '/' + f + '.js';
    }))
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(order(vendorOrder))
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './src'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.src + '/js'))
        .pipe(gulp.dest(global.paths.theme + '/js'))
        .on('error', gutil.log);
});