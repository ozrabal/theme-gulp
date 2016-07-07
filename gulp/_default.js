global.themeName = 'theme';
global.siteURL = 'http://theme.dv';
global.paths = {
    src: '_src', //sources dir
    dist: '_static', //static theme deploy dir
    theme: '_theme', //WordPress theme dir

    htmlSrc: '_src/html/src', //html files src

    scriptSrc: '_src/js/src/**/*.js', //js scripts parts sources
    scriptsAllFile: 'scripts.all.js', //concatenated js file name
    scriptDist: '_static/js', //static theme deploy scripts dir
    scriptTheme: './_theme/js', //WP theme scripts dir

    vendorSrc: '_src/js/vendor', //vendors dir
    vendorsAllFile: 'vendors.all.js', //concatenated vendors file
    
    styleSrc: '_src/css/src/**/*.scss', //sass sources
    styleCssVendorAllFile: 'vendors.all.css', //concatenated vendors file
    styleDist: '_static/css', //static theme css dir
    styleDev: '_theme', //WP theme css dir

    vectorSrc: ['_src/img/**/*.svg', '!_src/img/src/**'], //svg files sources
    vectorDist: '_static/img', //static theme svg dir
    vectorTheme: '_theme/img', //WP theme svg dir

    spriteSrc: '_src/img/src/**/*.png', //sprites src dir

    imagesSrc: ['_src/img/**/*.png', '_src/img/**/*.jpg', '_src/img/**/*.gif', '!_src/img/src/**'], //image sources
    imagesDist: '_static/img', //static theme image destination dir
    imagesTheme: '_theme/img', //WP theme image destination dir

    copyFolders: ['_src/fonts/**/'] //files from this dir being copied "as is" to WP theme & static theme

};

//development env vars
global.contextVarsDevelopment = {
    NODE_ENV: 'DEVELOPMENT',
    DEBUG: true,
    ROOT: '',
    DECACHE: Date.now()
};
//deploy env vars
global.contextVarsDeploy = {
    NODE_ENV: 'PRODUCTION',
    DEBUG: true,
    ROOT: '',
    DECACHE: Date.now()
};
//wp theme deploy env vars
global.contextVarsTheme = {
    NODE_ENV: 'DEVELOPMENT',
    DEBUG: true,
    ROOT: '',
    DECACHE: Date.now()
};

//tasks
var 
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence').use(gulp);

//static theme default task
gulp.task('default', function(){
    runSequence(['scripts-concat', 'vendor-concat', 'styles-vendor-concat', 'styles-sass'],'html-dev', 'browser-sync',  function () {
       gulp.watch(global.paths.scriptSrc, ['scripts-concat']);
        gulp.watch(global.paths.vendorSrc + '/**/*.js', ['vendor-concat']);
        gulp.watch(global.paths.styleSrc, ['styles-sass']);
        gulp.watch(global.paths.htmlSrc + '/**/*.html', ['html-dev', browserSync.reload]);

    });
});

//WordPress theme
gulp.task('theme', function(){
    runSequence(['scripts-theme', 'vendor-theme', 'styles-vendor-theme','styles-sass', 'styles-sass-theme', 'folders-deploy-theme', 'images-theme', 'vectors-theme'],'html-dev', 'browser-sync-theme',  function () {
        gulp.watch(global.paths.scriptSrc, ['scripts-theme']);
        gulp.watch(global.paths.vendorSrc + '/**/*.js', ['vendor-theme']);
        gulp.watch(global.paths.styleSrc, ['styles-sass', 'styles-sass-theme']);
        gulp.watch(global.paths.vectorSrc, ['vectors-theme', browserSync.reload]);
        gulp.watch(global.paths.imagesSrc, ['images-theme', browserSync.reload]);
        gulp.watch(global.paths.htmlSrc + '/**/*.html', ['html-dev', browserSync.reload]);

    });
});

//deploys
gulp.task('deploy-static', function () {
    runSequence('zip-static', ['scripts-deploy','styles-deploy', 'html-deploy', 'images-deploy', 'folders-deploy']);
});

gulp.task('deploy-theme', function () {
    runSequence( ['scripts-deploy-theme','styles-deploy-theme',  'images-theme', 'vectors-theme', 'folders-deploy-theme']);
});