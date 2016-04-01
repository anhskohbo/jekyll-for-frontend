var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify       = require('gulp-notify');
var htmlmin      = require('gulp-htmlmin');
var iconfont     = require('gulp-iconfont');
var iconfontCss  = require('gulp-iconfont-css');
var csso         = require('gulp-csso');
var uglify       = require('gulp-uglify');
var filter       = require('gulp-filter');
var zip          = require('gulp-zip');
var del          = require('del');
var cp           = require('child_process');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var handleErrors = function(errorObject, callback) {
  notify.onError(errorObject.toString()).apply(this, arguments);
  if (typeof this.emit === 'function') this.emit('end');
};

gulp.task('sass', function () {
  return gulp.src('src/_sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', handleErrors)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true, match: '**/*.css' }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('iconfont', function () {
  var fontName = require('path').basename(__dirname);
  var runTimestamp = Math.round(Date.now() / 1000);

  var fontSettings = {
    fontName: fontName,
    prependUnicode: true,
    timestamp: runTimestamp,
    normalize: true,
    fontHeight: 1001,
    formats: ['svg', 'ttf', 'eot', 'woff'],
  };

  var cssSetings = {
    fontName: fontName,
    cssClass: 'atf',
    fontPath: '../fonts/',
    path: 'src/_sass/compoments/_icons-template.scss',
    targetPath: '../_sass/compoments/_icons.scss',
  };

  return gulp.src('src/_svg/**/*.svg')
    .pipe(iconfontCss(cssSetings))
    .pipe(iconfont(fontSettings))
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('zip:dist', ['force-build', 'sass'], function () {
  return gulp.src('dist/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('clean:dist', function () {
  return del('./dist');
});

gulp.task('clean:min', function () {
  return del('./min');
});

gulp.task('build', function (done) {
  return cp.spawn( jekyll , ['build', '--incremental']).on('close', done);
});

gulp.task('force-build', function (done) {
  return cp.spawn( jekyll , ['build']).on('close', done);
});

gulp.task('build:min', ['clean:min', 'force-build', 'sass'], function () {
  var htmlFilter = filter(['**/*.html'], { restore: true });
  var cssFilter  = filter(['**/*.css'], { restore: true });
  var jsFilter   = filter(['**/*.js', '!**/*.min.js'], { restore: true });

  return gulp.src(['dist/**', '!**/*.map'])
    .pipe(htmlFilter)
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(htmlFilter.restore)

    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)

    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)

    .pipe(gulp.dest('min'));
});

gulp.task('serve', ['build', 'iconfont', 'sass'], function() {
  browserSync({
    server: { baseDir: 'dist' }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/_sass/**/*.scss', ['sass']);
  gulp.watch('src/_svg/**/*.svg', ['iconfont', 'build', browserSync.reload]);

  gulp.watch(['src/_data/*'], ['force-build', browserSync.reload]);
  gulp.watch(['src/**/*.html', 'src/js/*.js'], ['build', browserSync.reload]);
});

gulp.task('clean', ['clean:dist', 'clean:min']);
gulp.task('default', ['serve', 'watch']);
