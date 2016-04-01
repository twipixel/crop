import {Calc} from './../utils/Calculator';
import {Painter} from './../utils/Painter';

//export class ImageUI extends PIXI.Sprite {
export class ImageUI extends PIXI.Container {
    constructor(imageElement) {
        //super(new PIXI.Texture(new PIXI.BaseTexture(imageElement)));
        super();
        this.initialize(imageElement);
        this.addDebugPoint();
    }

    initialize(imageElement) {
        this.imageElement = imageElement;

        this.image = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(imageElement)));
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

    addDebugPoint() {
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

    getImageMaxSize(bounds) {
        var imageRect = Calc.getImageSizeKeepAspectRatio(this, bounds);
        var imagePoint = {
            lt: {x: 0, y: 0},
            rt: {x: imageRect.width, y: 0},
            rb: {x: imageRect.width, y: imageRect.height},
            lb: {x: 0, y: imageRect.height}
        };
        var rotationPoints = Calc.getRotationRectanglePoints({
            x: imageRect.width / 2,
            y: imageRect.height / 2
        }, imagePoint, Calc.toDegrees(45));
        var rotationRect = Calc.getBoundsRectangle(rotationPoints, 0);
        var scale = Calc.getBoundsScale(rotationRect, imageRect);
        var sw = imageRect.width * scale.max;
        var sh = imageRect.height * scale.max;
        return {width:sw, height:sh};
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
     * 이미지가 Bounds를 포함하는지 여부
     * @param bounds
     * @returns {boolean}
     */
    isContainsBounds(bounds) {
        var points = [bounds.lt, bounds.rt, bounds.rb, bounds.lb];

        for (let i = 0; i < points.length; i++) {
            if (Calc.isInsideSquare(this.lt, this.rt, this.rb, this.lb, points[i]) === false)
                return false;
        }
        return true;
    }

    /**
     * 좌우 충돌 감지
     * @param bounds
     */
    isHitSide(bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        // 왼쪽 도달
        if (Calc.triangleArea(lb, lt, bounds.lt) > 0)
            return true;

        if (Calc.triangleArea(lb, lt, bounds.lb) > 0)
            return true;

        // 오른쪽 도달
        if (Calc.triangleArea(rt, rb, bounds.rt) > 0)
            return true;

        if (Calc.triangleArea(rt, rb, bounds.rb) > 0)
            return true;

        return false;
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

    toString() {
        var str = '' +
            'LT[' + Calc.leadingZero(parseInt(this.lt.x)) + ', ' + Calc.leadingZero(parseInt(this.lt.y)) + '] ' +
            'RT[' + Calc.leadingZero(parseInt(this.rt.x)) + ', ' + Calc.leadingZero(parseInt(this.rt.y)) + '] ' +
            'RB[' + Calc.leadingZero(parseInt(this.rb.x)) + ', ' + Calc.leadingZero(parseInt(this.rb.y)) + '] ' +
            'LB[' + Calc.leadingZero(parseInt(this.lb.x)) + ', ' + Calc.leadingZero(parseInt(this.lb.y)) + '] ' +
            'XY[' + Calc.leadingZero(parseInt(this.x)) + ', ' + Calc.leadingZero(parseInt(this.y)) + '] ' +
            'WH[' + Calc.leadingZero(parseInt(this.width)) + ', ' + Calc.leadingZero(parseInt(this.height)) + '] ' +
            'RO[' + Calc.digit(Calc.toDegrees(this.rotation)) + ']'

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
        return {a: this.lt, b: this.lb};
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