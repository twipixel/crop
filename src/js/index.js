import {ImageEditor} from './nts/editor/ImageEditor';



var editor;

var image = document.getElementById('image');
var texture = document.getElementById('texture');

//window.onload = initailize.bind(this);
window.onload = fastInitailize.bind(this);
window.onresize = resizeWindow.bind(this);


function initailize() {
    console.log('initailize');

    var dropzone = Dropzone.instances[0];

    dropzone.on('addedfile', function (file) {
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
    if(image && texture) {
        var context = texture.getContext('2d');
        texture.width = image.width;
        texture.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        document.body.removeChild(image);
        document.body.removeChild(texture);

        //beginWithImageElement(image);
        beginWithCanvas(texture, image);
    }


}


function beginWithImageElement(image) {
    var dropzone = document.getElementById('upload');
    if(dropzone)
        document.body.removeChild(dropzone);

    editor = new ImageEditor(image);
    resizeWindow();
}


function beginWithCanvas(texture, imageElement) {
    var dropzone = document.getElementById('upload');
    if(dropzone)
        document.body.removeChild(dropzone);

    editor = new ImageEditor(texture, imageElement);
    resizeWindow();
}


function resizeWindow() {
    editor.resize();
}
