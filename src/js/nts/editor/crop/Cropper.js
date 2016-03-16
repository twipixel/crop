import {Calculator} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';
import {MoveUI} from './../ui/MoveUI';
import {ImageUI} from './../ui/ImageUI';


export class Cropper extends PIXI.Container {
    constructor(canvas, imageElement) {
        super();
        this.initialize(canvas, imageElement);
        this.addEvent();
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

        /*this.base = new PIXI.BaseTexture(this.imageElement);
         this.texture = new PIXI.Texture(this.base);
         this.image = new PIXI.Sprite(this.texture);
         this.image.anchor = {x:0.5, y:0.5};
         this.addChild(this.image);*/

        this.image = new ImageUI(this.imageElement);
        this.addChild(this.image);

        this.maxRotation = Calculator.getRadians(45);
        this.minRotation = -this.maxRotation;

        this.rotateUI = new RotateUI(this.canvas);
        this.addChild(this.rotateUI);

        this.resizeUI = new ResizeUI(this.canvas, this.originalImageWidth, this.origianlImageHeight);
        this.addChild(this.resizeUI);

        this.moveUI = new MoveUI(this.canvas);
        this.addChild(this.moveUI);
    }

    addEvent() {
        this.addImageMouseDownEvent();
        this.rotateUI.on('changeRotation', this.changeRotation.bind(this));
        this.moveUI.on('changeMove', this.changeMove.bind(this));
    }

    update() {
        //
    }

    changeRotation(e) {
        //console.log('*************', e.currentRotation, e.dr);

        this.image.rotation += e.change;

        if (this.image.rotation < this.minRotation)
            this.image.rotation = this.minRotation;

        if (this.image.rotation > this.maxRotation)
            this.image.rotation = this.maxRotation;


        // image.rotation 0 ~ 45;
        // image.scale = imageMinScale ~ imageMaxScale;
        // y = (d - c) / (b - a) * (x - a) + c;
        //var scale:Number = (imageMaxScale - imageMinScale) / 45 * Math.abs(image.rotation) + imageMinScale;

        var scale = (this.imageMaxScale - this.imageMinScale) / 45 * Math.abs(this.image.rotation) + this.imageMinScale;
        this.image.scale.x = scale;
        this.image.scale.y = scale;

        console.log('isImageHasBounds:', this.isImageHasBounds);

        if (this.isImageHasBounds === false) {
            console.log('!!!!!!!!!!!!!!!!!!', this.prevImageScaleX, this.prevImageScaleY);
            this.image.scale.x = this.prevImageScaleX;
            this.image.scale.y = this.prevImageScaleY;
            this.image.rotation = this.prevImageRotation;
        } else {
            this.setPrevImageRotation();
        }
    }

    changeMove(e) {
        this.image.x += e.change.x;
        this.image.y += e.change.y;

        console.log('1111111', this.image.x, this.image.y);
        console.log('isImageHasBounds:', this.isImageHasBounds);

        if (this.isImageHasBounds === false) {
            this.image.x = this.prevImageX;
            this.image.y = this.prevImageY;
            console.log('22222222', this.image.x, this.image.y, this.prevImageX, this.prevImageY);
        } else {
            this.setPrevImagePosion();
        }
    }

    resize(canvasWidth, canvasHeight) {
        var boundsWidth = canvasWidth - this.paddingX;
        var boundsHeight = canvasHeight - this.paddingY;
        var boundsX = this.canvas.width / 2 - boundsWidth / 2;
        var boundsY = this.canvas.height / 2 - boundsHeight / 2;

        this.imageMinScale = Calculator.getResizeMinScaleKeepAspectRatio(boundsWidth, this.originalImageWidth, boundsHeight, this.origianlImageHeight);
        var newImageWidth = this.imageMinScale * this.originalImageWidth;
        var newImageHeight = this.imageMinScale * this.origianlImageHeight;

        this.imageDiagonal = Calculator.getDegrees(newImageWidth, newImageHeight);
        this.imageScaleHeight = this.imageDiagonal;
        this.imageScaleWidth = Calculator.getRectangleWidth(newImageWidth, newImageHeight, this.imageScaleHeight);
        this.imageScaleX = this.imageScaleWidth / newImageWidth;
        this.imageScaleY = this.imageScaleHeight / newImageHeight;
        this.imageMaxScale = this.imageScaleY;

        var imageBounds = {
            x: this.canvas.width / 2 - this.image.width / 2,
            y: this.canvas.height / 2 - this.image.height / 2,
            width: this.image.width,
            height: this.image.height
        };

        this.drawBounds(boundsX, boundsY, boundsWidth, boundsHeight);
        this.resizeImage(boundsWidth, boundsHeight);
        this.rotateUI.resize(imageBounds);
        this.resizeUI.resize(imageBounds);
        this.moveUI.resize(imageBounds);
    }


    drawBounds(boundsX, boundsY, boundsWidth, boundsHeight) {
        this.bounds.clear();
        this.bounds.lineStyle(1, 0xff3300, 0.4);
        //this.bounds.beginFill(0xFF3300, 0.2);
        this.bounds.drawRect(boundsX, boundsY, boundsWidth, boundsHeight);
        this.bounds.endFill();
    }


    resizeImage(boundsWidth, boundsHeight) {
        /*var size = Calculator.getImageSizeKeepAspectRatio(boundsWidth, this.originalImageWidth, boundsHeight, this.origianlImageHeight);
         this.image.width = size.width;
         this.image.height = size.height;*/

        var scale = Calculator.getResizeMinScaleKeepAspectRatio(boundsWidth, this.originalImageWidth, boundsHeight, this.origianlImageHeight);
        this.image.scale.x = scale;
        this.image.scale.y = scale;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;
        //this.image.x = this.canvas.width / 2 - this.image.width / 2;
        //this.image.y = this.canvas.height / 2 - this.image.height / 2;

        this.setPrevImagePosion();
        this.setPrevImageRotation();
    }


    setPrevImagePosion() {
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;
    }

    setPrevImageRotation() {
        this.prevImageScaleX = this.image.scale.x;
        this.prevImageScaleY = this.image.scale.y;
        this.prevImageRotation = this.image.rotation;
    }

    //////////////////////////////////////////////////////////////////////////
    // MouseEvent
    //////////////////////////////////////////////////////////////////////////


    addImageMouseDownEvent() {
        console.log('Cropper.addImageMouseDownEvent()');

        this.setPrevImagePosion();
        this.setPrevImageRotation();
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

        e.stopPropagation();
        this.addImageMouseMoveEvent();
        this.removeImageMouseDownEvent();
    }


    onImageMove(e) {
        console.log('ImageMove');
    }


    onImageUp(e) {
        this.addImageMouseDownEvent();
        this.removeImageMouseMoveEvent();
    }


    get isImageHasBounds() {
        var hasBounds = true;
        var image = this.image;
        //var bounds = Calculator.getPointsByBounds(this.resizeUI.getBounds());
        var bounds = [this.resizeUI.lt, this.resizeUI.rt, this.resizeUI.rb, this.resizeUI.lb];
        var lt = image.toGlobal(image.lt.position);
        var rt = image.toGlobal(image.rt.position);
        var rb = image.toGlobal(image.rb.position);
        var lb = image.toGlobal(image.lb.position);

        for (let i = 0; i < bounds.length; i++) {
            if (Calculator.isInsideSquare(lt, rt, rb, lb, bounds[i]) === false)
                hasBounds = false;
        }

        return hasBounds;
    }
}