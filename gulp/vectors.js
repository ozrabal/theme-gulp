var gulp = require('gulp'),
        gutil = require('gulp-util'),
        browserSync = require('browser-sync'),
        svgmin = require('gulp-svgmin');

gulp.task('vectors', function () {
    return gulp.src(global.paths.vectorSrc)
            //.pipe(svgmin({
            //   js2svg: {
            //      pretty: true
            // }
            //}))
            .pipe(gulp.dest('app/img'))
            .pipe(browserSync.reload({stream: true}))
            .on('error', gutil.log);
});

gulp.task('vectors-deploy', ['vectors'], function () {
    gulp.task('vectors-deploy', function () {
        return gulp.src(global.paths.vectorSrc)
                //.pipe(svgmin())
                .pipe(gulp.dest(global.paths.vectorDist));
    });


});

