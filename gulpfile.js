var gulp = require('gulp');
var uglify =  require('gulp-uglify');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

var config = {
  source: './src/',
  dist: "./public/"
}

var paths = {
  assets: "assets/",
  html: "**/*.html",

  js: "js/**/*.js",
  mainJs: "js/app.js",

  sass: "scss/**/*.scss",
  mainSass: "scss/main.scss",
}

var sources = {
  assets: config.source + paths.assets,

  html: config.source + paths.html,

  sass: paths.asstes + paths.sass,
  rootSass: config.source + paths.assets + paths.mainSass,

  js: config.source + paths.js,
  rootJs: config.source + paths.assets + paths.mainJs
};

gulp.task('html', function(){
  gulp.src(sources.html)
  .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function(){
  console.log(sources.rootSass);
  console.log(config.dist + "css");
  gulp.src(sources.rootSass)
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on("error", sass.logError))
  .pipe(gulp.dest(config.dist + paths.assets + "css"));
});

gulp.task('js', function(){
  gulp.src(sources.rootJs)
  .pipe(browserify())
  .pipe(gulp.dest(config.dist + paths.assets + "/js"));
});
