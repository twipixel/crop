var fs = require("fs");
var del = require('del');
var gulp = require('gulp');

var cached = require('gulp-cached');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var babelify = require('babelify');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

// 디렉토리 설정
var dirRoot = __dirname;
var dirSrc = '/src';
var dirCrop = '/es6Crop';
var dirHit = '/es6Hit';
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


gulp.task('clean', () => del(dirRoot + dirBuild + '**/*', {
    force: true
}));


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
    /*if (!directoryExists(dirRoot + dirBuild + dirBuildCrop)) {
        fs.mkdirSync(dirRoot + dirBuild + dirBuildCrop);
    }

    if (!directoryExists(dirRoot + dirBuild + dirBuildHit)) {
        fs.mkdirSync(dirRoot + dirBuild + dirBuildHit);
    }*/

    gulp.src(dirRoot + dirSrc + dirCrop + '/*.html')
        .pipe(cached('cropHtml'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirBuildCrop));

    return gulp.src(dirRoot + dirSrc + dirHit + '/*.html')
        .pipe(cached('hitHtml'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirBuildHit));
});


gulp.task('bundle', () => {
    /*if (!directoryExists(dirRoot + dirBuild + dirBuildCrop)) {
        fs.mkdirSync(dirRoot + dirBuild + dirBuildCrop);
    }

    if (!directoryExists(dirRoot + dirBuild + dirBuildHit)) {
        fs.mkdirSync(dirRoot + dirBuild + dirBuildHit);
    }*/

    browserify(dirRoot + dirSrc + dirCrop + "/index.js")
        .transform(babelify, {presets: ['es2015-loose']})
        .bundle()
        .pipe(fs.createWriteStream(dirRoot + dirBuild + dirBuildCrop + '/bundle.js'));

    return browserify(dirRoot + dirSrc + dirHit + "/index.js")
        .transform(babelify, {presets: ['es2015-loose']})
        .bundle()
        .pipe(fs.createWriteStream(dirRoot + dirBuild + dirBuildHit + '/bundle.js'));
});


gulp.task('build', ['clean', 'copy-img', 'copy-lib', 'copy-html'], () => {
    return gulp.start('bundle');
});






