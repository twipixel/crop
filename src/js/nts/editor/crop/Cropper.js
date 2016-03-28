import {Calc} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';
import {MoveUI} from './../ui/MoveUI';
import {ImageUI} from './../ui/ImageUI';
import {ImageVO} from './../vo/ImageVO';
import {KeyCode} from './../const/KeyCode';


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

        window.document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case KeyCode.SPACE:
                    console.clear();
                    this.displayImageInfo();
                    break;

                case KeyCode.R:
                    this.zoomImage();
                    break;
            }
        });

        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.imageElement = imageElement;

        // TODO 필요한 정보인지 체크
        this.prevImageInfo = {x: 0, y: 0, width: imageElement.width, height: imageElement.height, scale: {x: 0, y: 0}};

        this._vo = new ImageVO(imageElement);
        this.vo.limitRotationRadian = Calc.toRadians(45);

        this.bounds = new PIXI.Graphics();
        this.image = new ImageUI(this.imageElement);
        this.rotateUI = new RotateUI(this.canvas);
        this.moveUI = new MoveUI(this.canvas);
        this.resizeUI = new ResizeUI(this.canvas, this.vo.originalWidth, this.vo.originalHeight);
        this.addChild(this.bounds);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.moveUI);
        this.addChild(this.resizeUI);
    }


    addEvent() {
        this.moveUI.on('moveStart', this.moveStart.bind(this));
        this.moveUI.on('moveChange', this.moveChange.bind(this));
        this.moveUI.on('moveEnd', this.moveEnd.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.rotateUI.on('rotateChange', this.rotateChange.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.resizeUI.on('cornerResizeStart', this.cornerResizeStart.bind(this));
        this.resizeUI.on('cornerResizeChange', this.cornerResizeChange.bind(this));
        this.resizeUI.on('cornerResizeEnd', this.cornerResizeEnd.bind(this));
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
        var size = Calc.getImageSizeKeepAspectRatio(this.vo.originalBounds, bounds);
        this.image.width = size.width;
        this.image.height = size.height;

        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;
        this.recordImageInfo();
    }


    zoomImage() {
        var w = this.image.width;
        var h = this.image.height;
        var sx = this.image.scale.x;
        var sy = this.image.scale.y;
        var ow = this.vo.originalWidth;
        var oh = this.vo.originalHeight;
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;




        var image = this.image;
        var bounds = this.getBounds();

        var scale = Calc.getBoundsScale(this.vo.originalBounds, bounds);

        var rubberband = this.resizeUI.bounds;
        var newRubberband = Calc.getImageSizeKeepAspectRatio(rubberband, bounds);
        newRubberband.x = this.canvas.width / 2 - newRubberband.width / 2;
        newRubberband.y = this.canvas.height / 2 - newRubberband.height / 2;
        var rubberbandCenterX = rubberband.x + rubberband.width / 2;
        var rubberbandCenterY = rubberband.y + rubberband.height / 2;

        // 처음 리사이즈 시 사각형의 실제 사이즈



        this.displayImageInfo();





        // 기존 러버 밴드 위치, 사이즈
        // 바뀐 러버 밴드 위치, 사이즈
        // 기존 러버 밴드와 바뀐 러버 밴드 비율
        // 이미지 위치, 사이즈
        // 이미지 스케일

        console.log('Rubberband: [' + Calc.digit(rubberband.x) + ',' + Calc.digit(rubberband.y) + '], [' + Calc.digit(rubberband.width) + ',' + Calc.digit(rubberband.height) + ']');
        console.log('NewRubberband: [' + Calc.digit(newRubberband.x) + ',' + Calc.digit(newRubberband.y) + '], [' + Calc.digit(newRubberband.width) + ',' + Calc.digit(newRubberband.height) + ']');
        console.log('Image: [' + Calc.digit(image.x) + ',' + Calc.digit(image.y) + '], [' + Calc.digit(image.width) + ',' + Calc.digit(image.height) + ']');
        console.log('Image Scale X: ' + Calc.digit(image.scale.x) + ', Y:' + Calc.digit(image.scale.y));

        // 위에서 구한 비율을 이미지 비율에 더해주기
        //this.image.scale.x = scale;
        //this.image.scale.y = scale;


        this.resizeUI.setSize(newRubberband);
    }


    displayImageInfo() {
        console.log('------------------------------------');
        console.log(
            ' Canvas[' + Calc.digit(this.canvas.width) + ',' + Calc.digit(this.canvas.height) + ']\n',
            'ORIGINAL[' + Calc.digit(this.vo.originalWidth) + ',' + Calc.digit(this.vo.originalHeight) + ']\n',
            'Bounds[' + Calc.digit(this.getBounds().width) + ',' + Calc.digit(this.getBounds().height) + ']\n',
            'Image[' + Calc.digit(this.image.width) + ',' + Calc.digit(this.image.height) + ']\n',
            'Scale[' + Calc.digit(this.image.scale.x) + ',' + Calc.digit(this.image.scale.y) + ']\n'
        );
        console.log('------------------------------------');

        //var bounds = this.getBounds();
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
    // Event Handler
    //////////////////////////////////////////////////////////////////////////


    moveStart(e) {
        console.log('moveStart');
    }

    moveChange(e) {
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


    moveEnd(e) {
        /*if (this.isOut) {
         this.image.x = this.returnX;
         this.image.y = this.returnY;
         }*/
    }


    rotateStart(e) {
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


    rotateChange(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.vo.minRotationRadian)
            this.image.rotation = this.vo.minRotationRadian;

        if (this.image.rotation > this.vo.maxRotationRadian)
            this.image.rotation = this.vo.maxRotationRadian;


        if (this.isImageOutOfBounds === false) {
            var rotationRectanglePoints = Calc.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calc.toDegrees(this.image.rotation));
            var rotationRectangleBounds = Calc.getBoundsRectangle(rotationRectanglePoints);

            // TODO 스케일 체크 필요
            /*var scale = Calc.getScaleKeepAspectRatio(this.vo.originalBounds, rotationRectangleBounds);
            this.image.scale.x = scale.max;
            this.image.scale.y = scale.max;*/

            var scale = Calc.getBoundsScale(this.vo.originalBounds, rotationRectangleBounds);
            this.image.width = scale.max * this.vo.originalBounds.width;
            this.image.height = scale.max * this.vo.originalBounds.height;


            var lt = this.image.lt;
            var rt = this.image.rt;
            var rb = this.image.rb;
            var lb = this.image.lb;

            var maxDistance = 40;
            var x, y, line, distance, distancePoint, returnPoint;

            //this.displayImageInfo();

            if (this.isLtOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.left;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                } else {
                    line = this.image.top;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }

            if (this.isLbOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.left;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                } else {
                    line = this.image.bottom;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }

            if (this.isRtOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.right;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                } else {
                    line = this.image.top;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }


            if (this.isRbOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.right;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                } else {
                    line = this.image.bottom;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }

        } else {

            if (this.isRotationScaleZero) {
                var rotationRectanglePoints = Calc.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calc.toDegrees(this.image.rotation));
                var rotationRectangleBounds = Calc.getBoundsRectangle(rotationRectanglePoints);
                /*var scale = Calc.getScaleKeepAspectRatio(this.vo.originalBounds, rotationRectangleBounds);
                this.image.scale.x = scale.max;
                this.image.scale.y = scale.max;*/
            }

            this.recordImageInfo();
        }

        this.vo.rotation = Calc.toDegrees(this.image.rotation);
        this.vo.rotationScale = Calc.getOneToOne(Math.abs(this.image.rotation), 0, this.vo.limitRotationRadian, 0, 1);
    }


    rotateEnd(e) {
        console.log('rotateEnd');
    }


    cornerResizeStart(e) {
        console.log('resizeStart', e.target);
    }

    cornerResizeChange(e) {
        var target = e.target;
        target.x += e.dx;
        target.y += e.dy;

        this.resizeUI.cornerResize(target);
    }

    cornerResizeEnd(e) {
        console.log('resizeEnd');
        this.zoomImage();
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
            if (Calc.isInsideSquare(lt, rt, rb, lb, bounds[i]) === false)
                isInBounds = false;
        }

        return isInBounds;
    }


    get isLtOut() {
        return (Calc.isInsideSquare(
            this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.lt) === false);
    }

    get isRtOut() {
        return (Calc.isInsideSquare(
            this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.rt) === false);
    }

    get isRbOut() {
        return (Calc.isInsideSquare(
            this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.rb) === false);
    }

    get isLbOut() {
        return (Calc.isInsideSquare(
            this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.lb) === false);
    }



    get isReachedLimitLine() {
        var isReached = false;

        var lt = this.image.lt;
        var rt = this.image.rt;
        var rb = this.image.rb;
        var lb = this.image.lb;

        // 왼쪽 도달
        if (Calc.triangleArea(lb, lt, this.resizeUI.lt) > 0)
            isReached = true;

        if (Calc.triangleArea(lb, lt, this.resizeUI.lb) > 0)
            isReached = true;

        // 오른쪽 도달
        if (Calc.triangleArea(rt, rb, this.resizeUI.rt) > 0)
            isReached = true;

        if (Calc.triangleArea(rt, rb, this.resizeUI.rb) > 0)
            isReached = true;

        return isReached;
    }


    get isImageMininumSize() {
        var bounds = this.getBounds(this.canvas.width, this.canvas.height);

        var errorRange = 0.3;
        var scale = Calc.getBoundsScale(this.vo.originalBounds, bounds);
        var minScale = Calc.digit(scale.min, 2) + errorRange;
        var scaleX = Calc.digit(this.image.scale.x, 2);
        var scaleY = Calc.digit(this.image.scale.y, 2);

        return (minScale >= scaleX && minScale >= scaleY);
    }


    getBounds(canvasWidth, canvasHeight) {
        if(canvasWidth == null)
            canvasWidth = this.canvas.width;

        if(canvasHeight == null)
            canvasHeight = this.canvas.height;

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