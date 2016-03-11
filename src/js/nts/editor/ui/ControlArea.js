export class ControlArea extends PIXI.Sprite {

    static get ROW() {
        return 'row';
    }

    static get COL() {
        return 'col';
    }


    constructor(type) {
        super();
        this.initialize();
        this.draw(type);
        this.addMouseDownEvent();
    }


    initialize() {
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    }


    draw(type) {
        this.graphics.clear();
        this.graphics.beginFill(0xFF3300, 0);

        if (type == ControlArea.ROW)
            this.graphics.drawRect(0, -16, 1, 32);
        else
            this.graphics.drawRect(-16, 0, 32, 1);

        this.graphics.endFill();
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
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        console.log(e.clientX, e.clientY);
    }

    onMouseUp(e) {
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }

}