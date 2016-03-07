import {SizeUI} from './../ui/SizeUI';


export class Cropper extends PIXI.Container {
    constructor(canvas, image) {
        super();

        this.image = image;
        this.canvas = canvas;

        console.log('Cropper');
        this.initialize();
    }


    initialize() {
        var min = {width:100, height:100};
        var max = {
            width:this.getPercent(80, this.canvas.width),
            height:this.getPercent(80, this.canvas.height)};
        var size = {width:max.width, height:max.height};

        this.ui = new SizeUI(this.canvas, size, min, max, true);
        this.addChild(this.ui);
    }


    getPercent(ratio, total) {
        return ratio / 100 * total;
    }


    render() {
        this.ui.x = this.canvas.width / 2;
        this.ui.y = this.canvas.height / 2;


        console.log(this.ui.x, this.ui.y);
    }

    update() {
        this.render();

        this.ui.update();
        //console.log('Copper.update()');
    }

    resize() {

    }
}