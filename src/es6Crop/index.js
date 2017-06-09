import {ImageEditor} from './nts/editor/ImageEditor';



var editor;
var image = document.getElementById('image');
var texture = document.getElementById('texture');

//window.onload = initailize.bind(this);
window.onload = fastInitailize.bind(this);
window.onresize = resizeWindow.bind(this);


touchInit();


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
    editor = new ImageEditor(image);
    resizeWindow();
}


function beginWithCanvas(texture, imageElement) {
    editor = new ImageEditor(texture, imageElement);
    resizeWindow();
}


function resizeWindow() {
    if(editor)
        editor.resize();
}


function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}


function touchInit() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}