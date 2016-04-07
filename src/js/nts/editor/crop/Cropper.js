import {Calc} from './../utils/Calculator';
import {ResizeUI} from './../ui/ResizeUI';
import {RotateUI} from './../ui/RotateUI';
import {MoveUI} from './../ui/MoveUI';
import {ImageUI} from './../ui/ImageUI';
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
        this.maxRotation = Calc.toRadians(45);
        this.minRotation = -this.maxRotation;
        this.rotation90 = Calc.toRadians(90);

        this.image = new ImageUI(this.imageElement);
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
        this.addChild(this.gLens);
        this.addChild(this.gLine);
        this.addChild(this.gGrid);
        this.addChild(this.gImage);
        this.addChild(this.gBounds);
        this.addChild(this.gRotate);
        this.addChild(this.gMove);
    }

    clearGraphics() {
        this.gLens.clear();
        this.gLine.clear();
        this.gGrid.clear();
        this.gImage.clear();
        this.gBounds.clear();
        this.gRotate.clear();
        this.gMove.clear();
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

    update() {
    }

    resize() {
        var bounds = this.bounds;

        // 최초 실행: 화면 초기화
        if (this.isInitialize == false) {
            this.isInitialize = true;
            this.initializeImage(bounds, this.image);
            var imageBounds = this.image.bounds;
            this.resizeUI.resize(imageBounds);
            this.moveUI.setSize(this.resizeUI.bounds);

            this.test();
        } else {
            var resizeUIBounds = this.resizeUI.bounds;
            this.magnifyImage(resizeUIBounds);
            this.moveUI.setSize(resizeUIBounds);
        }

        this.rotateUI.resize();
        this.imagePoints = this.image.points;
        Painter.drawBounds(this.gBounds, bounds);

        this.gImage.clear();
        this.gRotate.clear();
    }

    initializeImage() {
        var size = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2 - this.image.width / 2;
        this.image.y = this.canvas.height / 2 - this.image.height / 2;

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

    //////////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////////

    moveStart(e) {
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;

        this.image.updatePrevLtPointForPivot();
    }

    test() {
        //this.image.visible = false;
        //this.resizeUI.visible = false;
        //this.moveUI.visible = false;
        //this.gBounds.visible = false;
        //Painter.drawGrid(this.gGrid, this.canvas.width, this.canvas.height);
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
            Painter.drawLine(this.gMove, {x:this.prevX, y:this.prevY}, {x:x, y:y}, 2);
            this.prevX = x;
            this.prevY = y;
        }
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
            if(ax > ay) {
                if (this.image.isHitSide(this.resizeUI) === false) {
                    nextPoint = Calc.getNextRotatePosition(cx, cy, dx, rotation);
                } else {
                    if(rotation < 0)
                        nextPoint = Calc.getNextRotatePosition(cx, cy, -dx, rotation - this.rotation90);
                    else
                        nextPoint = Calc.getNextRotatePosition(cx, cy, -dx, rotation + this.rotation90);
                }
            } else {
                if (this.image.isHitSide(this.resizeUI)) {
                    nextPoint = Calc.getNextRotatePosition(cx, cy, dy, rotation + this.rotation90);
                } else {
                    if(rotation < 0)
                        nextPoint = Calc.getNextRotatePosition(cx, cy, -dy, rotation);
                    else
                        nextPoint = Calc.getNextRotatePosition(cx, cy, dy, rotation);
                }
            }
            this.image.x = nextPoint.x;
            this.image.y = nextPoint.y;
        }

        if (this.image.isContainsBounds(this.resizeUI)) {
            this.prevImageX = this.image.x;
            this.prevImageY = this.image.y;
        } else {
            this.image.x = this.prevImageX;
            this.image.y = this.prevImageY;
        }

        this.image.updatePrevLtPointForPivot();
    }

    moveEnd(e) {
        this.image.updatePrevLtPointForPivot();
    }

    rotateStart(e) {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        this.image.setPivot({x:cx, y:cy});

        this.image.updatePrevLtPointForPivot();
    }

    testPivot(keycode) {
        var offset;
        var prevX = this.image.x;
        var prevY = this.image.y;

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

    rotateChange(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.minRotation)
            this.image.rotation = this.minRotation;

        if (this.image.rotation > this.maxRotation)
            this.image.rotation = this.maxRotation;

        console.log(parseInt(Calc.toDegrees(this.image.rotation)));
        this.displayImageRotationBounds();

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            var pivot = {x:this.image.x, y:this.image.y};
            var rotationPoints = Calc.getRotationRectanglePoints(pivot, this.imagePoints, Calc.toDegrees(this.image.rotation));
            var rotationRect = Calc.getBoundsRectangle(rotationPoints);
            var scale = Calc.getBoundsScale(rotationRect, this.image);
            var sw = this.image.width * scale.max;
            var sh = this.image.height * scale.max;
            var maxImageSize = this.image.getImageMaxSize(this.bounds);
            var w = this.image.width;
            var h = this.image.height;

            /*console.log(
                'IMAGE WH[' +
                Calc.leadingZero(parseInt(this.image.width)) + ', ' +
                Calc.leadingZero(parseInt(this.image.height)) + '] ' +
                'SCALE WH[' +
                Calc.leadingZero(parseInt(sw)) + ', ' +
                Calc.leadingZero(parseInt(sh)) + ']' +
                'MAX WH[' +
                Calc.leadingZero(parseInt(maxImageSize.width)) + ', ' +
                Calc.leadingZero(parseInt(maxImageSize.height)) + ']'
            );*/

            // 이미지가 최대 사이즈 보다 작은 경우에만 스케일을 하도록 조건 변경 필요
            if (w < maxImageSize.width && h < maxImageSize.height && sw > w && sh > h) {
                this.image.width = sw;
                this.image.height = sh;
            }

            // 자주빛
            // Painter.drawBounds(this.gRotate, rotationRect, true, 1, 0xFF00FF, 0.7);

            var rotation = Calc.toDegrees(this.image.rotation);

            // 위로 회전
            if (rotation > 0) {
                if (this.resizeUI.isLtInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.lt, this.image.leftLine);

                if (this.resizeUI.isLbInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.lb, this.image.bottomLine);

                if (this.resizeUI.isRtInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.rt, this.image.topLine);

                if (this.resizeUI.isRbInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.rb, this.image.rightLine);

            } else {
                if (this.resizeUI.isLtInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.lt, this.image.topLine);

                if (this.resizeUI.isLbInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.lb, this.image.leftLine);

                if (this.resizeUI.isRtInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.rt, this.image.rightLine);

                if (this.resizeUI.isRbInsideBounds(this.image) === false)
                    Calc.moveToCollision(this.image, this.resizeUI.rb, this.image.bottomLine);
            }
        }

        this.image.updatePrevLtPointForPivot();
    }

    rotateEnd(e) {
        this.image.updatePrevLtPointForPivot();
    }

    cornerResizeStart(e) {
        this.prevLensPoints = this.resizeUI.points;
        this.startLensBounds = this.resizeUI.bounds;

        this.image.updatePrevLtPointForPivot();
    }


    expandImage(corner, bounds, limit, lens, dx, dy) {

        // offset 구하기
        // --------------------------------------------------------------------------
        var offsetX = this.image.lt.x - lens.x;
        var offsetY = this.image.lt.y - lens.y;
        // --------------------------------------------------------------------------

        var dw = (limit.width - lens.width);
        var dh = (limit.height - lens.height);

        var hdw = dw / 2;
        var hdh = dh / 2;

        var isExpandX = true;
        var isExpandY = false;

        var lessx = bounds.width - limit.width;
        var lessy = bounds.height - limit.height;

        var isLessX = true;
        var isLessY = false;

        if(Math.abs(lessx) < Math.abs(lessy)) {
            isLessX = false;
            isLessY = true;
        }

        if(dh < dw) {
            isExpandX = false;
            isExpandY = true;
        }

        // 비율 구하기
        // --------------------------------------------------------------------------
        var zoom = Calc.getBoundsScale(limit, lens).min;


        // resizeUI 설정
        // --------------------------------------------------------------------------
        var rubberband = Calc.getImageSizeKeepAspectRatio(lens, limit);
        var rubberbandX = this.canvas.width / 2 - rubberband.width / 2;
        var rubberbandY = this.canvas.height / 2 - rubberband.height / 2;


        if(isExpandX) {
            rubberband.x = rubberbandX;

            if(corner === this.resizeUI.rb || corner === this.resizeUI.lb) {
                rubberband.y = rubberbandY - hdh;
            } else {
                rubberband.y = rubberbandY + hdh;
            }

        } else {
            rubberband.y = rubberbandY;

            if(corner === this.resizeUI.rt || corner === this.resizeUI.rb) {
                rubberband.x = rubberbandX - hdw;
            } else {
                rubberband.x = rubberbandX + hdw;
            }
        }


        if(isLessX && limit.width < bounds.width) {
            this.startLensBounds.width += Math.abs(dx);
            this.startLensBounds.x = this.canvas.width / 2 - this.startLensBounds.width / 2;
        }

        if(isLessY && limit.height < bounds.height) {
            this.startLensBounds.height += Math.abs(dy);
            this.startLensBounds.y = this.canvas.height / 2 - this.startLensBounds.height / 2;
        }

        this.resizeUI.setSize(rubberband);


        // --------------------------------------------------------------------------
        Painter.drawBounds(this.gLens, this.startLensBounds, true, 1, 0xFF0099, 0.6); // 핑크
        // --------------------------------------------------------------------------


        // image 설정
        // --------------------------------------------------------------------------
        this.image.width = this.image.width * zoom;
        this.image.height = this.image.height * zoom;

        var posX = offsetX * zoom;
        var posY = offsetY * zoom;
        var pivotOffsetX = this.image.x - this.image.lt.x;
        var pivotOffsetY = this.image.y - this.image.lt.y;
        this.image.x = rubberband.x + posX + pivotOffsetX;
        this.image.y = rubberband.y + posY + pivotOffsetY;

        this.image.updatePrevLtPointForPivot();
        // --------------------------------------------------------------------------
    }


    /*cornerResizeChange(e) {
        var corner = e.target;
        var dx = e.dx;
        var dy = e.dy;
        var tx = corner.x + dx;
        var ty = corner.y + dy;
        var speedX = dx * 2;
        var speedY = dy * 2;

        var changePoint = this.resizeUI.getUpdatePoints(corner, tx, ty);

        if (this.image.isContainsBounds(changePoint)) {

            this.resizeUI.setPoint(changePoint);

            // 코너가 이미지 안쪽으로 움직일 때 : 축소할 때
            if (tx >= this.startLensBounds.x && tx <= (this.startLensBounds.x + this.startLensBounds.width) && ty >= this.startLensBounds.y && ty <= (this.startLensBounds.y + this.startLensBounds.height)) {
                // 아무일도 일어나지 않습니다.
                //console.log('Do Nothing');
            } else {
                this.expandImage(corner, this.bounds, this.startLensBounds, this.resizeUI.bounds, dx, dy);
                this.moveUI.resize(this.resizeUI.bounds);
            }

            this.prevLensPoints = changePoint;
        } else {
            this.resizeUI.setPoint(this.prevLensPoints);
        }

        this.image.updatePrevLtPointForPivot();
        Painter.drawBounds(this.gLens, this.startLensBounds, true, 1, 0xFF0099, 0.6); // 핑크
    }*/


    cornerResizeChange(e) {

        var changePoint;
        var corner = e.target;
        var dx = e.dx;
        var dy = e.dy;
        var tx = corner.x + dx;
        var ty = corner.y + dy;
        var speedX = dx * 2;
        var speedY = dy * 2;

        // 코너가 이미지 안쪽으로 움직일 때 : 축소할 때
        if (tx >= this.startLensBounds.x && tx <= (this.startLensBounds.x + this.startLensBounds.width) && ty >= this.startLensBounds.y && ty <= (this.startLensBounds.y + this.startLensBounds.height)) {
            changePoint = this.resizeUI.getUpdatePoints(corner, tx, ty);
            this.resizeUI.setPoint(changePoint);
            this.prevLensPoints = changePoint;
        } else {
            changePoint = this.resizeUI.getUpdatePoints(corner, tx + speedX, ty + speedY);
            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
                this.expandImage(corner, this.bounds, this.startLensBounds, this.resizeUI.bounds, dx, dy);
                this.moveUI.setSize(this.resizeUI.bounds);

                this.prevLensPoints = changePoint;
            } else {
                this.resizeUI.setPoint(this.prevLensPoints);
            }
        }

        this.image.updatePrevLtPointForPivot();
        Painter.drawBounds(this.gLens, this.startLensBounds, true, 1, 0xFF0099, 0.6); // 핑크
    }

    cornerResizeEnd(e) {
        this.magnifyImage(this.resizeUI.bounds);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.gLens.clear();

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

        // Painter.drawBounds(this.gImage, rotationRect, true, 2, 0x00FCFF, 0.4); // 하늘색
    }
}