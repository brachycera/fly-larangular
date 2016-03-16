# fly-seed for Laravel & Angular project
> Version 1.0

This is a dummy bootstrap project seed, which should help getting easily started with a Laravel/Angular webapp. They idea came from
[http://www.sitepoint.com/](http://www.sitepoint.com/flexible-and-easily-maintainable-laravel-angular-material-apps/) and
[https://laravel-angular.readme.io/](Laravel Angular Material Starter). The motivations to build my own project seed, was that I like a
different approach on some topics and that I wanted to learn more about webapp's.

#### Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Project Folder Structure](#project-folder-structure)
- [Development Tools](#development-tools)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)


# Installation
Install all the frameworks and tools needed to get the web-app running


## [Laravel](https://laravel.com)

First install [composer](https://getcomposer.org/).

Run the following composer command to create a folder e.g. "fly-seed" and scaffold the latest version of
Laravel Framework inside this folder. The project folder should be accessible through a webserver.

`composer create-project laravel/laravel fly-seed --prefer-dist`

After completing the installation edit the `.env` to adjust the database settings. Visited the created folder with a Browser, Laravel should now be up and running.

### Laravel Packages
Install the following packages and add them to Class Alias array in `config/app.php`.

- [Laravel debug bar](https://github.com/barryvdh/laravel-debugbar) - `composer require barryvdh/laravel-debugbar`

### Create Laravel Route to Frontend Framework
Create a controller to interact with the frontend framework.

`php artisan make:controller FrontendController`

## Node Packages
Run `npm install` and install all packages from the provided `package.json`.

### gulp Packages
Important gulp packages, besides the one which get installed from the `package.json`

#### [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins)
Loads gulp plugins from package dependencies and attaches them to an object of your choice. This saves adding every gulp package with `require`. We use
just `$` to include any dependency of choice.
e.g.
`$.util.log( report );`

#### [main-bower-files](https://github.com/ck86/main-bower-files)
This package reads the projects own `bower.json` for `dependencies` - returns an array of files which were defined by the
**main property** from the **packages** `bower.json`.

Using the main-bower-files array to automatically collect the bower dependencies. Installing dependencies packages
with bower will automatically add them to the build process.

To *restrict packages from build* process use `bower.json`

    {
        "name": "your-package-name",
        "dependencies": {
            "BOWER-PACKAGE": "*"
        },
        "overrides": {
            "BOWER-PACKAGE": {
                "main": {
                    "development": "file.js",
                    "production": "file.min.js"
                }
            }
        }
    }

### gulp Tasks
All gulp tasks can be found in `/task` To start a build for production use the flag `--production` with gulp commands.

## Build Tasks
`gulp bower-js` and `gulp bower-css` tasks build the two files `/public/js/vendor.js` and `/public/css/vendor.css`


## Bower
For easier management of frontend dependencies install Bower.


    npm install -g bower
    bower init

### Angular and Angular Packages
Install current Angular Version 1.x and Angular Packages with Bower.

    bower install angular#1 --save
    bower install angular-material --save
    bower install ui-router --save
    bower install restangular --save

* https://material.angularjs.org/latest
* https://github.com/mgonto/restangular
* https://github.com/angular-ui/ui-router




# Project Structure
This shows the example "project_name" folder and files structures without the generated files and folder from the frameworks and package managers.
Create them on your own if not already present in the repository.

    -- project_name
        -- framework
            +- config
            +- components
        -- config
            app.php // edit host parameter to fit your environment
        -- public
            .htacess // edit RewriteBase to fit your environment


# Deploy
https://medium.com/laravel-news/the-simple-guide-to-deploy-laravel-5-application-on-shared-hosting-1a8d0aee923e#.ii5bid74z

# Development Tools & Rules
These tools and plugins should be use to keep a consistent code-base.

## Laravel
Use [Laravel5 plugin](https://github.com/robbyrussell/oh-my-zsh/blob/master/plugins/laravel5/laravel5.plugin.zsh) for `oh-my-zsh` to get Terminal Aliases for `artisan`.

## CSS
Use [CSScomb](https://github.com/csscomb/) and/or [Perfectionist](https://github.com/ben-eb/perfectionist) for clean markup,
sort all CSS-Rules with CSScomb or [PostCSS sorting](https://github.com/hudochenkov/postcss-sorting) in Sublime Text.
PostCSS plugins will also be run at grunt build task!

* https://github.com/nDmitry/grunt-postcss
* https://github.com/hudochenkov/postcss-sorting // sort order type ZEN
* https://github.com/ben-eb/perfectionist

##### A `.csscomb.json` config file is provided in the bootstrap project
##### Sorting [order type](https://github.com/csscomb/csscomb.js/blob/master/config/zen.json) must be `zen`


# Troubleshooting
- Up to date php Versions for osX - http://php-osx.liip.ch
- Check folders for correct permissions. `bootstrap/cache/` and `storage/`
