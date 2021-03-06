var gulp = require('gulp'),
        gutil = require('gulp-util'),
        imagemin = require('gulp-imagemin'),
        pngquant = require('imagemin-pngquant'),
        sprite = require('gulp.spritesmith');

/*gulp.task('images', function () {
    return gulp.src(global.paths.spriteSrc)
            .pipe(sprite({imgName: 'sprite.png', cssName: 'sprite.json'}))
            .pipe(gulp.dest('app/img'))
            .pipe(browserSync.reload({stream: true}))
            .on('error', gutil.log);
});*/

gulp.task('folders-deploy', function() {
    return gulp.src(global.paths.copyFolders,{base:global.paths.src})
        .pipe(gulp.dest(global.paths.dist))
        .on('error', gutil.log);
});

gulp.task('folders-deploy-theme', function() {
    return gulp.src(global.paths.copyFolders,{base:global.paths.src})
        .pipe(gulp.dest(global.paths.theme))
        .on('error', gutil.log);
});

gulp.task('images-theme', function () {
    return gulp.src(global.paths.imagesSrc)
            /*.pipe(imagemin({optimizationLevel: 7,
                use: [pngquant({quality: '50-70',posterize:0})]
            }))*/
            .pipe(gulp.dest(global.paths.imagesTheme))
            .on('error', gutil.log);
});

gulp.task('images-deploy', function () {
    return gulp.src(global.paths.imagesSrc)
        /*.pipe(imagemin({optimizationLevel: 7,
         use: [pngquant({quality: '50-70',posterize:0})]
         }))*/
        .pipe(gulp.dest(global.paths.imagesDist))
        .on('error', gutil.log);
});