import {Calculator} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';
import {MoveUI} from './../ui/MoveUI';
import {ImageUI} from './../ui/ImageUI';
import {ImageVO} from './../vo/ImageVO';


export class Cropper extends PIXI.Container {
    constructor(canvas, imageElement) {
        super();
        this.initialize(canvas, imageElement);
        this.addEvent();
    }


    initialize(canvas, imageElement) {
        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.imageElement = imageElement;

        this._vo = new ImageVO(imageElement);
        this.vo.limitRotationRadian = Calculator.getRadians(45);

        this.bounds = new PIXI.Graphics();
        this.image = new ImageUI(this.imageElement);
        this.rotateUI = new RotateUI(this.canvas);
        this.resizeUI = new ResizeUI(this.canvas, this.vo.originalWidth, this.vo.originalHeight);
        this.moveUI = new MoveUI(this.canvas);
        this.addChild(this.bounds);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.resizeUI);
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


    resize(canvasWidth, canvasHeight) {
        var bounds = this.getBounds(canvasWidth, canvasHeight);

        this.centerPoint = {x: this.canvas.width / 2, y: this.canvas.height / 2};
        this.imageBoundsPoints = this.image.getGlobalBoundsPoints();

        var imageRect = this.vo.getSizeByBounds(bounds);
        imageRect.x = this.centerPoint.x - imageRect.width / 2;
        imageRect.y = this.centerPoint.y - imageRect.height / 2;

        this.drawBounds(bounds);
        this.resizeImage(bounds, imageRect);
        this.rotateUI.resize(imageRect);
        this.resizeUI.resize(imageRect);
        this.moveUI.resize(imageRect);
    }


    resizeImage(bounds, resizeImageRect) {

        var scale;

        if (this.vo.rotationScale == 0) {
            scale = Calculator.getResizeMinScaleKeepAspectRatio(bounds.width, this.vo.originalWidth, bounds.height, this.vo.originalHeight);
        } else {
            scale = Calculator.getResizeMinScaleKeepAspectRatio(bounds.width, resizeImageRect.width, bounds.height, resizeImageRect.height);
        }

        scale = Calculator.getResizeMinScaleKeepAspectRatio(bounds.width, this.vo.originalWidth, bounds.height, this.vo.originalHeight);
        this.image.scale.x = scale;
        this.image.scale.y = scale;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;

        this.setPrevImagePosion();
        this.setPrevImageRotation();
    }


    changeRotation(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.vo.minRotationRadian)
            this.image.rotation = this.vo.minRotationRadian;

        if (this.image.rotation > this.vo.maxRotationRadian)
            this.image.rotation = this.vo.maxRotationRadian;

        var rotationRectanglePoints = Calculator.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calculator.getDegrees(this.image.rotation));
        var rotationRectangleBounds = Calculator.getBoundsRectangle(rotationRectanglePoints);

        var scale = Calculator.getResizeMaxScaleKeepAspectRatio(rotationRectangleBounds.width, this.vo.originalWidth, rotationRectangleBounds.height, this.vo.originalHeight);
        this.image.scale.x = scale;
        this.image.scale.y = scale;

        if (this.isImageOutOfBounds === false) {
            //this.image.scale.x = this.prevImageScaleX;
            //this.image.scale.y = this.prevImageScaleY;
            //this.image.rotation = this.prevImageRotation;
        } else {
            this.setPrevImageRotation();
        }

        this.vo.rotation = Calculator.getDegrees(this.image.rotation);
        this.vo.rotationScale = Calculator.getY(Math.abs(this.image.rotation), 0, this.vo.limitRotationRadian, 0, 1);
    }


    changeMove(e) {
        this.image.x += e.change.x;
        this.image.y += e.change.y;

        if (this.isImageOutOfBounds === false) {
            this.image.x = this.prevImageX;
            this.image.y = this.prevImageY;
        } else {
            this.setPrevImagePosion();
        }
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


    drawBounds(bounds) {
        this.bounds.clear();
        this.bounds.lineStyle(1, 0xff3300, 0.4);
        this.bounds.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        this.bounds.endFill();
    }


    //////////////////////////////////////////////////////////////////////////
    // MouseEvent
    //////////////////////////////////////////////////////////////////////////


    addImageMouseDownEvent() {
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

    }


    onImageUp(e) {
        this.addImageMouseDownEvent();
        this.removeImageMouseMoveEvent();
    }


    //////////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////////


    /**
     * 이미지가 바운드를 벗어 났는지 체크
     * @returns {boolean}
     */
    get isImageOutOfBounds() {
        var isInBounds = true;
        var image = this.image;
        //var bounds = Calculator.getPointsByBounds(this.resizeUI.getBounds());
        var bounds = [this.resizeUI.lt, this.resizeUI.rt, this.resizeUI.rb, this.resizeUI.lb];

        var imagePoints = image.getGlobalBoundsPoints();
        var lt = imagePoints.lt;
        var rt = imagePoints.rt;
        var rb = imagePoints.rb;
        var lb = imagePoints.lb;

        for (let i = 0; i < bounds.length; i++) {
            if (Calculator.isInsideSquare(lt, rt, rb, lb, bounds[i]) === false)
                isInBounds = false;
        }

        return isInBounds;
    }


    get isImageMininumSize() {
        var bounds = this.getBounds(this.canvas.width, this.canvas.height);

        var errorRange = 0.3;
        var minScale = Calculator.getResizeMinScaleKeepAspectRatio(bounds.width, this.vo.originalWidth, bounds.height, this.vo.originalHeight);
        minScale = Calculator.digitNumber(minScale, 2) + errorRange;
        var scaleX = Calculator.digitNumber(this.image.scale.x, 2);
        var scaleY = Calculator.digitNumber(this.image.scale.y, 2);

        console.log(minScale, scaleX, scaleY);
        return (minScale >= scaleX && minScale >= scaleY);
    }


    getBounds(canvasWidth, canvasHeight) {
        var boundsWidth = canvasWidth - this.paddingX;
        var boundsHeight = canvasHeight - this.paddingY;
        var boundsX = canvasWidth / 2 - boundsWidth / 2;
        var boundsY = canvasHeight / 2 - boundsHeight / 2;

        return {
            width: boundsWidth,
            height: boundsHeight,
            x: boundsX,
            y: boundsY
        }
    }


    get vo() {
        return this._vo;
    }


}