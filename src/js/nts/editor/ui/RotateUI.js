import {Calculator} from './../utils/Calculator';

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
        this.graphics.beginFill(0xFFFFFF, 0.1);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    }

    resize(imageBounds) {
        this.graphics.width = this.canvas.width;
        this.graphics.height = this.canvas.height;

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }


    addMouseDownEvent() {
        this._mouseDownListener = this.onMouseDown.bind(this);
        this.on('mousedown', this._mouseDownListener);
    }

    removeMouseDownEvent() {
        this.off('mousedown', this._mouseDownListener);
    }

    addMouseMoveEvent() {
        this._mouseMoveListener = this.onMouseMove.bind(this);
        this._mouseUpListener = this.onMouseUp.bind(this);

        window.document.addEventListener('mousemove', this._mouseMoveListener);
        window.document.addEventListener('mouseup', this._mouseUpListener);
    }

    removeMouseMoveEvent() {
        window.document.removeEventListener('mousemove', this._mouseMoveListener);
        window.document.removeEventListener('mouseup', this._mouseUpListener);
    }

    onMouseDown(e) {
        this.prevRotation = Calculator.getRotation({x:this.centerX, y:this.centerY}, {x:e.data.global.x, y:e.data.global.y});

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        this.currentRotation = Calculator.getRotation({x:this.centerX, y:this.centerY}, {x:e.clientX, y:e.clientY});

        this.change = this.currentRotation - this.prevRotation;
        this.absChange = (this.change < 0) ? this.change * -1 : this.change;

        if(this.absChange < 100) {
            this.emit('changeRotation', {
                prevRotation: this.prevRotation,
                currentRotation: this.currentRotation,
                currentRadian: Calculator.getRadians(this.currentRotation),
                change: Calculator.getRadians(this.change),
            });
        }

        this.prevRotation = this.currentRotation;
    }

    onMouseUp(e) {
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }
}