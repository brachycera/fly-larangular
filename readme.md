# fly-seed - A Laravel & Angular project boilerplate
> Version 0.1b

This is a bootstrap project seed, which should help getting easily started with a simple Laravel/Angular webapp. They idea came from
[http://www.sitepoint.com/](http://www.sitepoint.com/flexible-and-easily-maintainable-laravel-angular-material-apps/) and
[https://laravel-angular.readme.io/](Laravel Angular Material Starter). The motivations to build my own project seed, was that I like a
different approach on some topics and that I wanted to learn more about webapps and the Laravel Framework.

The project is pretty barebones, only a simple example of and Angular frontend with a single call to a Laravel Api is provided.
Build and Production Tasks for gulp/Elixir come out of the box.

### Table of Contents
- [Installation](#installation)
- [Taskrunner](#taskrunner)
- [Laravel ](#laravel)
- [Angular ](#angular)
- [Troubleshooting](#troubleshooting)
- [Release History](#releasehistory)


## Installation
Clone the repository and install all dependencies, with the following terminal commands. Composer and Node
should already be installed on your system.

`composer install`

`npm install`

`bower install`

## Taskrunner
The standard Laravel Elixir Tasks are extended with a few tasks. Sourcemaps will be generated depending on the Elixir.config.
All files will be minified/uglifyed in `--production`.

### Standard/Watch Tasks

`gulp && gulp watch`

##### Production Modus

`gulp --production`

### Bower Tasks
The Bower Tasks uses the [main-bower-files](https://github.com/ck86/main-bower-files) package to grab all dependencies JS and
CSS files. Call the Bower Tasks independently with the following commands.

`gulp bower-js`

`gulp bower-css`

- Print the filepaths from the selected dependencies to the terminal, with the option setting `debugging: true` from main-bower-files
- To **exclude packages** from the selection see the projects `bower.json` file.
- In `--production` modus the files will be minified/uglifyed.

The following files will be created by the Bower Tasks.

    public/css/vendor.css
    public/css/vendor.map.css
    public/js/vendor.js
    public/js/vendor.map.js

### Angular Tasks
The angular-js Task grabs all JS files from `frontend/**/*.js` an concate them. Angular-tpl furthermore uses the
[gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache) package to build an independent
angular module, which injects the `frontend/**/*.html` templates into the Browser-Cache.  Call the Angular Tasks independently
with the following commands.

`gulp angular-js`

`gulp angular-css`

- Print the filepaths from the selected files to the terminal, with the option setting `showFiles: true` from gulp-size
- In `--production` modus the files will be uglifyed.

The following files will be created by the Angular Tasks.

    public/js/app.js
    public/js/app.map.js
    frontend/templates.js // this file will be added to app.js in --production

The reason for splitting the templates from the main `app.js` file while developing, is to
keep gulp snappy when **lifereload** is used.

Use this snippet in the main blade template to load the generated `template.js` while in debug mode.

    @if ( Config::get('app.debug') )
        <script src="../frontend/templates.js"></script>
    @endif

### Style Tasks
Standard Elixir Style Task.

`gulp styles`

The following file will be created by the style task.

    public/css/app.css

### PostCSS Task
To use `autoprefixer` with plain CSS, the `laravel-elixir-postcss` package is needed. As `laravel-elixir 4.2.1` only supports
`autoprefixer` for sass/less.

**Angular Tasks**

`gulp angular-js`

`gulp angular-tpl`



## [Laravel](https://laravel.com)

The frameworks is pretty vanilla, only two Controllers and three Routes were added. Also [Laravel debug bar](https://github.com/barryvdh/laravel-debugbar) will
be installed with composer install command.

### Controllers
FrontendController calls `resources/views/index.blade.php`, which then starts the Angular App. The ApiController is just a
single Example Class with a single Method which returns an array.

    app/Http/Controller/apiController.php
    app/Http/Controller/frontendController.php

### Routes
Three routes were added to `app/Http/routes.php`, the `/api` route will be used by Angular's Restangular.

    Route::get('/', 'FrontendController@serveApp');
    Route::get('/unsupported-browser', 'FrontendController@unsupported');
    Route::get('/api', 'ApiController@index');


## [Angular](https://angularjs.org/)
All Angular files are in the folder `frontend/`. Since I prefer a modular approach all modules are subfolder from `frontend/components/`.

### Configuration
Rename `constants.example.js` to `constants.js` and fill out the credentials.

### REST Api
The module api in the folder `frontend/components/api/` calls the Laravel Api at http:localhost/api


# Troubleshooting
- Up to date php Versions for osX - http://php-osx.liip.ch
- Check folders for correct permissions. `bootstrap/cache/` and `storage/`
- ERROR: failed to open stream: Permission denied' in /PATH_TO/vendor/laravel/framework/src/Illuminate/Filesystem/Filesystem.php:81. Try to `mkdir storage/framework/views`. Afterwards type `php artisan cache:clear` followed by `chmod -R 777 storage` and `composer dump-autoload`
- Can't update composer - file_put_contents(PATH_TO/bootstrap/cache/XXX): failed to open stream: No such file or directory - Try to `mkdir /bootstrap/cache/` folder, [www.laracasts.com](https://laracasts.com/discuss/channels/general-discussion/cant-composer-update-1)

## Reading List

- [Angular Material](https://material.angularjs.org/latest)
- [The simple guide to deploy Laravel 5 application on shared hosting](https://medium.com/laravel-news/the-simple-guide-to-deploy-laravel-5-application-on-shared-hosting-1a8d0aee923e#.ii5bid74z)

### Tools & Helpers
- [Laravel5 oh-my-zsh plugin](https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/laravel5/laravel5.plugin.zsh)
- [CSScomb](https://github.com/csscomb/) - an `.csscomb.json` config file is provided in the bootstrap project

# Release History
- Version 0.1 beta Release