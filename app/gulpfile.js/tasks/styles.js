// ==== STYLES ==== //
"use strict";

const config = require('../gulpconfig.js');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({ camelize: true });
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer');
const cssnext = require('postcss-cssnext');
const shortcss = require('postcss-short');
const replace = require('gulp-replace');

// Build stylesheets from source Sass files, autoprefix, and write source maps (for debugging) with libsass
function styleslibsass() {
  return gulp
    .src(config.styles.build.src)
    .pipe(replace('themeName', config.styles.vars.themeName))
    .pipe(replace('themeUri', config.styles.vars.themeUri))
    .pipe(replace('themeAuthor', config.styles.vars.themeAuthor))
    .pipe(replace('themeDescription', config.styles.vars.themeDescription))
    .pipe(replace('themeVersion', config.styles.vars.themeVersion))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(config.styles.libsass))
    .pipe(postcss([
      autoprefixer(config.styles.processors.autoprefixer),
      cssnext(config.styles.processors.cssnext),
      shortcss(config.styles.processors.shortcss),
    ]))
    // .pipe(plugins.cssnano(config.styles.minify))
    .pipe(plugins.sourcemaps.write('./')) // Writes an external sourcemap
    .pipe(gulp.dest(config.styles.build.dest)); // Drops the unminified CSS file into the `build` folder
}

// Easily configure the Sass compiler from `/gulpconfig.js`
function styles(){ return styleslibsass() };

// export tasks
exports.styles = styles;
