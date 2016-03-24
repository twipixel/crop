import {CornerShape} from './CornerShape';
import {ControlArea} from './ControlArea';
import {Calc} from './../utils/Calculator';

export class ResizeUI extends PIXI.Container {
    constructor(canvas, originalImageWidth, originalImageHeight) {
        super();
        this.initialize(canvas, originalImageWidth, originalImageHeight);
        this.addCornerDownEvent();
    }


    initialize(canvas, originalImageWidth, originalImageHeight) {
        this.canvas = canvas;
        //this.interactive = true;
        this.originalImageWidth = originalImageWidth;
        this.origianlImageHeight = originalImageHeight;

        this.offset = -1;
        this.imageRect = new PIXI.Graphics();
        this.topControl = new ControlArea(ControlArea.ROW);
        this.bottomControl = new ControlArea(ControlArea.ROW);
        this.leftControl = new ControlArea(ControlArea.COL);
        this.rightControl = new ControlArea(ControlArea.COL);
        this.ltControl = new ControlArea(ControlArea.CORNER);
        this.rtControl = new ControlArea(ControlArea.CORNER);
        this.rbControl = new ControlArea(ControlArea.CORNER);
        this.lbControl = new ControlArea(ControlArea.CORNER);
        this.lt = new CornerShape(CornerShape.LEFT_TOP);
        this.rt = new CornerShape(CornerShape.RIGHT_TOP);
        this.rb = new CornerShape(CornerShape.RIGHT_BOTTOM);
        this.lb = new CornerShape(CornerShape.LEFT_BOTTOM);
        this.addChild(this.imageRect);
        this.addChild(this.topControl);
        this.addChild(this.bottomControl);
        this.addChild(this.leftControl);
        this.addChild(this.rightControl);
        this.addChild(this.ltControl);
        this.addChild(this.rtControl);
        this.addChild(this.rbControl);
        this.addChild(this.lbControl);
        this.addChild(this.lt);
        this.addChild(this.rt);
        this.addChild(this.rb);
        this.addChild(this.lb);
    }


    resize(imageRect) {
        this.resizeCornerShape(imageRect);
        this.resizeControl();
        this.drawImageRect();
    }


    resizeCornerShape(imageRect) {
        this.lt.x = imageRect.x - this.offset;
        this.lt.y = imageRect.y - this.offset;
        this.rt.x = imageRect.x + imageRect.width + this.offset;
        this.rt.y = imageRect.y - this.offset;
        this.rb.x = this.rt.x + this.offset;
        this.rb.y = imageRect.y + imageRect.height + this.offset;
        this.lb.x = this.lt.x - this.offset;
        this.lb.y = this.rb.y + this.offset;
    }



    resizeControl() {
        this.topControl.x = this.lt.x;
        this.topControl.y = this.lt.y;
        this.topControl.width = this.rt.x - this.lt.x;
        this.bottomControl.x = this.lb.x;
        this.bottomControl.y = this.lb.y;
        this.bottomControl.width = this.topControl.width;
        this.leftControl.x = this.lt.x;
        this.leftControl.y = this.lt.y;
        this.leftControl.height = this.rb.y - this.lt.y;
        this.rightControl.x = this.rt.x;
        this.rightControl.y = this.rt.y;
        this.rightControl.height = this.leftControl.height;

        this.ltControl.x = this.lt.x;
        this.ltControl.y = this.lt.y;
        this.rtControl.x = this.rt.x;
        this.rtControl.y = this.rt.y;
        this.rbControl.x = this.rb.x;
        this.rbControl.y = this.rb.y;
        this.lbControl.x = this.lb.x;
        this.lbControl.y = this.lb.y;
    }


    drawImageRect() {
        this.imageRect.clear();
        this.imageRect.lineStyle(2, 0x9e9e9e);
        this.imageRect.moveTo(this.lt.x, this.lt.y);
        this.imageRect.lineTo(this.rt.x, this.rt.y);
        this.imageRect.lineTo(this.rb.x, this.rb.y);
        this.imageRect.lineTo(this.lb.x, this.lb.y);
        this.imageRect.lineTo(this.lt.x, this.lt.y);
        this.imageRect.endFill();
    }


