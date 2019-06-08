const { src, dest, watch, series, parallel, lastRun } = require('gulp'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify-es').default,
  minifyCss = require('gulp-clean-css'),
  gulpif = require('gulp-if'),
  imagemin = require('gulp-imagemin'),
  coffee = require('gulp-coffee'),
  del = require('del'),
  gulpSass = require('gulp-sass'),
  csscomb = require('gulp-csscomb'),
  refresh = require('gulp-refresh'),
  plumber = require('gulp-plumber'),
  cache = require('gulp-cache');

function js() {
  return src('./app/js/**/*.coffee', { sourcemaps: true })
    .pipe(plumber())
    .pipe(
      coffee({
        bare: true
      })
    )
    .pipe(dest('./app/js'))
    .pipe(refresh());
}

function sass() {
  return src('./app/scss/**/*.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(gulpSass())
    .pipe(dest('./app/css'))
    .pipe(refresh());
}

function stylish() {
  return src('app/css/style.css')
    .pipe(csscomb())
    .pipe(dest('./app/css'))
    .pipe(refresh());
}

/* Wartcher */
function watcher() {
  refresh.listen();
  watch('./app/scss/**/*.scss', { ignoreinitial: false }, sass);
  watch('./app/js/**/*.coffee', { ignoreinitial: false }, js);
  watch('./app/**/*.+(html|php)', { ignoreinitial: false }, parallel(js, sass));
}

/* Deploy */
function clean() {
  return del('./dist');
}

function imageMin() {
  return src('./app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(dest('dist/img'));
}

function fonts() {
  return src('app/fonts/**/*').pipe(dest('dist/fonts'));
}

function setDist() {
  return src('./app/**/*.+(html|php)')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(dest('dist'));
}

/* Exports */
module.exports = {
  default: series(js, parallel(sass), stylish),
  watch: watcher,
  deploy: series(clean, js, parallel(sass, imageMin, fonts), stylish, setDist)
};
