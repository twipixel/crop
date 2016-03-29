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
        this.isImageMoveOut = false;
        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.isInitialize = false;
        this.imageElement = imageElement;

        this.grid = new PIXI.Graphics();
        this.boundsGraphics = new PIXI.Graphics();
        this.scaleBoundsGraphics = new PIXI.Graphics();
        this.image = new ImageUI(this.imageElement);
        this.rotateUI = new RotateUI(this.canvas);
        this.moveUI = new MoveUI(this.canvas);
        this.resizeUI = new ResizeUI(this.canvas);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.moveUI);
        this.addChild(this.resizeUI);
        this.addChild(this.boundsGraphics);
        this.addChild(this.scaleBoundsGraphics);
        this.addChild(this.grid);
    }


    addEvent() {
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
        var bounds = this.bounds;

        this.drawGrid();

        this.centerPoint = {x: canvasWidth / 2, y: canvasHeight / 2};
        this.imageBoundsPoints = this.image.getGlobalBoundsPoints();

        if(this.isInitialize == false) {
            this.isInitialize = true;

            this.resizeImageRect = this.vo.getSizeByBounds(bounds);
            this.resizeImageRect.x = this.centerPoint.x - this.resizeImageRect.width / 2;
            this.resizeImageRect.y = this.centerPoint.y - this.resizeImageRect.height / 2;

            this.resizeImage(bounds, this.image);
            this.rotateUI.resize(this.resizeImageRect);
            this.resizeUI.resize(this.resizeImageRect);
            this.moveUI.resize(this.resizeImageRect);
        }

        this.drawBounds(this.boundsGraphics, this.bounds);
    }


    resizeImage(bounds, resizeImageRect) {
        var size = Calc.getImageSizeKeepAspectRatio(this.vo.originalBounds, bounds);
        this.image.width = size.width;
        this.image.height = size.height;

        this.image.x = this.canvas.width / 2 - this.image.width / 2;
        this.image.y = this.canvas.height / 2 - this.image.height / 2;

        console.log('resizeImage');
        this.recordImageInfo();
    }


    magnifyImage(lens) {
        // 1. 줌 비율 구하기
        // 2. 러버밴드 리사이즈 구하기
        // 3. 러버밴드 설정
        // 4. 줌 비율에 이미지 리사이즈
        // 5. 이미지 위치 구하기
        //      러버밴드 리사이즈 후 위치를 기준 좌료로 삼으면 된다.

        //var lens = this.resizeUI.bounds;
        var lensX = this.image.lt.x - lens.x;
        var lensY = this.image.lt.y - lens.y;

        this.zoom = Calc.getBoundsScale(this.bounds, lens).min;
        var rubberbandBounds = Calc.getImageSizeKeepAspectRatio(lens, this.bounds);
        rubberbandBounds.x = this.canvas.width / 2 - rubberbandBounds.width / 2;
        rubberbandBounds.y = this.canvas.height / 2 - rubberbandBounds.height / 2;
        this.resizeUI.setSize(rubberbandBounds);

        this.image.width = this.image.width * this.zoom;
        this.image.height = this.image.height * this.zoom;

        var posX = lensX * this.zoom;
        var posY = lensY * this.zoom;
        this.image.x = rubberbandBounds.x + posX;
        this.image.y = rubberbandBounds.y + posY;
    }


    displayImageInfo() {
        console.log('------------------------------------');
        console.log(
            ' Canvas[' + Calc.digit(this.canvas.width) + ',' + Calc.digit(this.canvas.height) + ']\n',
            'ORIGINAL[' + Calc.digit(this.vo.originalWidth) + ',' + Calc.digit(this.vo.originalHeight) + ']\n',
            'Bounds[' + Calc.digit(this.bounds.width) + ',' + Calc.digit(this.bounds.height) + ']\n',
            'Image[' + Calc.digit(this.image.width) + ',' + Calc.digit(this.image.height) + ']\n'
        );
        console.log('------------------------------------');
    }


    recordImageInfo() {
        this.prevImageInfo.x = this.image.x;
        this.prevImageInfo.y = this.image.y;
        this.prevImageInfo.width = this.image.width;
        this.prevImageInfo.height = this.image.height;
        this.prevImageInfo.rotation = this.image.rotation;
    }


    drawBounds(graphics, bounds, color = 0xFF3300, alpha = 0.7) {
        graphics.clear();
        graphics.lineStyle(1, color, alpha);
        graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        graphics.endFill();
    }


    drawGrid() {
        var g = this.grid;
        g.clear();

        var heavyAlpha = 0.3;
        var lightAlpha = 0.1;
        var w = this.canvas.width;
        var h = this.canvas.height;

        for (var x = 0.5; x < w; x += 10) {
            if ((x - 0.5) % 50 === 0)
                g.lineStyle(1, 0x999999, heavyAlpha);
            else
                g.lineStyle(1, 0xdddddd, lightAlpha);

            g.moveTo(x, 0);
            g.lineTo(x, h);
        }

        for (var y = 0.5; y < h; y += 10) {
            if ((y - 0.5) % 50 === 0)
                g.lineStyle(1, 0x999999, heavyAlpha);
            else
                g.lineStyle(1, 0xdddddd, lightAlpha);

            g.moveTo(0, y);
            g.lineTo(w, y);
        }

        g.endFill();
    }


    //////////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////////


    moveStart(e) {
        console.log('moveStart');
    }

    moveChange(e) {
        if (this.isImageMoveOut == false) {
            this.image.x += e.change.x;
            this.image.y += e.change.y;
        } else {
            //this.image.x += e.change.x * 0.3;
            //this.image.y += e.change.y * 0.3;
        }

        console.log('isReachedLimitLine', this.isHitSide);

        if (this.isImageOutOfBounds === false) {
            //this.image.x = this.prevImageInfo.x;
            //this.image.y = this.prevImageInfo.y;
            var x = this.prevImageInfo.x + e.change.x * Math.cos(this.image.rotation);
            var y = this.prevImageInfo.y + e.change.x * Math.sin(this.image.rotation);
            this.image.x = x;
            this.image.y = y;

            this.isImageMoveOut = true;
            if (this.returnX === -1) {
                this.returnX = this.prevImageInfo.x;
                this.returnY = this.prevImageInfo.y;
            }
        } else {
            this.returnX = -1;
            this.returnY = -1;
            this.isImageMoveOut = false;

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
        /*this.resizeImageRect = this.vo.getSizeByBounds(this.bounds);
        this.resizeImageRect.x = this.centerPoint.x - this.resizeImageRect.width / 2;
        this.resizeImageRect.y = this.centerPoint.y - this.resizeImageRect.height / 2;*/


        /*this.image.anchor.x = 0.5;
        this.image.anchor.y = 0.5;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;*/
        this.recordImageInfo();
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

            var scale = Calc.getBoundsScale(this.vo.originalBounds, rotationRectangleBounds);
            this.image.width = scale.max * this.vo.originalBounds.width;
            this.image.height = scale.max * this.vo.originalBounds.height;


            var lt = this.image.lt;
            var rt = this.image.rt;
            var rb = this.image.rb;
            var lb = this.image.lb;

            var x, y, line, distancePoint, returnPoint;


            /*
            if (this.isLtOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.leftLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                } else {
                    line = this.image.topLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }

            if (this.isLbOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.leftLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                } else {
                    line = this.image.bottomLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }

            if (this.isRtOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.rightLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                } else {
                    line = this.image.topLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rt, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }


            if (this.isRbOut) {
                if (this.isReachedLimitLine) {
                    line = this.image.rightLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                } else {
                    line = this.image.bottomLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rb, distancePoint);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;
                }
            }
            */

        } else {

            if (this.isReadyToRotation) {
                var rotationRectanglePoints = Calc.getRotationRectanglePoints(this.centerPoint, this.imageBoundsPoints, Calc.toDegrees(this.image.rotation));
                var rotationRectangleBounds = Calc.getBoundsRectangle(rotationRectanglePoints);
            }

            this.recordImageInfo();
        }

        this.vo.rotation = Calc.toDegrees(this.image.rotation);
        this.vo.rotationScale = Calc.getOneToOne(Math.abs(this.image.rotation), 0, this.vo.limitRotationRadian, 0, 1);
    }


    rotateEnd(e) {
        this.image.pivot = new PIXI.Point(0, 0);
        //this.image.x = this.prevImageX;
        //this.image.y = this.prevImageY;
    }


    cornerResizeStart(e) {
        this.lensBounds = this.resizeUI.bounds;
    }

    cornerResizeChange(e) {
        var target = e.target;
        var tx = target.x + e.dx;
        var ty = target.y + e.dy;

        //var dx = Math.abs(e.dx);
        //var dy = Math.abs(e.dy);

        // 2배
        var dx = Math.abs(e.dx) * 2;
        var dy = Math.abs(e.dy) * 2;

        var lens = this.resizeUI.bounds;

        var isOutX = false;
        var isOutY = false;


        if (tx > this.lensBounds.x && tx < (this.lensBounds.x + this.lensBounds.width) && ty > this.lensBounds.y && ty < (this.lensBounds.y + this.lensBounds.height)) {
            target.x = tx;
            target.y = ty;
            this.resizeUI.cornerResize(target);
        } else {
            if(tx < lens.x) {
                isOutX = true;
                lens.x = lens.x - dx;
                lens.width = lens.width + dx;
                this.magnifyImage(lens);
            } else if (tx > lens.x + lens.width) {
                isOutX = true;
                lens.width = lens.width + dx;
                this.magnifyImage(lens);
            } else {
                //
            }

            if(ty < lens.y) {
                isOutY = true;
                lens.y = lens.y - dy;
                lens.height = lens.height + dy;
                this.magnifyImage(lens);
            } else if(ty > lens.y + lens.height) {
                isOutY = true;
                lens.height = lens.height + dy;
                this.magnifyImage(lens);
            } else {
                //
            }
        }

        if(isOutX === false)
            target.x = tx;

        if(isOutY === false)
            target.y = ty;

        this.resizeUI.cornerResize(target);
        this.drawBounds(this.scaleBoundsGraphics, this.lensBounds, 0xFF00FF, 0.7);
    }

    cornerResizeEnd(e) {
        this.moveUI.resize(this.resizeUI.bounds);
        this.magnifyImage(this.resizeUI.bounds);
        this.scaleBoundsGraphics.clear();
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


    get isHitSide() {
        var isHit = false;

        var lt = this.image.lt;
        var rt = this.image.rt;
        var rb = this.image.rb;
        var lb = this.image.lb;

        // 왼쪽 도달
        if (Calc.triangleArea(lb, lt, this.resizeUI.lt) > 0)
            isHit = true;

        if (Calc.triangleArea(lb, lt, this.resizeUI.lb) > 0)
            isHit = true;

        // 오른쪽 도달
        if (Calc.triangleArea(rt, rb, this.resizeUI.rt) > 0)
            isHit = true;

        if (Calc.triangleArea(rt, rb, this.resizeUI.rb) > 0)
            isHit = true;

        return isHit;
    }


    get bounds() {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;

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
}