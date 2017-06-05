var fs = require("fs");
var del = require('del');
var gulp = require('gulp');

var cached = require('gulp-cached');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var babelify = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

// 디렉토리 설정
var dirRoot = __dirname;
var dirSrc = '/src';
var dirCrop = '/es6crop';
var dirHit = '/es6hit';
var dirImg = '/img';
var dirLib = '/lib';
var dirBuild = '/build';
var dirBuildCrop = '/crop';
var dirBuildHit = '/hit';



function directoryExists(path) {
    try {
        return fs.statSync(path).isDirectory();
    }
    catch (err) {
        return false;
    }
}


gulp.task('clean', () => {
    return del(dirRoot + dirBuild + '**/*', {
        force: true
    });
});


gulp.task('copy-img', () => {
    return gulp.src([dirRoot + dirSrc + dirImg + '/**/*.*'])
        .pipe(cached('img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dirRoot + dirBuild + dirImg));
});


gulp.task('copy-lib', () => {
    return gulp.src(dirRoot + dirSrc + dirLib + '/**/*.*')
        .pipe(cached('lib'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirLib));
});


gulp.task('copy-html', () => {
    gulp.src(dirRoot + dirSrc + dirCrop + '/*.html')
        .pipe(cached('cropHtml'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirBuildCrop));

    return gulp.src(dirRoot + dirSrc + dirHit + '/*.html')
        .pipe(cached('hitHtml'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirBuildHit));
});


gulp.task('bundle', () => {
    browserify(dirRoot + dirSrc + dirCrop + "/index.js")
        .transform(babelify, {presets: ['es2015-loose']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        //.pipe(fs.createWriteStream(dirRoot + dirBuild + dirBuildCrop + '/bundle.js'));
        .pipe(gulp.dest(dirRoot + dirBuild + dirBuildCrop));

    return browserify(dirRoot + dirSrc + dirHit + "/index.js")
        .transform(babelify, {presets: ['es2015-loose']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(dirRoot + dirBuild + dirBuildHit));
});


gulp.task('build', ['clean', 'copy-img', 'copy-lib', 'copy-html'], () => {
    return gulp.start('bundle');
});






