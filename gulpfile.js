let gulp = require('gulp'),
  less = require('gulp-less'),
  sass = require('gulp-sass'),
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
// Убираем пока, так как используем scss
// gulp.task('less', () => {
//   return gulp.src('src/public/less/main.less')
//     .pipe(less())
//     .pipe(rename('main.min.css'))
//     .pipe(gulp.dest('build/public/css/'));
// });
gulp.task('sass', function () {
  return gulp.src([
    'src/public/sass/_grid.scss',
    'src/public/sass/main.scss'
  ])
    .pipe(concat('main.min.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('build/public/css/'));
});
gulp.task('js:client', () => {
  return gulp.src([
    'src/public/javascripts/*.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('build/public/javascripts/'));
});
gulp.task('client:static', () => {
  return gulp.src([
    'src/public/images/**/*',
    'src/public/fonts/**/*'
  ], { base: 'src' })
    .pipe(gulp.dest('build/'));
});
gulp.task('js:libs', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.slim.min.js'
  ])
    .pipe(concat('libs.min.js'))
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
  gulp.watch('src/views/**/*', ['views']);
  gulp.watch('src/public/javascripts/*.js', ['js:client']);
  gulp.watch('src/public/less/main.less', ['less']);
  gulp.watch('src/public/sass/**/*.scss', ['sass']);
  gulp.watch([
    'src/public/images/**/*',
    'src/public/fonts/**/*'
  ], ['client:static']);
});
gulp.task('default', ['clear'], () => {
  runSequence('js:client', 'js:libs', 'client:static', 'views', 'sass', 'serve', 'watch');
});
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});
