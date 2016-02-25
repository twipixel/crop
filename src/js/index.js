/**
 * 1. Drag & Drop 으로 이미지 로드
 * 2. Canvas로 이미지 전달 받고 픽셀 조작 가능한지 확인
 *
 */
window.onload = startApplication.bind(this);


function startApplication() {

    console.log('startApplication');

    console.dir(Dropzone);

    Dropzone.options.box = {
        maxFilesize: 5,
        addRemoveLinks: true,
        dictResponseError: 'Server not Configured',
        acceptedFiles: ".png,.jpg,.gif,.bmp,.jpeg",
        init:function(){
            console.log('aaaa');
            var self = this;
            // config
            self.options.addRemoveLinks = true;
            self.options.dictRemoveFile = "Delete";
            //New file added
            self.on("addedfile", function (file) {
                console.log('new file added ', file);
            });
            // Send file starts
            self.on("sending", function (file) {
                console.log('upload started', file);
                $('.meter').show();
            });

            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
                console.log("progress ", progress);
                $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
                $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) {
                console.log(file);
            });
        },

    };



}
