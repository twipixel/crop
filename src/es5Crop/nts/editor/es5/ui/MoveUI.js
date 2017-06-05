(function () {
    'use strict';

    function MoveUI (canvas) {
        PIXI.Sprite.call(this);
        this.initialize(canvas);
        this.render();
        this.addMouseDownEvent();
    };

    var p = MoveUI.prototype = Object.create(PIXI.Sprite.prototype);

    p.initialize = function (canvas) {
        this.canvas = canvas;
        this.buttonMode = true;
        this.interactive = true;
        this.defaultCursor = 'pointer';
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    };

    p.render = function () {
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4, 0.0);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    };

    p.setSize = function (sizeRect) {
        //this.graphics.width = imageRect.width - 32;
        //this.graphics.height = imageRect.height - 32;
        this.graphics.width = sizeRect.width;
        this.graphics.height = sizeRect.height;
        this.graphics.x = this.canvas.width / 2 - this.graphics.width / 2;
        this.graphics.y = this.canvas.height / 2 - this.graphics.height / 2;
    };

    p.addMouseDownEvent = function () {
        this._mouseDownListener = this.onMouseDown.bind(this);
        this.on('mousedown', this._mouseDownListener);
    };

    p.removeMouseDownEvent = function () {
        this.off('mousedown', this._mouseDownListener);
    };

    p.addMouseMoveEvent = function () {
        this._mouseMoveListener = this.onMouseMove.bind(this);
        this._mouseUpListener = this.onMouseUp.bind(this);

        window.document.addEventListener('mousemove', this._mouseMoveListener);
        window.document.addEventListener('mouseup', this._mouseUpListener);
    };

    p.removeMouseMoveEvent = function () {
        window.document.removeEventListener('mousemove', this._mouseMoveListener);
        window.document.removeEventListener('mouseup', this._mouseUpListener);
    };

    p.onMouseDown = function (e) {
        this.prevMousePoint = {x: e.data.global.x, y: e.data.global.y};

        this.emit('moveStart');

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    };

    p.onMouseMove = function (e) {
        this.currentMousePoint = {x: e.clientX, y: e.clientY};

        this.change = {
            x: this.currentMousePoint.x - this.prevMousePoint.x,
            y: this.currentMousePoint.y - this.prevMousePoint.y
        };

        this.emit('moveChange', {
            prevMousePoint: this.prevMousePoint,
            currentMousePoint: this.currentMousePoint,
            change: this.change
        });

        this.prevMousePoint = this.currentMousePoint;
    };

    p.onMouseUp = function () {
        this.emit('moveEnd');
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    };

    usenamespace('editor.es5.ui').MoveUI = MoveUI;
})();
