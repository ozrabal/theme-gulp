global.themeName = 'amuz' ;
global.siteURL = 'http://teampower.dv';
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
    styleCssVendorAllFile: 'vendors.all.css',
    styleDist: '_static/css',
    styleDev: '_theme',



    vectorSrc: ['_src/img/**/*.svg', '!_src/img/src/**'],
    vectorDist: '_static/img',

    spriteSrc: '_src/img/src/**/*.png',

    imagesSrc: ['_src/img/**/*.png', '_src/img/**/*.jpg', '_src/img/**/*.gif', '!_src/img/src/**'],
    imagesTheme: '_theme/img',
    imagesDist: '_static/img',

    htmlSrc: '_src/html/src'
};

global.contextVarsDevelopment = {
    NODE_ENV: 'DEVELOPMENT',
    DEBUG: true,
    ROOT: '',
    DECACHE: Date.now()
};

global.contextVarsDeploy = {
    NODE_ENV: 'DEVELOPMENT',
    DEBUG: true,
    ROOT: '',
    DECACHE: Date.now()
};
global.contextVarsTheme = {
    NODE_ENV: 'DEVELOPMENT',
    DEBUG: true,
    ROOT: '',
    DECACHE: Date.now()
};

var 
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence').use(gulp);


gulp.task('default', function(){
    runSequence(['scripts-concat', 'vendor-concat', 'styles-vendor-concat', 'styles-sass'],'html-dev', 'browser-sync',  function () {
       gulp.watch(global.paths.scriptSrc, ['scripts-concat']);
        gulp.watch(global.paths.vendorSrc + '/**/*.js', ['vendor-concat']);
        gulp.watch(global.paths.styleSrc, ['styles-sass']);
        //gulp.watch(global.paths.styleSrc + '/**/*.css', ['styles', 'styles-dev']);
        //gulp.watch(global.paths.spriteSrc, ['sprite']);
        //gulp.watch(global.paths.vectorSrc, ['vectors']);
        //gulp.watch(global.paths.imagesSrc, ['images']);
        gulp.watch(global.paths.htmlSrc + '/**/*.html', ['html-dev', browserSync.reload]);

    });
});


gulp.task('theme', function(){
    runSequence(['scripts-theme', 'vendor-theme', 'styles-vendor-theme','styles-sass', 'styles-sass-theme'],'html-dev', 'browser-sync-theme',  function () {
        gulp.watch(global.paths.scriptSrc, ['scripts-theme']);
        gulp.watch(global.paths.vendorSrc + '/**/*.js', ['vendor-theme']);
        gulp.watch(global.paths.styleSrc, ['styles-sass', 'styles-sass-theme']);
        //gulp.watch(global.paths.styleSrc + '/**/*.css', ['styles', 'styles-dev']);
        //gulp.watch(global.paths.spriteSrc, ['sprite']);
        //gulp.watch(global.paths.vectorSrc, ['vectors']);
        gulp.watch(global.paths.imagesSrc, ['images-theme', browserSync.reload]);
        gulp.watch(global.paths.htmlSrc + '/**/*.html', ['html-dev', browserSync.reload]);

    });
});


gulp.task('deploy-static', function () {
    runSequence('zip-static', ['scripts-deploy','styles-deploy', 'html-deploy', 'images-deploy']);
});