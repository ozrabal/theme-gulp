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
        '_src/js/vendor/jquery/jquery.js',
        '_src/js/vendor/bootstrap/bootstrap.js',
    ],
    vendorOrder = [
        'jquery.js',
        'bootstrap.js'
    ];

//concatenate vendors
gulp.task('vendor-concat', function(){
    return gulp.src(vendor.map(function(f) {
            return f;
        }))
        .pipe(order(vendorOrder))
        .pipe(concat(global.paths.vendorsAllFile))
        .pipe(gulp.dest(global.paths.src + '/js'))
        .on('error', gutil.log);
});

//minimise concatenated vendors
gulp.task('vendor-min',['vendor-concat'], function(){
    return gulp.src(global.paths.src + '/js/' + global.paths.vendorsAllFile)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './src'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.src + '/js'));
});

//concatenate scripts
gulp.task('scripts-concat', function(){
    return gulp.src([
            global.paths.scriptSrc
        ])
        .pipe(sourcemaps.init())
        .pipe(order(scriptsOrder))
        .pipe(concat(global.paths.scriptsAllFile))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './src'}))
        .pipe(gulp.dest(global.paths.src + '/js'))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);
});

//minimise scripts
gulp.task('scripts-min', ['scripts-concat'], function(){
    return gulp.src([
            global.paths.src + '/js/' + global.paths.scriptsAllFile
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: './src'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.src + '/js'))
        .on('error', gutil.log);
});

//scripts theme
gulp.task('scripts-theme',['scripts-concat'], function(){
    return gulp.src([
            global.paths.src + '/js/' + global.paths.scriptsAllFile
        ])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(global.paths.scriptTheme))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);
});

//vendors theme
gulp.task('vendor-theme', ['vendor-concat'], function(){
    return gulp.src(global.paths.src + '/js/' + global.paths.vendorsAllFile)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(global.paths.scriptTheme))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);
});

//scripts theme deploy
gulp.task('script-theme-deploy',['vendor-theme', 'scripts-theme'], function(){
    return gulp.src([
        global.paths.src + '/js/' + global.paths.scriptsAllFile,
        global.paths.src + '/js/' + global.paths.vendorsAllFile
    ])
        .pipe(order([
            global.paths.vendorsAllFile,
            global.paths.scriptsAllFile
        ]))
        .pipe(concat(global.themeName + '.all.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.scriptTheme));
})





/*gulp.task('scripts', function () {
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
});*/

/*gulp.task('scripts-theme', function () {
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
});*/



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

/*
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
});*/
