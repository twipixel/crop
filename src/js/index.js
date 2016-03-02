import {Config} from './config/Config';
import {Resizer} from './transform/Resizer';


var resizer;
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


        if (window.DOMParser)
        {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(done, "text/xml");
            console.dir(xmlDoc);

            Config.imageURL = xmlDoc.documentElement.textContent.substr('success'.length);
            console.log(Config.imageURL);
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

function beginWithImg(img) {
    Config.canvas = document.getElementById('canvas');
    Config.context = Config.canvas.getContext('2d');
    resizeWindow();

    var uploader = document.getElementById('upload');
    document.body.removeChild(uploader);
    Config.context.drawImage(img, 0, 0);

    resizer = new Resizer(img);
}

function resizeWindow() {
    if(Config.canvas) {
        Config.canvas.width = Config.stageWidth = window.innerWidth;
        Config.canvas.height = Config.stageHeight = window.innerHeight;
    }
}