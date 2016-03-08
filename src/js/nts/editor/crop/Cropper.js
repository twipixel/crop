import {SizeControlUI} from './../ui/SizeControlUI';


export class Cropper extends PIXI.Container {
    constructor(canvas, imageElement) {
        super();

        this.canvas = canvas;
        this.imageElement = imageElement;

        console.log('Cropper');
        this.initialize();
    }


    initialize() {
        var min = {width:100, height:100};
        var max = {
            width:this.getPercent(80, this.canvas.width),
            height:this.getPercent(80, this.canvas.height)};
        var size = {width:max.width, height:max.height};


        this.base = new PIXI.BaseTexture(this.imageElement);
        this.texture = new PIXI.Texture(this.base);
        this.image = new PIXI.Sprite(this.texture);
        this.image.anchor = new PIXI.Point(0.5, 0.5);
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;
        this.addChild(this.image);


        this.ui = new SizeControlUI(this.canvas, size, min, max, true);
        this.addChild(this.ui);
    }


    getPercent(ratio, total) {
        return ratio / 100 * total;
    }


    render() {

    }


    update() {
        this.render();
        this.ui.update();

        //this.logPoints();
    }


    logPoints() {
        var lt = this.ui.toGlobal(this.ui.leftTop);
        var rt = this.ui.toGlobal(this.ui.rightTop);
        var rb = this.ui.toGlobal(this.ui.rightBottom);
        var lb = this.ui.toGlobal(this.ui.leftBottom);
        console.log(lt, rt, rb, lb);
    }


    resize() {



    }


    getScale() {
        var imageWidth = this.getPercent(80, this.canvas.width);
        var imageHeight = this.getPercent(80, this.canvas.height);


        var sx = this.canvas.width / imageWidth;
        var sy = this.canvas.height / imageHeight;
        var s = sx < sy ? sx : sy;
        var width = parseInt(imageWidth * s);
        var height = parseInt(imageHeight * s);

        this.image.width = width;
        this.image.height = height;
    }
}