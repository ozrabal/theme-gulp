# Integrated gulp workflow for static html template & WordPress theme

##Instalation
If you're already have installed Node this workflow won't require much additional effort.
Install npm.
Install Bower: `npm install bower -g`
Download or clone this repository: `git clone https://github.com/ozrabal/theme-gulp.git`
Run: npm install

##Setup
Edit file `gulp/_default.js`
In most cases you must set only two values
- `global.themeName` this is in most cases WP theme slug
- `global.siteURL` url of your development WordPress instalation eg.http://wptest.dev

###Directory structure
- `_src` place here your source files according to the scheme:
```
css\src\ #contains all SASS style files
html\src\ #contains all html's
js\src\ #contains all JavaScripts
```
- `_theme` here place your WP theme files (.php) and into this dir will be copied all css,js and other files processed by gulp tasks
- `_static`here will be placed result of deployment static theme (processed htmls styles and scripts if you don't need WP theme)

##User manual
Here ale two main tasks used by standard development process
type `gulp` if you need processed only static files (if you dont work with WP themes)
type `gulp theme` if you working with WP theme (in _theme dir) then result of tasks will be placed in theme dir (you are getting ready styles and scripts in your theme dir)
in both cases all changes are monitored and browsersync reloads your browsers
