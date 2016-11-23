import {Calc} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';
import {MoveUI} from './../ui/MoveUI';
import {ImageUI} from './../ui/ImageUI';
import {KeyCode} from './../const/KeyCode';
import {HitSide} from './../const/HitSide';
import {Painter} from './../utils/Painter';


export class Cropper extends PIXI.Container {
    constructor(canvas, imageElement, textureCanvas) {
        super();
        this.initialize(canvas, imageElement, textureCanvas);
        this.addEvent();
    }

    initialize(canvas, imageElement, textureCanvas) {
        this.drawHitId = 0;
        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.isInitialize = false;

        this._stageRotation = 0;
        this.limitRotation = Calc.toRadians(45);
        this.maxRotation = this.limitRotation;
        this.minRotation = -this.limitRotation;
        this.rotation90 = Calc.toRadians(90);

        this.image = new ImageUI(this.textureCanvas);
        this.moveUI = new MoveUI(this.canvas);
        this.rotateUI = new RotateUI(this.canvas);
        this.resizeUI = new ResizeUI(this.canvas);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.moveUI);
        this.addChild(this.resizeUI);

        this.gGrid = new PIXI.Graphics();
        this.gLine = new PIXI.Graphics();
        this.gLens = new PIXI.Graphics();
        this.gImage = new PIXI.Graphics();
        this.gBounds = new PIXI.Graphics();
        this.gRotate = new PIXI.Graphics();
        this.gMove = new PIXI.Graphics();
        this.gTest = new PIXI.Graphics();
        this.addChild(this.gLens);
        this.addChild(this.gLine);
        this.addChild(this.gGrid);
        this.addChild(this.gImage);
        this.addChild(this.gBounds);
        this.addChild(this.gRotate);
        this.addChild(this.gMove);
        this.addChild(this.gTest);
    }

    clearGraphics() {
        this.gLens.clear();
        this.gLine.clear();
        this.gGrid.clear();
        this.gImage.clear();
        this.gBounds.clear();
        this.gRotate.clear();
        this.gMove.clear();
        this.gTest.clear();
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

                case KeyCode.NUM_1:
                    this.testPivot(e.keyCode);
                    break;

                case KeyCode.NUM_2:
                    this.testPivot(e.keyCode);
                    break;

                case KeyCode.NUM_3:
                    this.testPivot(e.keyCode);
                    break;

                case KeyCode.NUM_4:
                    this.testPivot(e.keyCode);
                    break;

                case KeyCode.C:
                    this.clearGraphics();
                    break;

                case KeyCode.R:
                    this.rotate();
                    break;
            }
        });

        this.moveUI.on('moveStart', this.moveStart.bind(this));
        this.moveUI.on('moveChange', this.moveChange.bind(this));
        this.moveUI.on('moveEnd', this.moveEnd.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.rotateUI.on('rotateChange', this.rotateChange.bind(this));
        this.rotateUI.on('rotateEnd', this.rotateEnd.bind(this));
        this.resizeUI.on('cornerResizeStart', this.cornerResizeStart.bind(this));
        this.resizeUI.on('cornerResizeChange', this.cornerResizeChange.bind(this));
        this.resizeUI.on('cornerResizeEnd', this.cornerResizeEnd.bind(this));
    }

    update() {}

    resize() {
        // 최초 실행: 화면 초기화
        if (this.isInitialize == false) {
            this.isInitialize = true;
            this.initializeImage();
            var imageBounds = this.image.bounds;
            this.resizeUI.resize(imageBounds);
            this.moveUI.setSize(this.resizeUI.bounds);

            this.image.width = imageBounds.width * 1.2;
            this.image.height = imageBounds.height * 1.2;
            this.test();
        } else {
            var resizeUIBounds = this.resizeUI.bounds;
            this.magnifyImage(resizeUIBounds);
            this.moveUI.setSize(resizeUIBounds);
        }

        this.rotateUI.resize();
        //Painter.drawBounds(this.gBounds, this.bounds);

        this.gImage.clear();
        this.gRotate.clear();
    }

    initializeImage() {
        var size = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;
        this.image.updatePrevLtPointForPivot();
    }

    //////////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////////

    test() {
        //this.image.visible = false;
        //this.resizeUI.visible = false;
        //this.moveUI.visible = false;
        //this.gBounds.visible = false;
        //Painter.drawGrid(this.gGrid, this.canvas.width, this.canvas.height);

        //this.testNextPosition();
    }

    testNextPosition() {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        var radius = 30;
        var rotation30 = Calc.toRadians(30);
        var rotation45 = Calc.toRadians(45);

        var p1 = Calc.getNextMovePosition(cx, cy, radius, rotation45);
        var p2 = Calc.getNextMovePosition(cx, cy, -radius, rotation45);
        var p3 = Calc.getNextMovePosition(cx, cy, 60, -rotation45);
        var p4 = Calc.getNextMovePosition(cx, cy, 90, rotation30);
        var p5 = Calc.getNextMovePosition(cx, cy, 90, -rotation30);

        Painter.drawCircle(this.gTest, {x:cx, y:cy}, 4, 0x000000);
        Painter.drawCircle(this.gTest, p1, 4);
        Painter.drawCircle(this.gTest, p2, 4);
        Painter.drawCircle(this.gTest, p3, 4);
        Painter.drawCircle(this.gTest, p4, 4);
        Painter.drawCircle(this.gTest, p5, 4);
    }

    testNextPoint() {
        var d = 2;
        this.prevX = this.canvas.width / 2;
        this.prevY = this.canvas.height / 2;

        var rotation = Calc.toRadians(45) - Calc.toRadians(90);   // 우상단으로
        //var rotation = Calc.toRadians(45) + Calc.toRadians(90);     // 좌하단으로

        for(var i=0; i<90; i++) {
            var x = this.prevX + d * Math.cos(rotation);
            var y = this.prevY + d * Math.sin(rotation);
            //Painter.drawLine(this.gMove, {x:this.prevX, y:this.prevY}, {x:x, y:y}, 2);
            this.prevX = x;
            this.prevY = y;
        }
    }

    testPivot(keycode) {
        var offset;

        switch (keycode) {
            case KeyCode.NUM_1:
                offset = 0;
                this.image.setPivot({x:offset, y:offset});
                break;

            case KeyCode.NUM_2:
                offset = -10;
                this.image.setPivot({x:offset, y:offset});
                break;

            case KeyCode.NUM_3:
                offset = -20;
                this.image.setPivot({x:offset, y:offset});
                break;

            case KeyCode.NUM_4:
                offset = -30;
                this.image.setPivot({x:offset, y:offset});
                break;
        }
    }

    setImagePivot() {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        this.image.setPivot({x:cx, y:cy});
    }

    moveStart(e) {
        this.stopDrawHit();

        this.isHit = false;
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;

        this.image.updatePrevLtPointForPivot();
    }

    moveChange(e) {
        var nextPoint;
        var dx = e.change.x;
        var dy = e.change.y;
        var ax = Math.abs(dx);
        var ay = Math.abs(dy);
        var cx = this.prevImageX;
        var cy = this.prevImageY;
        var rotation = this.image.rotation;
        this.image.x += dx;
        this.image.y += dy;

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            this.isHit = true;

            /*if(this.isHit) {
                var hitSide = this.image.getHitSide(this.resizeUI);

                switch (hitSide) {
                    case HitSide.LEFT:
                    case HitSide.RIGHT:
                        nextPoint = Calc.getNextMovePosition(cx, cy, dy, rotation + this.rotation90);
                        break;

                    case HitSide.TOP:
                    case HitSide.BOTTOM:
                        nextPoint = Calc.getNextMovePosition(cx, cy, dx, rotation);
                        break;

                    default:
                        this.image.fixMove(this.resizeUI, this.stageRotation);
                        break;
                }

                if(nextPoint) {
                    this.image.x = nextPoint.x;
                    this.image.y = nextPoint.y;
                }
            } else {
                this.isHit = true;
                this.image.fixMove(this.resizeUI, this.stageRotation);
            }*/

        } else {
            this.isHit = false;
        }

        if (this.image.isContainsBounds(this.resizeUI)) {
            //this.prevImageX = this.image.x;
            //this.prevImageY = this.image.y;
        } else {
            //this.image.x = this.prevImageX;
            //this.image.y = this.prevImageY;
        }

        this.image.displayHit(this.isHit);
        this.image.updatePrevLtPointForPivot();
    }

    moveEnd(e) {
        this.displayHitPoint();
        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    }


    displayHitPoint() {
        var hitSide = this.image.getHitSide(this.resizeUI).split(',');
        var isLtOut = !this.resizeUI.isLtInsideBounds(this.image);
        var isRtOut = !this.resizeUI.isRtInsideBounds(this.image);
        var isRbOut = !this.resizeUI.isRbInsideBounds(this.image);
        var isLbOut = !this.resizeUI.isLbInsideBounds(this.image);
        this.hitSide = hitSide;

        this.drawTime = 4000;

        console.log(hitSide.length, hitSide);
        console.log('isLtOut:', isLtOut, 'isRtOut:', isRtOut, 'isRbOut', isRbOut, 'isLbOut', isLbOut);
        this.startDrawHit();
    }


    startDrawHit() {
        clearTimeout(this.drawHitId);
        clearTimeout(this.drawId0);
        clearTimeout(this.drawId1);
        clearTimeout(this.drawId2);
        clearTimeout(this.drawId3);
        clearTimeout(this.drawId4);
        this.checkDrawHit();
    }


    stopDrawHit() {
        this.drawClear();
        clearTimeout(this.drawHitId);
    }


    checkDrawHit() {
        if(this.hitSide == HitSide.NONE || this.hitSide == void 0) return;
        var imageHitSide = this.hitSide.pop();
        this.drawHit(imageHitSide);
    }


    drawHit(hitSide) {
        console.log('drawHit(' + hitSide + ')');

        var line;

        switch (hitSide) {
            case HitSide.TOP:
                line = this.image.topLine;
                break;

            case HitSide.RIGHT:
            case HitSide.RIGHT_TOP:
            case HitSide.RIGHT_BOTTOM:
                line = this.image.rightLine;
                break;

            case HitSide.BOTTOM:
                line = this.image.bottomLine;
                break;

            case HitSide.LEFT:
            case HitSide.LEFT_TOP:
            case HitSide.LEFT_BOTTOM:
                line = this.image.leftLine;
                break;
        }

        this.drawTriangle(line);
    }


    drawClear() {
        this.gTest.clear();
        if(this.icon) this.removeChild(this.icon);
        if(this.arrow) this.removeChild(this.arrow);
    }


    drawTriangle(line) {

        this.drawClear();

        let inColor = 0x0D99FC;
        let outColor = 0xEB3333;

        let uiPoints = this.resizeUI.points;
        let lt, rt, rb, lb, color,
            ltColor, rtColor, rbColor, lbColor;

        let result;
        let alpha = 1;
        let thickness = 1;
        let isFill = false;
        let iconRadius = 10;
        let iconStr, iconPoint;
        let leftString = '+ LEFT (OUT)';
        let rightString = '- RIGHT (IN)';

        lt = Calc.triangleArea(uiPoints.lt, line.a, line.b);
        rt = Calc.triangleArea(uiPoints.rt, line.a, line.b);
        rb = Calc.triangleArea(uiPoints.rb, line.a, line.b);
        lb = Calc.triangleArea(uiPoints.lb, line.a, line.b);

        this.drawId0 = setTimeout(() => {
            this.drawClear();

            result = Calc.triangleArea(uiPoints.lt, line.a, line.b);
            color = (result > 0) ? outColor : inColor;
            Painter.drawLine(this.gTest, uiPoints.lt, line.a, 1, color);
            Painter.drawLine(this.gTest, uiPoints.lt, line.b, 1, color);

            iconStr = (result > 0) ? leftString : rightString;
            this.icon = Painter.getIcon(iconStr, iconRadius, color);
            iconPoint = Calc.getTriangleCenterPoint(uiPoints.lt, line.a, line.b);
            this.icon.x = iconPoint.x;
            this.icon.y = iconPoint.y;
            this.arrow = Painter.getArrow(Calc.getLineMiddle(line.a, line.b), this.icon);
            this.addChild(this.arrow);
            this.addChild(this.icon);

            Painter.drawTriagle(this.gTest, uiPoints.lt, line.a, line.b, thickness, color, alpha, isFill);
        }, this.drawTime * 0);

        this.drawId1 = setTimeout(() => {
            this.drawClear();

            result = Calc.triangleArea(uiPoints.rt, line.a, line.b);
            color = (result > 0) ? outColor : inColor;
            Painter.drawLine(this.gTest, uiPoints.rt, line.a, 1, color);
            Painter.drawLine(this.gTest, uiPoints.rt, line.b, 1, color);

            iconStr = (result > 0) ? leftString : rightString;
            this.icon = Painter.getIcon(iconStr, iconRadius, color);
            iconPoint = Calc.getTriangleCenterPoint(uiPoints.rt, line.a, line.b);
            this.icon.x = iconPoint.x;
            this.icon.y = iconPoint.y;
            this.arrow = Painter.getArrow(Calc.getLineMiddle(line.a, line.b), this.icon);
            this.addChild(this.arrow);
            this.addChild(this.icon);

            Painter.drawTriagle(this.gTest, uiPoints.rt, line.a, line.b, thickness, color, alpha, isFill);
        }, this.drawTime * 1);

        this.drawId2 = setTimeout(() => {
            this.drawClear();

            result = Calc.triangleArea(uiPoints.rb, line.a, line.b);
            color = (result > 0) ? outColor : inColor;
            Painter.drawLine(this.gTest, uiPoints.rb, line.a, 1, color);
            Painter.drawLine(this.gTest, uiPoints.rb, line.b, 1, color);

            iconStr = (result > 0) ? leftString : rightString;
            this.icon = Painter.getIcon(iconStr, iconRadius, color);
            iconPoint = Calc.getTriangleCenterPoint(uiPoints.rb, line.a, line.b);
            this.icon.x = iconPoint.x;
            this.icon.y = iconPoint.y;
            this.arrow = Painter.getArrow(Calc.getLineMiddle(line.a, line.b), this.icon);
            this.addChild(this.arrow);
            this.addChild(this.icon);

            Painter.drawTriagle(this.gTest, uiPoints.rb, line.a, line.b, thickness, color, alpha, isFill);
        }, this.drawTime * 2);

        this.drawId3 = setTimeout(() => {
            this.drawClear();

            result = Calc.triangleArea(uiPoints.lb, line.a, line.b);
            color = (result > 0) ? outColor : inColor;
            Painter.drawLine(this.gTest, uiPoints.lb, line.a, 1, color);
            Painter.drawLine(this.gTest, uiPoints.lb, line.b, 1, color);

            iconStr = (result > 0) ? leftString : rightString;
            this.icon = Painter.getIcon(iconStr, iconRadius, color);
            iconPoint = Calc.getTriangleCenterPoint(uiPoints.lb, line.a, line.b);
            this.icon.x = iconPoint.x;
            this.icon.y = iconPoint.y;
            this.arrow = Painter.getArrow(Calc.getLineMiddle(line.a, line.b), this.icon);
            this.addChild(this.arrow);
            this.addChild(this.icon);

            Painter.drawTriagle(this.gTest, uiPoints.lb, line.a, line.b, thickness, color, alpha, isFill);
        }, this.drawTime * 3);

        this.drawId4 = setTimeout(() => {
            this.drawClear();

            if(this.hitSide.length > 0) this.startDrawHit();
        }, this.drawTime * 4);
    }


    rotateStart(e) {
        this.stopDrawHit();

        this.setImagePivot();
        this.resizeUIPoints = this.resizeUI.points;
        this.image.updatePrevLtPointForPivot();
    }


    rotateChange(e) {
        this.image.rotation += e.change;
        if (this.image.rotation < this.minRotation)
            this.image.rotation = this.minRotation;
        if (this.image.rotation > this.maxRotation)
            this.image.rotation = this.maxRotation;
        //this.displayImageRotationBounds();

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            var pivot = {x:this.image.x, y:this.image.y};
            var rPoints = Calc.getRotationRectanglePoints(pivot, this.resizeUIPoints, Calc.toDegrees(this.image.rotation));
            var rRect = Calc.getBoundsRectangle(rPoints);
            var scale = Calc.getBoundsScale(rRect, this.image);
            var w = this.image.width;
            var h = this.image.height;
            var sw = w * scale.max;
            var sh = h * scale.max;

            // 이미지가 최대 사이즈 보다 작은 경우에만 스케일을 하도록 조건 변경 필요
            if (w <= sw && h <= sh) {
                this.image.width = sw;
                this.image.height = sh;
            }

            // Painter.drawBounds(this.gRotate, rotationRect, true, 1, 0xFF00FF, 0.7); // 자주빛

            this.image.fixMove(this.resizeUI, this.stageRotation);
        }
        this.image.updatePrevLtPointForPivot();
    }

    /**
     * TODO
     * 회전 시 문제는
     * 이미지를 회전 시킬때 문제가 발생합니다.
     *
     * 오류1. 이미지 회전 시 전혀 다른 각도에서 회전을 시작하는 오류
     * 오류2. 회전 시 충돌 검사를 제대로 하지 못한다.
     */
    rotate() {
        var rotateAngle = Calc.toRadians(-90);

        this.image.rotation += rotateAngle;
        this.image.rotatePoints();
        this.image.updatePrevLtPointForPivot();
        // this.setImagePivot();

        var rotationPoints = this.resizeUI.rotationPoints;
        var lens = this.resizeUI.pointsToBounds(rotationPoints);
        //Painter.drawPoints(this.gRotate, rotationPoints, false, 1, 0x00ff00, 0.7);

        var zoom = Calc.getBoundsScale(this.bounds, lens).min;
        var rubberband = Calc.getImageSizeKeepAspectRatio(lens, this.bounds);
        rubberband.x = this.canvas.width / 2 - rubberband.width / 2;
        rubberband.y = this.canvas.height / 2 - rubberband.height / 2;
        this.resizeUI.setSize(rubberband);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.resizeUIPoints = this.resizeUI.points;

        this.image.width = this.image.width * zoom;
        this.image.height = this.image.height * zoom;

        this.stageRotation += rotateAngle;
        this.maxRotation = this.stageRotation + this.limitRotation;
        this.minRotation = this.stageRotation - this.limitRotation;
    }

    rotateEnd(e) {
        this.image.updatePrevLtPointForPivot();
    }

    cornerResizeStart(e) {
        this.startLensBounds = this.resizeUI.bounds;
        this.image.updatePrevLtPointForPivot();
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
        var offsetX = this.image.lt.x - lens.x;
        var offsetY = this.image.lt.y - lens.y;

        var zoom = Calc.getBoundsScale(this.bounds, lens).min;
        var rubberband = Calc.getImageSizeKeepAspectRatio(lens, this.bounds);
        rubberband.x = this.canvas.width / 2 - rubberband.width / 2;
        rubberband.y = this.canvas.height / 2 - rubberband.height / 2;
        this.resizeUI.setSize(rubberband);

        this.image.width = this.image.width * zoom;
        this.image.height = this.image.height * zoom;

        var posX = offsetX * zoom;
        var posY = offsetY * zoom;
        var pivotOffsetX = this.image.x - this.image.lt.x;
        var pivotOffsetY = this.image.y - this.image.lt.y;
        this.image.x = rubberband.x + posX + pivotOffsetX;
        this.image.y = rubberband.y + posY + pivotOffsetY;

        this.image.updatePrevLtPointForPivot();
    }

    cornerResizeChange(e) {
        var changePoint;
        var dx = e.dx;
        var dy = e.dy;
        var corner = e.target;
        var tx = corner.x + dx;
        var ty = corner.y + dy;
        var speedX = dx * 2;
        var speedY = dy * 2;

        if (tx > this.startLensBounds.x && tx < (this.startLensBounds.x + this.startLensBounds.width) &&
            ty > this.startLensBounds.y && ty < (this.startLensBounds.y + this.startLensBounds.height)) {

            changePoint = this.resizeUI.getCornerUpdatePoints(corner, tx, ty);

            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
            } else {
                changePoint = this.resizeUI.fixCorner(corner, changePoint, this.image);
                this.resizeUI.setPoint(changePoint);
            }
        } else {
            changePoint = this.resizeUI.getCornerUpdatePoints(corner, tx + speedX, ty + speedY);

            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
            } else {
                changePoint = this.resizeUI.fixCorner(corner, changePoint, this.image);
                this.resizeUI.setPoint(changePoint);
            }
            this.magnifyImage(this.resizeUI.bounds);
        }

        this.moveUI.setSize(this.resizeUI.bounds);
        this.image.updatePrevLtPointForPivot();
    }

    cornerResizeEnd(e) {
        this.magnifyImage(this.resizeUI.bounds);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.gLens.clear();

        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    }

    //////////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////////

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

    set stageRotation(radians) {
        this._stageRotation = radians;

        /*if(-360 == Calc.toDegrees(this._stageRotation))
            this._stageRotation = 0;*/
    }

    get stageRotation() {
        return this._stageRotation;
    }

    //////////////////////////////////////////////////////////////////////////
    // Debug Util Function
    //////////////////////////////////////////////////////////////////////////


    /**
     * 현재 화면 사이즈에 맞는 이미지 바운드 영역을 화면에 출력합니다.
     */
    displayImageRotationBounds() {
        var imageRect = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);

        var imagePoint = {
            lt: {x: 0, y: 0},
            rt: {x: imageRect.width, y: 0},
            rb: {x: imageRect.width, y: imageRect.height},
            lb: {x: 0, y: imageRect.height}
        };

        var rotationPoints = Calc.getRotationRectanglePoints({
            x: imageRect.width / 2,
            y: imageRect.height / 2
        }, imagePoint, Calc.toDegrees(this.image.rotation));
        var rotationRect = Calc.getBoundsRectangle(rotationPoints);
        rotationRect.x = this.canvas.width / 2 - rotationRect.width / 2;
        rotationRect.y = this.canvas.height / 2 - rotationRect.height / 2;

         //Painter.drawBounds(this.gImage, rotationRect, true, 2, 0x00FCFF, 0.4); // 하늘색
    }
}