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
    cssVendor = [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/swiper/dist/css/swiper.css'
    ],
    cssVendorOrder = [
        'bootstrap.css',
        'swiper.css'
    ];

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
        .pipe(preprocess({context: {NODE_ENV: 'DEVELOPMENT', ROOT: ''}}))
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
        .pipe(preprocess({context: { ROOT: '../'}}))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest(global.paths.theme ))
        .on('error', gutil.log);
});

//concat all styles (vendors & custom css)
gulp.task('styles-concat', ['styles-vendor-concat', 'styles-sass'], function(){
    return gulp.src([
            global.paths.src + '/css/src/head.css',
            global.paths.src + '/css/style.css',
            global.paths.src + '/css/' + global.paths.styleCssVendorAllFile
        ])
        .pipe(order([
            'head.css',
            global.paths.styleCssVendorAllFile,
            'style.css'
        ]))
        .pipe(concat('style.all.css'))
        .pipe(preprocess({context: {NODE_ENV: 'PRODUCTION', ROOT: ''}}))
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


/*
gulp.task('styles', ['styles-dev'], function () {
    return gulp.src(global.paths.src + '/css/src/main.scss')
        .pipe(preprocess({context: {ROOT: '/'}}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(autoprefixer({browsers: ['> 1%']}))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest(global.paths.styleDev))
        .pipe(browserSync.stream({match: '**!/!*.css'}))
        .on('error', gutil.log);
});

gulp.task('styles-dev', function () {
    return gulp.src(global.paths.src + '/css/src/main.scss')
        .pipe(preprocess({context: {ROOT: ''}}))
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(autoprefixer({browsers: ['> 1%']}))
        .pipe(rename({basename: 'style'}))
        .pipe(gulp.dest(global.paths.src + '/css'))
        .on('error', gutil.log);
});

gulp.task('styles-deploy', function () {
    return gulp.src(global.paths.src + '/css/src/main.scss')
        .pipe(preprocess({context: {ROOT: ''}}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['> 1%']}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(global.paths.styleDist))
        .on('error', gutil.log);
});*/
