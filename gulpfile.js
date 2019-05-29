// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();

var replace = require('gulp-replace');




// File paths
const files = { 
    source: {
        scssPath: './source/sass/**/*.scss',
        jsPath: './source/js/**/*.js',
        htmlPath: './'
    },
    dest: {
        scssPath: './dest/assets/css',
        jsPath: './dest/assets/js',
        htmlPath: './dest'
    }
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return gulp.src(files.source.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(gulp.dest(files.dest.scssPath)) // put final CSS in dist folder
    .pipe(browserSync.stream());
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return gulp.src(files.source.jsPath)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(files.dest.jsPath));
}

// Cachebust
var cbString = new Date().getTime();
function cacheBustTask(){
    return gulp.src([files.source.htmlPath+"index.html"])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(gulp.dest(files.dest.htmlPath));
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    browserSync.init({
        server: {
            baseDir: './dest'
        }
    });
    gulp.watch([files.source.htmlPath + '*.html', files.source.scssPath, files.source.jsPath], gulp.parallel(cacheBustTask, scssTask, jsTask));
    gulp.watch(files.dest.htmlPath + '/*.html').on('change', browserSync.reload);
    gulp.watch(files.dest.jsPath + '/**/*.js').on('change', browserSync.reload);    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = gulp.series(
    gulp.parallel(scssTask, jsTask), 
    cacheBustTask,
    watchTask
);