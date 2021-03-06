import {Calc} from './../utils/Calculator';
import Mouse from './../utils/Mouse';


export class MoveUI extends PIXI.Sprite {
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
        this.graphics.beginFill(0x4285f4, 0.0);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    }

    setSize(sizeRect) {
        //this.graphics.width = imageRect.width - 32;
        //this.graphics.height = imageRect.height - 32;
        this.graphics.width = sizeRect.width;
        this.graphics.height = sizeRect.height;
        this.graphics.x = this.canvas.width / 2 - this.graphics.width / 2;
        this.graphics.y = this.canvas.height / 2 - this.graphics.height / 2;
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
        this.prevMousePoint = {x:Mouse.global.x, y:Mouse.global.y};

        this.emit('moveStart');

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        this.currentMousePoint = {x:Mouse.global.x, y:Mouse.global.y};

        this.change = {
            x:this.currentMousePoint.x - this.prevMousePoint.x,
            y:this.currentMousePoint.y - this.prevMousePoint.y
        };

        this.emit('moveChange', {
            prevMousePoint: this.prevMousePoint,
            currentMousePoint: this.currentMousePoint,
            change: this.change,
        });

        this.prevMousePoint = this.currentMousePoint;
    }

    onMouseUp(e) {
        this.emit('moveEnd');
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }
}