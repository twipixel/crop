import {CornerShape} from './CornerShape';
import {ControlArea} from './ControlArea';
import {Calc} from '../utils/Calculator';
import {Painter} from '../utils/Painter';
import {HitSide} from '../const/HitSide';
import Mouse from './../utils/Mouse';


export class ResizeUI extends PIXI.Container {
    constructor(canvas) {
        super();
        this.initialize(canvas);
        this.addCornerDownEvent();
    }


    initialize(canavs) {
        this.offset = -1;
        this.canvas = canvas;
        this.imageRect = new PIXI.Graphics();
        this.topControl = new ControlArea(ControlArea.ROW);
        this.bottomControl = new ControlArea(ControlArea.ROW);
        this.leftControl = new ControlArea(ControlArea.COL);
        this.rightControl = new ControlArea(ControlArea.COL);
        this.lt = new CornerShape(CornerShape.LEFT_TOP);
        this.rt = new CornerShape(CornerShape.RIGHT_TOP);
        this.rb = new CornerShape(CornerShape.RIGHT_BOTTOM);
        this.lb = new CornerShape(CornerShape.LEFT_BOTTOM);
        this.addChild(this.imageRect);
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
    }


    resize(imageRect) {
        this.resizeCornerShape(imageRect);
        this.resizeControl();
        this.drawImageRect();
    }


    resizeCornerShape(imageRect) {
        this.lt.x = imageRect.x - this.offset;
        this.lt.y = imageRect.y - this.offset;
        this.rt.x = imageRect.x + imageRect.width + this.offset;
        this.rt.y = imageRect.y - this.offset;
        this.rb.x = this.rt.x + this.offset;
        this.rb.y = imageRect.y + imageRect.height + this.offset;
        this.lb.x = this.lt.x - this.offset;
        this.lb.y = this.rb.y + this.offset;
    }


    resizeControl() {
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
    }


    drawImageRect() {
        this.imageRect.clear();
        this.imageRect.lineStyle(2, 0x9e9e9e); // 회색
        this.imageRect.moveTo(this.lt.x, this.lt.y);
        this.imageRect.lineTo(this.rt.x, this.rt.y);
        this.imageRect.lineTo(this.rb.x, this.rb.y);
        this.imageRect.lineTo(this.lb.x, this.lb.y);
        this.imageRect.lineTo(this.lt.x, this.lt.y);
        this.imageRect.endFill();
    }


