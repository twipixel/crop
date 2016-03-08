import {SizeControlUI} from './../ui/SizeControlUI';
import {ImageContainer} from './../ui/ImageContainer';


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

        this.image = new ImageContainer(this.imageElement);
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
}