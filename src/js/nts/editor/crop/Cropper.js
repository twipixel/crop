import {SizeControlUI} from './../ui/SizeControlUI';


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
        this.base = new PIXI.BaseTexture(this.imageElement);
        this.texture = new PIXI.Texture(this.base);
        this.image = new PIXI.Sprite(this.texture);
        //this.image.anchor = new PIXI.Point(0.5, 0.5);
        //this.image.x = this.canvas.width / 2;
        //this.image.y = this.canvas.height / 2;
        this.addChild(this.image);

        this.bounds = new PIXI.Graphics();
        this.addChild(this.bounds);

        /*
        this.ui = new SizeControlUI(this.canvas, size, min, max, true);
        this.addChild(this.ui);
        */
    }


    render() {

    }


    update() {
        this.render();
        //this.ui.update();
    }


    logPoints() {
        var lt = this.ui.toGlobal(this.ui.leftTop);
        var rt = this.ui.toGlobal(this.ui.rightTop);
        var rb = this.ui.toGlobal(this.ui.rightBottom);
        var lb = this.ui.toGlobal(this.ui.leftBottom);
        console.log(lt, rt, rb, lb);
    }


    resize(w, h) {
        this.drawBounds(w, h);



    }



    drawBounds(canvasWidth, canvasHeight) {
        var boundsWidth = canvasWidth - this.paddingX;
        var boundssHeight = canvasHeight - this.paddingY;

        console.log(canvasWidth, boundsWidth, canvasHeight, boundssHeight);

        var boundsX = this.canvas.width / 2 - boundsWidth / 2;
        var boundsY = this.canvas.height / 2 - boundssHeight / 2;
        this.bounds.clear();
        this.bounds.beginFill(0xFF3300, 0.2);
        this.bounds.drawRect(boundsX, boundsY, boundsWidth, boundssHeight);
        this.bounds.endFill();

        var size = this.getResize(boundsWidth, boundssHeight);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2 - this.image.width / 2;
        this.image.y = this.canvas.height / 2 - this.image.height / 2;
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