    updateOtherCorner(changeCorner) {
        switch(changeCorner) {
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
        this.drawImageRect();
    }


    setSize(rect) {
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

        this.drawImageRect();
    }


    setPoint(points) {
        this.lt.x = points.lt.x;
        this.lt.y = points.lt.y;
        this.rt.x = points.rt.x;
        this.rt.y = points.rt.y;
        this.rb.x = points.rb.x;
        this.rb.y = points.rb.y;
        this.lb.x = points.lb.x;
        this.lb.y = points.lb.y;

        this.drawImageRect();
    }


    /**
     * 이동하는 코너와 변화값을 보내주면 변화된 points 들을 계산해서 건내줍니다.
     * @param corner
     * @param dx
     * @param dy
     * @returns {*}
     */
    getCornerUpdatePoints(corner, tx, ty) {
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
    }

    fixCorner(corner, points, image) {
        var hitPoints = image.getHitPoints(points);

        for(var i=0; i<hitPoints.length; i++) {
            var hitInfo = hitPoints[i];

            var limit;
            var point = hitInfo.point;
            var hitSide = hitInfo.hitSide;

            switch (hitSide) {
                case HitSide.LEFT:
                    limit = this.getLeft(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case HitSide.RIGHT:
                    limit = this.getRight(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case HitSide.TOP:
                    limit = this.getTop(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case HitSide.BOTTOM:
                    limit = this.getBottom(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;
            }
        }

        return points;
    }

    getLeft(points, image) {
        var ltx, lbx;

        if(image.isOutLeftLine(points.lt)) {
            ltx = image.getLeftIntersectionPoint(points.lt).x;
        } else if(image.isOutTopLine(points.lt)) {
            ltx = image.getTopIntersectionPoint(points.lt).x;
        } else if(image.isOutBottomLine(points.lt)) {
            ltx = image.getBottomIntersectionPoint(points.lt).x;
        } else {
            ltx = points.lt.x;
        }

        if(image.isOutLeftLine(points.lb)) {
            lbx = image.getLeftIntersectionPoint(points.lb).x;
        } else if(image.isOutTopLine(points.lb)) {
            lbx = image.getTopIntersectionPoint(points.lb).x;
        } else if(image.isOutBottomLine(points.lb)) {
            lbx = image.getBottomIntersectionPoint(points.lb).x;
        } else {
            lbx = points.lb.x;
        }

        return Math.max(ltx, lbx);
    }

    getTop(points, image) {
        var lty, rty;

        if(image.isOutTopLine(points.lt)) {
            lty = image.getTopIntersectionPoint(points.lt).y;
        } else if(image.isOutLeftLine(points.lt)) {
            lty = image.getLeftIntersectionPoint(points.lt).y;
        } else if(image.isOutRightLine(points.lt)) {
            lty = image.getRightIntersectionPoint(points.lt).y;
        } else {
            lty = points.lt.y;
        }

        if(image.isOutTopLine(points.rt)) {
            rty = image.getTopIntersectionPoint(points.rt).y;
        } else if(image.isOutLeftLine(points.rt)) {
            rty = image.getLeftIntersectionPoint(points.rt).y;
        } else if(image.isOutRightLine(points.rt)) {
            rty = image.getRightIntersectionPoint(points.rt).y;
        } else {
            rty = points.rt.y;
        }

        return Math.max(lty, rty);
    }

    getRight(points, image) {
        var rtx, rbx;

        if(image.isOutRightLine(points.rt)) {
            rtx = image.getRightIntersectionPoint(points.rt).x;
        } else if(image.isOutTopLine(points.rt)) {
            rtx = image.getTopIntersectionPoint(points.rt).x;
        } else if(image.isOutBottomLine(points.rt)) {
            rtx = image.getBottomIntersectionPoint(points.rt).x;
        } else {
            rtx = points.rt.x;
        }

        if(image.isOutRightLine(points.rb)) {
            rbx = image.getRightIntersectionPoint(points.rb).x;
        } else if(image.isOutTopLine(points.rb)) {
            rbx = image.getTopIntersectionPoint(points.rb).x;
        } else if(image.isOutBottomLine(points.rb)) {
            rbx = image.getBottomIntersectionPoint(points.rb).x;
        } else {
            rbx = points.rb.x;
        }

        return Math.min(rtx, rbx);
    }

    getBottom(points, image) {
        var rby, lby;

        if(image.isOutBottomLine(points.rb)) {
            rby = image.getBottomIntersectionPoint(points.rb).y;
        } else if(image.isOutLeftLine(points.rb)) {
            rby = image.getLeftIntersectionPoint(points.rb).y;
        } else if(image.isOutRightLine(points.rb)) {
            rby = image.getRightIntersectionPoint(points.rb).y;
        } else {
            rby = points.rb.y;
        }

        if(image.isOutBottomLine(points.lb)) {
            lby = image.getBottomIntersectionPoint(points.lb).y;
        } else if(image.isOutLeftLine(points.lb)) {
            lby = image.getLeftIntersectionPoint(points.lb).y;
        } else if(image.isOutRightLine(points.lb)) {
            lby = image.getRightIntersectionPoint(points.lb).y;
        } else {
            lby = points.lb.y;
        }

        return Math.min(rby, lby);
    }
    
    pointsToBounds(points) {
        return {
            x:points.lt.x,
            y:points.lt.y,
            width:points.rt.x - points.lt.x,
            height:points.rb.y - points.rt.y
        }
    }

    /**
     * 좌상단 점이 바운드안에 포함되었는지 여부
     * @param bounds
     * @returns {boolean}
     */
    isLtInsideBounds(bounds) {
        return (Calc.isInsideSquare(this.lt, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    }

    isRtInsideBounds(bounds) {
        return (Calc.isInsideSquare(this.rt, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    }

    isRbInsideBounds(bounds) {
        return (Calc.isInsideSquare(this.rb, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    }

    isLbInsideBounds(bounds) {
        return (Calc.isInsideSquare(this.lb, bounds.lt, bounds.rt, bounds.rb, bounds.lb));
    }

    //////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////


    onCornerDown(e) {
        e.stopPropagation();

        this.selectedTarget = e.target;
        this.dragStartX = this.prevDragX = Mouse.global.x;
        this.dragStartY = this.prevDragY = Mouse.global.y;

        this.addCornerMoveEvent();
        this.removeCornerDownEvent();

        this.emit('cornerResizeStart', {
            target: this.selectedTarget,
            dragStartX: this.dragStartX,
            dragStartY: this.dragStartY
        });
        //console.log('onCornerDown!', Calc.digit(this.dragStartX), Calc.digit(this.dragStartY));
    }

    onCornerMove(e) {
        this.currentDragX = Mouse.global.x;
        this.currentDragY = Mouse.global.y;

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
        //console.log('dx:' + Calc.digit(this.dx) + ',' + Calc.digit(this.dy));
    }

    onCornerUp(e) {
        this.addCornerDownEvent();
        this.removeCornerMoveEvent();

        this.emit('cornerResizeEnd', {
            target: this.selectedTarget
        });

        this.selectedTarget = null;
    }


    //////////////////////////////////////////////////////////////////////
    // Add & Remove MouseEvent
    //////////////////////////////////////////////////////////////////////


    addCornerDownEvent() {
        this._cornerDownListener = this.onCornerDown.bind(this);
        this.lt.on('mousedown', this._cornerDownListener);
        this.rt.on('mousedown', this._cornerDownListener);
        this.rb.on('mousedown', this._cornerDownListener);
        this.lb.on('mousedown', this._cornerDownListener);

        this.lt.on('touchstart', this._cornerDownListener);
        this.rt.on('touchstart', this._cornerDownListener);
        this.rb.on('touchstart', this._cornerDownListener);
        this.lb.on('touchstart', this._cornerDownListener);
    }

    removeCornerDownEvent() {
        this.lt.off('mousedown', this._cornerDownListener);
        this.rt.off('mousedown', this._cornerDownListener);
        this.rb.off('mousedown', this._cornerDownListener);
        this.lb.off('mousedown', this._cornerDownListener);

        this.lt.off('touchstart', this._cornerDownListener);
        this.rt.off('touchstart', this._cornerDownListener);
        this.rb.off('touchstart', this._cornerDownListener);
        this.lb.off('touchstart', this._cornerDownListener);
    }

    addCornerMoveEvent() {
        this._cornerUpListener = this.onCornerUp.bind(this);
        this._cornerMoveListener = this.onCornerMove.bind(this);

        window.document.addEventListener('mouseup', this._cornerUpListener);
        window.document.addEventListener('mousemove', this._cornerMoveListener);

        window.document.addEventListener('touchmove', this._cornerUpListener);
        window.document.addEventListener('touchend', this._cornerMoveListener);
    }

    removeCornerMoveEvent() {
        window.document.removeEventListener('mouseup', this._cornerUpListener);
        window.document.removeEventListener('mousemove', this._cornerMoveListener);

        window.document.removeEventListener('touchmove', this._cornerUpListener);
        window.document.removeEventListener('touchend', this._cornerMoveListener);
    }


    //////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////


    get bounds() {
        return {
            x:this.lt.x,
            y:this.lt.y,
            width:this.rt.x - this.lt.x,
            height:this.rb.y - this.rt.y
        }
    }

    get points() {
        return {
            lt: {x:this.lt.x, y:this.lt.y},
            rt: {x:this.rt.x, y:this.rt.y},
            rb: {x:this.rb.x, y:this.rb.y},
            lb: {x:this.lb.x, y:this.lb.y}
        }
    }

    get rotationPoints() {
        // lt -> lb
        // lb -> rb
        // rb -> rt
        // rt -> lt
        var pivot = {x:this.cx, y:this.cy};
        return {
            lt: Calc.getRotationPoint(pivot, this.rt, -90),
            rt: Calc.getRotationPoint(pivot, this.rb, -90),
            rb: Calc.getRotationPoint(pivot, this.lb, -90),
            lb: Calc.getRotationPoint(pivot, this.lt, -90)
        }
    }

    get cx() {
        return this.lt.x + this.bounds.width / 2;
    }

    get cy() {
        return this.lt.y + this.bounds.height / 2;
    }

    get isMinWidth() {
        var bounds = this.bounds;
        var min = this.size * 2 + this.half;
        return (bounds.width < min);
    }

    get isMinHeight() {
        var bounds = this.bounds;
        var min = this.size * 2 + this.half;
        return (bounds.height < min);
    }

}
