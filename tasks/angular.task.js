/**
 * gulp Task "angular"
 *
 * Prepare all angularJS and template HTML files
 * Debug Hint: set "gulp-size" option showFiles true, to display all used files *
 *
 * @param {string} frontend - angularJS folder
 * @param {string} output - name of compiled JS files
 * @param {string} outputFilename - folder to output compiled files, default "app.js"
 * @param {string} templateModule - folder to output compiled files, default "module.templates"
 * @param {string} templateRoot - folder to output compiled files, default "app.js"
 */

'use strict';

var gulp = require('gulp');
var $ = require( 'gulp-load-plugins' )({
    pattern: [
        'gulp-*',
        'jshint-*'
    ]
});

var Elixir = require('laravel-elixir');
var Task = Elixir.Task;

Elixir.extend('angular', function(frontend, output, outputFilename, templateModule, templateRoot) {


    frontend = frontend + '/' || Elixir.config.assetsPath;
    output = output || Elixir.config.js.outputFolder;
    outputFilename = outputFilename || 'app.js';


    /**
     * angular-tpl - gulp Task to build HTML Templates
     *
     * HTML templates will be compiled with "gulp-angular-templatecache".
     * Production: HTML templates will be concated with the "output" file.
     * Development: HTML templates will be placed in the folder "frontend" as templates.js
     * gulp-angular-templatecache Package Config: standalone: true, moduleSystem: IIFE
     * Use the following snippet in blade templates:
     * @if ( Config::get('app.debug') )
     *     <script src="../frontend/templates.js"></script>
     * @endif
     *
     * @return {obejct} gulp
     */
    new Task('angular-tpl', function() {

        const s = $.size({ showFiles:false, showTotal:false });
        templateModule = templateModule || 'module.templates';
        templateRoot = templateRoot || '../' + frontend ;

        return gulp.src( frontend + '**/*.html' )
            .on('error', function(e) {
                new Elixir.Notification().error(e + ' Task: angular-tpl Failed');
                this.emit('end');
            })
            .pipe( s )
            .pipe( $.angularTemplatecache({
                    module          : templateModule,
                    moduleSystem    : 'IIFE',
                    standalone      : true,
                    root            : templateRoot,
                    templateHeader  : '\'use strict\';\nangular.module(\'<%= module %>\'<%= standalone %>).run([\'$templateCache\', function($templateCache) {',
                    templateBody    : '$templateCache.put(\'<%= url %>\',\'<%= contents %>\');'
                })
            )
            .pipe( gulp.dest(frontend) )
            .pipe( new Elixir.Notification().message( () => $.util.colors.yellow(frontend + 'templates.js') + ' created, total filesize: ' + $.util.colors.yellow(s.prettySize) ));

    }).watch(frontend + '**/*.html');

    /**
     * angular-js - Angular Application JS Files
     *
     * Production: all js files will be concated and uglyfied
     * Development: all js files except templates.js will be concated
     * and a sourcemap will be generated, if requested from the Elixir configuration
     *
     * @return {object}
     */
    new Task('angular-js', function() {

        const s = $.size({ showFiles:false, showTotal:false });
        var srcFiles = [
            '!' + frontend + 'constants.example.js',
            frontend + 'main.js',
            frontend + '**/*.js'
        ];
        srcFiles.push( Elixir.config.production ?  '' : '!' + frontend + 'templates.js' );

        return gulp.src( srcFiles )
            .on('error', function(e) {
                new Elixir.Notification().error(e + ' Task: angular-js Failed');
                this.emit('end');
            })
            .pipe( s )
            .pipe( $.jshint() )
            .pipe( $.jshint.reporter('jshint-stylish') )
            .pipe( $.if( Elixir.config.sourcemaps, $.sourcemaps.init() ))
            .pipe( $.concat(outputFilename) )
            .pipe( $.if( Elixir.config.production, $.uglify() ))
            .pipe( $.if( Elixir.config.sourcemaps, $.sourcemaps.write('.', { sourceRoot: '.' }) ))
            .pipe( gulp.dest(output) )
            .pipe( new Elixir.Notification().message( () => $.util.colors.yellow(output + '/' +outputFilename) + ' created, total filesize: ' + $.util.colors.yellow(s.prettySize) ));

    }).watch([ frontend + '**/*.js', Elixir.config.production ?  '' : '!' + frontend + 'templates.js' ]);


});