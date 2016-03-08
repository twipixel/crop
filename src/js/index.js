import {Config} from './nts/editor/config/Config';
import {ImageEditor} from './nts/editor/ImageEditor';



var editor;

var image = document.getElementById("image");

//window.onload = initailize.bind(this);
window.onload = fastInitailize.bind(this);
window.onresize = resizeWindow.bind(this);


function initailize() {
    console.log('initailize');

    var dropzone = Dropzone.instances[0];

    dropzone.on('addedfile', function (file) {
        Config.imageElement = file;
        console.log('addedfile', file.name);
    });

    dropzone.on('success', function (file, done) {
        console.log('success', file.name, done);
        console.log('------------');
        console.log(done);
        console.log('------------');

        var xmlDoc;

        if (window.DOMParser) {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(done, "text/xml");
        }

        console.dir(xmlDoc);
        var imageURL = xmlDoc.children[0].lastElementChild.innerHTML;
        //<![CDATA[http://twipixel.com/test/dropzone/uploads/Koala.jpg]]>
        console.log(imageURL);


        createImageByFile(file);
    });
}


function createImageByFile(file) {
    if (file) {
        var fileReader = new FileReader;
        fileReader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            beginWithImageElement(img);
        };
        fileReader.readAsDataURL(file);
    }
}


function fastInitailize() {
    if(image) {
        document.body.removeChild(image);
        beginWithImageElement(image);
    }
}


function beginWithImageElement(image) {
    var dropzone = document.getElementById('upload');

    if(dropzone)
        document.body.removeChild(dropzone);

    console.log('beginWithImageElement(' + image + ')');

    editor = new ImageEditor(image);
    resizeWindow();
}


function resizeWindow() {
    editor.resize();
}
