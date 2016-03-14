import {Calculator} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';


export class Cropper extends PIXI.Container {
    constructor(canvas, imageElement) {
        super();
        this.initialize(canvas, imageElement);
        this.addImageMouseDownEvent();
    }


    initialize(canvas, imageElement) {
        this.canvas = canvas;
        this.imageElement = imageElement;

        this.paddingX = 216;
        this.paddingY = 158;
        this.originalImageWidth = imageElement.width;
        this.origianlImageHeight = imageElement.height;

        this.bounds = new PIXI.Graphics();
        this.addChild(this.bounds);

        this.rotateUI = new RotateUI(this.canvas);
        this.addChild(this.rotateUI);

        this.base = new PIXI.BaseTexture(this.imageElement);
        this.texture = new PIXI.Texture(this.base);
        this.image = new PIXI.Sprite(this.texture);
        //this.image.interactive = true;
        this.addChild(this.image);

        this.resizeUI = new ResizeUI(this.canvas, this.originalImageWidth, this.origianlImageHeight);
        this.addChild(this.resizeUI);
    }


    update() {
        //
    }


    resize(canvasWidth, canvasHeight) {
        var boundsWidth = canvasWidth - this.paddingX;
        var boundsHeight = canvasHeight - this.paddingY;
        var boundsX = this.canvas.width / 2 - boundsWidth / 2;
        var boundsY = this.canvas.height / 2 - boundsHeight / 2;

        this.rotateUI.resize();
        this.drawBounds(boundsX, boundsY, boundsWidth, boundsHeight);
        this.resizeImage(boundsWidth, boundsHeight);
        this.resizeUI.resize({x:this.image.x, y:this.image.y, width:this.image.width, height:this.image.height});
    }


    drawBounds(boundsX, boundsY, boundsWidth, boundsHeight) {
        this.bounds.clear();
        this.bounds.lineStyle(1, 0xff3300, 0.4);
        //this.bounds.beginFill(0xFF3300, 0.2);
        this.bounds.drawRect(boundsX, boundsY, boundsWidth, boundsHeight);
        this.bounds.endFill();
    }


    resizeImage(boundsWidth, boundsHeight) {
        var size = Calculator.getImageSizeKeepAspectRatio(boundsWidth, this.originalImageWidth, boundsHeight, this.origianlImageHeight);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2 - this.image.width / 2;
        this.image.y = this.canvas.height / 2 - this.image.height / 2;
    }


    //////////////////////////////////////////////////////////////////////////
    // MouseEvent
    //////////////////////////////////////////////////////////////////////////


    addImageMouseDownEvent() {
        console.log('Cropper.addImageMouseDownEvent()');
        this._imageMouseDownListener = this.onImageDown.bind(this);
        this.image.on('mousedown', this._imageMouseDownListener);
    }


    removeImageMouseDownEvent() {
        this.image.off('mousedown', this._imageMouseDownListener);
    }


    addImageMouseMoveEvent() {
        this._imageMouseMoveListener = this.onImageMove.bind(this);
        this._imageMouseUpListener = this.onImageUp.bind(this);

        window.document.addEventListener('mousemove', this._imageMouseMoveListener);
        window.document.addEventListener('mouseup', this._imageMouseUpListener);
    }


    removeImageMouseMoveEvent() {
        window.document.removeEventListener('mousemove', this._imageMouseMoveListener);
        window.document.removeEventListener('mouseup', this._imageMouseUpListener);
    }


    onImageDown(e) {
        this.addImageMouseMoveEvent();
        this.removeImageMouseDownEvent();
    }


    onImageMove(e) {
        //
    }


    onImageUp(e) {
        this.addImageMouseDownEvent();
        this.removeImageMouseMoveEvent();
    }

}