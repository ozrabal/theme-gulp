var gulp = require('gulp'),
    del = require('del'),
    zip = require('gulp-zip');

gulp.task('clean', function() {
        return del([
            global.paths.dist,
            global.paths.dist + '.zip',
            global.paths.src + '/css/*.css',
            global.paths.src + '/css/*.map',
            global.paths.src + '/js/*.js',
            global.paths.src + '/js/*.map',
            global.paths.src + '/js/vendor'
        ]);
    }
);

gulp.task('zip-static', function() {
    return gulp.src(global.paths.dist + '/**')
        .pipe(zip(global.themeName + '.zip'))
        .pipe(gulp.dest(global.paths.dist));
});

