var gulp = require('gulp'),
    browserSync = require('browser-sync');

//reload browser static site
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: global.paths.src,
        },
        notify: false,
	    browser: ['firefoxdeveloperedition']
    });
});

//reload browser dev url
gulp.task('browser-sync-theme', function() {
    browserSync({
        proxy: global.siteURL,
        options: {
            reloadDelay: 250
         },
        notify: false,
        browser: ['firefoxdeveloperedition'] //"google chrome", "firefox" see https://www.browsersync.io/docs/options#option-browser
    });
});