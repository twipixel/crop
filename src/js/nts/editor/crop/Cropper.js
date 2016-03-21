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

        // TODO 필요한 정보인지 체크
        this.prevImageInfo = {x: 0, y: 0, width: imageElement.width, height: imageElement.height, scale: {x: 0, y: 0}};

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
        this.rotateUI.on('startRotation', this.startRotation.bind(this));
        this.moveUI.on('changeMove', this.changeMove.bind(this));
    }


    update() {
        //
    }


    resize(canvasWidth, canvasHeight) {
        var bounds = this.getBounds(canvasWidth, canvasHeight);

        this.centerPoint = {x: canvasWidth / 2, y: canvasHeight / 2};
        this.imageBoundsPoints = this.image.getGlobalBoundsPoints();

        this.resizeImageRect = this.vo.getSizeByBounds(bounds);
        this.resizeImageRect.x = this.centerPoint.x - this.resizeImageRect.width / 2;
        this.resizeImageRect.y = this.centerPoint.y - this.resizeImageRect.height / 2;

        this.drawBounds(bounds);
        this.resizeImage(bounds, this.image);
        this.rotateUI.resize(this.resizeImageRect);
        this.resizeUI.resize(this.resizeImageRect);
        this.moveUI.resize(this.resizeImageRect);

    }


    resizeImage(bounds, resizeImageRect) {

        var scale;

        // rotationScale는 변경되어야 합니다. 리사이즈 테스트를 위한 임시 코드
        if (this.vo.rotationScale == 0) {
            scale = Calculator.getScaleKeepAspectRatio(this.vo.originalBounds, bounds);
        } else {
            scale = Calculator.getScaleKeepAspectRatio(
                {width:this.scaledImageWidth - 200, height:this.scaledImageHeight - 200}, bounds);
        }

        this.image.scale.x = scale.min;
        this.image.scale.y = scale.min;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;

        console.log(this.vo.originalWidth, this.scaledImageWidth, this.vo.originalHeight, this.scaledImageHeight);

        this.recordImageInfo();
    }


    startRotation(e) {
        this.imageScaleX = this.image.scale.x;
        this.imageScaleY = this.image.scale.y;
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
        this.resizeImageRect = this.vo.getSizeByBounds(this.getBounds(this.canvas.width, this.canvas.height));
        this.resizeImageRect.x = this.centerPoint.x - this.resizeImageRect.width / 2;
        this.resizeImageRect.y = this.centerPoint.y - this.resizeImageRect.height / 2;
        this.isRotationScaleZero = (this.vo.rotationScale === 0);
        console.log('isRotationScaleZero', this.isRotationScaleZero, this.imageScaleX, this.imageScaleY);
    }


    changeRotation(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.vo.minRotationRadian)
            this.image.rotation = this.vo.minRotationRadian;

        if (this.image.rotation > this.vo.maxRotationRadian)
            this.image.rotation = this.vo.maxRotationRadian;

        var rotationRectanglePoints = Calculator.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calculator.getDegrees(this.image.rotation));
        var rotationRectangleBounds = Calculator.getBoundsRectangle(rotationRectanglePoints);
        var scale = Calculator.getScaleKeepAspectRatio(this.vo.originalBounds, rotationRectangleBounds);
        this.image.scale.x = scale.max;
        this.image.scale.y = scale.max;


        // TODO 테스트 코드
        this.dsx = scale.max - this.imageScaleX;
        this.dsy = scale.max - this.imageScaleY;
        this.dw = this.image.width - this.resizeImageRect.width;
        this.dh = this.image.height - this.resizeImageRect.height;


        if (this.isImageOutOfBounds === false) {
            //this.image.scale.x = this.prevImageScaleX;
            //this.image.scale.y = this.prevImageScaleY;
            //this.image.rotation = this.prevImageRotation;
        } else {
            this.recordImageInfo();
        }

        this.vo.rotation = Calculator.getDegrees(this.image.rotation);
        this.vo.rotationScale = Calculator.getOneToOne(Math.abs(this.image.rotation), 0, this.vo.limitRotationRadian, 0, 1);

        this.increaseWidth = this.vo.originalWidth * this.dsx;
        this.increaseHeight = this.vo.originalHeight * this.dsy;
        //this.scaledImageWidth = this.vo.originalWidth - this.increaseWidth;
        //this.scaledImageHeight = this.vo.originalHeight - this.increaseHeight;
        this.scaledImageWidth = this.vo.originalWidth - this.dw * this.dsx;
        this.scaledImageHeight = this.vo.originalHeight - this.dh * this.dsy;

        //console.log(this.vo.originalWidth, this.image.width, this.scaledImageWidth, this.vo.originalWidth * scale.max);
    }


    changeMove(e) {
        this.image.x += e.change.x;
        this.image.y += e.change.y;

        console.log('changeMove', this.image.x, this.image.y);

        if (this.isImageOutOfBounds === false) {
            this.image.x = this.prevImageInfo.x;
            this.image.y = this.prevImageInfo.y;
        } else {
            this.recordImageInfo();
        }
    }


    recordImageInfo() {
        this.prevImageInfo.x = this.image.x;
        this.prevImageInfo.y = this.image.y;
        this.prevImageInfo.scale = this.image.scale;
        this.prevImageInfo.width = this.image.width;
        this.prevImageInfo.height = this.image.height;
        this.prevImageInfo.rotation = this.image.rotation;
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
        this.recordImageInfo();
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

        this.imageScaleX = this.image.scale.x;
        this.imageScaleY = this.image.scale.y;
        this.isRotationScaleZero = (this.vo.rotationScale === 0);
        console.log('isRotationScaleZero', this.isRotationScaleZero, this.imageScaleX, this.imageScaleY);

        e.stopPropagation();
        this.addImageMouseMoveEvent();
        this.removeImageMouseDownEvent();
    }


    onImageMove(e) {
        this.lastImageX = this.image.x;
        this.lastImageY = this.image.y;
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
        var scale = Calculator.getScaleKeepAspectRatio(this.vo.originalBounds, bounds);
        var minScale = Calculator.digitNumber(scale.min, 2) + errorRange;
        var scaleX = Calculator.digitNumber(this.image.scale.x, 2);
        var scaleY = Calculator.digitNumber(this.image.scale.y, 2);

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