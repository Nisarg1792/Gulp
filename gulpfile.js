var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var prefix = require('gulp-prefix');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

var uglify = require('gulp-uglify');  //minifies the JS
var rename = require('gulp-rename');


/*==========  Minify and concat different styles files  ==========*/

gulp.task('test', function() {
  console.log('Hello Zell');
});
// run this task, use "gulp test" (gulp and taskname)


gulp.task('sass', function () {
  return gulp.src('app/scss/style.scss') // Get source files with gulp.src
    .pipe(sass()) // // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css')) // Outputs the file in the destination folder
})
//one scss into css using gulp-sass plugin


gulp.task('style', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css')); //seperate css for each
});
//more than one scss into css using gulp-sass plugin


gulp.task('styles', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))  
    .pipe(concat('Concat.css'))
   // .pipe(minifyCSS())                 //use variable name here
    .pipe(gulp.dest('app/css'))
});



/*==========  Minify and concat different javscripts files  ==========*/

// single JS Minifies
gulp.task('js', function(){
    return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/minifyJS'));
});

//defining tasks for error 
gulp.task('error', function() {  //default is a task name, we can give any name.
	gulp.src('app/js/**/*.js')
	 .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('dist/scripts'));
});

//minifed and concat
gulp.task('default', function() {  //default is a task name, we can give any name.
	gulp.src('app/js/**/*.js')
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'));
});


/*==========  watch  ==========*/

// file watchers
gulp.task('watch', ['sass', 'style'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Other watchers
})

