var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');

gulp.task('minificarhtml', function(){
    return gulp.src('./source/*.html')
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest('/dist/'));
});

gulp.task('compilarsass', function(){
    return gulp.src('./source/scss/style.scss')
               .pipe(sass())
               .on("error", notify.onError({"Erro ao Compilar", message:"<%= error.message %>"}))
               .pipe(gulp.dest('./dist/css/'));
});

gulp.task('monitorar', function(){
    gulp.watch('./source/scss/**/*.scss', ['compilarsass']);
});

gulp.task('default', ['compilarsass', 'monitorar']);