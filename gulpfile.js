/**
 * gulpfile.js - Main Task File
 *
 * See /task folder for further tasks
 *
 */

'use strict';

require('require-dir')('./tasks');
require('laravel-elixir-livereload');
require('laravel-elixir-postcss');

var elixir = require('laravel-elixir');
var autoprefixer = require('autoprefixer');

elixir( function(mix) {

    mix
        .bower()
        .angular('frontend')
        .styles([
            'app.css',
            'vendor.css'
        ], 'public/css/app.css')
        .postcss('app.css', {
            plugins:[
                autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false,
                })
            ],
            srcDir: 'public/css/',
            output: 'public/css/'
        })
        //
        // Read https://css-tricks.com/strategies-for-cache-busting-css/
        // and https://github.com/laravel/elixir/issues/254#issuecomment-131924950
        //
        // Laravel Manual: https://laravel.com/docs/5.2/elixir#versioning-and-cache-busting
        //  .version([
        //     'public/css/app.css',
        //     'js/app.js'
        // ])
        .livereload([
            'public/js/vendor.js',
            'public/js/app.js',
            'public/css/vendor.css',
            'public/css/app.css',
            'frontend/templates.js',
        ], { liveCSS: true })
        .phpUnit();

});