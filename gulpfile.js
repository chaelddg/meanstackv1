const gulp          = require('gulp');
const less          = require('gulp-less');
const minifyCSS     = require('gulp-minify-css');
const autoprefixer  = require('gulp-autoprefixer');
const rename        = require('gulp-rename');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const ngAnnotate    = require('gulp-ng-annotate');
const jshint        = require('gulp-jshint');
const nodemon       = require('gulp-nodemon');
const babel         = require('gulp-babel');
const browserSync   = require('browser-sync').create();

gulp.task('css', function() {
  return gulp.src([
    'node_modules/materialize-css/dist/css/materialize.min.css',
    'public/src/styles/*.less'
  ])
  .pipe(less())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(gulp.dest('public/assets/css'))
  .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/materialize-css/dist/js/materialize.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/jquery/dist/jquery.min.js'
  ])
  .pipe(gulp.dest("public/assets/vendors"))
  .pipe(browserSync.stream());
});

gulp.task('angular', function() {
  return gulp.src([
      'public/app/*.js', 
      'public/app/**/*.js'
    ])
    .pipe(babel())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function(){
  return gulp.src('node_modules/materialize-css/dist/fonts/roboto/*')
    .pipe(gulp.dest("public/assets/fonts/roboto"));
});

gulp.task('browser-sync', ['fonts', 'angular', 'js', 'css', 'nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    open: false,
    port: 5000,
  });

  gulp.watch("public/app/views/*.html").on('change', browserSync.reload);
});

gulp.task('js-watch', ['angular'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('css-watch', ['css'], function (done) {
  browserSync.reload();
  done();
});


gulp.task('nodemon', function (cb) {
  
  let started = false;
  
  return nodemon({
    script: 'server.js'
  })
  .on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true; 
    } 
  })
  .on('restart', function () {
    setTimeout(function () {
      browserSync.reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('public/src/styles/*.less', ['css-watch']);
  gulp.watch(['public/app/*.js', 'public/app/**/*.js'], ['js-watch']);
});