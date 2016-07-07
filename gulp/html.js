var gulp = require('gulp'),
    gutil = require('gulp-util'),
    htmlmin = require('gulp-htmlmin'),
    preprocess = require('gulp-preprocess'),
    htmlv = require('gulp-html-validator'),
    rename = require('gulp-rename');

//concat html to dev folder
gulp.task('html-dev', function () {
    return gulp.src(global.paths.htmlSrc + '/pages/*.html')
        .pipe(preprocess({
            context: global.contextVarsDevelopment
        }))
        .pipe(gulp.dest(global.paths.src))
        .on('error', gutil.log);

});

//run validation html
gulp.task('html-validator', function () {
    return gulp.src(global.paths.htmlSrc + '/pages/*.html')
        .pipe(preprocess({
            context: global.contextVarsDevelopment
        }))
        .pipe(htmlv({format: 'text'}))
        .pipe(rename({extname: '.txt'}))
        .pipe(gulp.dest('validator-results'));
});

//concat&minify html to static folder
gulp.task('html-deploy', function () {
    return gulp.src(global.paths.htmlSrc + '/pages/*.html')
        .pipe(preprocess({
            context: global.contextVarsDeploy
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(global.paths.dist));
});