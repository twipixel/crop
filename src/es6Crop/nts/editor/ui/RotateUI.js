import {Calc} from './../utils/Calculator';
import Mouse from './../utils/Mouse';


export class RotateUI extends PIXI.Sprite {
    constructor(canvas) {
        super();
        this.initialize(canvas);
        this.render();
        this.addMouseDownEvent();
    }

    initialize(canvas) {
        this.canvas = canvas;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    }

    render() {
        this.graphics.clear();
        this.graphics.beginFill(0xFF00FF, 0.0);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    }

    resize() {
        this.graphics.width = this.canvas.width;
        this.graphics.height = this.canvas.height;

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }


    addMouseDownEvent() {
        this._mouseDownListener = this.onMouseDown.bind(this);
        this.on('mousedown', this._mouseDownListener);
        this.on('touchstart', this._mouseDownListener);
    }

    removeMouseDownEvent() {
        this.off('mousedown', this._mouseDownListener);
        this.off('touchstart', this._mouseDownListener);
    }

    addMouseMoveEvent() {
        this._mouseMoveListener = this.onMouseMove.bind(this);
        this._mouseUpListener = this.onMouseUp.bind(this);

        window.document.addEventListener('mousemove', this._mouseMoveListener);
        window.document.addEventListener('mouseup', this._mouseUpListener);

        window.document.addEventListener('touchmove', this._mouseMoveListener);
        window.document.addEventListener('touchend', this._mouseUpListener);
    }

    removeMouseMoveEvent() {
        window.document.removeEventListener('mousemove', this._mouseMoveListener);
        window.document.removeEventListener('mouseup', this._mouseUpListener);

        window.document.removeEventListener('touchmove', this._mouseMoveListener);
        window.document.removeEventListener('touchend', this._mouseUpListener);
    }


    onMouseDown(e) {
        this.prevRotation = Calc.getRotation({x:this.centerX, y:this.centerY}, {x:Mouse.global.x, y:Mouse.global.y});

        this.emit('rotateStart', {
            prevRotation: this.prevRotation,
            currentRotation: this.prevRotation,
            currentRadian: Calc.toRadians(this.prevRotation)
        });

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        this.currentRotation = Calc.getRotation({x:this.centerX, y:this.centerY}, {x:Mouse.global.x, y:Mouse.global.y});

        this.change = this.currentRotation - this.prevRotation;
        this.absChange = (this.change < 0) ? this.change * -1 : this.change;

        if(this.absChange < 100) {
            this.emit('rotateChange', {
                prevRotation: this.prevRotation,
                currentRotation: this.currentRotation,
                currentRadian: Calc.toRadians(this.currentRotation),
                change: Calc.toRadians(this.change),
            });
        }

        this.prevRotation = this.currentRotation;
    }

    onMouseUp(e) {
        this.emit('rotateEnd');
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }
}