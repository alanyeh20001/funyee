
var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpSass = require('gulp-sass'),
    gulpImagemin = require('gulp-imagemin'),
    gulpUglifycss = require('gulp-uglifycss'),
    gulpNgmin = require('gulp-ngmin'),
    gulpConnect = require('gulp-connect');


gulp.task('default', ['script', 'sass', 'style', 'templates']);
gulp.task('sass', ['sass']);
gulp.task('squeeze', ['script', 'templates', 'style']);
gulp.task('build', ['build:bower', 'build:script', 'build:style', 'build:templates']);


path= {
    scripts: ['./src/javascript/**/*.js'],
    styles: ['./src/style/css/**/*.css'],
    sass: ['./src/style/scss/**/*.scss'],
    templates: ['./src/templates/**/*.html'],
    images: ['./src/images/**/*.png']
};

distPath = {
    script: "./dist/javascript/*.js",
    style: "./dist/**/*.css",
    templates: "./dist/**/*.html",
    images: "./dist/**/*.png"
}

bowerPaths = [
    "./bower_components/angular/angular.min.js",
    "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
    "./bower_components/components-font-awesome/css/font-awesome.min.css",
    "./bower_components/components-font-awesome/fonts/*",
    "./bower_components/angular-translate/angular-translate.min.js",
    "./bower_components/angular-resource/angular-resource.min.js",
    "./bower_components/AngularDevise/lib/devise-min.js"
];

gulp.task('build:bower', function() {
    gulp.src(bowerPaths, { base: './' })
        .pipe(gulp.dest("../public"));
})

gulp.task('build:script', function() {
    gulp.src(distPath.script, { base: './' })
        .pipe(gulp.dest("../public"));
})

gulp.task('build:style', function() {
    gulp.src(distPath.style, { base: './' })
        .pipe(gulp.dest("../public"));
})

gulp.task('build:templates', function() {
    gulp.src("index.html")
        .pipe(gulp.dest("../public"));
    gulp.src(distPath.templates, { base: './' })
        .pipe(gulp.dest("../public"));
})

gulp.task('build:images', function() {    
    gulp.src(distPath.images, { base: './' })
        .pipe(gulp.dest("../public"));
})

gulp.task('webserver', function() {
    gulpConnect.server();
})

gulp.task('watch', function() {
    gulp.watch(path.scripts, ['script']);
    gulp.watch(distPath.script, ['build:script']);
    gulp.watch(path.sass, ['sass']);
    gulp.watch(path.styles, ['style']);
    gulp.watch(distPath.style, ['build:style']);
    gulp.watch(path.templates, ['templates']);
    gulp.watch(distPath.templates, ['build:templates']);
    gulp.watch(path.images, ['build:images']);
});

gulp.task('image', function() {
    gulp.src(path.images)
        .pipe(gulpImagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('style', function() {
    gulp.src(path.styles)
        .pipe(gulpConcat('main.min.css'))
        .pipe(gulpUglifycss())
        .pipe(gulp.dest('dist/style'));
});

gulp.task('templates', function() {
    gulp.src(path.templates)
        .pipe(gulp.dest('./dist/templates'), { base: './' });
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
