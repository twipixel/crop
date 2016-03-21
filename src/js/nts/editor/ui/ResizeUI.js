import {CornerShape} from './CornerShape';
import {ControlArea} from './ControlArea';

export class ResizeUI extends PIXI.Container {
    constructor(canvas, originalImageWidth, originalImageHeight) {
        super();
        this.initialize(canvas, originalImageWidth, originalImageHeight);
    }

    initialize(canvas, originalImageWidth, originalImageHeight) {
        this.canvas = canvas;
        this.originalImageWidth = originalImageWidth;
        this.origianlImageHeight = originalImageHeight;

        this.offset = -1;
        this.resizeImage = new PIXI.Graphics();
        this.lt = new CornerShape(CornerShape.LEFT_TOP);
        this.rt = new CornerShape(CornerShape.RIGHT_TOP);
        this.rb = new CornerShape(CornerShape.RIGHT_BOTTOM);
        this.lb = new CornerShape(CornerShape.LEFT_BOTTOM);
        this.topControl = new ControlArea(ControlArea.ROW);
        this.bottomControl = new ControlArea(ControlArea.ROW);
        this.leftControl = new ControlArea(ControlArea.COL);
        this.rightControl = new ControlArea(ControlArea.COL);
        this.ltControl = new ControlArea(ControlArea.CORNER);
        this.rtControl = new ControlArea(ControlArea.CORNER);
        this.rbControl = new ControlArea(ControlArea.CORNER);
        this.lbControl = new ControlArea(ControlArea.CORNER);
        this.addChild(this.resizeImage);
        this.addChild(this.lt);
        this.addChild(this.rt);
        this.addChild(this.rb);
        this.addChild(this.lb);
        this.addChild(this.topControl);
        this.addChild(this.bottomControl);
        this.addChild(this.leftControl);
        this.addChild(this.rightControl);
        this.addChild(this.ltControl);
        this.addChild(this.rtControl);
        this.addChild(this.rbControl);
        this.addChild(this.lbControl);
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

        this.ltControl.x = this.lt.x;
        this.ltControl.y = this.lt.y;
        this.rtControl.x = this.rt.x;
        this.rtControl.y = this.rt.y;
        this.rbControl.x = this.rb.x;
        this.rbControl.y = this.rb.y;
        this.lbControl.x = this.lb.x;
        this.lbControl.y = this.lb.y;
    }

    drawImageRect() {
        this.resizeImage.clear();
        this.resizeImage.lineStyle(2, 0x9e9e9e);
        //this.imageRect.beginFill(0xFF3300, 0.2);
        //this.imageRect.drawRect(boundsX, boundsY, boundsWidth, boundssHeight);
        this.resizeImage.moveTo(this.lt.x, this.lt.y);
        this.resizeImage.lineTo(this.rt.x, this.lt.y);
        this.resizeImage.lineTo(this.rt.x, this.rb.y);
        this.resizeImage.lineTo(this.lt.x, this.rb.y);
        this.resizeImage.lineTo(this.lt.x, this.lt.y);
        this.resizeImage.endFill();
    }
}
