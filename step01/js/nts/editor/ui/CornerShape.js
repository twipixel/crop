export class CornerShape extends PIXI.Sprite {

    static get LEFT_TOP() {
        return 'leftTop';
    }

    static get RIGHT_TOP() {
        return 'rightTop';
    }

    static get RIGHT_BOTTOM() {
        return 'rightBottom';
    }

    static get LEFT_BOTTOM() {
        return 'leftBottom';
    }

    constructor(type) {
        super();
        this.initialize();
        this.draw(type);
    }


    initialize(type, thickness = 4, size = 32) {
        this.type = type;
        this.size = size;
        this.half = size / 2;
        this.thickness = thickness;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.buttonArea = new PIXI.Graphics();
        this.addChild(this.graphics);
        this.addChild(this.buttonArea);
    }


    draw(type) {
        this.drawButtonArea();

        switch (type) {
            case CornerShape.LEFT_TOP:
                this.drawLeftTop();
                break;
            case CornerShape.RIGHT_TOP:
                this.drawRightTop();
                break;
            case CornerShape.RIGHT_BOTTOM:
                this.drawRightBottom();
                break;
            case CornerShape.LEFT_BOTTOM:
                this.drawLeftBottom();
                break;
        }
    }

    drawButtonArea() {
        var h = this.half;
        var s = this.size;
        this.buttonArea.clear();
        this.buttonArea.beginFill(0x4285f4, 0.0);
        this.buttonArea.drawRect(-h, -h, s, s);
        this.buttonArea.endFill();
    }

    drawLeftTop() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-t, -t, h, t);
        this.graphics.drawRect(-t, -t, t, h);
        this.graphics.endFill();
    }

    drawRightTop() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-(h - t), -t, h, t);
        this.graphics.drawRect(0, -t, t, h);
        this.graphics.endFill();
    }

    drawRightBottom() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-(h - t), 0, h, t);
        this.graphics.drawRect(0, t, t, -h);
        this.graphics.endFill();
    }

    drawLeftBottom() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-t, 0, h, t);
        this.graphics.drawRect(-t, t, t, -h);
        this.graphics.endFill();
    }
}