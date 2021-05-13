const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const del = require("del");
const uglify = require("gulp-uglify-es").default;
const htmlmin = require("gulp-htmlmin");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const sync = require("browser-sync").create();
const concat = require('gulp-concat');
const cssnano = require('cssnano');
var ttf2woff = require('gulp-ttf2woff');
var ttf2woff2 = require('gulp-ttf2woff2');

//fonts
const fonts = () => {
  return gulp.src("source/fonts/*.{woff,ttf}")
    .pipe(ttf2woff2())
    .pipe(ttf2woff())
    .pipe(gulp.dest('build/fonts'));
}
exports.fonts = fonts;

// Styles
const styles = () => {
  return gulp.src("source/css/*.css")
    .pipe(plumber())
    .pipe(concat('all.css'))
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

//html
const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
}
exports.html = html;

//js
const scripts = () => {
  return gulp.src("source/js/script.js")
  .pipe(rename("script.min.js"))
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}
exports.scripts = scripts;

//Images
const images = () => {
  return gulp.src("source/img/**/*")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ]))
    .pipe(gulp.dest("build/img"));
}
exports.images = images;

//webp
// const createWebp = () => {
//   return gulp.src("source/img/**/*.{jpg,png}")
//     .pipe(webp({quality: 90}))
//     .pipe(gulp.dest("build/img"));
// }
// exports.createWebp = createWebp;

// //Sprite
// const sprite = () => {
//   return gulp.src("source/img/icons/icon-*.svg")
//    .pipe(svgstore({
//      inlineSvg: true
//    }))
//    .pipe(rename("sprite.svg"))
//    .pipe(gulp.dest("build/img/icons"));
// }
// exports.sprite = sprite;

//Copy
const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,ttf}",
    "source/*.ico",
    "source/img/**/*.{jpg,png,svg}"
  ], {
    base : "source"
  })
  .pipe(gulp.dest("build"));
}
exports.copy = copy;

//Clear
const clean = () => {
  return del("build");
}
exports.clean = clean;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/css/**/*.css", gulp.series("styles"));
  gulp.watch("source/js/script.js", gulp.series("scripts"));
  gulp.watch("source/*.html", gulp.series("html"));
}

// Build
const build = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    fonts,
    copy,
    images
    //createWebp
  )
);
exports.build = build;

// Default
exports.default = gulp.series(
  clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    fonts,
    copy,
    images
    //createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
