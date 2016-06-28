global.themeName = 'amuz' ;
global.paths = {
    src: '_src',
    dist: '_static',
    theme: '_theme',


    scriptSrc: '_src/js/src/**/*.js',
    scriptsAllFile: 'scripts.all.js',
    scriptDist: '_static/js',
    scriptTheme: './_theme/js',

    vendorSrc: '_src/js/vendor',
    vendorsAllFile: 'vendors.all.js',
    
    styleSrc: '_src/css/src/**/*.scss',
    styleDist: '_static/css',
    styleDev: '_theme',

    vectorSrc: ['_src/img/**/*.svg', '!_src/img/src/**'],
    vectorDist: '_static/img',

    spriteSrc: '_src/img/src/**/*.png',

    imagesSrc: ['_src/img/**/*.png', '_src/img/**/*.jpg', '_src/img/**/*.gif', '!_src/img/src/**'],
    imagesDist: '_static/img',

    htmlSrc: '_src/html/src/'
};

var 
    gulp = require('gulp'),
    runSequence = require('run-sequence').use(gulp);

gulp.task('default', function () {
    runSequence(['vendor', 'scripts', 'scripts-theme', 'styles', 'styles-dev'], 'html', 'browser-sync', function () {
        gulp.watch(global.paths.scriptSrc, ['scripts','scripts-theme']);
        gulp.watch(global.paths.vendorSrc + '/**/*.js', ['vendor']);
        gulp.watch(global.paths.styleSrc, ['styles', 'styles-dev']);
        gulp.watch(global.paths.styleSrc + '/**/*.css', ['styles', 'styles-dev']);
        gulp.watch(global.paths.spriteSrc, ['sprite']);
        gulp.watch(global.paths.vectorSrc, ['vectors']);
        gulp.watch(global.paths.imagesSrc, ['images']);
        gulp.watch(global.paths.htmlSrc + '/**/*.html', ['html']);
    });



});

gulp.task('deploy-theme', function () {
    runSequence('zip', ['vendor', 'scripts', 'scripts-theme', 'styles', 'styles-dev'])
});
