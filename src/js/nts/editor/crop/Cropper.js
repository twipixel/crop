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

        var Config = function () {
            this.offset = 0;
            this.width = 0;
            this.height = 0;
        }

        //////////////////////////////////////////////////////////////
        //TODO 테스트
        /*this.gui = new dat.GUI();
        this.config = new Config();
        var offset = this.gui.add(this.config, 'offset', -200, 200);
        var width = this.gui.add(this.config, 'width').step(1);
        var height = this.gui.add(this.config, 'height').step(1);

        offset.onChange((value) => {
            this.scaledImageWidth = this.scaledImageWidth + value;
            this.scaledImageHeight = this.scaledImageHeight + value;

            console.log(this.scaledImageWidth, this.scaledImageHeight);
        });

        width.onFinishChange((value) => {
            this.scaledImageWidth = this.vo.originalWidth + value;
            console.log(this.scaledImageWidth);
        });

        height.onFinishChange((value) => {
            this.scaledImageHeight = this.vo.originalHeight + value;
            console.log(this.scaledImageHeight);
        });*/

        this.isOut = false;
        //////////////////////////////////////////////////////////////

        window.document.addEventListener('keydown', function(){
            console.clear();
            console.log('[KEYDOWN, CLEAR]');
        });

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
        this.moveUI.on('endMove', this.endMove.bind(this));
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

            /*var o = this.vo.originalBounds;
             scale = Calculator.getScaleKeepAspectRatio(
             {width:o.width - 300, height:o.height - 300}, bounds);*/

            this.image.scale.x = scale.min;
            this.image.scale.y = scale.min;

        } else {
            scale = Calculator.getScaleKeepAspectRatio(this.vo.originalBounds, bounds);

            //scale = Calculator.getScaleKeepAspectRatio(
            //{width:this.scaledImageWidth, height:this.scaledImageHeight}, bounds);

            //this.vo.originalBounds, {width:bounds.width + this.dw, height:bounds.height + this.dh});

            //this.vo.originalBounds, {width:bounds.width + this.iw, height:bounds.height + this.ih});

            //{width: this.scaledImageWidth, height: this.scaledImageHeight}, bounds);

            /*{width:this.scaledImageWidth, height:this.scaledImageHeight},
             {width:this.canvas.width, height:this.canvas.height});*/

            /*{width:this.scaledImageWidth, height:this.scaledImageHeight},
             {width:bounds.width + this.dw, height:bounds.height + this.dh});*/


            this.image.width = this.scaledImageWidth * scale.min;
            this.image.height = this.scaledImageHeight * scale.min;
        }


        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;

        console.log('[', this.vo.originalWidth, this.vo.originalHeight, ']',
            Calculator.digitNumber(this.scaledImageWidth, 2),
            Calculator.digitNumber(this.scaledImageHeight, 2),
            this.scaledImageWidth - this.vo.originalWidth,
            this.dw
        );

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

        this.recordImageInfo();
        console.log('isRotationScaleZero', this.isRotationScaleZero, this.imageScaleX, this.imageScaleY);
    }


    changeRotation(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.vo.minRotationRadian)
            this.image.rotation = this.vo.minRotationRadian;

        if (this.image.rotation > this.vo.maxRotationRadian)
            this.image.rotation = this.vo.maxRotationRadian;

        if (this.isRotationScaleZero) {
            var rotationRectanglePoints = Calculator.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calculator.getDegrees(this.image.rotation));
            var rotationRectangleBounds = Calculator.getBoundsRectangle(rotationRectanglePoints);
            var scale = Calculator.getScaleKeepAspectRatio(this.vo.originalBounds, rotationRectangleBounds);
            this.image.scale.x = scale.max;
            this.image.scale.y = scale.max;
        }

        // TODO 테스트 코드
        /*this.dsx = scale.max - this.imageScaleX;
         this.dsy = scale.max - this.imageScaleY;
         this.dw = rotationRectangleBounds.width - this.imageWidth;
         this.dh = rotationRectangleBounds.height - this.imageHeight;
         this.iw = this.dw * this.dsx;
         this.ih = this.dh * this.dsy;
         this.scaledImageWidth = this.vo.originalWidth + this.dw;
         this.scaledImageHeight = this.vo.originalHeight + this.dh;
         console.log('[', this.vo.originalWidth, ']',
         Calculator.digitNumber(this.dw, 2),
         Calculator.digitNumber(this.dsx, 2),
         Calculator.digitNumber(this.iw, 2),
         this.scaledImageWidth);*/


        if (this.isImageOutOfBounds === false) {
            //this.image.scale.x = this.prevImageScaleX;
            //this.image.scale.y = this.prevImageScaleY;
            //this.image.rotation = this.prevImageRotation;

            var rotationRectanglePoints = Calculator.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calculator.getDegrees(this.image.rotation));
            var rotationRectangleBounds = Calculator.getBoundsRectangle(rotationRectanglePoints);

            // TODO 스케일 체크 필요
            var scale = Calculator.getScaleKeepAspectRatio(this.vo.originalBounds, rotationRectangleBounds);
            this.image.scale.x = scale.max;
            this.image.scale.y = scale.max;

            var lt = this.image.lt;
            var rt = this.image.rt;
            var rb = this.image.rb;
            var lb = this.image.lb;

            var x;
            var y;
            var line;
            var distance;

            console.log('ROTATE [', Calculator.digitNumber(this.image.x), Calculator.digitNumber(this.image.y), ']');

            var maxDistance = 40;

            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.lt) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.left;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[LT | LEFT]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - Math.abs(x);
                        this.image.y = this.image.y - Math.abs(y);
                    }
                } else {
                    line = this.image.top;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[LT | TOP]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - Math.abs(x);
                        this.image.y = this.image.y - Math.abs(y);
                    }
                }
            }

            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.lb) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.left;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lb);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[LB | LEFT]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - Math.abs(x);
                        this.image.y = this.image.y + Math.abs(y);
                    }
                } else {
                    line = this.image.bottom;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lb);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[LB | BOTTOM]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - Math.abs(x);
                        this.image.y = this.image.y + Math.abs(y);
                    }
                }
            }

            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.rt) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.right;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RT | RIGHT]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + Math.abs(x);
                        this.image.y = this.image.y - Math.abs(y);
                    }
                } else {
                    line = this.image.top;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RT | TOP]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + Math.abs(x);
                        this.image.y = this.image.y - Math.abs(y);
                    }
                }
            }


            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.rb) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.right;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rb);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RB | RIGHT]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + Math.abs(x);
                        this.image.y = this.image.y + Math.abs(y);
                    }
                } else {
                    line = this.image.bottom;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rb);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RB | BOTTOM]', '[', Calculator.digitNumber(distance), ']',
                        'isReachedLimitLine', this.isReachedLimitLine,
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + Math.abs(x);
                        this.image.y = this.image.y + Math.abs(y);
                    }
                }
            }

            /*
            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.lt) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.left;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[LT | LEFT]', '[', Calculator.digitNumber(distance), ']',
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - x;
                        this.image.y = this.image.y + y;
                    }
                } else {
                    line = this.image.top;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[LT | TOP]', '[', Calculator.digitNumber(distance), ']',
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - x;
                        this.image.y = this.image.y + y;
                    }
                }
            }


            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.rt) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.right;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RT | RIGHT]', '[', Calculator.digitNumber(distance), ']',
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + x;
                        this.image.y = this.image.y + y;
                    }
                } else {
                    line = this.image.top;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rt);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RT | TOP]', '[', Calculator.digitNumber(distance), ']',
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + x;
                        this.image.y = this.image.y - y;
                    }
                }
            }


            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.rb) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.right;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rb);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RB | RIGHT]', '[', Calculator.digitNumber(distance), ']',
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x - x;
                        this.image.y = this.image.y + y;
                    }
                } else {
                    line = this.image.bottom;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.rb);
                    x = distance * Math.cos(this.image.rotation);
                    y = distance * Math.sin(this.image.rotation);
                    console.log('[RB | BOTTOM]', '[', Calculator.digitNumber(distance), ']',
                        '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));

                    if(distance < maxDistance) {
                        this.image.x = this.image.x + x;
                        this.image.y = this.image.y + y;
                    }
                }
            }

            if (Calculator.isInsideSquare(lt, rt, rb, lb, this.resizeUI.lb) === false) {
                if(this.isReachedLimitLine) {
                    line = this.image.left;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lb);

                    if(distance < maxDistance) {
                        x = distance * Math.cos(this.image.rotation);
                        y = distance * Math.sin(this.image.rotation);
                        this.image.x = this.image.x - x;
                        this.image.y = this.image.y + y;
                        console.log('[LB | LEFT]', '[', Calculator.digitNumber(distance), ']',
                            '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));
                    }
                } else {
                    line = this.image.bottom;
                    distance = Calculator.pointToLineDistance(line.a, line.b, this.resizeUI.lb);

                    if(distance < maxDistance) {
                        x = distance * Math.cos(this.image.rotation);
                        y = distance * Math.sin(this.image.rotation);
                        this.image.x = this.image.x + x;
                        this.image.y = this.image.y - y;
                        console.log('[LB | BOTTOM]', '[', Calculator.digitNumber(distance), ']',
                            '=>', Calculator.digitNumber(x), Calculator.digitNumber(y));
                    }
                }
            }*/


        } else {
            this.recordImageInfo();
        }

        this.vo.rotation = Calculator.getDegrees(this.image.rotation);
        this.vo.rotationScale = Calculator.getOneToOne(Math.abs(this.image.rotation), 0, this.vo.limitRotationRadian, 0, 1);
    }


    changeMove(e) {

        if (this.isOut == false) {
            this.image.x += e.change.x;
            this.image.y += e.change.y;
        } else {
            //this.image.x += e.change.x * 0.3;
            //this.image.y += e.change.y * 0.3;
        }

        console.log('isReachedLimitLine', this.isReachedLimitLine);

        if (this.isImageOutOfBounds === false) {

            //this.image.x = this.prevImageInfo.x;
            //this.image.y = this.prevImageInfo.y;
            var x = this.prevImageInfo.x + e.change.x * Math.cos(this.image.rotation);
            var y = this.prevImageInfo.y + e.change.x * Math.sin(this.image.rotation);
            this.image.x = x;
            this.image.y = y;


            this.isOut = true;
            if (this.returnX === -1) {
                this.returnX = this.prevImageInfo.x;
                this.returnY = this.prevImageInfo.y;
            }
        } else {
            this.returnX = -1;
            this.returnY = -1;
            this.isOut = false;

            this.recordImageInfo();
        }
    }


    endMove(e) {
        if (this.isOut) {
            this.image.x = this.returnX;
            this.image.y = this.returnY;
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


    get isReachedLimitLine() {
        var isReached = false;
        var image = this.image;
        //var bounds = Calculator.getPointsByBounds(this.resizeUI.getBounds());
        var bounds = [this.resizeUI.lt, this.resizeUI.rt, this.resizeUI.rb, this.resizeUI.lb];

        var imagePoints = image.getGlobalBoundsPoints();
        var lt = imagePoints.lt;
        var rt = imagePoints.rt;
        var rb = imagePoints.rb;
        var lb = imagePoints.lb;

        // 왼쪽 도달
        if (Calculator.triangleArea(lb, lt, this.resizeUI.lt) > 0)
            isReached = true;

        if (Calculator.triangleArea(lb, lt, this.resizeUI.lb) > 0)
            isReached = true;

        // 오른쪽 도달
        if (Calculator.triangleArea(rt, rb, this.resizeUI.rt) > 0)
            isReached = true;

        if (Calculator.triangleArea(rt, rb, this.resizeUI.rb) > 0)
            isReached = true;

        return isReached;
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