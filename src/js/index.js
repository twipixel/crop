/**
 * 1. Drag & Drop 으로 이미지 로드
 * 2. Canvas로 이미지 전달 받고 픽셀 조작 가능한지 확인
 *
 */
window.onload = startApplication.bind(this);


function startApplication() {

    console.log('startApplication');
    console.log(Dropzone);

    var dropzone = new Dropzone("div#dropzone", { url: "/file/post"});

    Dropzone.options.dropzone = {
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
    };


}
