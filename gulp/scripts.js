var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    //@TODO move this to _default
    scriptsOrder = [
        'index.js'
    ], //order concatenation scripts
    vendor = [
        'bower_components/jquery/dist/jquery.js',
        '_src/js/vendor/bootstrap/bootstrap.js',
    ], //src vendors
    vendorOrder = [
        'jquery.js',
        'bootstrap.js'
    ];
    //order concatenated vendors

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


gulp.task('scripts-deploy', ['vendor-min','scripts-min'], function(){
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
        .pipe(gulp.dest(global.paths.scriptDist));
});


gulp.task('scripts-deploy-theme', ['vendor-min','scripts-min'], function(){
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
});