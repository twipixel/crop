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