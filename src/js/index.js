import {Config} from './config/Config';


/**
 * 1. Drag & Drop 으로 이미지 로드
 * 2. Canvas로 이미지 전달 받고 픽셀 조작 가능한지 확인
 *
 */
window.onload = initailize.bind(this);


function initailize() {
    console.log('initailize');

    var dropzone = Dropzone.instances[0];

    dropzone.on('addedfile', function (file) {
        console.log('addedfile', file.name);
    });

    dropzone.on('success', function (file, done) {
        console.log('success', file.name, done);

        createImageByFile(file);
    });
}

function createImageByFile(file) {
    if (file) {
        var fileReader = new FileReader;
        fileReader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            beginWithImg(img);
        }
        fileReader.readAsDataURL(file);
    }
}

function beginWithImg(img) {
    console.log('beginWithImg(' + img + ')');

    Config.canvas = document.getElementById('canvas');
    Config.context = Config.canvas.getContext('2d');

    console.dir(Config.canvas);
    console.log(Config.context);

    Config.context.drawImage(img, 0, 0);

}
