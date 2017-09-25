import {Cropper} from "./crop/Cropper";
import {requestAnimFrame} from "../../../lib/animation";


export class ImageEditor {

    constructor(imageElement, textureCanvas) {
        this.initialize(imageElement, textureCanvas);
        this.resize();
        this.updateLoop();
    }


    initialize(imageElement, textureCanvas) {
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.canvas = document.getElementById('canvas');

        this.context = this.canvas.getContext('2d');
        this.renderer = new PIXI.CanvasRenderer(this.canvas.width, this.canvas.height, {
            view: this.canvas,
            autoResize: true,
            backgroundColor: 0x000000
        });

        /*this.renderer = new PIXI.WebGLRenderer(this.canvas.width, this.canvas.height, {
            view: this.canvas,
            autoResize: true,
            backgroundColor: 0x000000
        });*/

         /*var interactive = true;
         this.stage = new PIXI.Stage(0xE6E9EC, interactive);*/
        this.stage = new PIXI.Container();

        this.cropper = new Cropper(this.canvas, this.imageElement, this.textureCanvas);
        this.stage.addChild(this.cropper);

        //this.resizer = new Resizer(this.canvas, this.imageElement, this.textureCanvas);
        //this.stage.addChild(this.resizer);
    }


    updateLoop(ms) {
        this.update(ms);
        requestAnimFrame(this.updateLoop.bind(this));
    }


    update(ms) {
        if(this.cropper)
            this.cropper.update();

        this.renderer.render(this.stage);
    }


    resize() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        /**
         * 캔버스 사이즈와 디스플레이 사이즈 설정
         * 레티나 그래픽 지원 코드
         */
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        /**
         * PIXI renderer 리사이즈
         * PIXI 에게 viewport 사이즈 변경 알림
         */
        this.renderer.resize(width, height);

        if(this.cropper)
            this.cropper.resize();

        if(this.resizer)
            this.resizer.resize();
    }

}