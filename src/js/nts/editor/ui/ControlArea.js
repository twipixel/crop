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
        this.graphics.beginFill(0xFF3300, 0.1);

        switch(type){
            case ControlArea.ROW:
                this.graphics.drawRect(0, -16, 1, 32);
                break;

            case ControlArea.COL:
                this.graphics.drawRect(-16, 0, 32, 1);
                break;

            case ControlArea.CORNER:
                this.graphics.drawRect(-16, -16, 32, 32);
                break;
        }

        this.graphics.endFill();
    }

    addMouseDownEvent() {
        console.log('ControlArea.addMouseDownEvent()');
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
        console.dir(e);

        console.log(e.stopPropagation);
        e.stopPropagation();

        /*
        // 현재 이벤트의 기본 동작을 중단한다.
        e.preventDefault();

        // 현재 이벤트가 상위로 전파되지 않도록 중단한다.
        e.stopPropagation();

        // 현재 이벤트가 상위뿐 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단한다.
        e.stopImmediatePropagation();
        */

        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    }

    onMouseMove(e) {
        console.log('ControlArea', e.clientX, e.clientY);
    }

    onMouseUp(e) {
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    }

}