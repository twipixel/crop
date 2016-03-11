import {CornerShape} from './../ui/CornerShape';
import {ControlArea} from './../ui/ControlArea';


export class Cropper extends PIXI.Container {
    constructor(canvas, imageElement) {
        super();

        this.canvas = canvas;
        this.imageElement = imageElement;

        this.paddingX = 216;
        this.paddingY = 158;
        this.imageWidth = imageElement.width;
        this.imageHeight = imageElement.height;

        this.initialize();
    }


    initialize() {
        this.bounds = new PIXI.Graphics();
        this.addChild(this.bounds);

        this.base = new PIXI.BaseTexture(this.imageElement);
        this.texture = new PIXI.Texture(this.base);
        this.image = new PIXI.Sprite(this.texture);
        this.image.interactive = true;
        //this.image.anchor = new PIXI.Point(0.5, 0.5);
        //this.image.x = this.canvas.width / 2;
        //this.image.y = this.canvas.height / 2;
        this.addChild(this.image);

        this.imageRect = new PIXI.Graphics();
        this.addChild(this.imageRect);

        this.lt = new CornerShape(CornerShape.LEFT_TOP);
        this.addChild(this.lt);

        this.rt = new CornerShape(CornerShape.RIGHT_TOP);
        this.addChild(this.rt);

        this.rb = new CornerShape(CornerShape.RIGHT_BOTTOM);
        this.addChild(this.rb);

        this.lb = new CornerShape(CornerShape.LEFT_BOTTOM);
        this.addChild(this.lb);


        this.top = new ControlArea(ControlArea.ROW);
        this.addChild(this.top);

        this.bottom = new ControlArea(ControlArea.ROW);
        this.addChild(this.bottom);

        this.left = new ControlArea(ControlArea.COL);
        this.addChild(this.left);

        this.right = new ControlArea(ControlArea.COL);
        this.addChild(this.right);
    }



    update() {
        //
    }


    resize(canvasWidth, canvasHeight) {
        var boundsWidth = canvasWidth - this.paddingX;
        var boundsHeight = canvasHeight - this.paddingY;
        var boundsX = this.canvas.width / 2 - boundsWidth / 2;
        var boundsY = this.canvas.height / 2 - boundsHeight / 2;

        //this.drawBounds(boundsX, boundsY, boundsWidth, boundsHeight);
        this.resizeImage(boundsWidth, boundsHeight);
        this.resizeCornerShape();
        this.resizeControlBar();
        this.drawImageRect();
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


    drawBounds(boundsX, boundsY, boundsWidth, boundsHeight) {
        this.bounds.clear();
        this.bounds.lineStyle(2, 0x9e9e9e);
        //this.bounds.beginFill(0xFF3300, 0.2);
        this.bounds.drawRect(boundsX, boundsY, boundsWidth, boundsHeight);
        this.bounds.endFill();
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


    resizeImage(boundsWidth, boundsHeight) {
        var size = this.getResize(boundsWidth, boundsHeight);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2 - this.image.width / 2;
        this.image.y = this.canvas.height / 2 - this.image.height / 2;
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



    getResize(boundsWidth, boundsHeight) {
        var widthRatio = boundsWidth / this.imageWidth;
        var heightRatio = boundsHeight / this.imageHeight;
        var scale = Math.min(widthRatio, heightRatio);
        var imageWidth = scale * this.imageWidth;
        var imageHeight = scale * this.imageHeight;
        return {width:imageWidth, height:imageHeight};
    }



}