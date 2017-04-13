var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('minificarhtml', function(){
    return gulp.src('./source/*.html')
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest('./dist/'));
});

gulp.task('apaga',function(){
    del('./dist/css/*.min.css');
});

gulp.task('compilarsass', function(){
    return gulp.src('./source/scss/style.scss')
               .pipe(sass())
               .on("error", notify.onError({title:"Erro ao Compilar", message:"<%= error.message %>"}))
               .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minificarcss',['apaga','compilarsass'],function(){
    return gulp.src('./dist/css/*css')
           .pipe(cssmin())
           .pipe(rename({suffix:'.min'}))
           .pipe(gulp.dest('./dist/css/'));
});

gulp.task('monitorar', function(){
    gulp.watch('./source/scss/**/*.scss', ['minificarcss']);
    gulp.watch('./source/*html', ['minificarhtml']);
});

gulp.task('default', ['minificarhtml', 'minificarcss', 'monitorar']);