const { src, dest, parallel, watch } = require('gulp')
const sass = require('gulp-dart-sass');
const wrap = require('gulp-wrap')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const clean = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const prefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

function processScss(source, outputName) {
  return src(source)
    .pipe(sourcemaps.init())
    .pipe(sass({silenceDeprecations: ['legacy-js-api']}).on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename(outputName))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
}

function themeScss() {
  return processScss('./scss/theme.scss', 'theme.min.css');
}

function themeWysiwyg() {
  return processScss('./scss/wysiwyg.scss', 'wysiwyg.min.css');
}

function themeJs() {
  return src('./js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('theme.js'))
    .pipe(wrap('(function (Drupal, $, settings) {\n<%= contents %>\n})(Drupal, jQuery, drupalSettings);'))
    .pipe(terser())
    .pipe(rename('theme.min.js'))
    .pipe(sourcemaps.write('.', {
      includeContent: true,
      sourceRoot: '/js'
    }))
    .pipe(dest('./dist/js'))
}

function themeImg() {
  return src('./images/**/*.{gif,jpg,jpeg,png,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {keepAriaAttrs: true},
          {keepRoleAttr: true},
          {keepDataAttrs: true},
          {removeViewBox: true},
          {removeTitle: false},
          {cleanupIDs: true}
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(dest('./images'))
}

// All Watch tasks
watch('./js/**/*.js', themeJs)
watch('./scss/**/*.scss', themeScss)
watch(['./scss/wysiwyg.scss', './scss/utils/*.scss', './scss/components/*.scss'], themeWysiwyg)

// Full build functionality
exports.default = parallel(themeImg, themeWysiwyg, themeScss, themeJs)
