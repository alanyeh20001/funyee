
var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpSass = require('gulp-sass'),
    gulpUglifycss = require('gulp-uglifycss'),
    gulpNgmin = require('gulp-ngmin'),
    gulpConnect = require('gulp-connect');


gulp.task('default', ['script', 'sass', 'style', 'templates']);

path= {
    scripts: ['src/javascript/**/*.js'],
    styles: ['src/style/css/*.css'],
    sass: ['src/style/scss/**/*.scss'],
    templates: ['src/templates/**/*.html']
};

gulp.task('webserver', function() {
    gulpConnect.server();
})

gulp.task('watch', function () {
    gulp.watch(path.scripts, ['script']);
    gulp.watch(path.sass, ['sass', 'style']);
    gulp.watch(path.templates, ['templates']);
});

gulp.task('style', function() {
    gulp.src(path.styles)
        .pipe(gulpConcat('main.min.css'))
        .pipe(gulpUglifycss())
        .pipe(gulp.dest('dist/style'));
});

gulp.task('templates', function() {
    gulp.src(path.templates)
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('script', function () {
    gulp.src(path.scripts)// 指定要處理的原始 JavaScript 檔案目錄
        .pipe(gulpConcat('main.min.js'))
        .pipe(gulpUglify()) // 將 JavaScript 做最小化
        .pipe(gulp.dest('dist/javascript'));  // 指定最小化後的 JavaScript 檔案目錄
});


gulp.task('sass', function () {
    gulp.src(path.sass)    // 指定要處理的 Scss 檔案目錄
        .pipe(gulpSass({          // 編譯 Scss
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('src/style/css'));  // 指定編譯後的 css 檔案目錄
});
