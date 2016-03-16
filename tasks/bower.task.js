/**
 * gulp Task "bower"
 *
 * Collects all JS and CSS files from bower.json. Edit bower.json
 * to exclude packages - https://github.com/ck86/main-bower-files
 * Debug Hint: set "gulp-size" option showFiles true, to display all used files *
 *
 * @param {string} jsOutputFile - default: vendor.js
 * @param {string} jsOutputFolder
 * @param {string} cssOutputFile - default: vendor.css
 * @param {string} cssOutputFolder
 */

'use strict';

var gulp = require('gulp');
var $ = require( 'gulp-load-plugins' )({
    pattern: [
        'gulp-*',
        'main-bower-files'
    ]
});

var Elixir = require('laravel-elixir');
var Task = Elixir.Task;

Elixir.extend('bower', function(jsOutputFile, jsOutputFolder, cssOutputFile, cssOutputFolder) {


    var cssFile = cssOutputFile || 'vendor.css';
    var jsFileName = jsOutputFile || 'vendor.js';


    new Task('bower-js', function() {

        const s = $.size({ showFiles:false, showTotal:false });
        var output = jsOutputFolder || Elixir.config.js.outputFolder;

        return gulp.src( $.mainBowerFiles({ debugging:false }))
            .on('error', function(e) {
                new Elixir.Notification().error(e + ' Task: bower-js Failed');
                this.emit('end');
            })
            .pipe( $.filter('**/*.js') )
            .pipe( s )
            .pipe( $.if( Elixir.config.sourcemaps, $.sourcemaps.init() ))
            .pipe( $.concat(jsFileName) )
            .pipe( $.if( Elixir.config.production, $.uglify() ))
            .pipe( $.if( Elixir.config.sourcemaps, $.sourcemaps.write('.', { sourceRoot: '.' }) ))
            .pipe( gulp.dest( output ))
            .pipe( new Elixir.Notification().message( () => $.util.colors.yellow(output + '/' + jsFileName) + ' created, total filesize: ' + $.util.colors.yellow(s.prettySize) )
        );

    }).watch('bower.json');


    new Task('bower-css', function() {

        const s = $.size({ showFiles:false, showTotal:false });
        var output = cssOutputFolder || Elixir.config.css.outputFolder;

        return gulp.src( $.mainBowerFiles({ debugging: false }))
            .on('error', function(e) {
                new Elixir.Notification().error(e, ' Task: bower-css Failed');
                this.emit('end');
            })
            .pipe( $.filter('**/*.css') )
            .pipe( s )
            .pipe( $.if( Elixir.config.sourcemaps, $.sourcemaps.init() ))
            .pipe( $.concat(cssFile) )
            .pipe( $.if( Elixir.config.production, $.cleanCss() ))
            .pipe( $.if( Elixir.config.sourcemaps, $.sourcemaps.write('.', { sourceRoot: '.' }) ))
            .pipe( gulp.dest(output) )
            .pipe( new Elixir.Notification().message( () => $.util.colors.yellow(output + '/' + cssFile) + ' created, total filesize: ' + $.util.colors.yellow(s.prettySize) )
        );

    }).watch('bower.json');


});