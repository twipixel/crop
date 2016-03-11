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
            autoResize: true,
            backgroundColor: 0x000000
        });

        /*
        var interactive = true;
        this.stage = new PIXI.Stage(0xE6E9EC, interactive);
        */

        this.stage = new PIXI.Container(0xE6E9EC);

        this.initialize();
        this.updateLoop();
    }


    initialize() {
        this.cropper = new Cropper(this.canvas, this.imageElement);
        this.stage.addChild(this.cropper);
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
        var width = window.innerWidth;
        var height = window.innerHeight;

        /**
         * Set the canvas size and display size
         * This way we can support retina graphics and make our game really crisp
         */
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        /**
         * Resize the PIXI renderer
         * Let PIXI know that we changed the size of the viewport
         */
        this.renderer.resize(this.canvas.width, this.canvas.height);
        this.cropper.resize(this.canvas.width, this.canvas.height);
    }

}