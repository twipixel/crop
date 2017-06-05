(function () {
    'use strict';

    var ui = usenamespace('editor.es5.ui');
    var utils = usenamespace('editor.es5.utils');
    var consts = usenamespace('editor.es5.consts');

    function Cropper (canvas, imageElement, textureCanvas) {
        Object.defineProperty(this, 'bounds', {get: this.getBounds});
        Object.defineProperty(this, 'isHorizontal', {get: this.getIsHorizontal});
        Object.defineProperty(this, 'isReverseRatio', {get: this.getIsReverseRatio});
        Object.defineProperty(this, 'stageRotation', {get: this.getStageRotation, set: this.setStageRotation});

        PIXI.Container.call(this);
        this.initialize(canvas, imageElement, textureCanvas);
        this.addEvent();
    };

    var p = Cropper.prototype = Object.create(PIXI.Container.prototype);

    p.initialize = function (canvas, imageElement, textureCanvas) {
        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.isInitialize = false;

        var originalWidth, originalHeight;

        if(imageElement) {
            console.log('Cropper Use ImageElement');
            originalWidth = this.originalWidth = imageElement.width;
            originalHeight = this.originalHeight = imageElement.height;
        } else {
            console.log('Cropper Use Canvas');
            originalWidth = this.originalWidth = textureCanvas.width;
            originalHeight = this.originalHeight = textureCanvas.height;
        }

        this.isHorizontalImage = (originalWidth > originalHeight) ? true : false;
        console.log('**', 'w:', originalWidth, 'h:', originalHeight, 'isHorizontalImage:', this.isHorizontalImage);

        this.aspectRatio = 0;
        this.limitRotation = utils.Calc.toRadians(45);
        this.maxRotation = this.limitRotation;
        this.minRotation = -this.limitRotation;

        this.image = new ui.ImageUI(textureCanvas, imageElement);
        this.moveUI = new ui.MoveUI(this.canvas);
        this.rotateUI = new ui.RotateUI(this.canvas, this.image);
        this.resizeUI = new ui.ResizeUI(this.canvas, this.image);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.moveUI);
        this.addChild(this.resizeUI);

        this.gGrid = new PIXI.Graphics();
        this.gLine = new PIXI.Graphics();
        this.gImage = new PIXI.Graphics();
        this.gBounds = new PIXI.Graphics();
        this.gRotate = new PIXI.Graphics();
        this.gMove = new PIXI.Graphics();
        this.gTest = new PIXI.Graphics();
        this.gResizeBounds = new PIXI.Graphics();

        this.addChild(this.gLine);
        this.addChild(this.gGrid);
        this.addChild(this.gImage);
        this.addChild(this.gBounds);
        this.addChild(this.gRotate);
        this.addChild(this.gMove);
        this.addChild(this.gTest);
        this.addChild(this.gResizeBounds);
    };

    p.clearGraphics = function () {
        this.gResizeBounds.clear();
        this.gLine.clear();
        this.gGrid.clear();
        this.gImage.clear();
        this.gBounds.clear();
        this.gRotate.clear();
        this.gMove.clear();
        this.gTest.clear();
    };

    p.addEvent = function () {
        window.document.addEventListener('keyup', this.onKeyUp.bind(this));
        this.moveUI.on('moveStart', this.moveStart.bind(this));
        this.moveUI.on('moveChange', this.moveChange.bind(this));
        this.moveUI.on('moveEnd', this.moveEnd.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.rotateUI.on('rotateChange', this.rotateChange.bind(this));
        this.rotateUI.on('rotateEnd', this.rotateEnd.bind(this));
        this.resizeUI.on('cornerResizeStart', this.cornerResizeStart.bind(this));
        //this.resizeUI.on('cornerResizeChange', this.cornerResizeChange.bind(this));
        this.resizeUI.on('cornerResizeChange', this.cornerResizeChangeWithAspectRatio.bind(this));
        this.resizeUI.on('cornerResizeEnd', this.cornerResizeEnd.bind(this));
        this.resizeUI.on('controlResizeStart', this.controlResizeStart.bind(this));
        this.resizeUI.on('controlResizeChange', this.controlResizeChangeWithAspectRatio.bind(this));
        this.resizeUI.on('controlResizeEnd', this.controlResizeEnd.bind(this));
    };

    p.update = function () {};

    p.resize = function () {
        // 최초 실행: 화면 초기화
        if (this.isInitialize == false) {
            this.isInitialize = true;
            this.initializeImage();
            this.resizeUI.resize(this.image.bounds);
            this.moveUI.setSize(this.resizeUI.bounds);

            this.test();
        } else {
            var resizeUIBounds = this.resizeUI.bounds;
            this.magnifyImage(resizeUIBounds);
            this.moveUI.setSize(resizeUIBounds);
        }

        this.rotateUI.resize();
        utils.Painter.drawBounds(this.gBounds, this.bounds);

        this.gImage.clear();
        this.gRotate.clear();
    };

    p.initializeImage = function () {
        this.imageMinSize = this.getImageMinSize();

        this.image.width = this.imageMinSize.width;
        this.image.height = this.imageMinSize.height;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;

        console.log('initializeImage');
        console.log('---------------------------------------------');
        console.log('min.width', this.imageMinSize.width, 'min.height', this.imageMinSize.height);
        console.log('originalWidth:', this.originalWidth, 'originalHeight:', this.originalHeight);

        this.image.updatePrevLtPointForPivot();
    };

    p.setImagePivot = function () {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        this.image.setPivot({x: cx, y: cy});
    };

    p.rotate = function () {
        var rotateAngle = -utils.Calc.RADIAN_90;
        this.image.rotation += rotateAngle;
        this.image.rotatePoints();

        var rotationPoints = this.resizeUI.rotationPoints;
        var resizeBounds = this.resizeUI.pointsToBounds(rotationPoints);
        //utils.Painter.drawPoints(this.gRotate, rotationPoints, false, 1, 0x00ff00, 0.7);

        var zoom = utils.Calc.getBoundsScale(this.bounds, resizeBounds).min;
        var rubberband = utils.Calc.getImageSizeKeepAspectRatio(resizeBounds, this.bounds);
        rubberband.x = this.canvas.width / 2 - rubberband.width / 2;
        rubberband.y = this.canvas.height / 2 - rubberband.height / 2;
        this.resizeUI.setSize(rubberband);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.resizeUIPoints = this.resizeUI.points;

        this.image.width = this.image.width * zoom;
        this.image.height = this.image.height * zoom;
        this.image.updatePrevLtPointForPivot();
        this.image.updateDebugPivotGraphic();
        this.setImagePivot();

        this.stageRotation += rotateAngle;
        this.maxRotation = this.stageRotation + this.limitRotation;
        this.minRotation = this.stageRotation - this.limitRotation;

        console.log('r:', utils.Calc.toDegrees(this.image.rotation), 'sr:', utils.Calc.toDegrees(this.stageRotation), 'ir', this.isReverseRatio, 'isHorizontal:', this.isHorizontal);
    };

    /**
     * 1. 줌 비율 구하기
     * 2. 러버밴드 리사이즈 구하기
     * 3. 러버밴드 설정
     * 4. 줌 비율에 이미지 리사이즈 하기
     * 5. 이미지 위치 구하기
     * 6. 이미지 위치 구할 때 러버밴드 리사이즈 후 위치를 기준 좌표로 삼으면 됩니다.
     * @param resizeBounds : 확대 / 축소 하기 위해 설정한 Rectangle
     */
    p.magnifyImage = function (resizeBounds) {
        var offsetX = this.image.lt.x - resizeBounds.x;
        var offsetY = this.image.lt.y - resizeBounds.y;

        var zoom = utils.Calc.getBoundsScale(this.bounds, resizeBounds).min;
        var rubberband = utils.Calc.getImageSizeKeepAspectRatio(resizeBounds, this.bounds);
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
    };


    /**
     * 가로 기준으로 넣어주세요.
     * 16:9, 4:3, 3:2, 넓이가더큰수:높이가더작은수
     * @param width
     * @param height
     */
    p.changeAspectRatio = function (width, height) {
        this.aspectRatio = (width / height) || 0;

        // free 인 경우
        if(this.aspectRatio === 0) {
            // free 설정 (코너 UI 색상 변경)
        } else {
            var resizeBounds = this.resizeUI.bounds;

            if(!this.prevResizeBounds) {
                this.prevBounds = this.bounds;
                this.prevResizeBounds = this.resizeUI.bounds;
            }

            if(this.isHorizontal) {
                resizeBounds.width = utils.Calc.getX2(width, height, this.prevResizeBounds.height);
            } else {
                resizeBounds.height = utils.Calc.getY2(width, height, this.prevResizeBounds.width);
            }

            resizeBounds.x = this.canvas.width / 2 - resizeBounds.width / 2;
            resizeBounds.y = this.canvas.height / 2 - resizeBounds.height / 2;
            this.resizeUI.setSize(resizeBounds);

            // magnifyImage
            var zoom = utils.Calc.getBoundsScale(this.prevBounds, this.prevResizeBounds).min;
            this.image.width = this.image.width * zoom;
            this.image.height = this.image.height * zoom;
            this.image.x = this.canvas.width / 2;
            this.image.y = this.canvas.height / 2;

            //this.magnifyImage(this.resizeUI.bounds);

            this.moveUI.setSize(this.resizeUI.bounds);
            this.image.updatePrevLtPointForPivot();
        }
    };

    p.getImageMinSize = function () {
        return utils.Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
    };


    p.setStartResizeUIBounds = function () {
        this.startResizeBounds = this.resizeUI.bounds;

        var space = 0;
        //TODO 테스트 렌즈 간격을 조금 주기
        this.startResizeBounds.x += -space;
        this.startResizeBounds.y += -space;
        this.startResizeBounds.width += space;
        this.startResizeBounds.height += space;

        this.selectedWidth = this.resizeUI.getActualPixelWidth();
        this.selectedHeight = this.resizeUI.getActualPixelHeight();
    };


    //////////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////////


    p.onKeyUp = function (e) {
        switch (e.keyCode) {
            case consts.KeyCode.ESC:
                console.clear();
                break;
            case consts.KeyCode.SPACE:
                console.log(this.image.toString());
                var viewport = this.resizeUI.bounds;
                console.log('viewport.width:', viewport.width, 'viewport.height:', viewport.height);
                //this.initializeImage();
                break;

            case consts.KeyCode.C:
                this.clearGraphics();
                break;

            case consts.KeyCode.R:
                this.rotate();
                break;

            case consts.KeyCode.NUM_1:
            case consts.KeyCode.NUM_2:
            case consts.KeyCode.NUM_3:
            case consts.KeyCode.NUM_4:
            case consts.KeyCode.NUM_5:
            case consts.KeyCode.NUM_6:
                //this.testPivot(e.keyCode);
                this.testAspectRatio(e.keyCode);
                break;
        }
    };

    p.moveStart = function () {
        this.isHit = false;
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;
        this.image.updatePrevLtPointForPivot();
    };

    p.moveChange = function (e) {
        var nextPoint;
        var dx = e.change.x;
        var dy = e.change.y;
        var cx = this.prevImageX;
        var cy = this.prevImageY;
        //var rotation = this.image.rotation;
        var rotation = this.image.rotation - this.stageRotation;
        //console.log('rotation:', utils.Calc.toDegrees(rotation), utils.Calc.toDegrees(this.image.rotation - this.stageRotation));

        this.image.x += dx;
        this.image.y += dy;

        //console.log(ns.Calc.trace(dx), ns.Calc.trace(dy), ns.Calc.trace(dx + dy), ns.Calc.trace(ns.Calc.toDegrees(this.image.rotation)));

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            if (this.isHit) {
                var hitSide = this.image.getHitSide(this.resizeUI);

                switch (hitSide) {
                    case consts.HitSide.LEFT:
                    case consts.HitSide.RIGHT:
                        nextPoint = utils.Calc.getNextMovePosition(cx, cy, dy, rotation + utils.Calc.RADIAN_90);
                        break;

                    case consts.HitSide.TOP:
                    case consts.HitSide.BOTTOM:
                        nextPoint = utils.Calc.getNextMovePosition(cx, cy, dx, rotation);
                        break;

                    default:
                        this.image.fixMove(this.resizeUI, this.stageRotation);
                        break;
                }

                if (nextPoint) {
                    this.image.x = nextPoint.x;
                    this.image.y = nextPoint.y;
                }
            } else {
                this.isHit = true;
                this.image.fixMove(this.resizeUI, this.stageRotation);
            }
        } else {
            this.isHit = false;
        }

        if (this.image.isContainsBounds(this.resizeUI)) {
            this.prevImageX = this.image.x;
            this.prevImageY = this.image.y;
        } else {
            this.image.x = this.prevImageX;
            this.image.y = this.prevImageY;
        }

        this.image.updatePrevLtPointForPivot();
    };

    p.moveEnd = function () {
        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    };

    p.rotateStart = function () {
        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
        this.resizeUIPoints = this.resizeUI.points;
    };

    p.rotateChange = function (e) {
        this.image.rotation += e.change;
        if (this.image.rotation < this.minRotation)
            this.image.rotation = this.minRotation;
        if (this.image.rotation > this.maxRotation)
            this.image.rotation = this.maxRotation;
        //this.displayImageRotationBounds();

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            var pivot = {x: this.image.x, y: this.image.y};
            var rPoints = utils.Calc.getRotationPoints(pivot, this.resizeUIPoints, utils.Calc.toDegrees(this.image.rotation));
            var rRect = utils.Calc.getBoundsByRotationPoints(rPoints);
            var scale = utils.Calc.getBoundsScale(rRect, this.image);
            var w = this.image.width;
            var h = this.image.height;
            var sw = w * scale.max;
            var sh = h * scale.max;

            // 이미지가 최대 사이즈 보다 작은 경우에만 스케일을 하도록 조건 변경 필요
            if (w <= sw && h <= sh) {
                var space = 0;
                this.image.width = sw + space;
                this.image.height = sh + space;
            }

            // utils.Painter.drawBounds(this.gRotate, rotationRect, true, 1, 0xFF00FF, 0.7); // 자주빛
            this.image.fixMove(this.resizeUI, this.stageRotation);
        }
        this.image.updatePrevLtPointForPivot();
    };

    p.rotateEnd = function () {
        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    };

    p.cornerResizeStart = function () {
        this.setStartResizeUIBounds();
        this.image.updatePrevLtPointForPivot();
    };

    p.cornerResizeChange = function (e) {
        var changePoint;
        var dx = e.dx;
        var dy = e.dy;
        var speedX = dx * 2;
        var speedY = dy * 2;
        var corner = e.target;
        var tx = corner.x + dx;
        var ty = corner.y + dy;

        if (tx > this.startResizeBounds.x && tx < (this.startResizeBounds.x + this.startResizeBounds.width) &&
            ty > this.startResizeBounds.y && ty < (this.startResizeBounds.y + this.startResizeBounds.height)) {

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
    };

    p.cornerResizeChangeWithAspectRatio = function (e) {
        this.resizeUIChange(e.target, e.dx, e.dy);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.image.updatePrevLtPointForPivot();
    };

    p.resizeUIChange = function (target, dx, dy) {
        var changePoint;
        var speedX = dx * 2;
        var speedY = dy * 2;
        var tx = target.x + dx;
        var ty = target.y + dy;
        var isHorizontal = this.isHorizontal;
        var aspectRatio = this.aspectRatio || 0;

        if(target instanceof ui.CornerShape)
            changePoint = this.resizeUI.getCornerUpdatePointsWithAspectRatio(target, tx, ty, aspectRatio, isHorizontal);
        else
            changePoint = this.resizeUI.getControlUpdatePointsWithAspectRatio(target, tx, ty, aspectRatio, isHorizontal);

        var bounds = utils.Calc.getBoundsByPoints(changePoint);
        var w = bounds.width / this.image.scaleX;
        var h = bounds.height / this.image.scaleY;

        console.log('isExpanded:', this.isResizeUIExpanded(w, h), '[', utils.Calc.trace(this.selectedWidth), utils.Calc.trace(w), ']',
            '[', utils.Calc.trace(this.selectedHeight), utils.Calc.trace(h), ']');


        // if(this.isResizeUIExpanded(tx, ty)) {
        if(this.isResizeUIExpanded(w, h, tx, ty)) {
            tx = tx + speedX;
            ty = ty + speedY;
        }

        if(target instanceof ui.CornerShape)
            changePoint = this.resizeUI.getCornerUpdatePointsWithAspectRatio(target, tx, ty, aspectRatio, isHorizontal);
        else
            changePoint = this.resizeUI.getControlUpdatePointsWithAspectRatio(target, tx, ty, aspectRatio, isHorizontal);

        if (this.image.isContainsBounds(changePoint) === false)
            changePoint = this.resizeUI.fixCornerWithAspectRatio(target, changePoint, this.image, aspectRatio, isHorizontal);

        this.resizeUI.setPoint(changePoint);

        // if (this.isResizeUIExpanded(tx, ty))
        if (this.isResizeUIExpanded(w, h, tx, ty)) {
            this.magnifyImage(this.resizeUI.bounds);
        }

    };

    /*p.isResizeUIExpanded = function (uiMoveX, uiMoveY) {
        if (uiMoveX >= this.startResizeBounds.x && uiMoveX <= (this.startResizeBounds.x + this.startResizeBounds.width) &&
            uiMoveY >= this.startResizeBounds.y && uiMoveY <= (this.startResizeBounds.y + this.startResizeBounds.height)) {
            return false;
        }
        return true;
    };*/

    p.isResizeUIExpanded = function (w, h, uiMoveX, uiMoveY) {
        if (w <= this.selectedWidth && h <= this.selectedHeight &&
            uiMoveX >= this.startResizeBounds.x && uiMoveX <= (this.startResizeBounds.x + this.startResizeBounds.width) &&
            uiMoveY >= this.startResizeBounds.y && uiMoveY <= (this.startResizeBounds.y + this.startResizeBounds.height)) {
            return false;
        }
        return true;
    };

    p.cornerResizeEnd = function () {
        this.magnifyImage(this.resizeUI.bounds);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.gResizeBounds.clear();


        console.log('---------------------------------------');
        console.log('selectedWidth:', utils.Calc.trace(this.resizeUI.getActualPixelWidth()), 'selectedHeight:', utils.Calc.trace(this.resizeUI.getActualPixelHeight()));
        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    };



    p.controlResizeStart = function () {
        this.setStartResizeUIBounds();
        this.image.updatePrevLtPointForPivot();
    };

    p.controlResizeChangeWithAspectRatio = function (e) {
        this.resizeUIChange(e.target, e.dx, e.dy);

        var changePoint;
        var dx = e.dx;
        var dy = e.dy;
        var speedX = dx * 2;
        var speedY = dy * 2;
        var control = e.target;
        var tx = control.x + dx;
        var ty = control.y + dy;
        var isHorizontal = this.isHorizontal;
        var aspectRatio = this.aspectRatio || 0;

        return;

        if (tx > this.startResizeBounds.x && tx < (this.startResizeBounds.x + this.startResizeBounds.width) &&
            ty > this.startResizeBounds.y && ty < (this.startResizeBounds.y + this.startResizeBounds.height)) {

            changePoint = this.resizeUI.getControlUpdatePointsWithAspectRatio(control, tx, ty, aspectRatio, isHorizontal);

            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
            } else {
                changePoint = this.resizeUI.fixCornerWithAspectRatio(control, changePoint, this.image, aspectRatio, isHorizontal);
                this.resizeUI.setPoint(changePoint);
            }
        } else {
            changePoint = this.resizeUI.getControlUpdatePointsWithAspectRatio(control, tx + speedX, ty + speedY, aspectRatio, isHorizontal);

            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
            } else {
                changePoint = this.resizeUI.fixCornerWithAspectRatio(control, changePoint, this.image, aspectRatio, isHorizontal);
                this.resizeUI.setPoint(changePoint);
            }
            this.magnifyImage(this.resizeUI.bounds);
        }

        this.moveUI.setSize(this.resizeUI.bounds);
        this.image.updatePrevLtPointForPivot();
    };

    p.controlResizeEnd = function () {
        console.log('controlResizeEnd');
        this.magnifyImage(this.resizeUI.bounds);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.gResizeBounds.clear();

        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    };


    //////////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////////


    var _stageRotation = 0;

    p.setStageRotation = function (value) {
        _stageRotation = value;
    };

    p.getStageRotation = function () {
        return _stageRotation;
    };

    p.getBounds = function () {
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
    };

    p.getIsReverseRatio = function () {
        var stageRotation = utils.Calc.toDegrees(this.stageRotation % utils.Calc.RADIAN_180);
        stageRotation = Math.round(stageRotation);
        stageRotation = parseInt(stageRotation);
        //console.log('stageRotation: ', stageRotation, stageRotation === -90);
        if(stageRotation === -90)
            return true;
        return false;
    };

    p.getIsHorizontal = function () {
        if(this.isHorizontalImage && this.isReverseRatio === false || this.isHorizontalImage === false && this.isReverseRatio)
            return true;
        return false;
    };

    //////////////////////////////////////////////////////////////////////////
    // Test Function
    //////////////////////////////////////////////////////////////////////////

    // TODO TEST
    p.test = function () {
        //this.image.visible = false;
        //this.resizeUI.visible = false;
        //this.moveUI.visible = false;
        //this.gBounds.visible = false;
        //utils.Painter.drawGrid(this.gGrid, this.canvas.width, this.canvas.height);

        //this.testNextPosition();
        //this.testAspectRatioFunction();
        //this.testActualSelectedPixelSize();
    };

    p.testNextPosition = function () {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        var radius = 30;
        var rotation30 = utils.Calc.toRadians(30);
        var rotation45 = utils.Calc.toRadians(45);

        var p1 = utils.Calc.getNextMovePosition(cx, cy, radius, rotation45);
        var p2 = utils.Calc.getNextMovePosition(cx, cy, -radius, rotation45);
        var p3 = utils.Calc.getNextMovePosition(cx, cy, 60, -rotation45);
        var p4 = utils.Calc.getNextMovePosition(cx, cy, 90, rotation30);
        var p5 = utils.Calc.getNextMovePosition(cx, cy, 90, -rotation30);

        utils.Painter.drawCircle(this.gTest, {x: cx, y: cy}, 4, 0x000000);
        utils.Painter.drawCircle(this.gTest, p1, 4);
        utils.Painter.drawCircle(this.gTest, p2, 4);
        utils.Painter.drawCircle(this.gTest, p3, 4);
        utils.Painter.drawCircle(this.gTest, p4, 4);
        utils.Painter.drawCircle(this.gTest, p5, 4);
    };

    p.testNextPoint = function () {
        var d = 2;
        this.prevX = this.canvas.width / 2;
        this.prevY = this.canvas.height / 2;

        var rotation = utils.Calc.toRadians(45) - utils.Calc.toRadians(90);   // 우상단으로
        //var rotation = ns.Calc.toRadians(45) + ns.Calc.toRadians(90);     // 좌하단으로

        for (var i = 0; i < 90; i++) {
            var x = this.prevX + d * Math.cos(rotation);
            var y = this.prevY + d * Math.sin(rotation);
            //utils.Painter.drawLine(this.gMove, {x:this.prevX, y:this.prevY}, {x:x, y:y}, 2);
            this.prevX = x;
            this.prevY = y;
        }
    };

    p.testPivot = function (keycode) {
        var offset;

        switch (keycode) {
            case consts.KeyCode.NUM_1:
                offset = 0;
                this.image.setPivot({x: offset, y: offset});
                break;

            case consts.KeyCode.NUM_2:
                offset = -10;
                this.image.setPivot({x: offset, y: offset});
                break;

            case consts.KeyCode.NUM_3:
                offset = -20;
                this.image.setPivot({x: offset, y: offset});
                break;

            case consts.KeyCode.NUM_4:
                offset = -30;
                this.image.setPivot({x: offset, y: offset});
                break;
        }
    };

    p.testAspectRatio = function (keycode) {
        switch (keycode) {
            case consts.KeyCode.NUM_1:
                console.log('FREE');
                this.changeAspectRatio(0, 0); //Free
                break;

            case consts.KeyCode.NUM_2:
                console.log('SQUARE');
                this.changeAspectRatio(1, 1); //SQUARE
                break;

            case consts.KeyCode.NUM_3:
                console.log('ORIGNAL');
                this.changeAspectRatio(Math.max(this.originalWidth, this.originalHeight), Math.min(this.originalWidth, this.originalHeight)); //ORIGNAL
                break;

            case consts.KeyCode.NUM_4:
                console.log('3:2');
                this.changeAspectRatio(3, 2); //3:2
                break;

            case consts.KeyCode.NUM_5:
                console.log('4:3');
                this.changeAspectRatio(4, 3); //4:3
                break;

            case consts.KeyCode.NUM_6:
                console.log('16:9');
                this.changeAspectRatio(16, 9); //16:9
                break;
        }
    };

    p.testAspectRatioFunction = function () {
        var w = 70;
        var h = 80;
        console.log(utils.Calc.getX2(16, 9, h));
        console.log(utils.Calc.getWidthMaintainAspectRatio(16, 9, h));
        console.log(utils.Calc.getWidthByAspectRatio(16/9, h));
        console.log('----------------------------------------');
        console.log(utils.Calc.getY2(16, 9, w));
        console.log(utils.Calc.getHeightMaintainAspectRatio(16, 9, w));
    };

    p.testActualSelectedPixelSize = function () {
        var bounds = this.resizeUI.bounds;
        var px = bounds.width / this.image.scale.x;
        var py = bounds.height / this.image.scale.y;
        console.log(px, py);

        var actualSelectedPixelSize = utils.Calc.getActualPixelSize(this.originalWidth, this.originalHeight, this.image, this.resizeUI);
    };


    //////////////////////////////////////////////////////////////////////////
    // Debug Util Function
    //////////////////////////////////////////////////////////////////////////


    /**
     * 현재 화면 사이즈에 맞는 이미지 바운드 영역을 화면에 출력합니다.
     */
    p.displayImageRotationBounds = function () {
        var imageRect = utils.Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);

        var imagePoint = {
            lt: {x: 0, y: 0},
            rt: {x: imageRect.width, y: 0},
            rb: {x: imageRect.width, y: imageRect.height},
            lb: {x: 0, y: imageRect.height}
        };

        var pivot = {x: imageRect.width / 2, y: imageRect.height / 2};
        var rotationPoints = utils.Calc.getRotationPoints(pivot, imagePoint, utils.Calc.toDegrees(this.image.rotation));
        var rotationRect = utils.Calc.getBoundsByRotationPoints(rotationPoints);
        rotationRect.x = this.canvas.width / 2 - rotationRect.width / 2;
        rotationRect.y = this.canvas.height / 2 - rotationRect.height / 2;
        utils.Painter.drawBounds(this.gImage, rotationRect, true, 2, 0x00FCFF, 0.4); // 하늘색
    };

    usenamespace('editor.es5.crop').Cropper = Cropper;
})();

