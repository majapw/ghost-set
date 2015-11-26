var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');


var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/main.jsx',
  IMAGES: {
    SRC: 'src/images/**/*',
    DEST: 'dist/images'
  },
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('images', function() {
  return gulp.src(path.IMAGES.SRC)
    .pipe(gulp.dest(path.IMAGES.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.IMAGES.SRC, ['images']);

  var watcher = watchify(
    browserify({
      entries: path.ENTRY_POINT,
      extensions: ['.jsx'],
      debug: true
    })
    .transform(babelify, {
      presets: ["react", "es2015"]
    }));

  return watcher.on('update', function () {
    watcher.bundle()
           .on('error', function(err){
              process.stdout.write('' + err + '\n');
            })
           .pipe(source(path.OUT))
           .pipe(gulp.dest(path.DEST_SRC));
    console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('default', ['watch']);
