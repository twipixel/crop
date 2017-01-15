(function () {
    'use strict';

    var ui = usenamespace('editor.es5.ui');
    var utils = usenamespace('editor.es5.utils');
    var consts = usenamespace('editor.es5.consts');

    function ResizeUI (canvas, image) {
        Object.defineProperty(this, 'bounds', {get: function () {return {x: this.lt.x, y: this.lt.y, width: this.rt.x - this.lt.x, height: this.rb.y - this.rt.y}}});
        Object.defineProperty(this, 'cx', {get: function () {return this.lt.x + this.bounds.width / 2;}});
        Object.defineProperty(this, 'cy', {get: function () {return this.lt.y + this.bounds.height / 2;}});
        Object.defineProperty(this, 'isMinWidth', {get: function () {var bounds = this.bounds;var min = this.size * 2 + this.half;return (bounds.width < min);}});
        Object.defineProperty(this, 'isMinHeight', {get: function () {var bounds = this.bounds;var min = this.size * 2 + this.half;return (bounds.height < min);}});
        Object.defineProperty(this, 'points', {get: function () {return {lt: {x: this.lt.x, y: this.lt.y}, rt: {x: this.rt.x, y: this.rt.y}, rb: {x: this.rb.x, y: this.rb.y}, lb: {x: this.lb.x, y: this.lb.y}}}});
        Object.defineProperty(this, 'rotationPoints', {get: function () {var pivot = {x: this.cx, y: this.cy};return {lt: utils.Calc.getRotationPoint(pivot, this.rt, -90), rt: utils.Calc.getRotationPoint(pivot, this.rb, -90), rb: utils.Calc.getRotationPoint(pivot, this.lb, -90), lb: utils.Calc.getRotationPoint(pivot, this.lt, -90)}}});

        PIXI.Container.call(this);
        this.initialize(canvas, image);
        this.addCornerDownEvent();
        this.addControlDownEvent();
    };

    var p = ResizeUI.prototype = Object.create(PIXI.Container.prototype);

    p.initialize = function (canvas, image) {
        this.space = -0.5;
        this.image = image;
        this.canvas = canvas;
        this.gBounds = new PIXI.Graphics();
        this.topControl = new ui.ControlArea(ui.ControlArea.ROW);
        this.bottomControl = new ui.ControlArea(ui.ControlArea.ROW);
        this.leftControl = new ui.ControlArea(ui.ControlArea.COL);
        this.rightControl = new ui.ControlArea(ui.ControlArea.COL);
        this.lt = new ui.CornerShape(ui.CornerShape.LEFT_TOP);
        this.rt = new ui.CornerShape(ui.CornerShape.RIGHT_TOP);
        this.rb = new ui.CornerShape(ui.CornerShape.RIGHT_BOTTOM);
        this.lb = new ui.CornerShape(ui.CornerShape.LEFT_BOTTOM);
        this.topControl.defaultCursor = 's-resize';
        this.bottomControl.defaultCursor = 'n-resize';
        this.leftControl.defaultCursor = 'e-resize';
        this.rightControl.defaultCursor = 'w-resize';
        this.lt.defaultCursor = 'se-resize';
        this.rt.defaultCursor = 'sw-resize';
        this.rb.defaultCursor = 'nw-resize';
        this.lb.defaultCursor = 'ne-resize';


        this.minSize = this.lt.size;

        this.addChild(this.gBounds);
        this.addChild(this.topControl);
        this.addChild(this.bottomControl);
        this.addChild(this.leftControl);
        this.addChild(this.rightControl);
        this.addChild(this.lt);
        this.addChild(this.rt);
        this.addChild(this.rb);
        this.addChild(this.lb);

        // TODO 디버그용 삭제 필요
        this.gDebug = new PIXI.Graphics();
        this.addChild(this.gDebug);
    };

    p.resize = function (bounds) {
        this.drawBounds();
        this.resizeControl();
        this.resizeCornerShape(bounds);
    };

    p.resizeCornerShape = function (bounds) {
        this.lt.x = bounds.x - this.space;
        this.lt.y = bounds.y - this.space;
        this.rt.x = bounds.x + bounds.width + this.space;
        this.rt.y = bounds.y - this.space;
        this.rb.x = this.rt.x + this.space;
        this.rb.y = bounds.y + bounds.height + this.space;
        this.lb.x = this.lt.x - this.space;
        this.lb.y = this.rb.y + this.space;
    };

    p.resizeControl = function () {
        this.topControl.x = this.lt.x;
        this.topControl.y = this.lt.y;
        this.topControl.width = this.rt.x - this.lt.x;
        this.bottomControl.x = this.lb.x;
        this.bottomControl.y = this.lb.y;
        this.bottomControl.width = this.topControl.width;
        this.leftControl.x = this.lt.x;
        this.leftControl.y = this.lt.y;
        this.leftControl.height = this.rb.y - this.lt.y;
        this.rightControl.x = this.rt.x;
        this.rightControl.y = this.rt.y;
        this.rightControl.height = this.leftControl.height;
    };

    p.drawBounds = function () {
        this.gBounds.clear();
        this.gBounds.lineStyle(2, 0x9e9e9e); // 회색
        this.gBounds.moveTo(this.lt.x, this.lt.y);
        this.gBounds.lineTo(this.rt.x, this.rt.y);
        this.gBounds.lineTo(this.rb.x, this.rb.y);
        this.gBounds.lineTo(this.lb.x, this.lb.y);
        this.gBounds.lineTo(this.lt.x, this.lt.y);
        this.gBounds.endFill();
    };

    p.updateOtherCorner = function (changeCorner) {
        switch (changeCorner) {
            case this.lt:
                this.rt.y = this.lt.y;
                this.lb.x = this.lt.x;
                break;

            case this.rt:
                this.lt.y = this.rt.y;
                this.rb.x = this.rt.x;
                break;

            case this.rb:
                this.rt.x = this.rb.x;
                this.lb.y = this.rb.y;
                break;

            case this.lb:
                this.lt.x = this.lb.x;
                this.rb.y = this.lb.y;
                break;
        }
        this.drawBounds();
        this.resizeControl();
    };

    p.setSize = function (rect) {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;

        this.lt.x = x;
        this.lt.y = y;
        this.rt.x = x + width;
        this.rt.y = y;
        this.rb.x = this.rt.x;
        this.rb.y = y + height;
        this.lb.x = x;
        this.lb.y = this.rb.y;

        this.drawBounds();
        this.resizeControl();
    };

    p.setPoint = function (points) {
        // 아래부터 원래 로직
        this.lt.x = points.lt.x;
        this.lt.y = points.lt.y;
        this.rt.x = points.rt.x;
        this.rt.y = points.rt.y;
        this.rb.x = points.rb.x;
        this.rb.y = points.rb.y;
        this.lb.x = points.lb.x;
        this.lb.y = points.lb.y;
        this.drawBounds();
    };

    /**
     * 이동하는 코너와 변화값을 보내주면 변화된 points 들을 계산해서 건내줍니다.
     * @param corner
     * @param tx 이동할 타겟 위치 x 좌표
     * @param ty 이동할 타겟 위치 y 좌표
     * @returns {*}
     */
    p.getCornerUpdatePoints = function (corner, tx, ty) {
        var points = this.points;

        switch (corner) {
            case this.lt:
                points.lt.x = tx;
                points.lt.y = ty;
                points.rt.y = points.lt.y;
                points.lb.x = points.lt.x;
                break;

            case this.rt:
                points.rt.x = tx;
                points.rt.y = ty;
                points.lt.y = points.rt.y;
                points.rb.x = points.rt.x;
                break;

            case this.rb:
                points.rb.x = tx;
                points.rb.y = ty;
                points.rt.x = points.rb.x;
                points.lb.y = points.rb.y;
                break;

            case this.lb:
                points.lb.x = tx;
                points.lb.y = ty;
                points.lt.x = points.lb.x;
                points.rb.y = points.lb.y;
                break;
        }

        return points;
    };

    p.fixCorner = function (corner, points, image) {
        var hitPoints = image.getHitPoints(points);

        for (var i = 0; i < hitPoints.length; i++) {
            var hitInfo = hitPoints[i];

            var limit;
            var point = hitInfo.point;
            var hitSide = hitInfo.hitSide;

            switch (hitSide) {
                case consts.HitSide.LEFT:
                    limit = this.getLeft(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case consts.HitSide.RIGHT:
                    limit = this.getRight(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case consts.HitSide.TOP:
                    limit = this.getTop(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case consts.HitSide.BOTTOM:
                    limit = this.getBottom(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;
            }
        }

        return points;
    };

    p.getCornerUpdatePointsWithAspectRatio = function (corner, tx, ty, aspectRatio, isHorizontal) {
        var points = this.points;
        var aspectRatio = aspectRatio || 0;

        switch (corner) {
            case this.lt:   // RB
                points.lt.x = tx;
                points.lt.y = ty;
                points.rt.y = points.lt.y;
                points.lb.x = points.lt.x;
                break;

            case this.rt: // LB
                points.rt.x = tx;
                points.rt.y = ty;
                points.lt.y = points.rt.y;
                points.rb.x = points.rt.x;
                break;

            case this.rb:   // LT
                points.rb.x = tx;
                points.rb.y = ty;
                points.rt.x = points.rb.x;
                points.lb.y = points.rb.y;
                break;

            case this.lb:   // RT
                points.lb.x = tx;
                points.lb.y = ty;
                points.lt.x = points.lb.x;
                points.rb.y = points.lb.y;
                break;
        }

        points = this.getPointsWithAspectRatio(corner, points, aspectRatio, isHorizontal);

        return points;
    };


    p.getControlUpdatePointsWithAspectRatio = function (control, tx, ty, aspectRatio, isHorizontal) {
        var points = this.points;
        var aspectRatio = aspectRatio || 0;

        switch (control) {
            case this.leftControl:
                points.lt.x = tx;
                points.lb.x = tx;
                break;

            case this.topControl:
                points.lt.y = ty;
                points.rt.y = ty;
                break;

            case this.rightControl:
                points.rt.x = tx;
                points.rb.x = tx;
                break;

            case this.bottomControl:
                points.lb.y = ty;
                points.rb.y = ty;
                break;
        }

        points = this.getPointsWithAspectRatio(control, points, aspectRatio, isHorizontal);

        return points;
    };

    p.getActualPixelWidth = function (bounds) {
        bounds = bounds || this.bounds;
        return bounds.width / this.image.scaleX;
    };

    p.getActualPixelHeight = function (bounds) {
        bounds = bounds || this.bounds;
        return bounds.height / this.image.scaleY;
    };

    p.getPointsWithAspectRatio = function (target, points, aspectRatio, isHorizontal) {
        var bounds = utils.Calc.getBoundsByPoints(points);
        var pixelWidth = this.getActualPixelWidth(bounds);
        var pixelHeight = this.getActualPixelHeight(bounds);
        bounds.width = (pixelWidth < this.minSize) ? this.minSize * this.image.scaleX : bounds.width;
        bounds.height = (pixelHeight < this.minSize) ? this.minSize * this.image.scaleY : bounds.height;

        if(aspectRatio !== 0) {
            if(isHorizontal) {
                bounds.width = utils.Calc.getWidthByAspectRatio(aspectRatio, bounds.height);
            } else {
                bounds.height = utils.Calc.getHeightByAspectRatio(aspectRatio, bounds.width);
            }
            console.log(utils.Calc.trace(bounds.width), utils.Calc.trace(bounds.height));
        }

        if(target instanceof  ui.CornerShape) {
            switch (target) {
                case this.lt:   // 기준점 RB
                    bounds.x = this.rb.x - bounds.width;
                    bounds.y = this.rb.y - bounds.height;
                    break;

                case this.rt:   // 기준점 LB
                    bounds.x = this.lb.x;
                    bounds.y = this.lb.y - bounds.height;
                    break;

                case this.rb:   // 기준점 LT
                    bounds.x = this.lt.x;
                    bounds.y = this.lt.y;
                    break;

                case this.lb:   // 기준점 RT
                    bounds.x = this.rt.x - bounds.width;
                    bounds.y = this.rt.y;
                    break;
            }

            return utils.Calc.getPointsByBounds(bounds);

        } else {
            switch (target) {
                case this.leftControl:
                    bounds.x = this.rb.x - bounds.width;
                    bounds.y = this.rb.y - bounds.height;
                    break;

                case this.topControl:
                    bounds.x = this.lb.x;
                    bounds.y = this.lb.y - bounds.height;
                    break;

                case this.rightControl:
                    bounds.x = this.lt.x;
                    bounds.y = this.lt.y;
                    break;

                case this.bottomControl:
                    bounds.x = this.rt.x - bounds.width;
                    bounds.y = this.rt.y;
                    break;
            }

            return utils.Calc.getPointsByBounds(bounds);
        }
    };


    // 현재 fixCorner 와 같음 수정 사항 없고 함수 이름만 분리
    p.fixCornerWithAspectRatio = function (corner, points, image, aspectRatio, isHorizontal) {
        var hitPoints = image.getHitPoints(points);

        for (var i = 0; i < hitPoints.length; i++) {
            var hitInfo = hitPoints[i];

            var limit;
            var point = hitInfo.point;
            var hitSide = hitInfo.hitSide;

            switch (hitSide) {
                case consts.HitSide.LEFT:
                    limit = this.getLeft(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case consts.HitSide.RIGHT:
                    limit = this.getRight(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case consts.HitSide.TOP:
                    limit = this.getTop(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case consts.HitSide.BOTTOM:
                    limit = this.getBottom(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;
            }
        }

        return points;
    };

    p.getMinSize = function (aspectRatio, isHorizontal) {
        aspectRatio = aspectRatio || 0;

        var size = {width:this.minSize, height:this.minSize};

        if(aspectRatio !== 0) {
            if(isHorizontal) {
                size.width = utils.Calc.getWidthByAspectRatio(aspectRatio, size.height);
            } else {
                size.height = utils.Calc.getHeightByAspectRatio(aspectRatio, size.width);
            }
        }

        return size;
    };

    p.getLeft = function (points, image) {
        var ltx, lbx;

        if (image.isOutLeftLine(points.lt)) {
            ltx = image.getLeftIntersectionPoint(points.lt).x;
        } else if (image.isOutTopLine(points.lt)) {
            ltx = image.getTopIntersectionPoint(points.lt).x;
        } else if (image.isOutBottomLine(points.lt)) {
            ltx = image.getBottomIntersectionPoint(points.lt).x;
        } else {
            ltx = points.lt.x;
        }

        if (image.isOutLeftLine(points.lb)) {
            lbx = image.getLeftIntersectionPoint(points.lb).x;
        } else if (image.isOutTopLine(points.lb)) {
            lbx = image.getTopIntersectionPoint(points.lb).x;
        } else if (image.isOutBottomLine(points.lb)) {
            lbx = image.getBottomIntersectionPoint(points.lb).x;
        } else {
            lbx = points.lb.x;
        }

        return Math.max(ltx, lbx);
    };

    p.getTop = function (points, image) {
        var lty, rty;

        if (image.isOutTopLine(points.lt)) {
            lty = image.getTopIntersectionPoint(points.lt).y;
        } else if (image.isOutLeftLine(points.lt)) {
            lty = image.getLeftIntersectionPoint(points.lt).y;
        } else if (image.isOutRightLine(points.lt)) {
            lty = image.getRightIntersectionPoint(points.lt).y;
        } else {
            lty = points.lt.y;
        }

        if (image.isOutTopLine(points.rt)) {
            rty = image.getTopIntersectionPoint(points.rt).y;
        } else if (image.isOutLeftLine(points.rt)) {
            rty = image.getLeftIntersectionPoint(points.rt).y;
        } else if (image.isOutRightLine(points.rt)) {
            rty = image.getRightIntersectionPoint(points.rt).y;
        } else {
            rty = points.rt.y;
        }

        return Math.max(lty, rty);
    };

    p.getRight = function (points, image) {
        var rtx, rbx;

        if (image.isOutRightLine(points.rt)) {
            rtx = image.getRightIntersectionPoint(points.rt).x;
        } else if (image.isOutTopLine(points.rt)) {
            rtx = image.getTopIntersectionPoint(points.rt).x;
        } else if (image.isOutBottomLine(points.rt)) {
            rtx = image.getBottomIntersectionPoint(points.rt).x;
        } else {
            rtx = points.rt.x;
        }

        if (image.isOutRightLine(points.rb)) {
            rbx = image.getRightIntersectionPoint(points.rb).x;
        } else if (image.isOutTopLine(points.rb)) {
            rbx = image.getTopIntersectionPoint(points.rb).x;
        } else if (image.isOutBottomLine(points.rb)) {
            rbx = image.getBottomIntersectionPoint(points.rb).x;
        } else {
            rbx = points.rb.x;
        }

        return Math.min(rtx, rbx);
    };

    p.getBottom = function (points, image) {
        var rby, lby;

        if (image.isOutBottomLine(points.rb)) {
            rby = image.getBottomIntersectionPoint(points.rb).y;
        } else if (image.isOutLeftLine(points.rb)) {
            rby = image.getLeftIntersectionPoint(points.rb).y;
        } else if (image.isOutRightLine(points.rb)) {
            rby = image.getRightIntersectionPoint(points.rb).y;
        } else {
            rby = points.rb.y;
        }

        if (image.isOutBottomLine(points.lb)) {
            lby = image.getBottomIntersectionPoint(points.lb).y;
        } else if (image.isOutLeftLine(points.lb)) {
            lby = image.getLeftIntersectionPoint(points.lb).y;
        } else if (image.isOutRightLine(points.lb)) {
            lby = image.getRightIntersectionPoint(points.lb).y;
        } else {
            lby = points.lb.y;
        }

        return Math.min(rby, lby);
    };

    p.pointsToBounds = function (points) {
        return {
            x: points.lt.x,
            y: points.lt.y,
            width: points.rt.x - points.lt.x,
            height: points.rb.y - points.rt.y
        }
    };

    /**
     * 좌상단 점이 바운드안에 포함되었는지 여부
     * @param bounds
     * @returns {boolean}
     */
    p.isLtInsideBounds = function (bounds) {
        return (utils.Calc.isInsideSquare(this.lt, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    };

    p.isRtInsideBounds = function (bounds) {
        return (utils.Calc.isInsideSquare(this.rt, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    };

    p.isRbInsideBounds = function (bounds) {
        return (utils.Calc.isInsideSquare(this.rb, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    };

    p.isLbInsideBounds = function (bounds) {
        return (utils.Calc.isInsideSquare(this.lb, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    };

    
    //////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////


    p.onCornerDown = function (e) {
        e.stopPropagation();

        this.selectedTarget = e.target;
        this.dragStartX = this.prevDragX = e.data.global.x;
        this.dragStartY = this.prevDragY = e.data.global.y;

        this.addCornerMoveEvent();
        this.removeCornerDownEvent();

        this.emit('cornerResizeStart', {
            target: this.selectedTarget,
            dragStartX: this.dragStartX,
            dragStartY: this.dragStartY
        });
        //console.log('onCornerDown!', ns.Calc.digit(this.dragStartX), ns.Calc.digit(this.dragStartY));
    };

    p.onCornerMove = function (e) {
        this.currentDragX = e.clientX;
        this.currentDragY = e.clientY;

        console.log(utils.Mouse.stageX, utils.Mouse.stageY);

        this.dx = this.currentDragX - this.prevDragX;
        this.dy = this.currentDragY - this.prevDragY;

        this.emit('cornerResizeChange', {
            dx: this.dx,
            dy: this.dy,
            prevX: this.prevDragX,
            prevY: this.prevDragY,
            target: this.selectedTarget
        });

        this.prevDragX = this.currentDragX;
        this.prevDragY = this.currentDragY;
        this.resizeControl();
        //console.log('dx:' + ns.Calc.digit(this.dx) + ',' + ns.Calc.digit(this.dy));
    };

    p.onCornerUp = function (e) {
        this.addCornerDownEvent();
        this.removeCornerMoveEvent();

        this.emit('cornerResizeEnd', {
            target: this.selectedTarget
        });

        this.selectedTarget = null;
    };


    p.onControlDown = function (e) {
        e.stopPropagation();

        this.selectedTarget = e.target;
        this.dragStartX = this.prevDragX = e.data.global.x;
        this.dragStartY = this.prevDragY = e.data.global.y;

        this.addControlMoveEvent();
        this.removeControlDownEvent();

        this.emit('controlResizeStart', {
            target: this.selectedTarget,
            dragStartX: this.dragStartX,
            dragStartY: this.dragStartY
        });
        //console.log('onCornerDown!', ns.Calc.digit(this.dragStartX), ns.Calc.digit(this.dragStartY));
    };

    p.onControlMove = function (e) {
        this.currentDragX = e.clientX;
        this.currentDragY = e.clientY;

        this.dx = this.currentDragX - this.prevDragX;
        this.dy = this.currentDragY - this.prevDragY;

        this.emit('controlResizeChange', {
            dx: this.dx,
            dy: this.dy,
            prevX: this.prevDragX,
            prevY: this.prevDragY,
            target: this.selectedTarget
        });

        this.prevDragX = this.currentDragX;
        this.prevDragY = this.currentDragY;
        this.resizeControl();
        //console.log('dx:' + ns.Calc.digit(this.dx) + ',' + ns.Calc.digit(this.dy));
    };

    p.onControlUp = function (e) {
        this.addControlDownEvent();
        this.removeControlMoveEvent();

        this.emit('controlResizeEnd', {
            target: this.selectedTarget
        });

        this.selectedTarget = null;
    };


    //////////////////////////////////////////////////////////////////////
    // Add & Remove MouseEvent
    //////////////////////////////////////////////////////////////////////


    p.addCornerDownEvent = function () {
        this._cornerDownListener = this.onCornerDown.bind(this);
        this.lt.on('mousedown', this._cornerDownListener);
        this.rt.on('mousedown', this._cornerDownListener);
        this.rb.on('mousedown', this._cornerDownListener);
        this.lb.on('mousedown', this._cornerDownListener);
    };

    p.removeCornerDownEvent = function () {
        this.lt.off('mousedown', this._cornerDownListener);
        this.rt.off('mousedown', this._cornerDownListener);
        this.rb.off('mousedown', this._cornerDownListener);
        this.lb.off('mousedown', this._cornerDownListener);
    };

    p.addCornerMoveEvent = function () {
        this._cornerUpListener = this.onCornerUp.bind(this);
        this._cornerMoveListener = this.onCornerMove.bind(this);

        window.document.addEventListener('mouseup', this._cornerUpListener);
        window.document.addEventListener('mousemove', this._cornerMoveListener);
    };

    p.removeCornerMoveEvent = function () {
        window.document.removeEventListener('mouseup', this._cornerUpListener);
        window.document.removeEventListener('mousemove', this._cornerMoveListener);
    };



    p.addControlDownEvent = function () {
        this._controlDownListener = this.onControlDown.bind(this);
        this.leftControl.on('mousedown', this._controlDownListener);
        this.topControl.on('mousedown', this._controlDownListener);
        this.rightControl.on('mousedown', this._controlDownListener);
        this.bottomControl.on('mousedown', this._controlDownListener);
    };

    p.removeControlDownEvent = function () {
        this.leftControl.off('mousedown', this._controlDownListener);
        this.topControl.off('mousedown', this._controlDownListener);
        this.rightControl.off('mousedown', this._controlDownListener);
        this.bottomControl.off('mousedown', this._controlDownListener);
    };

    p.addControlMoveEvent = function () {
        this._controlUpListener = this.onControlUp.bind(this);
        this._controlMoveListener = this.onControlMove.bind(this);

        window.document.addEventListener('mouseup', this._controlUpListener);
        window.document.addEventListener('mousemove', this._controlMoveListener);
    };

    p.removeControlMoveEvent = function () {
        window.document.removeEventListener('mouseup', this._controlUpListener);
        window.document.removeEventListener('mousemove', this._controlMoveListener);
    };


    ///////////////////////////////////////////////////////////////////////
    // 테스트 시작
    ///////////////////////////////////////////////////////////////////////


    p.testSetPointWithAspectRatio = function (points, corner, aspectRatio) {
        // 아래부터 원래 로직
        this.lt.x = points.lt.x;
        this.lt.y = points.lt.y;
        this.rt.x = points.rt.x;
        this.rt.y = points.rt.y;
        this.rb.x = points.rb.x;
        this.rb.y = points.rb.y;
        this.lb.x = points.lb.x;
        this.lb.y = points.lb.y;

        this.testSetAspectRatio(corner, aspectRatio);
    };


    p.testSetAspectRatio = function(corner, aspectRatio) {
        //var aspectRatio = 16 / 9;
        aspectRatio = aspectRatio || 0;

        var bounds = this.bounds;
        bounds.width = utils.Calc.getWidthByAspectRatio(aspectRatio, bounds.height);


        switch (corner) {
            case this.lt:   // RB
                bounds.x = this.rb.x - bounds.width;
                bounds.y = this.rb.y - bounds.height;
                break;

            case this.rt: // LB
                bounds.x = this.lb.x;
                bounds.y = this.lb.y - bounds.height;
                break;

            case this.rb:   // LT
                bounds.x = this.lt.x;
                bounds.y = this.lt.y;
                break;

            case this.lb:   // RT
                bounds.x = this.rt.x - bounds.width;
                bounds.y = this.rt.y;
                break;
        }

        this.setSize(bounds);
    };


    ///////////////////////////////////////////////////////////////////////
    // 테스트 종료
    ///////////////////////////////////////////////////////////////////////


    usenamespace('editor.es5.ui').ResizeUI = ResizeUI;
})();
