var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    preprocess = require('gulp-preprocess'),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
//@TODO move this to _default
    cssVendor = [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/swiper/dist/css/swiper.css'
    ], //vendors paths
    cssVendorOrder = [
        'bootstrap.css',
        'swiper.css'
    ]; //vendors order

//concatenate vendors
gulp.task('styles-vendor-concat', function(){
    return gulp.src(cssVendor.map(function(f) {
            return f;
        }))
        .pipe(order(cssVendorOrder))
        .pipe(concat(global.paths.styleCssVendorAllFile))
        .pipe(gulp.dest(global.paths.src + '/css'))
        .on('error', gutil.log);
});

//copy vendors to theme dir
gulp.task('styles-vendor-theme', ['styles-vendor-concat'], function(){
    return gulp.src(global.paths.src + '/css/'+ global.paths.styleCssVendorAllFile )
        .pipe(gulp.dest(global.paths.styleDev + '/css'));
});

//compile sass to dev folder
gulp.task('styles-sass', function(){
    return gulp.src(global.paths.src + '/css/src/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(preprocess({
            context: global.contextVarsDevelopment
        }))
        .pipe(autoprefixer({browsers: ['> 1%']}))
        .pipe(sourcemaps.write('.'))

        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest(global.paths.src + '/css'))
        .pipe(browserSync.reload({stream: true}))
        .on('error', gutil.log);
});

//compile sass to theme folder
gulp.task('styles-sass-theme', function(){
    return gulp.src(global.paths.src + '/css/src/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(autoprefixer({browsers: ['> 1%']}))
        .pipe(preprocess({
            context: global.contextVarsTheme
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest(global.paths.theme ))
        .on('error', gutil.log);
});

//concat all styles (vendors & custom css)
gulp.task('styles-concat', ['styles-vendor-concat', 'styles-sass'], function(){
    return gulp.src([
            global.paths.src + '/css/src/head.css', //WP styles header
            global.paths.src + '/css/style.css',
            global.paths.src + '/css/' + global.paths.styleCssVendorAllFile
        ])
        .pipe(order([
            'head.css',
            global.paths.styleCssVendorAllFile,
            'style.css'
        ]))
        .pipe(concat('style.all.css'))
        .pipe(preprocess({
            context: global.contextVarsDevelopment
        }))
        .pipe(gulp.dest(global.paths.styleDist ))
        .on('error', gutil.log);
});

//minimize concatenated styles
gulp.task('styles-deploy',['styles-concat'], function() {
    return gulp.src(global.paths.styleDist + '/style.all.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.styleDist));
});

//minimize concatenated styles in theme dist
gulp.task('styles-deploy-theme',['styles-concat'], function() {
    return gulp.src(global.paths.styleDist + '/style.all.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(global.paths.theme));
});