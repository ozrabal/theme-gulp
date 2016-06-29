var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    modRewrite = require('connect-modrewrite');

gulp.task('browser-sync', function() {
    browserSync({
        //proxy: 'http://foo.dv',
        //injectChanges: true,
        server: {
            baseDir: global.paths.src,
            /*middleware: [
                modRewrite([
                    '!\\.html|\\.js|\\.json|\\.css|\\.png|\\.jpg|\\.svg|\\.mp4|\\.map$ /index.html [L]'
                ])
            ]*/
        },
        /*options: {
            reloadDelay: 1000
        },*/
        notify: false,
	browser: ['firefoxdeveloperedition']
    });
});
