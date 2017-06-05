(function () {
    'use strict';

    var c = usenamespace('editor.es5.crop');
    var utils = usenamespace('editor.es5.utils');

    var Crop = function (imageElement, textureCanvas) {
        this.initialize(imageElement, textureCanvas);
        this.resize();
        this.updateLoop();
    };

    var p = Crop.prototype;

    p.initialize = function (imageElement, textureCanvas) {
        console.log('ImageEditor.initialize(' + imageElement + ', ' + textureCanvas);

        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.renderer = new PIXI.CanvasRenderer(this.canvas.width, this.canvas.height, {
            view: this.canvas,
            autoResize: true,
            backgroundColor: 0x333333
        });

        utils.Mouse.renderer = this.renderer;

        this.container = new PIXI.Container(0xE6E9EC);
        this.cropper = new c.Cropper(this.canvas, this.imageElement, this.textureCanvas);
        this.container.addChild(this.cropper);
    };

    p.updateLoop = function (ms) {
        this.update(ms);
        requestAnimFrame(this.updateLoop.bind(this));
    };

    p.update = function (ms) {
        if (this.cropper)
            this.cropper.update();

        this.renderer.render(this.container);
    };

    p.resize = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;

        /**
         * 캔버스 사이즈와 디스플레이 사이즈 설정
         * 레티나 그래픽 지원 코드
         */
        this.canvas.width = width * window.devicePixelRatio;
        this.canvas.height = height * window.devicePixelRatio;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';

        /**
         * PIXI renderer 리사이즈
         * PIXI 에게 viewport 사이즈 변경 알림
         */
        this.renderer.resize(width, height);

        if (this.cropper)
            this.cropper.resize();
    };

    usenamespace('editor').Crop = Crop;
})();