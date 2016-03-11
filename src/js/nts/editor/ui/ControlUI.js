import {CornerShape} from './CornerShape';
import {ControlArea} from './ControlArea';

export class ControlUI extends PIXI.Container {
    constructor(imageWidth, imageHeight) {
        super();
        this.initialize(imageWidth, imageHeight);
    }

    initialize(imageWidth, imageHeight) {
        this.originalImageWidth = imageWidth;
        this.origianlImageHeight = imageHeight;

        this.imageRect = new PIXI.Graphics();
        this.lt = new CornerShape(CornerShape.LEFT_TOP);
        this.rt = new CornerShape(CornerShape.RIGHT_TOP);
        this.rb = new CornerShape(CornerShape.RIGHT_BOTTOM);
        this.lb = new CornerShape(CornerShape.LEFT_BOTTOM);
        this.top = new ControlArea(ControlArea.ROW);
        this.bottom = new ControlArea(ControlArea.ROW);
        this.left = new ControlArea(ControlArea.COL);
        this.right = new ControlArea(ControlArea.COL);

        this.addChild(this.imageRect);
        this.addChild(this.lt);
        this.addChild(this.rt);
        this.addChild(this.rb);
        this.addChild(this.lb);
        this.addChild(this.top);
        this.addChild(this.bottom);
        this.addChild(this.left);
        this.addChild(this.right);
    }


    resize(imageBounds) {
        this.resizeCornerShape();
        this.resizeControlBar();
        this.drawImageRect();
    }


    resizeCornerShape() {
        this.lt.x = this.image.x;
        this.lt.y = this.image.y;
        this.rt.x = this.image.x + this.image.width;
        this.rt.y = this.image.y;
        this.rb.x = this.rt.x;
        this.rb.y = this.image.y + this.image.height;
        this.lb.x = this.lt.x;
        this.lb.y = this.rb.y;
    }

    resizeControlBar() {
        this.top.x = this.lt.x;
        this.top.y = this.lt.y;
        this.top.width = this.rt.x - this.lt.x;

        this.bottom.x = this.lb.x;
        this.bottom.y = this.lb.y;
        this.bottom.width = this.top.width;

        this.left.x = this.lt.x;
        this.left.y = this.lt.y;
        this.left.height = this.rb.y - this.lt.y;

        this.right.x = this.rt.x;
        this.right.y = this.rt.y;
        this.right.height = this.left.height;
    }

    drawImageRect() {
        this.imageRect.clear();
        this.imageRect.lineStyle(2, 0x9e9e9e);
        //this.imageRect.beginFill(0xFF3300, 0.2);
        //this.imageRect.drawRect(boundsX, boundsY, boundsWidth, boundssHeight);
        this.imageRect.moveTo(this.lt.x, this.lt.y);
        this.imageRect.lineTo(this.rt.x, this.lt.y);
        this.imageRect.lineTo(this.rt.x, this.rb.y);
        this.imageRect.lineTo(this.lt.x, this.rb.y);
        this.imageRect.lineTo(this.lt.x, this.lt.y);
        this.imageRect.endFill();
    }
}
