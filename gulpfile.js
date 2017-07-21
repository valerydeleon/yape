var gulp = require('gulp');
var uglify =  require('gulp-uglify');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');

var config = {
  source: './src/',
  dist: "./public/",
  view: "./views/"
}

var paths = {
  assets: "assets/",
  views: "views/",

  html: "**/*.html",

  js: "js/**/*.js",
  mainJs: "js/app.js",

  sass: "scss/**/*.scss",
  mainSass: "scss/main.scss",
}

var sources = {
  assets: config.source + paths.assets,

  html: config.source + paths.html,

  views: paths.views + paths.html,
  rootViews: config.source + paths.views + paths.html,

  sass: paths.asstes + paths.sass,
  rootSass: config.source + paths.assets + paths.mainSass,

  js: config.source + paths.js,
  rootJs: config.source + paths.assets + paths.mainJs,
  otherJs: config.source + paths.assets + paths.js,
};

gulp.task('html', function(){
  gulp.src(sources.html)
  .pipe(gulp.dest(config.dist));

  gulp.src(sources.views)
  .pipe(gulp.dest(config.view));
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
  .pipe(uglify())
  .pipe(browserify())
  .pipe(gulp.dest(config.dist + paths.assets + "/js"));

  gulp.src(sources.otherJs)
  .pipe(uglify())
  .pipe(browserify())
  .pipe(gulp.dest(config.dist + paths.assets + "/js"));
});
