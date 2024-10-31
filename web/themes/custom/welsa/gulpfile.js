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

function themeScss() {
  return src('./scss/theme.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('theme.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
}

function themeWysiwyg() {
  return src('./scss/wysiwyg.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(clean())
    .pipe(rename('wysiwyg.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
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

// Single Directory Component SCSS config
// function moduleScss() {
//   return src('../../../modules/custom/**/scss/module.scss', {base: '../'})
//     .pipe(inject.prepend('@import "../../../themes/custom/welsa/scss/modules";\n'))
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(prefixer())
//     .pipe(clean())
//     .pipe(rename(function (path) {
//       const modulePath = path.dirname.substring(0, path.dirname.lastIndexOf('/'));
//       const moduleName = path.dirname.split( '/' ).reverse()[1];
//       return {
//         dirname: modulePath + "/css",
//         basename: moduleName,
//         extname: ".min.css"
//       };
//     }))
//     .pipe(dest('../', { sourcemaps: '.' }))
// }

// Single Directory Component JS config
// function moduleJs() {
//   return src('../../../modules/custom/**/js/*.js', {base: '../'})
//     .pipe(sourcemaps.init())
//     .pipe(terser())
//     .pipe(concat('module.js')) // Something with this pipe conflicts with the SRC base (relative path)
//     .pipe(rename(function (path) {
//       const modulePath = path.dirname.substring(0, path.dirname.lastIndexOf('/'));
//       const moduleName = path.dirname.split( '/' ).reverse()[1];
//       return {
//         dirname: modulePath + "/js",
//         basename: moduleName,
//         extname: ".min.js"
//       };
//     }))
//     .pipe(inject.prepend('(function (Drupal, $, settings) {\n'))
//     .pipe(inject.append('\n})(Drupal, jQuery, drupalSettings);'))
//     .pipe(dest('../', { sourcemaps: '.' }))
// }

// All Watch tasks
watch('./js/**/*.js', themeJs)
watch('./scss/**/*.scss', themeScss)
watch(['./scss/wysiwyg.scss', './scss/utils/*.scss', './scss/components/*.scss'], themeWysiwyg)

// Full build functionality
exports.default = parallel(themeImg, themeWysiwyg, themeScss, themeJs)
