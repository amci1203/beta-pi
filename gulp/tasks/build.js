const
    gulp        = require('gulp'),
    del         = require('del'),
    usemin      = require('gulp-usemin'),
    rev         = require('gulp-rev'),
    cssNano     = require('gulp-cssnano'),
    uglify      = require('gulp-uglify'),
    minimizeIMG = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('build', [
    'cleanDist',
    'optimizeIMGs',
    'useminTrigger',
    'copyGeneralFiles'
]);

gulp.task('cleanDist', ['icons'], function () {
    return del(['./docs']);
})

gulp.task('copyGeneralFiles', ['cleanDist'], function () {
    return gulp.src([
        './seabreeze/**/*',
        '!./seabreeze/index.html',
        '!./seabreeze/assets/{js,css,images}/**',
        '!./seabreeze/temp',
        '!./seabreeze/temp/**',
        ])
        .pipe(gulp.dest('./docs'))
})

gulp.task('optimizeIMGs', ['cleanDist'], function () {
    return gulp.src(['./seabreeze/assets/images/**/*', '!./seabreeze/assets/images/**/*-i.*'])
    .pipe(minimizeIMG({
        pregressive: true,
        interlaced: true,
        multipass: true,
    }))
    .pipe(gulp.dest('./docs/assets/images'))
})

gulp.task('useminTrigger', ['cleanDist'], function () {
    gulp.start('optimizeStaticFiles');
})

gulp.task('optimizeStaticFiles', ['css', 'scripts'], function () {
    return gulp.src(['./seabreeze/index.html'])
        .pipe(usemin({
            css: [
                function () {
                    return rev();
                },
                 function () {
                    return cssNano();
                }
             ],
            js: [
                function () {
                    return rev()
                },
                function () {
                    return uglify();
                }
            ]
        }))
        .pipe(gulp.dest('./docs'))
})

gulp.task('distView', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'docs'
        }
    });
})

gulp.task('rootView', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    });
})
