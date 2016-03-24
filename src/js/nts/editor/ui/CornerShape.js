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


    initialize(type) {
        this.type = type;
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
        this.buttonArea.clear();
        this.buttonArea.beginFill(0x4285f4, 0.1);
        this.buttonArea.drawRect(-16, -16, 32, 32);
        this.buttonArea.endFill();
    }

    drawLeftTop() {
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-4, -4, 16, 4);
        this.graphics.drawRect(-4, -4, 4, 16);
        this.graphics.endFill();
    }

    drawRightTop() {
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-12, -4, 16, 4);
        this.graphics.drawRect(0, -4, 4, 16);
        this.graphics.endFill();
    }

    drawRightBottom() {
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-12, 0, 16, 4);
        this.graphics.drawRect(0, 4, 4, -16);
        this.graphics.endFill();
    }

    drawLeftBottom() {
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-4, 0, 16, 4);
        this.graphics.drawRect(-4, 4, 4, -16);
        this.graphics.endFill();
    }
}