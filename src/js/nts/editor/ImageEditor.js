import {Cropper} from './crop/Cropper';
import {requestAnimFrame} from './../../../libs/animation';


export class ImageEditor {

    constructor(imageElement) {

        console.log('ImageEditor(' + imageElement + ')');

        this.imageElement = imageElement;
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.renderer = new PIXI.CanvasRenderer(this.canvas.width, this.canvas.height, {
            view: this.canvas,
            backgroundColor: 0xE6E9EC
        });

        /*var interactive = true;
        this.stage = new PIXI.Stage(0xE6E9EC, interactive);*/
        this.stage = new PIXI.Container(0xE6E9EC);

        this.initialize();
        this.addEvnet();
        this.updateLoop();
    }

    initialize() {
        this.cropper = new Cropper(this.canvas, this.imageElement);
        this.stage.addChild(this.cropper);
    }

    addEvnet() {

    }



    updateLoop(ms) {
        this.update(ms);
        requestAnimFrame(this.updateLoop.bind(this));
    }

    update(ms) {
        this.cropper.update();
        this.renderer.render(this.stage);
    }

    resize() {
        console.log('resize');
    }

}