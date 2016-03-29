var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify       = require('gulp-notify');
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

gulp.task('serve', ['sass', 'build'], function() {
  browserSync({
    server: { baseDir: 'dist' }
  });
});

gulp.task('build', function (done) {
  return cp.spawn( jekyll , ['build', '--incremental'], {stdio: 'inherit'}).on('close', done);
});

gulp.task('force-build', function (done) {
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'}).on('close', done);
});

gulp.task('rebuild', ['build'], browserSync.reload);
gulp.task('force-rebuild', ['force-build'], browserSync.reload);

gulp.task('watch', function () {
  gulp.watch('src/_sass/**/*.scss', ['sass']);

  gulp.watch(['src/_data/*'], ['force-rebuild']);
  gulp.watch(['src/**/*.html', 'src/js/*.js'], ['rebuild']);
});

gulp.task('default', ['serve', 'watch']);