    cornerResize(target) {
        switch(target) {
            case this.lt:
                this.rt.y = this.lt.y;
                this.lb.x = this.lt.x;
                break;

            case this.rt:
                this.lt.y = this.rt.y;
                this.rb.x = this.rt.x;
                break;

            case this.rb:
                this.rt.x = this.rb.x;
                this.lb.y = this.rb.y;
                break;

            case this.lb:
                this.lt.x = this.lb.x;
                this.rb.y = this.lb.y;
                break;
        }

        this.drawImageRect();
    }


    resetSize(rect) {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;

        console.log('resetSize(',Calc.digit(x), Calc.digit(y), Calc.digit(width), Calc.digit(height),')');

        this.lt.x = x;
        this.lt.y = y;
        this.rt.x = x + width;
        this.rt.y = y;
        this.rb.x = this.rt.x;
        this.rb.y = y + height;
        this.lb.x = x;
        this.lb.y = this.rb.y;

        this.drawImageRect();
    }

    //////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////


    onCornerDown(e) {
        console.log('1. onCornerDown');
        e.stopPropagation();

        this.selectedTarget = e.target;
        this.dragStartX = this.prevDragX = e.data.global.x;
        this.dragStartY = this.prevDragY = e.data.global.y;


        this.addCornerMoveEvent();
        this.removeCornerDownEvent();

        this.emit('cornerResizeStart', {
            target: this.selectedTarget,
            dragStartX: this.dragStartX,
            dragStartY: this.dragStartY
        });
        //console.log('onCornerDown!', Calc.digit(this.dragStartX), Calc.digit(this.dragStartY));
    }

    onCornerMove(e) {
        this.currentDragX = e.clientX;
        this.currentDragY = e.clientY;

        this.dx = this.currentDragX - this.prevDragX;
        this.dy = this.currentDragY - this.prevDragY;

        this.prevDragX = this.currentDragX;
        this.prevDragY = this.currentDragY;

        this.emit('cornerResizeChange', {
            dx: this.dx,
            dy: this.dy,
            target: this.selectedTarget
        });
        //console.log('dx:' + Calc.digit(this.dx) + ',' + Calc.digit(this.dy));
    }

    onCornerUp(e) {

        console.log('3. onCornerUp');
        this.addCornerDownEvent();
        this.removeCornerMoveEvent();

        this.emit('cornerResizeEnd', {
            target: this.selectedTarget
        });

        this.selectedTarget = null;
    }


    //////////////////////////////////////////////////////////////////////
    // Add & Remove MouseEvent
    //////////////////////////////////////////////////////////////////////


    addCornerDownEvent() {
        console.log('addCornerDownEvent()');

        this._cornerDownListener = this.onCornerDown.bind(this);
        this.lt.on('mousedown', this._cornerDownListener);
        this.rt.on('mousedown', this._cornerDownListener);
        this.rb.on('mousedown', this._cornerDownListener);
        this.lb.on('mousedown', this._cornerDownListener);
    }

    removeCornerDownEvent() {
        this.lt.off('mousedown', this._cornerDownListener);
        this.rt.off('mousedown', this._cornerDownListener);
        this.rb.off('mousedown', this._cornerDownListener);
        this.lb.off('mousedown', this._cornerDownListener);
    }

    addCornerMoveEvent() {
        this._cornerUpListener = this.onCornerUp.bind(this);
        this._cornerMoveListener = this.onCornerMove.bind(this);

        window.document.addEventListener('mouseup', this._cornerUpListener);
        window.document.addEventListener('mousemove', this._cornerMoveListener);
    }

    removeCornerMoveEvent() {
        window.document.removeEventListener('mouseup', this._cornerUpListener);
        window.document.removeEventListener('mousemove', this._cornerMoveListener);
    }




    //////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////


    get bounds() {
        return {
            x:this.lt.x,
            y:this.lt.y,
            width:this.rt.x - this.lt.x,
            height:this.rb.y - this.rt.y
        }
    }


}
