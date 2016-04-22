import {Calc} from './../utils/Calculator';
import {Painter} from './../utils/Painter';
import {HitSide} from './../const/HitSide';

//export class ImageUI extends PIXI.Sprite {
export class ImageUI extends PIXI.Container {
    constructor(textureCanvas) {
        //super(new PIXI.Texture(new PIXI.BaseTexture(imageElement)));
        super();
        this.initialize(textureCanvas);
        //this.addDebugPoint();
    }

    initialize(textureCanvas) {
        this.textureCanvas = textureCanvas;

        this.image = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(textureCanvas)));
        this.image.x = -this.image.width / 2;
        this.image.y = -this.image.height / 2;
        //this.image.alpha = 0.2;
        this.addChild(this.image);

        this.ltp = new PIXI.Sprite();
        this.rtp = new PIXI.Sprite();
        this.rbp = new PIXI.Sprite();
        this.lbp = new PIXI.Sprite();

        this.ltp.x = this.image.x;
        this.ltp.y = this.image.y;
        this.rtp.x = this.image.x + this.image.width;
        this.rtp.y = this.image.y;
        this.rbp.x = this.image.x + this.image.width;
        this.rbp.y = this.image.y + this.image.height;
        this.lbp.x = this.image.x;
        this.lbp.y = this.image.y + this.image.height;

        /*this.rtp.x = this.width;
         this.rbp.x = this.width;
         this.rbp.y = this.height;
         this.lbp.y = this.height;*/

        this.addChild(this.ltp);
        this.addChild(this.rtp);
        this.addChild(this.rbp);
        this.addChild(this.lbp);
    }

    /**
     * TODO 디버그 테스트 용
     */
    addDebugPoint() {
        this.pivotGraphics = new PIXI.Graphics();
        this.pivotGraphics.beginFill(0xFF3300, 0.3);
        this.pivotGraphics.drawRect(-2, -2, 4, 4);
        this.pivotGraphics.endFill();
        this.addChild(this.pivotGraphics);

        var size = 4;
        var half = size / 2;
        var ltd = Painter.getRect(size, 0x009999);
        var rtd = Painter.getRect(size, 0x009999);
        var rbd = Painter.getRect(size, 0x009999);
        var lbd = Painter.getRect(size, 0x009999);
        ltd.x = half;
        ltd.y = half;
        rtd.x = -half;
        rtd.y = half;
        rbd.x = -half;
        rbd.y = -half;
        lbd.x = half;
        lbd.y = -half;
        this.ltp.addChild(ltd);
        this.rtp.addChild(rtd);
        this.rbp.addChild(rbd);
        this.lbp.addChild(lbd);
    }

    getMoveUpdatePoints(dx, dy) {
        var points = this.points;
        points.lt.x += dx;
        points.lt.y += dy;
        points.rt.x += dx;
        points.rt.y += dy;
        points.rb.x += dx;
        points.rb.y += dy;
        points.lb.x += dx;
        points.lb.y += dy;
        return points;
    }

    fixMove(resizeUI) {
        var rotation = this.rotation;

        // 위로 회전
        if (rotation > 0) {
            if (this.isOutLeftLine(resizeUI.lt) &&
                resizeUI.isLtInsideBounds(this) === false) {
                //console.log('case1-1');
                Calc.moveToCollision(this, resizeUI.lt, this.leftLine);
            }

            if (this.isOutBottomLine(resizeUI.lb) &&
                resizeUI.isLbInsideBounds(this) === false) {
                //console.log('case1-2');
                Calc.moveToCollision(this, resizeUI.lb, this.bottomLine);
            }

            if (this.isOutTopLine(resizeUI.rt) &&
                resizeUI.isRtInsideBounds(this) === false) {
                //console.log('case1-3');
                Calc.moveToCollision(this, resizeUI.rt, this.topLine);
            }

            if (this.isOutRightLine(resizeUI.rb) &&
                resizeUI.isRbInsideBounds(this) === false) {
                //console.log('case1-4');
                Calc.moveToCollision(this, resizeUI.rb, this.rightLine);
            }


        } else {
            if (this.isOutTopLine(resizeUI.lt) &&
                resizeUI.isLtInsideBounds(this) === false) {
                //console.log('case2-1');
                Calc.moveToCollision(this, resizeUI.lt, this.topLine);
            }

            if (this.isOutLeftLine(resizeUI.lb) &&
                resizeUI.isLbInsideBounds(this) === false) {
                //console.log('case2-2');
                Calc.moveToCollision(this, resizeUI.lb, this.leftLine);
            }

            if (this.isOutRightLine(resizeUI.rt) &&
                resizeUI.isRtInsideBounds(this) === false) {
                //console.log('case2-3');
                Calc.moveToCollision(this, resizeUI.rt, this.rightLine);
            }

            if (this.isOutBottomLine(resizeUI.rb) &&
                resizeUI.isRbInsideBounds(this) === false) {
                //console.log('case2-4');
                Calc.moveToCollision(this, resizeUI.rb, this.bottomLine);
            }

        }
    }

    /**
     * 회전 시 이미지가 최대로 커질 사이즈를 구하고
     * 그에 따른 최대 스케일 값을 구합니다.
     */
    getImageMaxScale(bounds) {
        var imageRect = Calc.getImageSizeKeepAspectRatio(this, bounds);
        var w = imageRect.width;
        var h = imageRect.height;
        var imageMaxScaleHeight = Calc.getDiagonal(w, h);
        var imageMaxScaleWidth = (w * imageMaxScaleHeight) / h;
        var imageMaxScaleX = imageMaxScaleWidth / w;
        var imageMaxScaleY = imageMaxScaleHeight / h;
        var imageMaxScale = imageMaxScaleY;
        return imageMaxScale;
    }


    /**
     * 중심점 이동시 위치 보정을 위해 좌상단 좌표를 저장합니다.
     */
    updatePrevLtPointForPivot() {
        this.prevLtX = this.lt.x;
        this.prevLtY = this.lt.y;
    }


    setPivot(globalPivot) {
        var localPivot = this.toLocal(globalPivot);
        this.pivot = localPivot;

        // TODO 디버그 테스트 용
        if(this.pivotGraphics) {
            this.pivotGraphics.x = this.pivot.x;
            this.pivotGraphics.y = this.pivot.y;
        }

        var offsetX = this.lt.x - this.prevLtX;
        var offsetY = this.lt.y - this.prevLtY;
        this.x = this.x - offsetX;
        this.y = this.y - offsetY;
        this.updatePrevLtPointForPivot();
    }

    isOutLeftLine(point) {
        if (Calc.triangleArea(point, this.lb, this.lt) > 0)
            return true;
        return false;
    }

    isOutTopLine(point) {
        if (Calc.triangleArea(point, this.lt, this.rt) > 0)
            return true;
        return false;
    }

    isOutRightLine(point) {
        if (Calc.triangleArea(point, this.rt, this.rb) > 0)
            return true;
        return false;
    }

    isOutBottomLine(point) {
        if (Calc.triangleArea(point, this.rb, this.lb) > 0)
            return true;
        return false;
    }

    getLeftIntersectionPoint(point) {
        return Calc.getShortestDistancePoint(point, this.lb, this.lt);
    }

    getTopIntersectionPoint(point) {
        return Calc.getShortestDistancePoint(point, this.lt, this.rt);
    }

    getRightIntersectionPoint(point) {
        return Calc.getShortestDistancePoint(point, this.rt, this.rb);
    }

    getBottomIntersectionPoint(point) {
        return Calc.getShortestDistancePoint(point, this.rb, this.lb);
    }


    /**
     * 이미지가 Bounds를 포함하는지 여부
     * @param bounds
     * @returns {boolean}
     */
    isContainsBounds(bounds) {
        var points = [bounds.lt, bounds.rt, bounds.rb, bounds.lb];

        for (let i = 0; i < points.length; i++) {
            if (Calc.isInsideSquare(points[i], this.lt, this.rt, this.rb, this.lb) === false)
                return false;
        }
        return true;
    }

    getHitSide(bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        var hitSide = HitSide.NONE;

        // 왼쪽 도달
        if (Calc.triangleArea(bounds.lt, lb, lt) > 0 || Calc.triangleArea(bounds.lb, lb, lt) > 0)
            hitSide = HitSide.LEFT;

        // 오른쪽 도달
        if (Calc.triangleArea(bounds.rt, rt, rb) > 0 || Calc.triangleArea(bounds.rb, rt, rb) > 0)
            hitSide = HitSide.RIGHT;

        // 상단
        if (Calc.triangleArea(bounds.lt, lt, rt) > 0 || Calc.triangleArea(bounds.rt, lt, rt) > 0)
            hitSide = (hitSide === HitSide.NONE) ? HitSide.TOP : hitSide += '-' + HitSide.TOP;

        // 하단
        if (Calc.triangleArea(bounds.rb, rb, lb) > 0 || Calc.triangleArea(bounds.lb, rb, lb) > 0)
            hitSide = (hitSide === HitSide.NONE) ? HitSide.BOTTOM : hitSide += '-' + HitSide.BOTTOM;

        return hitSide;
    }

    getHitPoints(bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        var hitPoints = [];

        // 왼쪽 도달
        if (Calc.triangleArea(bounds.lt, lb, lt) > 0) {
            hitPoints.push({point:bounds.lt, hitSide:HitSide.LEFT});
        }

        if (Calc.triangleArea(bounds.lb, lb, lt) > 0) {
            hitPoints.push({point:bounds.lb, hitSide:HitSide.LEFT});
        }

        // 오른쪽 도달
        if (Calc.triangleArea(bounds.rt, rt, rb) > 0) {
            hitPoints.push({point:bounds.rt, hitSide:HitSide.RIGHT});
        }

        if (Calc.triangleArea(bounds.rb, rt, rb) > 0) {
            hitPoints.push({point:bounds.rb, hitSide:HitSide.RIGHT});
        }

        // 상단
        if (Calc.triangleArea(bounds.lt, lt, rt) > 0) {
            hitPoints.push({point:bounds.lt, hitSide:HitSide.TOP});
        }

        if (Calc.triangleArea(bounds.rt, lt, rt) > 0) {
            hitPoints.push({point:bounds.rt, hitSide:HitSide.TOP});
        }

        // 하단
        if (Calc.triangleArea(bounds.rb, rb, lb) > 0) {
            hitPoints.push({point:bounds.rb, hitSide:HitSide.BOTTOM});
        }

        if (Calc.triangleArea(bounds.lb, rb, lb) > 0) {
            hitPoints.push({point:bounds.lb, hitSide:HitSide.BOTTOM});
        }

        return hitPoints;
    }

    /**
     * 글로벌 좌표로 포인트를 반환합니다.
     * @returns {{lt: PIXI.Point, rt: PIXI.Point, rb: PIXI.Point, lb: PIXI.Point}}
     */
    get points() {
        return {
            lt: this.lt,
            rt: this.rt,
            rb: this.rb,
            lb: this.lb
        }
    }

    getUpdatePoints(dx, dy) {
        var p = this.image.points;
        p.lt.x += dx;
        p.lt.y += dy;
        p.rt.x += dx;
        p.rt.y += dy;
        p.rb.x += dx;
        p.rb.y += dy;
        p.lb.x += dx;
        p.lb.y += dy;
        return p;
    }

    toString() {
        var str = '' +
            'LT[' + Calc.leadingZero(parseInt(this.lt.x)) + ', ' + Calc.leadingZero(parseInt(this.lt.y)) + '] ' +
            'RT[' + Calc.leadingZero(parseInt(this.rt.x)) + ', ' + Calc.leadingZero(parseInt(this.rt.y)) + '] ' +
            'RB[' + Calc.leadingZero(parseInt(this.rb.x)) + ', ' + Calc.leadingZero(parseInt(this.rb.y)) + '] ' +
            'LB[' + Calc.leadingZero(parseInt(this.lb.x)) + ', ' + Calc.leadingZero(parseInt(this.lb.y)) + '] ' +
            'XY[' + Calc.leadingZero(parseInt(this.x)) + ', ' + Calc.leadingZero(parseInt(this.y)) + '] ' +
            'WH[' + Calc.leadingZero(parseInt(this.width)) + ', ' + Calc.leadingZero(parseInt(this.height)) + '] ' +
            'RO[' + Calc.digit(Calc.toDegrees(this.rotation)) + ']';

        //console.log(str);
        return str;
    }

    get lt() {
        return this.toGlobal(this.ltp.position);
    }

    get rt() {
        return this.toGlobal(this.rtp.position);
    }

    get rb() {
        return this.toGlobal(this.rbp.position);
    }

    get lb() {
        return this.toGlobal(this.lbp.position);
    }


    get leftLine() {
        return {a: this.lb, b: this.lt};
    }

    get topLine() {
        return {a: this.lt, b: this.rt};
    }

    get rightLine() {
        return {a: this.rt, b: this.rb};
    }

    get bottomLine() {
        return {a: this.lb, b: this.rb};
    }


    get left() {
        return Math.min(this.lt.x, this.lb.x);
    }

    get right() {
        return Math.max(this.rt.x, this.rb.x);
    }

    get top() {
        return Math.min(this.lt.y, this.rt.y);
    }

    get bottom() {
        return Math.max(this.lb.y, this.rb.y);
    }


    get size() {
        return {
            width: this.rt.x - this.lt.x,
            height: this.lb.y - this.lt.y
        };
    }


    get bounds() {
        return {
            x: this.lt.x,
            y: this.lt.y,
            width: this.rt.x - this.lt.x,
            height: this.rb.y - this.rt.y
        };
    }



}