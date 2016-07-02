var gulp         = require('gulp');
var sequence     = require('gulp-sequence');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify       = require('gulp-notify');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var htmlmin      = require('gulp-htmlmin');
var iconfont     = require('gulp-iconfont');
var iconfontCss  = require('gulp-iconfont-css');
var cssnano      = require('gulp-cssnano');
var uglify       = require('gulp-uglify');
var filter       = require('gulp-filter');
var zip          = require('gulp-zip');
var w3cjs        = require('gulp-w3cjs');
var through2     = require('through2');
var del          = require('del');
var cp           = require('child_process');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var handleErrors = function (errorObject, callback) {
  notify.onError(errorObject.toString()).apply(this, arguments);
  if (typeof this.emit === 'function') this.emit('end');
};

// Cleaner
gulp.task('clean:dist', function () {
  return del('dist');
});

gulp.task('clean:min', function () {
  return del('dist-min');
});

gulp.task('clean', ['clean:dist', 'clean:min']);

// Compile SCSS
gulp.task('sass', function () {
  return gulp.src('src/_sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', handleErrors)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('css', function () {
  return gulp.src(['src/css/**/*.css', '!src/css/main.css'])
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

// Minifiy images
gulp.task('images', function () {
  var configs = {
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngquant()]
  };

  return gulp.src('src/img/**/*')
    .pipe(imagemin(configs))
    .pipe(gulp.dest('src/img'));
});

// Iconfont from SVGs
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
    path: 'src/_sass/vendor/_icons-template.scss',
    targetPath: '../_sass/components/_icons.scss',
  };

  return gulp.src('src/_svg/**/*.svg')
    .pipe(iconfontCss(cssSetings))
    .pipe(iconfont(fontSettings))
    .pipe(gulp.dest('src/fonts'));
});

// Make a dist.zip
gulp.task('zip:dist', ['build'], function () {
  return gulp.src('dist/**/*')
    .pipe(zip('archive-dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('zip:min', ['build:min'], function () {
  return gulp.src('dist/**/*')
    .pipe(zip('archive-min.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('zip', function () {
  var zipPaths = [
    '**/*',
    '!archive{,*}.zip',
    '!node_modules{,/**}',
  ];

  return gulp.src(zipPaths)
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./'));
});

// Validate HTML via W3C
gulp.task('w3c', function () {
  var reporter = through2.obj(function (file, enc, cb) {
    cb(null, file);
  });

  return gulp.src('dist/*.html')
    .pipe(w3cjs())
    .pipe(reporter);
});

// Build tasks
gulp.task('build', sequence('force-jekyll-build', 'sass', 'css'));

gulp.task('build:min', ['clean:min', 'build'], function () {
  var htmlFilter = filter(['**/*.html'], { restore: true });
  var cssFilter  = filter(['**/*.css'], { restore: true });
  var jsFilter   = filter(['**/*.js', '!**/*.min.js'], { restore: true });

  return gulp.src(['dist/**', '!**/*.map'])
    .pipe(htmlFilter)
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(htmlFilter.restore)

    .pipe(cssFilter)
    .pipe(cssnano())
    .pipe(cssFilter.restore)

    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)

    .pipe(gulp.dest('dist-min'));
});

// Build jekyll
gulp.task('jekyll-build', function (done) {
  return cp.spawn(jekyll , ['build', '--incremental'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('force-jekyll-build', function (done) {
  return cp.spawn(jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

// Rebuild (for watch only)
gulp.task('rebuild-jekyll', ['jekyll-build'], function () {
  return browserSync.reload();
});

gulp.task('force-rebuild-jekyll', ['force-jekyll-build'], function () {
  return browserSync.reload();
});

// Server via browserSync
gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: './dist',
    directory: true
  });
});

gulp.task('serve:min', ['build:min'], function () {
  browserSync.init({
    server: './dist-min'
  });
});

// Watch change files
gulp.task('watch', function () {
  var watchRebuild = [
    'src/img/**/*',
    'src/js/**/*.js',
    'src/**/*.html',
  ];

  var watchForceRebuild = [
    '_config.yml',
    'src/_data/**/*',
  ];

  gulp.watch(['src/_sass/**/*.scss'], ['sass']);
  gulp.watch(['src/css/**/*.css', '!src/css/main.css'], ['css']);

  gulp.watch(watchRebuild, ['rebuild-jekyll']);
  gulp.watch(watchForceRebuild, ['force-rebuild-jekyll']);
});

gulp.task('default', ['serve', 'watch']);
