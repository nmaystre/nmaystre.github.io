var autoprefixer = require('gulp-autoprefixer');
var beeper = require('beeper');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var gconcat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var data = require('gulp-data');


var onError = function (err) {
  notify.onError({
    title: "Gulp error in " + err.plugin,
    message: err.toString()
  })(err);
  beeper(3);
  this.emit('end');
  gutil.log(gutil.colors.red(err));
};

gulp.task('json-parse', function() {
   gulp.src('./events.json')
    .pipe(data(function(file) {
      return JSON.parse(fs.readFileSync('./examples/' + path.basename(file.path) + '.json'));
    }))
    .pipe(swig())
    .pipe(gulp.dest('src'));
});

gulp.task('styles', function () {
  gulp.src('./src/styles/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass({indentedSyntax: true}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('templates', function () {
  const config = require('./src/events.json');
  gulp.src('src/templates/*.pug')
    .pipe(plumber({errorHandler: onError}))
    .pipe(pug({
      pretty: true,
      locals: config
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function () {
  gulp.src('src/js/*.js')
    .pipe(plumber({errorHandler: onError}))
    .pipe(gconcat('bundle.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function () {
  gulp.src('src/img/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/img/'));
});

gulp.task("icons", function () {
  gulp.src("src/img/icons/*.svg")
    .pipe(plumber({errorHandler: onError}))
    .pipe(svgmin())
    .pipe(gulp.dest("build/img/icons"))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("icons.svg"))
    .pipe(gulp.dest("build/img"));
});


gulp.task('default', function () {
  gulp.start('styles', 'templates', 'scripts', 'images', 'icons');
});

gulp.task('watch', function () {
  gulp.watch('src/styles/**/*', ['styles']);
  gulp.watch(['src/templates/**/*', './*.pug'], ['templates']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/img/**/*', ['images']);
  gulp.watch('src/img/icons/*.svg', ['icons']);

// init server
  browserSync.init({
    server: {
      proxy: "local.build",
      baseDir: "build/"
    }
  });

  gulp.watch(['build/**'], browserSync.reload);
});
