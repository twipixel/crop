import {Config} from './nts/editor/config/Config';
import {ImageEditor} from './nts/editor/ImageEditor';


var editor;
window.onload = initailize.bind(this);
window.onresize = resizeWindow.bind(this);


function initailize() {
    console.log('initailize');

    var dropzone = Dropzone.instances[0];

    dropzone.on('addedfile', function (file) {
        Config.image = file;
        console.log('addedfile', file.name);
    });

    dropzone.on('success', function (file, done) {
        console.log('success', file.name, done);
        console.log('------------');
        console.log(done);
        console.log('------------');

        if (window.DOMParser) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(done, "text/xml");
            console.dir(xmlDoc);
        }

        console.dir(xmlDoc);
        //<url><![CDATA[http://twipixel.com/test/dropzone/uploads/Koala.jpg]]></url>

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
        };
        fileReader.readAsDataURL(file);
    }
}

function beginWithImg(image) {
    var dropzone = document.getElementById('upload');
    document.body.removeChild(dropzone);
    Config.context.drawImage(image, 0, 0);

    editor = new ImageEditor(image);

    //Config.image = image;
    //Config.canvas = document.getElementById('canvas');
    //Config.context = Config.canvas.getContext('2d');

    resizeWindow();
}

function resizeWindow() {
    /*if (Config.canvas) {
        Config.canvas.width = Config.stageWidth = window.innerWidth;
        Config.canvas.height = Config.stageHeight = window.innerHeight;
    }*/

    editor.resize();
}
