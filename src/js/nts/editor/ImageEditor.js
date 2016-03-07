import {requestAnimFrame} from './../../../libs/animation';

export class ImageEditor {

    constructor(image) {

        this.image = image;
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.renderer = new PIXI.CanvasRenderer(this.canvas.width, this.canvas.height, {
            view: this.context
        });

        this.initialize();
        this.addEvnet();
    }

    initialize() {
        this.cropper = new Cropper(this.image);
    }

    addEvnet() {

    }



    updateLoop(ms) {
        this.update(ms);
        requestAnimFrame(this.updateLoop.bind(this));
    }

    update(ms) {
        this.renderer.render(this.stage);
    }

    resize() {
        console.log('resize');
    }

}