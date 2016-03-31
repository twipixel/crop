import {Calc} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';
import {MoveUI} from './../ui/MoveUI';
import {ImageUI} from './../ui/ImageUI';
import {ImageVO} from './../vo/ImageVO';
import {KeyCode} from './../const/KeyCode';
import {Painter} from './../utils/Painter';


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
        this.isInitialize = false;
        this.imageElement = imageElement;

        this.isImageMoveOut = false;
        this.maxRotation = Calc.toRadians(45);
        this.minRotation = -this.maxRotation;

        //console.log('maxRotation:' + this.maxRotation + ', minRotation:' + this.minRotation);

        this.image = new ImageUI(this.imageElement);
        this.rotateUI = new RotateUI(this.canvas);
        this.moveUI = new MoveUI(this.canvas);
        this.resizeUI = new ResizeUI(this.canvas);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.moveUI);
        this.addChild(this.resizeUI);

        this.gGrid = new PIXI.Graphics();
        this.gLine = new PIXI.Graphics();
        this.gLens = new PIXI.Graphics();
        this.gRotate = new PIXI.Graphics();
        this.gBounds = new PIXI.Graphics();
        this.gRotate = new PIXI.Graphics();
        this.addChild(this.gLens);
        this.addChild(this.gLine);
        this.addChild(this.gGrid);
        this.addChild(this.gRotate);
        this.addChild(this.gBounds);
        this.addChild(this.gRotate);
    }

    addEvent() {
        window.document.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case KeyCode.ESC:
                    console.clear();
                    break;
                case KeyCode.SPACE:
                    console.log(this.image.toString());
                    break;
            }
        });

        this.moveUI.on('moveStart', this.moveStart.bind(this));
        this.moveUI.on('moveChange', this.moveChange.bind(this));
        this.moveUI.on('moveEnd', this.moveEnd.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.rotateUI.on('rotateChange', this.rotateChange.bind(this));
        this.rotateUI.on('rotateEnd', this.rotateEnd.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.resizeUI.on('cornerResizeStart', this.cornerResizeStart.bind(this));
        this.resizeUI.on('cornerResizeChange', this.cornerResizeChange.bind(this));
        this.resizeUI.on('cornerResizeEnd', this.cornerResizeEnd.bind(this));
    }

    update() {}

    resize() {
        var bounds = this.bounds;
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.cx = this.cw / 2;
        this.cy = this.ch / 2;

        //Painter.drawGrid(this.gGrid, this.cw, this.ch);

        if(this.isInitialize == false) {
            this.isInitialize = true;

            var imageBounds = Calc.getImageSizeKeepAspectRatio(this.image, bounds);
            imageBounds.x = this.cw / 2 - imageBounds.width / 2;
            imageBounds.y = this.ch / 2 - imageBounds.height / 2;

            this.resizeImage(bounds, this.image);
            this.rotateUI.resize(imageBounds);
            this.resizeUI.resize(imageBounds);
            this.moveUI.resize(imageBounds);

            this.test();
        }

        Painter.drawBounds(this.gBounds, bounds);
    }

    test() {
        return;

        var lineA = 'RT';
        var lineB = 'RB';

        var line = {
            a: {x:995, y:126},
            b: {x:976, y:791}
        };

        var point = {x:767, y:118};

        var distancePoint = Calc.getShortestDistancePoint(point, line.a, line.b);
        var returnPoint = Calc.getReturnPoint(point, distancePoint);

        Painter.drawDistToSegment(this.gLine, point, line.a, line.b, distancePoint);
        this.reportCheck('[RT RIGHT]', returnPoint, distancePoint, lineA, line.a, lineB, line.b, point);
    }

    resizeImage() {
        console.log('resizeImage');
        var size = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.cx;
        this.image.y = this.cy;
        this.imagePoints = this.image.points;
    }

    /**
     * 1. 줌 비율 구하기
     * 2. 러버밴드 리사이즈 구하기
     * 3. 러버밴드 설정
     * 4. 줌 비율에 이미지 리사이즈 하기
     * 5. 이미지 위치 구하기
     * 6. 이미지 위치 구할 때 러버밴드 리사이즈 후 위치를 기준 좌표로 삼으면 됩니다.
     * @param lens : 확대 / 축소 하기 위해 설정한 Rectangle
     */
    magnifyImage(lens) {
        console.log('magnifiyImage()');
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
        var centerOffsetX = this.image.x - this.image.lt.x;
        var centerOffsetY = this.image.y - this.image.lt.y;

        this.image.x = rubberbandBounds.x + posX + centerOffsetX;
        this.image.y = rubberbandBounds.y + posY + centerOffsetY;
    }

    //////////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////////

    moveStart(e) {
        console.log('moveStart()');
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;
    }

    moveChange(e) {

        if(this.isRotate === true) {
            console.log('!!!!!!!!!!!!!!! WHY MOVE!!');
            return;
        }

        this.image.x += e.change.x;
        this.image.y += e.change.y;

        //console.log('isHitSide', this.isHitSide, 'isImageOutOfBounds', this.isImageOutOfBounds);

        if (this.isImageOutOfBounds) {

            if(this.isHitSide === false) {
                var x = this.prevImageX + e.change.x * Math.cos(this.image.rotation);
                var y = this.prevImageY + e.change.x * Math.sin(this.image.rotation);
                this.image.x = x;
                this.image.y = y;
            } else {
                this.image.x = this.prevImageX;
                this.image.y = this.prevImageY;
            }
        }

        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;
    }

    moveEnd(e) {
        //
    }

    rotateStart(e) {
        //this.setImageMaxScale();
        //this.imagePoints = this.image.points;

        this.isRotate = true;

        this.prevx = this.image.x;
        this.prevy = this.image.y;
        this.prevlt = this.image.lt;
        this.prevrt = this.image.rt;
        this.prevrb = this.image.rb;
        this.prevlb = this.image.lb;

        this.gLine.clear();
        this.gRotate.clear();

        this.count = 0;
    }

    rotateChange(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.minRotation)
            this.image.rotation = this.minRotation;

        if (this.image.rotation > this.maxRotation)
            this.image.rotation = this.maxRotation;

        this.displayCurrentImageRotationBounds();

        if(this.isImageOutOfBounds) {
            var rotationPoints = Calc.getRotationRectanglePoints({x:this.image.x, y:this.image.y}, this.imagePoints, Calc.toDegrees(this.image.rotation));
            var rotationRect = Calc.getBoundsRectangle(rotationPoints, 8);
            var scale = Calc.getBoundsScale(rotationRect, this.image);
            var max = scale.max > this.imageMaxScale ? this.imageMaxScale : scale.max;
            var scaleWidth = this.image.width * max;
            var scaleHeight = this.image.height * max;

            if(scaleWidth > this.image.width && scaleHeight > this.image.height) {
                this.image.width = scaleWidth;
                this.image.height = scaleHeight;
            }

            //console.log('rotate', 'deg:', Calc.digit(Calc.toDegrees(this.image.rotation)), 'max:', Calc.digit(max, 2), 'w:', parseInt(this.image.width), 'h:', parseInt(this.image.height));


            console.log(Calc.leadingZero(this.count++, 2) + '|' + this.image.toString());


            Painter.drawBounds(this.gBounds, rotationRect, true, 1, 0xFF00FF, 0.7);

            var rotation = Calc.toDegrees(this.image.rotation);
            var line, distancePoint, returnPoint;

            // 위로 회전
            if(rotation > 0) {
                if (this.isLtOut) {
                    line = this.image.leftLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lt, distancePoint);
                    this.checkMaxMove('[LT LEFT]', 'LT', line.a, 'LB', line.b, this.resizeUI.lt);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.lt, line.a, line.b, distancePoint);
                    this.reportCheck('[LT LEFT]', returnPoint, distancePoint, 'LT', line.a, 'LB', line.b, this.resizeUI.lt);
                }

                if (this.isLbOut) {
                    line = this.image.bottomLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lb, distancePoint);
                    this.checkMaxMove('[LB BOTTOM]', 'LB', line.a, 'RB', line.b, this.resizeUI.lb);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.lb, line.a, line.b, distancePoint);
                    this.reportCheck('[LB BOTTOM]', returnPoint, distancePoint, 'LB', line.a, 'RB', line.b, this.resizeUI.lb);
                }

                if (this.isRtOut) {
                    line = this.image.topLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rt, distancePoint);
                    this.checkMaxMove('[RT TOP]', 'LT', line.a, 'RT', line.b, this.resizeUI.rt);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.rt, line.a, line.b, distancePoint);
                    this.reportCheck('[RT TOP]', returnPoint, distancePoint, 'LT', line.a, 'RT', line.b, this.resizeUI.rt);
                }

                if (this.isRbOut) {
                    line = this.image.rightLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rb, distancePoint);
                    this.checkMaxMove('[RB RIGHT]', 'RT', line.a, 'RB', line.b, this.resizeUI.rb);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.rb, line.a, line.b, distancePoint);
                    this.reportCheck('[RB RIGHT]', returnPoint, distancePoint, 'RT', line.a, 'RB', line.b, this.resizeUI.rb);
                }
            } else {
                if (this.isLtOut) {
                    line = this.image.topLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lt, distancePoint);
                    this.checkMaxMove('[LT TOP]', 'LT', line.a, 'RT', line.b, this.resizeUI.lt);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.lt, line.a, line.b, distancePoint);
                    this.reportCheck('[LT TOP]', returnPoint, distancePoint, 'LT', line.a, 'RT', line.b, this.resizeUI.lt);
                }

                if (this.isLbOut) {
                    line = this.image.leftLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.lb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.lb, distancePoint);
                    this.checkMaxMove('[LB LEFT]', 'LT', line.a, 'LB', line.b, this.resizeUI.lb);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.lb, line.a, line.b, distancePoint);
                    this.reportCheck('[LB LEFT]', returnPoint, distancePoint, 'LT', line.a, 'LB', line.b, this.resizeUI.lb);
                }

                if (this.isRtOut) {
                    line = this.image.rightLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rt, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rt, distancePoint);
                    this.checkMaxMove('[RT RIGHT]', 'RT', line.a, 'RB', line.b, this.resizeUI.rt);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.rt, line.a, line.b, distancePoint);
                    this.reportCheck('[RT RIGHT]', returnPoint, distancePoint, 'RT', line.a, 'RB', line.b, this.resizeUI.rt);
                }

                if (this.isRbOut) {
                    line = this.image.bottomLine;
                    distancePoint = Calc.getShortestDistancePoint(this.resizeUI.rb, line.a, line.b);
                    returnPoint = Calc.getReturnPoint(this.resizeUI.rb, distancePoint);
                    this.checkMaxMove('[RB BOTTOM]', 'LB', line.a, 'RB', line.b, this.resizeUI.rb);
                    this.image.x = this.image.x + returnPoint.x;
                    this.image.y = this.image.y + returnPoint.y;

                    this.prevx = this.image.x;
                    this.prevy = this.image.y;
                    //Painter.drawDistToSegment(this.gLine, this.resizeUI.rb, line.a, line.b, distancePoint);
                    this.reportCheck('[RB BOTTOM]', returnPoint, distancePoint, 'LB', line.a, 'RB', line.b, this.resizeUI.rb);
                }
            }
        }

        /*var rotationPoints = Calc.getRotationRectanglePoints({x:this.image.x, y:this.image.y}, this.imagePoints, Calc.toDegrees(this.image.rotation));
        var rotationRect = Calc.getBoundsRectangle(rotationPoints, 8);
        var scale = Calc.getBoundsScale(rotationRect, this.image);
        this.image.width = this.image.width * scale.max;
        this.image.height = this.image.height * scale.max;
        Painter.drawBounds(this.boundsGraphics, rotationRect, 0xFF00FF, 1);*/
    }


    checkMaxMove(title, lineALabel, lineA, lineBLabel, lineB, point) {
        return;

        var max = 60;
        var distancePoint = Calc.getShortestDistancePoint(point, lineA, lineB);
        var returnPoint = Calc.getReturnPoint(point, distancePoint);
        var x = this.image.x + returnPoint.x;
        var y = this.image.y + returnPoint.y;

        if(Math.abs(this.prevx - x) > max || Math.abs(this.prevy - y) > max) {
            console.log('CHECK MAX MOVE ' + title + ' prev[' +
                Calc.leadingZero(parseInt(this.prevx), 4) + ', ' + Calc.leadingZero(parseInt(this.prevy), 4) + '], next[' +
                Calc.leadingZero(parseInt(x), 4) + ', ' + Calc.leadingZero(parseInt(y), 4) + ']');

            console.log(
                lineALabel + ' [' + Calc.leadingZero(parseInt(lineA.x), 4) + ', ' + Calc.leadingZero(parseInt(lineA.y), 4) + '], ' +
                lineBLabel + ' [' + Calc.leadingZero(parseInt(lineB.x), 4) + ', ' + Calc.leadingZero(parseInt(lineB.y), 4) + ']');

            console.log(this.image.toString());
        }
    }

    reportCheck(title, returnPoint, distancePoint, lineALabel, lineA, lineBLabel, lineB, point) {
        var reportValue = 60;

        this.reportHit(title, returnPoint, distancePoint, lineALabel, lineA, lineBLabel, lineB, point);
        Painter.drawPoints(this.gRotate, this.image.points, false, 1, 0xCCCCCC, 0.2);
        Painter.drawDistToSegment(this.gLine, point, lineA, lineB, distancePoint);

        /*if(Math.abs(returnPoint.x) > reportValue || Math.abs(returnPoint.y) > reportValue) {
            console.log('\nCASE MAX RETURN');
            this.reportHit(title, returnPoint, distancePoint, lineALabel, lineA, lineBLabel, lineB, point);

            Painter.drawPoints(this.gRotate, this.image.points, false, 1, 0xCCCCCC, 0.2);
            Painter.drawDistToSegment(this.gLine, point, lineA, lineB, distancePoint);
        } else {
            if(
                Math.abs(this.prevlt.x - this.image.lt.x) > reportValue ||
                Math.abs(this.prevlt.y - this.image.lt.y) > reportValue ||
                Math.abs(this.prevrt.x - this.image.rt.x) > reportValue ||
                Math.abs(this.prevrt.y - this.image.rt.y) > reportValue ||
                Math.abs(this.prevrb.x - this.image.rb.x) > reportValue ||
                Math.abs(this.prevrb.y - this.image.rb.y) > reportValue ||
                Math.abs(this.prevlb.x - this.image.lb.x) > reportValue ||
                Math.abs(this.prevlb.y - this.image.lb.y) > reportValue) {

                console.log('\nCASE MAX MOVE');
                this.reportHit(title, returnPoint, distancePoint, lineALabel, lineA, lineBLabel, lineB, point);

                Painter.drawPoints(this.gRotate, this.image.points, false, 1, 0xCCCCCC, 0.2);
                Painter.drawDistToSegment(this.gLine, point, lineA, lineB, distancePoint);
            }
        }*/

        this.prevlt = this.image.lt;
        this.prevrt = this.image.rt;
        this.prevrb = this.image.rb;
        this.prevlb = this.image.lb;
    }

    reportHit(title, returnPoint, distancePoint, lineALabel, lineA, lineBLabel, lineB, point) {
        var report = '  ' + title + ' ' +
            'RETURN[' + parseInt(returnPoint.x) + ', ' + parseInt(returnPoint.y) + ']\n' +
            lineALabel + '[' + parseInt(lineA.x) + ', ' + parseInt(lineA.y) + '], ' +
            lineBLabel + '[' + parseInt(lineB.x) + ', ' + parseInt(lineB.y) + '], ' +
            'Dt[' + parseInt(distancePoint.x) + ', ' + parseInt(distancePoint.y) + '], ' +
            'P[' + parseInt(point.x) + ', ' + parseInt(point.y) + ']';
        console.log('------------------------------------------------------------------');
        console.log(this.image.toString());
        console.log('------------------------------------------------------------------');
        console.log(report);
        console.log('------------------------------------------------------------------');
    }


    rotateEnd(e) {
        this.isRotate = false;
    }

    cornerResizeStart(e) {
        this.lensBounds = this.resizeUI.bounds;
    }

    cornerResizeChange(e) {
        var target = e.target;
        var tx = target.x + e.dx;
        var ty = target.y + e.dy;
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

        Painter.drawBounds(this.gLens, this.lensBounds, true, 1, 0xFF00FF, 0.2);
    }

    cornerResizeEnd(e) {
        this.moveUI.resize(this.resizeUI.bounds);
        this.magnifyImage(this.resizeUI.bounds);
        this.gLens.clear();
    }

    //////////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////////

    /**
     * 이미지가 바운드를 벗어 났는지 체크
     * @returns {boolean}
     */
    get isImageOutOfBounds() {
        var image = this.image;
        var lt = image.lt;
        var rt = image.rt;
        var rb = image.rb;
        var lb = image.lb;
        var boundsPoints = [this.resizeUI.lt, this.resizeUI.rt, this.resizeUI.rb, this.resizeUI.lb];

        //console.log(boundsPoints[0].x, boundsPoints[0].y);
        //console.log(boundsPoints[1].x, boundsPoints[1].y);
        //console.log(boundsPoints[2].x, boundsPoints[2].y);
        //console.log(boundsPoints[3].x, boundsPoints[3].y);

        for (let i = 0; i < boundsPoints.length; i++) {
            if (Calc.isInsideSquare(lt, rt, rb, lb, boundsPoints[i]) === false)
                return true;
        }
        return false;
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

    //////////////////////////////////////////////////////////////////////////
    // Debug Util Function
    //////////////////////////////////////////////////////////////////////////

    setImageMaxScale() {
        var imageRect = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
        var w = imageRect.width;
        var h = imageRect.height;

        this.imageMaxScaleHeight = Calc.getDiagonal(w, h);
        this.imageMaxScaleWidth = (w * this.imageMaxScaleHeight) / h;
        this.imageMaxScaleX = this.imageMaxScaleWidth / w;
        this.imageMaxScaleY = this.imageMaxScaleHeight / h;
        this.imageMaxScale = this.imageMaxScaleY;

        console.log('-----------------------------------------');
        console.log('setImageMaxScale');
        console.log('imageRect w:' + w + ', h:' + h);
        console.log('image w:' + this.image.width + ', h:' + this.image.height);
        console.log('scaleX:' + this.imageMaxScaleX + ', scaleY:' + this.imageMaxScaleY);
        console.log('-----------------------------------------');
    }

    displayCurrentImageRotationBounds() {
        var imageRect = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);

        var imagePoint = {
            lt: {x:0, y:0},
            rt: {x:imageRect.width, y:0},
            rb: {x:imageRect.width, y:imageRect.height},
            lb: {x:0, y:imageRect.height}
        };

        var rotationPoints = Calc.getRotationRectanglePoints({x:imageRect.width / 2, y:imageRect.height / 2}, imagePoint, Calc.toDegrees(this.image.rotation));
        var rotationRect = Calc.getBoundsRectangle(rotationPoints, 8);
        rotationRect.x = this.canvas.width / 2 - rotationRect.width / 2;
        rotationRect.y = this.canvas.height / 2 - rotationRect.height / 2;
        Painter.drawBounds(this.gRotate, rotationRect, true, 2, 0x00FCFF, 0.4);
    }

    getCurrentImageRect() {
        var imageRect = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);

        var imagePoint = {
            lt: {x:0, y:0},
            rt: {x:imageRect.width, y:0},
            rb: {x:imageRect.width, y:imageRect.height},
            lb: {x:0, y:imageRect.height}
        };

        var rotationPoints = Calc.getRotationRectanglePoints({x:imageRect.width / 2, y:imageRect.height / 2}, imagePoint, Calc.toDegrees(this.image.rotation));
        var rotationRect = Calc.getBoundsRectangle(rotationPoints, 8);
        rotationRect.x = this.image.x;
        rotationRect.y = this.image.y;

        return rotationRect;
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
}