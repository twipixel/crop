export class ControlArea extends PIXI.Sprite {

    static get ROW() {
        return 'row';
    }

    static get COL() {
        return 'col';
    }

    static get CORNER() {
        return 'corner';
    }


    constructor(type) {
        super();
        this.initialize(type);
        this.draw(type);
        //this.addMouseDownEvent();
    }


    initialize(type) {
        this.type = type;
        this.globalAlpha = 0;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    }


    draw(type) {
        this.graphics.clear();

        switch(type){
            case ControlArea.ROW:
                this.graphics.beginFill(0xFF3300, this.globalAlpha);
                this.graphics.drawRect(0, -16, 1, 32);
                break;

            case ControlArea.COL:
                this.graphics.beginFill(0xFF3300, this.globalAlpha);
                this.graphics.drawRect(-16, 0, 32, 1);
                break;

            case ControlArea.CORNER:
                this.graphics.beginFill(0x4285f4, this.globalAlpha);
                this.graphics.drawRect(-16, -16, 32, 32);
                break;
        }

        this.graphics.endFill();
    }

    /*addMouseDownEvent() {
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
        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        //console.log('ControlArea.' + this.type, e.clientX, e.clientY);
    }

    onMouseUp(e) {
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }*/

}