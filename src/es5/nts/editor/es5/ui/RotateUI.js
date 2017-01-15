(function () {
    'use strict';

    var utils = usenamespace('editor.es5.utils');

    function RotateUI (canvas, image) {
        PIXI.Sprite.call(this);
        this.initialize(canvas, image);
        this.render();
        this.addMouseDownEvent();
    };

    var p = RotateUI.prototype = Object.create(PIXI.Sprite.prototype);

    p.initialize = function (canvas, image) {
        this.canvas = canvas;
        this.image = image;
        this.buttonMode = true;
        this.interactive = true;
        this.defaultCursor = './img/custom1.cur, auto';
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    };

    p.render = function () {
        this.graphics.clear();
        this.graphics.beginFill(0xFF00FF, 0.0);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    };

    p.resize = function () {
        this.graphics.width = this.canvas.width;
        this.graphics.height = this.canvas.height;

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    };

    p.displayCustomCursor = function (e) {
        var x = e.clientX;
        var y = e.clientY;

        var cx = this.image.x + this.image.width / 2;
        var cy = this.image.y + this.image.height / 2;

        console.log(x, y, cx, cy);
        if(x < cx) {
            console.log('111');
            this.defaultCursor = 'url(./img/custom1.cur)';
        } else {
            console.log('222');
            this.defaultCursor = 'url(/img/custom2.cur)';
        }
        console.log(x, y);
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
        this.prevRotation = utils.Calc.getRotation({x: this.centerX, y: this.centerY}, {
            x: e.data.global.x,
            y: e.data.global.y
        });

        this.emit('rotateStart', {
            prevRotation: this.prevRotation,
            currentRotation: this.prevRotation,
            currentRadian: utils.Calc.toRadians(this.prevRotation)
        });

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    };

    p.onMouseMove = function (e) {
        this.currentRotation = utils.Calc.getRotation({x: this.centerX, y: this.centerY}, {
            x: e.clientX,
            y: e.clientY
        });

        this.displayCustomCursor(e);

        this.change = this.currentRotation - this.prevRotation;
        this.absChange = (this.change < 0) ? this.change * -1 : this.change;

        if (this.absChange < 100) {
            this.emit('rotateChange', {
                prevRotation: this.prevRotation,
                currentRotation: this.currentRotation,
                currentRadian: utils.Calc.toRadians(this.currentRotation),
                change: utils.Calc.toRadians(this.change)
            });
        }

        this.prevRotation = this.currentRotation;
    };

    p.onMouseUp = function (e) {
        this.emit('rotateEnd');
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    };


    usenamespace('editor.es5.ui').RotateUI = RotateUI;
})();
