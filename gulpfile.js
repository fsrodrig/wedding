const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

gulp.task('clean', function () {
    return del(['./public/**/*'], {
        force: true
    });
});

gulp.task('css', function () {
    return gulp.src('assets/css/*.css')
        .pipe(cleanCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('js', function () {
    return gulp.src('assets/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('html', () => {
    return gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('img', () => {
    return gulp.src('assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/img/'));
});

gulp.task('build', gulp.series('clean', 'html', 'css', 'js', 'img'));