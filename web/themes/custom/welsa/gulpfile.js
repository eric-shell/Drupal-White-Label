const { src, dest, parallel, watch, series } = require('gulp')
const sass = require('gulp-dart-sass');
const wrap = require('gulp-wrap')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const clean = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const prefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const cache = require('gulp-cache')

// Error handling
const errorHandler = function(errorTitle) {
  return {
    errorHandler: notify.onError({
      title: errorTitle || 'Gulp Error',
      message: 'Error: <%= error.message %>',
      sound: 'Beep'
    })
  };
};

function processScss(source, outputName) {
  return src(source)
    .pipe(plumber(errorHandler('SCSS Error')))
    .pipe(sourcemaps.init())
    .pipe(sass({silenceDeprecations: ['legacy-js-api']}).on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename(outputName))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'));
}

function themeScss() {
  return processScss('./scss/theme.scss', 'theme.min.css');
}

function themeWysiwyg() {
  return processScss('./scss/wysiwyg.scss', 'wysiwyg.min.css');
}

function themeJs() {
  return src('./js/**/*.js')
    .pipe(plumber(errorHandler('JS Error')))
    .pipe(sourcemaps.init())
    .pipe(concat('theme.js'))
    .pipe(wrap('(function (Drupal, $, settings) {\n<%= contents %>\n})(Drupal, jQuery, drupalSettings);'))
    .pipe(terser())
    .pipe(rename('theme.min.js'))
    .pipe(sourcemaps.write('.', {
      includeContent: true,
      sourceRoot: '/js'
    }))
    .pipe(dest('./dist/js'));
}

function themeImg() {
  return src('./images/**/*.{gif,jpg,jpeg,png,svg}')
    .pipe(plumber(errorHandler('Image Error')))
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {name: 'removeViewBox', active: false},
          {name: 'cleanupIDs', active: true},
          {name: 'removeTitle', active: false},
          {name: 'removeUselessDefs', active: true},
          {name: 'mergePaths', active: true}
        ]
      })
    ], {
      verbose: true
    })))
    .pipe(dest('./dist/images'));
}

// Clean cache
function clearCache(done) {
  return cache.clearAll(done);
}

// Watch tasks
function watchFiles() {
  watch('./js/**/*.js', themeJs);
  watch('./scss/**/*.scss', themeScss);
  watch(['./scss/wysiwyg.scss', './scss/utils/*.scss', './scss/components/*.scss'], themeWysiwyg);
  watch('./images/**/*.{gif,jpg,jpeg,png,svg}', themeImg);
}

// Define complex tasks
const build = parallel(themeImg, themeWysiwyg, themeScss, themeJs);

// Export tasks
exports.scss = themeScss;
exports.js = themeJs;
exports.images = themeImg;
exports.clearCache = clearCache;
exports.build = build;
exports.watch = watchFiles;
exports.default = build;
