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
var dirDemo = '/demo';
var dirEs6 = '/es6';
var dirImg = '/img';
var dirLibs = '/libs';
var dirBuild = '/build';



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


gulp.task('img', () => {
    return gulp.src([dirRoot + dirSrc + dirImg + '/**/*.*'])
        .pipe(cached('img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dirRoot + dirBuild + dirSrc + dirImg));
});


gulp.task('html', () => {
    gulp.src(dirRoot + dirSrc + '/*.html')
        .pipe(cached('html'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirSrc));

    return gulp.src(dirRoot + dirDemo + '/*.html')
        .pipe(cached('demo-html'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirDemo));
});


gulp.task('libs', () => {
    return gulp.src(dirRoot + dirSrc + dirLibs + '/**/*.js')
        .pipe(cached('libs'))
        .pipe(gulp.dest(dirRoot + dirBuild + dirSrc + dirLibs));
});


gulp.task('bundle', () => {
    if (!directoryExists(dirRoot + dirBuild + dirDemo)) {
        fs.mkdirSync(dirRoot + dirBuild + dirDemo);
    }

    return browserify(dirRoot + dirDemo + dirEs6 + "/index.js")
        .transform(babelify, {presets: ['es2015-loose']})
        .bundle()
        .pipe(fs.createWriteStream(dirRoot + dirBuild + dirDemo + '/bundle.js'));
});


gulp.task('build', ['clean'], () => {
    return gulp.start('img', 'libs', 'html', 'bundle');
});





