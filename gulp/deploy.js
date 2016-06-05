var gulp = require('gulp'),
    del = require('del'),
    zip = require('gulp-zip');

gulp.task('clean', function() {
        return del([
            global.paths.dist,
            global.paths.dist + '.zip',
            'app/css/*.css',
            'app/css/*.scss',
            'app/css/*.map',
            'app/js/*.js',
            'app/js/*.map',
            'app/js/vendor'
        ]);
    }
);

gulp.task('zip', function() {
    return gulp.src(global.paths.theme + '/**')
        .pipe(zip(global.themeName + '.zip'))
        .pipe(gulp.dest(''));
});

