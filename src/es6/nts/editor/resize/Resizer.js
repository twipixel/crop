import {Calc} from '../utils/Calculator';
import {ImageUI} from '../ui/imageUI';

export class Resizer extends PIXI.Container {
    constructor(canvas, imageElement, textureCanvas) {
        super();
        this.initialize(canvas, imageElement, textureCanvas);
    }

    initialize(canvas, imageElement, textureCanvas) {
        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.isInitialize = false;

        this.image = new ImageUI(this.textureCanvas);
        this.addChild(this.image);
    }

    resize() {
        // 최초 실행: 화면 초기화
        if (this.isInitialize == false) {
            this.isInitialize = true;
            this.initializeImage();
            this.test();
        } else {

        }
    }

    initializeImage() {
        var size = Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;

        console.log(this.image.width, this.image.height);
        console.log(this.canvas.width, this.canvas.height);
        console.log(this.imageElement.width, this.imageElement.height);
    }

    test() {
        //console.log(Math.log2(16));
        //console.log(Math.log1p(16));
        //console.log(Math.log(10));
        //console.log(Math.pow(10, 2.302585092994046));
    }

    //////////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////////

    get bounds() {
        var canvasWidth = this.canvas.width;
        var canvasHeight = this.canvas.height;

        var boundsWidth = canvasWidth - this.paddingX;
        var boundsHeight = canvasHeight - this.paddingY;
        var boundsX = canvasWidth / 2 - boundsWidth / 2;
        var boundsY = canvasHeight / 2 - boundsHeight / 2;

        return {
            width: boundsWidth,
            height: boundsHeight,
            x: boundsX,
            y: boundsY
        }
    }
}