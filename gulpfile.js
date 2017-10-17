let gulp = require('gulp'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-minify-css'),
  sourcemap = require('gulp-sourcemaps'),
  runSequence = require('run-sequence'),
  nodemon = require('gulp-nodemon'),
  del = require('del');

gulp.task('clear', () => {
  return del('build');
});
gulp.task('less', () => {
  return gulp.src('src/public/less/main.less')
    .pipe(less())
    .pipe(sourcemap.init())
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(sourcemap.write())
    .pipe(gulp.dest('build/public/css/'));
});
gulp.task('js:client', () => {
  return gulp.src(['src/public/javascripts/*.js', '!src/public/javascripts/libs/*.js'])
    //.pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    //.pipe(sourcemap.write())
    .pipe(gulp.dest('build/public/javascripts/'));
});
gulp.task('js:libs', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.slim.min.js'
  ])
    //.pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(concat('libs.min.js'))
    //.pipe(sourcemap.write())
    .pipe(gulp.dest('build/public/javascripts/'));
});
gulp.task('server', () => {
  return gulp.src([
    'src/bin/**/*',
    'src/routes/**/*',
    'src/views/**/*',
    'src/app.js'
  ], { base: 'src' })
    .pipe(gulp.dest('build/'));
});
gulp.task('views', () => {
  return gulp.src('src/views/**/*.pug', { base: 'src' })
    .pipe(gulp.dest('build/'));
});
gulp.task('serve', ['server'], function () {
  var options = {
    script: 'build/bin/www', // стартовый скрипт сервера
    delay: 1,
    // env: {
    //   'PORT': 3000
    // },
    watch: [
      'src/bin/**/*',
      'src/routes/**/*',
      'src/app.js'
    ] // рестарт при изменении этих файлов
  };
  return nodemon(options)
    .on('restart', function (ev) {
      console.log('Restarting...');
    });
});
gulp.task('watch', () => {
  gulp.watch('src/views/**/*.pug', ['views']);
  gulp.watch('src/public/javascripts/*.js', ['js:client']);
  gulp.watch('src/public/less/main.less', ['less']);
});
gulp.task('default', ['clear'], () => {
  runSequence('js:client', 'js:libs', 'views', 'less', 'serve');
});