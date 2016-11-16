const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const plumber = require('gulp-plumber');

const SRC_ROOT = 'client';
const DIST_ROOT = 'public';

const options = {
  scripts: {
    browserify: {
      entries: [`${SRC_ROOT}/index.js`],
      transform: ['babelify'],
      extensions: ['.jsx', '.js'],
    },
    watchify: {
      entries: [`${SRC_ROOT}/index.js`],
      transform: ['babelify'],
      debug: true,
      extensions: ['.jsx', '.js'],
      cache: {},
      packageCache: {},
      plugin: [watchify],
    },
  },
};

function buildScripts(isWatch) {
  const options_ = (isWatch) ? options.scripts.watchify : options.scripts.browserify;
  const bundler = browserify(options_);

  function build() {
    return () => {
      console.log('build: scripts');
      bundler.bundle().on('error', error => {
        console.error(error.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(DIST_ROOT));
    };
  }

  bundler.on('update', build());
  return build();
}

// tasks
gulp.task('build:scripts', buildScripts(false));
gulp.task('watch:scripts', buildScripts(true));
gulp.task('watch', ['watch:scripts']);
