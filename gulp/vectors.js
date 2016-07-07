var gulp = require('gulp'),
        gutil = require('gulp-util'),
        svgmin = require('gulp-svgmin');

//clean svg & move to theme folder
gulp.task('vectors-theme', function () {
    return gulp.src(global.paths.vectorSrc)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(gulp.dest(global.paths.vectorTheme))
        .on('error', gutil.log);
});

//clean svg & move to dist folder
gulp.task('vectors-deploy', function () {
    return gulp.src(global.paths.vectorSrc)
        .pipe(svgmin())
        .pipe(gulp.dest(global.paths.vectorDist));
});

