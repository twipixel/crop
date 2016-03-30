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
        this.maxRotation = Calc.toRadians(45);
        this.minRotation = -this.maxRotation;

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
        this.gDebug = new PIXI.Graphics();
        this.gBounds = new PIXI.Graphics();
        this.addChild(this.gLens);
        this.addChild(this.gLine);
        this.addChild(this.gGrid);
        this.addChild(this.gDebug);
        this.addChild(this.gBounds);
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

    update() {
    }

    resize() {
        var bounds = this.bounds;
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.cx = this.cw / 2;
        this.cy = this.ch / 2;

        if (this.isInitialize == false) {
            this.isInitialize = true;

            var imageBounds = Calc.getImageSizeKeepAspectRatio(this.image, bounds);
            imageBounds.x = this.cw / 2 - imageBounds.width / 2;
            imageBounds.y = this.ch / 2 - imageBounds.height / 2;

            this.resizeImage(bounds, this.image);
            this.rotateUI.resize(imageBounds);
            this.resizeUI.resize(imageBounds);
            this.moveUI.resize(imageBounds);

            this.test();
        } else {
            // 리사이즈 코드
        }

        Painter.drawBounds(this.gBounds, bounds);
    }

    test() {
        // 테스트 코드
    }

    resizeImage() {
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
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;
    }

    moveChange(e) {
        this.image.x += e.change.x;
        this.image.y += e.change.y;

        if (this.isImageOutOfBounds) {
            if (this.isHitSide === false) {
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
        //
    }

    rotateChange(e) {
        this.image.rotation += e.change;

        if (this.image.rotation < this.minRotation)
            this.image.rotation = this.minRotation;

        if (this.image.rotation > this.maxRotation)
            this.image.rotation = this.maxRotation;

        this.displayCurrentImageRotationBounds();

        if (this.isImageOutOfBounds) {
            var rotationPoints = Calc.getRotationRectanglePoints({
                x: this.image.x,
                y: this.image.y
            }, this.imagePoints, Calc.toDegrees(this.image.rotation));
            var rotationRect = Calc.getBoundsRectangle(rotationPoints, 8);
            var scale = Calc.getBoundsScale(rotationRect, this.image);
            var scaleWidth = this.image.width * scale.max;
            var scaleHeight = this.image.height * scale.max;

            if (scaleWidth > this.image.width && scaleHeight > this.image.height) {
                this.image.width = scaleWidth;
                this.image.height = scaleHeight;
            }

            Painter.drawBounds(this.gBounds, rotationRect, true, 1, 0xFF00FF, 0.7);

            var rotation = Calc.toDegrees(this.image.rotation);

            // 위로 회전
            if (rotation > 0) {
                if (this.isLtOut)
                    Calc.moveToCollision(this.image, this.resizeUI.lt, this.image.leftLine);

                if (this.isLbOut)
                    Calc.moveToCollision(this.image, this.resizeUI.lb, this.image.bottomLine);

                if (this.isRtOut)
                    Calc.moveToCollision(this.image, this.resizeUI.rt, this.image.topLine);

                if (this.isRbOut)
                    Calc.moveToCollision(this.image, this.resizeUI.rb, this.image.rightLine);

            } else {
                if (this.isLtOut)
                    Calc.moveToCollision(this.image, this.resizeUI.lt, this.image.topLine);

                if (this.isLbOut)
                    Calc.moveToCollision(this.image, this.resizeUI.lb, this.image.leftLine);

                if (this.isRtOut)
                    Calc.moveToCollision(this.image, this.resizeUI.rt, this.image.rightLine);

                if (this.isRbOut)
                    Calc.moveToCollision(this.image, this.resizeUI.rb, this.image.bottomLine);
            }
        }
    }

    rotateEnd(e) {
        //
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
            if (tx < lens.x) {
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

            if (ty < lens.y) {
                isOutY = true;
                lens.y = lens.y - dy;
                lens.height = lens.height + dy;
                this.magnifyImage(lens);
            } else if (ty > lens.y + lens.height) {
                isOutY = true;
                lens.height = lens.height + dy;
                this.magnifyImage(lens);
            } else {
                //
            }
        }

        if (isOutX === false)
            target.x = tx;

        if (isOutY === false)
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

        for (let i = 0; i < boundsPoints.length; i++) {
            if (Calc.isInsideSquare(lt, rt, rb, lb, boundsPoints[i]) === false)
                return true;
        }
        return false;
    }

    get isLtOut() {
        return (Calc.isInsideSquare(this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.lt) === false);
    }

    get isRtOut() {
        return (Calc.isInsideSquare(this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.rt) === false);
    }

    get isRbOut() {
        return (Calc.isInsideSquare(this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.rb) === false);
    }

    get isLbOut() {
        return (Calc.isInsideSquare(this.image.lt, this.image.rt, this.image.rb, this.image.lb, this.resizeUI.lb) === false);
    }

    get isHitSide() {
        var image = this.image;
        var lt = image.lt;
        var rt = image.rt;
        var rb = image.rb;
        var lb = image.lb;

        // 왼쪽 도달
        if (Calc.triangleArea(lb, lt, this.resizeUI.lt) > 0)
            return true;

        if (Calc.triangleArea(lb, lt, this.resizeUI.lb) > 0)
            return true;

        // 오른쪽 도달
        if (Calc.triangleArea(rt, rb, this.resizeUI.rt) > 0)
            return true;

        if (Calc.triangleArea(rt, rb, this.resizeUI.rb) > 0)
            return true;

        return false;
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

    /**
     * 회전 시 이미지가 최대로 커질 사이즈를 구하고
     * 그에 따른 최대 스케일 값을 구합니다.
     */
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

    /**
     * 현재 화면 사이즈에 맞는 이미지 바운드 영역을 화면에 출력합니다.
     */
    displayCurrentImageRotationBounds() {
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
        var rotationRect = Calc.getBoundsRectangle(rotationPoints, 8);
        rotationRect.x = this.canvas.width / 2 - rotationRect.width / 2;
        rotationRect.y = this.canvas.height / 2 - rotationRect.height / 2;
        Painter.drawBounds(this.gDebug, rotationRect, true, 2, 0x00FCFF, 0.4);
    }
}