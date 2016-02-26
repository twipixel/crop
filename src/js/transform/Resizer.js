import {Config} from './../config/Config';
import {requestAnimFrame} from './../../libs/animation';

export class Resizer {
    constructor(img) {
        this.initialize(img);
        this.updateLoop();
    }

    initialize(img) {
        console.log('initialize(' + img + ')');

        this.stage = new PIXI.Container();
        this.renderer = new PIXI.CanvasRenderer(Config.canvas.width, Config.canvas.height, {
            view: Config.canvas.context
        });




        this.bounds = new PIXI.Graphics();
        this.leftTop = new PIXI.Circle(0, 0, 10);
        this.leftBottom = new PIXI.Circle(0, 0, 10);
        this.rightTop = new PIXI.Circle(0, 0, 10);
        this.rightBottom = new PIXI.Circle(0, 0, 10);

        this.stage.addChild(this.img);
        this.stage.addChild(this.leftTop);
        this.stage.addChild(this.leftBottom);
        this.stage.addChild(this.rightTop);
        this.stage.addChild(this.rightBottom);
    }



    updateLoop(ms) {
        this.update(ms);
        requestAnimFrame(this.updateLoop.bind(this));
    }

    update(ms) {
        this.renderer.render(this.stage);
    }
}