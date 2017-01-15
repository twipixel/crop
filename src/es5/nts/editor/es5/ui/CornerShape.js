(function () {
    'use strict';

    function CornerShape (type) {
        PIXI.Sprite.call(this);
        this.initialize();
        this.draw(type);
    };

    CornerShape.LEFT_TOP = 'leftTop';
    CornerShape.RIGHT_TOP = 'rightTop';
    CornerShape.RIGHT_BOTTOM = 'rightBottom';
    CornerShape.LEFT_BOTTOM = 'leftBottom';

    var p = CornerShape.prototype = Object.create(PIXI.Sprite.prototype);

    p.initialize = function (type, thickness, size) {
        thickness = thickness || 4;
        size = size || 32;

        this.type = type;
        this.size = size;
        this.half = size / 2;
        this.thickness = thickness;
        this.buttonMode = true;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.buttonArea = new PIXI.Graphics();
        this.addChild(this.graphics);
        this.addChild(this.buttonArea);
    };

    p.draw = function (type) {
        this.drawButtonArea();

        switch (type) {
            case CornerShape.LEFT_TOP:
                this.drawLeftTop();
                break;
            case CornerShape.RIGHT_TOP:
                this.drawRightTop();
                break;
            case CornerShape.RIGHT_BOTTOM:
                this.drawRightBottom();
                break;
            case CornerShape.LEFT_BOTTOM:
                this.drawLeftBottom();
                break;
        }
    };

    p.drawButtonArea = function () {
        var h = this.half;
        var s = this.size;
        this.buttonArea.clear();
        this.buttonArea.beginFill(0x4285f4, 0.1);
        this.buttonArea.drawRect(-h, -h, s, s);
        this.buttonArea.endFill();
    };

    p.drawLeftTop = function () {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-t, -t, h, t);
        this.graphics.drawRect(-t, -t, t, h);
        this.graphics.endFill();
    };

    p.drawRightTop = function () {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-(h - t), -t, h, t);
        this.graphics.drawRect(0, -t, t, h);
        this.graphics.endFill();
    };

    p.drawRightBottom = function () {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-(h - t), 0, h, t);
        this.graphics.drawRect(0, t, t, -h);
        this.graphics.endFill();
    };

    p.drawLeftBottom = function () {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-t, 0, h, t);
        this.graphics.drawRect(-t, t, t, -h);
        this.graphics.endFill();
    };

    usenamespace('editor.es5.ui').CornerShape = CornerShape;
})();