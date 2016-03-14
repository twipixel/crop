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
        this.graphics.beginFill(0xFFFFFF, 0.2);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    }

    resize() {
        this.graphics.width = this.canvas.width;
        this.graphics.height = this.canvas.height;
    }


    addMouseDownEvent() {
        console.log('RotateUI.addMouseDownEvent()');
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
        console.log('RotateUI.onMouseDown()');

        e.stopPropagation();

        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        console.log('RotateUI', e.clientX, e.clientY);
    }

    onMouseUp(e) {
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }
}