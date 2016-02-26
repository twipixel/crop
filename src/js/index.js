/**
 * 1. Drag & Drop 으로 이미지 로드
 * 2. Canvas로 이미지 전달 받고 픽셀 조작 가능한지 확인
 *
 */
window.onload = startApplication.bind(this);


function startApplication() {
    console.log('startApplication');

    var dropzone = Dropzone.instances[0];

    dropzone.on('addedfile', function(file) {
        console.log('addedfile', file);
    });

    dropzone.on('success', function(file, done){
       console.log('aaaa', file, done);
    });
}

