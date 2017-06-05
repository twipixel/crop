(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ImageEditor = require('./nts/editor/ImageEditor');

var editor;
var image = document.getElementById('image');
var texture = document.getElementById('texture');

//window.onload = initailize.bind(this);
window.onload = fastInitailize.bind(undefined);
window.onresize = resizeWindow.bind(undefined);

function fastInitailize() {
    if (image && texture) {
        var context = texture.getContext('2d');
        texture.width = image.width;
        texture.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        document.body.removeChild(image);
        document.body.removeChild(texture);

        //beginWithImageElement(image);
        beginWithCanvas(texture, image);
    }
}

function beginWithImageElement(image) {
    editor = new _ImageEditor.ImageEditor(image);
    resizeWindow();
}

function beginWithCanvas(texture, imageElement) {
    editor = new _ImageEditor.ImageEditor(texture, imageElement);
    resizeWindow();
}

function resizeWindow() {
    if (editor) editor.resize();
}

},{"./nts/editor/ImageEditor":2}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.ImageEditor = undefined;

var _Cropper = require("./crop/Cropper");

var _animation = require("../../../lib/animation");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageEditor = exports.ImageEditor = function () {
    function ImageEditor(imageElement, textureCanvas) {
        _classCallCheck(this, ImageEditor);

        this.initialize(imageElement, textureCanvas);
        this.resize();
        this.updateLoop();
    }

    ImageEditor.prototype.initialize = function initialize(imageElement, textureCanvas) {
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.canvas = document.getElementById('canvas');

        /*this.context = this.canvas.getContext('2d');
        this.renderer = new PIXI.CanvasRenderer(this.canvas.width, this.canvas.height, {
            view: this.canvas,
            autoResize: true,
            backgroundColor: 0x000000
        });*/

        this.renderer = new PIXI.WebGLRenderer(this.canvas.width, this.canvas.height, {
            view: this.canvas,
            autoResize: true,
            backgroundColor: 0x000000
        });

        /*var interactive = true;
        this.stage = new PIXI.Stage(0xE6E9EC, interactive);*/
        this.stage = new PIXI.Container(0xE6E9EC);

        this.cropper = new _Cropper.Cropper(this.canvas, this.imageElement, this.textureCanvas);
        this.stage.addChild(this.cropper);

        //this.resizer = new Resizer(this.canvas, this.imageElement, this.textureCanvas);
        //this.stage.addChild(this.resizer);
    };

    ImageEditor.prototype.updateLoop = function updateLoop(ms) {
        this.update(ms);
        (0, _animation.requestAnimFrame)(this.updateLoop.bind(this));
    };

    ImageEditor.prototype.update = function update(ms) {
        if (this.cropper) this.cropper.update();

        this.renderer.render(this.stage);
    };

    ImageEditor.prototype.resize = function resize() {
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

        if (this.cropper) this.cropper.resize();

        if (this.resizer) this.resizer.resize();
    };

    return ImageEditor;
}();

},{"../../../lib/animation":14,"./crop/Cropper":5}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HitSide = exports.HitSide = function () {
    function HitSide() {
        _classCallCheck(this, HitSide);
    }

    _createClass(HitSide, null, [{
        key: 'NONE',
        get: function get() {
            return 'none';
        }
    }, {
        key: 'LEFT',
        get: function get() {
            return 'left';
        }
    }, {
        key: 'TOP',
        get: function get() {
            return 'top';
        }
    }, {
        key: 'RIGHT',
        get: function get() {
            return 'right';
        }
    }, {
        key: 'BOTTOM',
        get: function get() {
            return 'bottom';
        }
    }, {
        key: 'LEFT_TOP',
        get: function get() {
            return 'left-top';
        }
    }, {
        key: 'LEFT_BOTTOM',
        get: function get() {
            return 'left-bottom';
        }
    }, {
        key: 'RIGHT_TOP',
        get: function get() {
            return 'right-top';
        }
    }, {
        key: 'RIGHT_BOTTOM',
        get: function get() {
            return 'right-bottom';
        }
    }]);

    return HitSide;
}();

},{}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyCode = exports.KeyCode = function () {
    function KeyCode() {
        _classCallCheck(this, KeyCode);
    }

    _createClass(KeyCode, null, [{
        key: "NUM_0",
        get: function get() {
            return 48;
        }
    }, {
        key: "NUM_1",
        get: function get() {
            return 49;
        }
    }, {
        key: "NUM_2",
        get: function get() {
            return 50;
        }
    }, {
        key: "NUM_3",
        get: function get() {
            return 51;
        }
    }, {
        key: "NUM_4",
        get: function get() {
            return 52;
        }
    }, {
        key: "SPACE",
        get: function get() {
            return 32;
        }
    }, {
        key: "BACK_SPACE",
        get: function get() {
            return 8;
        }
    }, {
        key: "ENTER",
        get: function get() {
            return 13;
        }
    }, {
        key: "SHIFT",
        get: function get() {
            return 16;
        }
    }, {
        key: "CTRL",
        get: function get() {
            return 17;
        }
    }, {
        key: "ALT",
        get: function get() {
            return 18;
        }
    }, {
        key: "ESC",
        get: function get() {
            return 27;
        }
    }, {
        key: "LEFT_ARROW",
        get: function get() {
            return 37;
        }
    }, {
        key: "RIGHT_ARROW",
        get: function get() {
            return 39;
        }
    }, {
        key: "UP_ARROW",
        get: function get() {
            return 38;
        }
    }, {
        key: "DOWN_ARROW",
        get: function get() {
            return 40;
        }
    }, {
        key: "DELETE",
        get: function get() {
            return 46;
        }
    }, {
        key: "F1",
        get: function get() {
            return 112;
        }
    }, {
        key: "F2",
        get: function get() {
            return 113;
        }
    }, {
        key: "F3",
        get: function get() {
            return 114;
        }
    }, {
        key: "F4",
        get: function get() {
            return 115;
        }
    }, {
        key: "Q",
        get: function get() {
            return 81;
        }
    }, {
        key: "W",
        get: function get() {
            return 87;
        }
    }, {
        key: "E",
        get: function get() {
            return 69;
        }
    }, {
        key: "R",
        get: function get() {
            return 82;
        }
    }, {
        key: "A",
        get: function get() {
            return 65;
        }
    }, {
        key: "S",
        get: function get() {
            return 83;
        }
    }, {
        key: "D",
        get: function get() {
            return 68;
        }
    }, {
        key: "F",
        get: function get() {
            return 70;
        }
    }, {
        key: "Z",
        get: function get() {
            return 90;
        }
    }, {
        key: "X",
        get: function get() {
            return 88;
        }
    }, {
        key: "C",
        get: function get() {
            return 67;
        }
    }, {
        key: "V",
        get: function get() {
            return 86;
        }
    }]);

    return KeyCode;
}();

},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.Cropper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Calculator = require('../utils/Calculator');

var _ResizeUI = require('../ui/ResizeUI');

var _RotateUI = require('../ui/RotateUI');

var _MoveUI = require('../ui/MoveUI');

var _imageUI = require('../ui/imageUI');

var _KeyCode = require('../const/KeyCode');

var _HitSide = require('../const/HitSide');

var _Painter = require('../utils/Painter');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cropper = exports.Cropper = function (_PIXI$Container) {
    _inherits(Cropper, _PIXI$Container);

    function Cropper(canvas, imageElement, textureCanvas) {
        _classCallCheck(this, Cropper);

        var _this = _possibleConstructorReturn(this, _PIXI$Container.call(this));

        _this.initialize(canvas, imageElement, textureCanvas);
        _this.addEvent();
        return _this;
    }

    Cropper.prototype.initialize = function initialize(canvas, imageElement, textureCanvas) {
        this.paddingX = 216;
        this.paddingY = 158;
        this.canvas = canvas;
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;
        this.isInitialize = false;

        this._stageRotation = 0;
        this.limitRotation = _Calculator.Calc.toRadians(45);
        this.maxRotation = this.limitRotation;
        this.minRotation = -this.limitRotation;
        this.rotation90 = _Calculator.Calc.toRadians(90);

        this.image = new _imageUI.ImageUI(this.textureCanvas);
        this.moveUI = new _MoveUI.MoveUI(this.canvas);
        this.rotateUI = new _RotateUI.RotateUI(this.canvas);
        this.resizeUI = new _ResizeUI.ResizeUI(this.canvas);
        this.addChild(this.image);
        this.addChild(this.rotateUI);
        this.addChild(this.moveUI);
        this.addChild(this.resizeUI);

        this.gGrid = new PIXI.Graphics();
        this.gLine = new PIXI.Graphics();
        this.gLens = new PIXI.Graphics();
        this.gImage = new PIXI.Graphics();
        this.gBounds = new PIXI.Graphics();
        this.gRotate = new PIXI.Graphics();
        this.gMove = new PIXI.Graphics();
        this.gTest = new PIXI.Graphics();
        this.addChild(this.gLens);
        this.addChild(this.gLine);
        this.addChild(this.gGrid);
        this.addChild(this.gImage);
        this.addChild(this.gBounds);
        this.addChild(this.gRotate);
        this.addChild(this.gMove);
        this.addChild(this.gTest);
    };

    Cropper.prototype.clearGraphics = function clearGraphics() {
        this.gLens.clear();
        this.gLine.clear();
        this.gGrid.clear();
        this.gImage.clear();
        this.gBounds.clear();
        this.gRotate.clear();
        this.gMove.clear();
        this.gTest.clear();
    };

    Cropper.prototype.addEvent = function addEvent() {
        var _this2 = this;

        window.document.addEventListener('keyup', function (e) {
            switch (e.keyCode) {
                case _KeyCode.KeyCode.ESC:
                    console.clear();
                    break;
                case _KeyCode.KeyCode.SPACE:
                    console.log(_this2.image.toString());
                    break;

                case _KeyCode.KeyCode.NUM_1:
                    _this2.testPivot(e.keyCode);
                    break;

                case _KeyCode.KeyCode.NUM_2:
                    _this2.testPivot(e.keyCode);
                    break;

                case _KeyCode.KeyCode.NUM_3:
                    _this2.testPivot(e.keyCode);
                    break;

                case _KeyCode.KeyCode.NUM_4:
                    _this2.testPivot(e.keyCode);
                    break;

                case _KeyCode.KeyCode.C:
                    _this2.clearGraphics();
                    break;

                case _KeyCode.KeyCode.R:
                    _this2.rotate();
                    break;
            }
        });

        this.moveUI.on('moveStart', this.moveStart.bind(this));
        this.moveUI.on('moveChange', this.moveChange.bind(this));
        this.moveUI.on('moveEnd', this.moveEnd.bind(this));
        this.rotateUI.on('rotateStart', this.rotateStart.bind(this));
        this.rotateUI.on('rotateChange', this.rotateChange.bind(this));
        this.rotateUI.on('rotateEnd', this.rotateEnd.bind(this));
        this.resizeUI.on('cornerResizeStart', this.cornerResizeStart.bind(this));
        this.resizeUI.on('cornerResizeChange', this.cornerResizeChange.bind(this));
        this.resizeUI.on('cornerResizeEnd', this.cornerResizeEnd.bind(this));
    };

    Cropper.prototype.update = function update() {};

    Cropper.prototype.resize = function resize() {
        // 최초 실행: 화면 초기화
        if (this.isInitialize == false) {
            this.isInitialize = true;
            this.initializeImage();
            var imageBounds = this.image.bounds;
            this.resizeUI.resize(imageBounds);
            this.moveUI.setSize(this.resizeUI.bounds);

            this.test();
        } else {
            var resizeUIBounds = this.resizeUI.bounds;
            this.magnifyImage(resizeUIBounds);
            this.moveUI.setSize(resizeUIBounds);
        }

        this.rotateUI.resize();
        //Painter.drawBounds(this.gBounds, this.bounds);

        this.gImage.clear();
        this.gRotate.clear();
    };

    Cropper.prototype.initializeImage = function initializeImage() {
        var size = _Calculator.Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);
        this.image.width = size.width;
        this.image.height = size.height;
        this.image.x = this.canvas.width / 2;
        this.image.y = this.canvas.height / 2;
        this.image.updatePrevLtPointForPivot();
    };

    //////////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////////

    Cropper.prototype.test = function test() {
        //this.image.visible = false;
        //this.resizeUI.visible = false;
        //this.moveUI.visible = false;
        //this.gBounds.visible = false;
        //Painter.drawGrid(this.gGrid, this.canvas.width, this.canvas.height);

        //this.testNextPosition();
    };

    Cropper.prototype.testNextPosition = function testNextPosition() {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        var radius = 30;
        var rotation30 = _Calculator.Calc.toRadians(30);
        var rotation45 = _Calculator.Calc.toRadians(45);

        var p1 = _Calculator.Calc.getNextMovePosition(cx, cy, radius, rotation45);
        var p2 = _Calculator.Calc.getNextMovePosition(cx, cy, -radius, rotation45);
        var p3 = _Calculator.Calc.getNextMovePosition(cx, cy, 60, -rotation45);
        var p4 = _Calculator.Calc.getNextMovePosition(cx, cy, 90, rotation30);
        var p5 = _Calculator.Calc.getNextMovePosition(cx, cy, 90, -rotation30);

        _Painter.Painter.drawCircle(this.gTest, { x: cx, y: cy }, 4, 0x000000);
        _Painter.Painter.drawCircle(this.gTest, p1, 4);
        _Painter.Painter.drawCircle(this.gTest, p2, 4);
        _Painter.Painter.drawCircle(this.gTest, p3, 4);
        _Painter.Painter.drawCircle(this.gTest, p4, 4);
        _Painter.Painter.drawCircle(this.gTest, p5, 4);
    };

    Cropper.prototype.testNextPoint = function testNextPoint() {
        var d = 2;
        this.prevX = this.canvas.width / 2;
        this.prevY = this.canvas.height / 2;

        var rotation = _Calculator.Calc.toRadians(45) - _Calculator.Calc.toRadians(90); // 우상단으로
        //var rotation = Calc.toRadians(45) + Calc.toRadians(90);     // 좌하단으로

        for (var i = 0; i < 90; i++) {
            var x = this.prevX + d * Math.cos(rotation);
            var y = this.prevY + d * Math.sin(rotation);
            //Painter.drawLine(this.gMove, {x:this.prevX, y:this.prevY}, {x:x, y:y}, 2);
            this.prevX = x;
            this.prevY = y;
        }
    };

    Cropper.prototype.testPivot = function testPivot(keycode) {
        var offset;

        switch (keycode) {
            case _KeyCode.KeyCode.NUM_1:
                offset = 0;
                this.image.setPivot({ x: offset, y: offset });
                break;

            case _KeyCode.KeyCode.NUM_2:
                offset = -10;
                this.image.setPivot({ x: offset, y: offset });
                break;

            case _KeyCode.KeyCode.NUM_3:
                offset = -20;
                this.image.setPivot({ x: offset, y: offset });
                break;

            case _KeyCode.KeyCode.NUM_4:
                offset = -30;
                this.image.setPivot({ x: offset, y: offset });
                break;
        }
    };

    Cropper.prototype.setImagePivot = function setImagePivot() {
        var cx = this.canvas.width / 2;
        var cy = this.canvas.height / 2;
        this.image.setPivot({ x: cx, y: cy });
    };

    Cropper.prototype.moveStart = function moveStart(e) {
        this.isHit = false;
        this.prevImageX = this.image.x;
        this.prevImageY = this.image.y;

        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.moveChange = function moveChange(e) {
        var nextPoint;
        var dx = e.change.x;
        var dy = e.change.y;
        var ax = Math.abs(dx);
        var ay = Math.abs(dy);
        var cx = this.prevImageX;
        var cy = this.prevImageY;
        var rotation = this.image.rotation;
        this.image.x += dx;
        this.image.y += dy;

        //console.log(Calc.trace(dx), Calc.trace(dy), Calc.trace(dx + dy), Calc.trace(Calc.toDegrees(this.image.rotation)));

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            if (this.isHit) {
                var hitSide = this.image.getHitSide(this.resizeUI);

                switch (hitSide) {
                    case _HitSide.HitSide.LEFT:
                    case _HitSide.HitSide.RIGHT:
                        nextPoint = _Calculator.Calc.getNextMovePosition(cx, cy, dy, rotation + this.rotation90);
                        break;

                    case _HitSide.HitSide.TOP:
                    case _HitSide.HitSide.BOTTOM:
                        nextPoint = _Calculator.Calc.getNextMovePosition(cx, cy, dx, rotation);
                        break;

                    default:
                        this.image.fixMove(this.resizeUI, this.stageRotation);
                        break;
                }

                if (nextPoint) {
                    this.image.x = nextPoint.x;
                    this.image.y = nextPoint.y;
                }
            } else {
                this.isHit = true;
                this.image.fixMove(this.resizeUI, this.stageRotation);
            }
        } else {
            this.isHit = false;
        }

        if (this.image.isContainsBounds(this.resizeUI)) {
            this.prevImageX = this.image.x;
            this.prevImageY = this.image.y;
        } else {
            this.image.x = this.prevImageX;
            this.image.y = this.prevImageY;
        }

        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.moveEnd = function moveEnd(e) {
        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.rotateStart = function rotateStart(e) {

        console.log('1', _Calculator.Calc.trace(this.image.x), _Calculator.Calc.trace(this.image.y));
        this.setImagePivot();
        console.log('2', _Calculator.Calc.trace(this.image.x), _Calculator.Calc.trace(this.image.y));
        this.resizeUIPoints = this.resizeUI.points;
        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.rotateChange = function rotateChange(e) {
        this.image.rotation += e.change;
        if (this.image.rotation < this.minRotation) this.image.rotation = this.minRotation;
        if (this.image.rotation > this.maxRotation) this.image.rotation = this.maxRotation;
        //this.displayImageRotationBounds();

        if (this.image.isContainsBounds(this.resizeUI) === false) {
            var pivot = { x: this.image.x, y: this.image.y };
            var rPoints = _Calculator.Calc.getRotationRectanglePoints(pivot, this.resizeUIPoints, _Calculator.Calc.toDegrees(this.image.rotation));
            var rRect = _Calculator.Calc.getBoundsRectangle(rPoints);
            var scale = _Calculator.Calc.getBoundsScale(rRect, this.image);
            var w = this.image.width;
            var h = this.image.height;
            var sw = w * scale.max;
            var sh = h * scale.max;

            // 이미지가 최대 사이즈 보다 작은 경우에만 스케일을 하도록 조건 변경 필요
            if (w <= sw && h <= sh) {
                this.image.width = sw;
                this.image.height = sh;
            }

            // Painter.drawBounds(this.gRotate, rotationRect, true, 1, 0xFF00FF, 0.7); // 자주빛

            this.image.fixMove(this.resizeUI, this.stageRotation);
        }
        this.image.updatePrevLtPointForPivot();
    };

    /**
     * TODO
     * 회전 시 문제는
     * 이미지를 회전 시킬때 문제가 발생합니다.
     *
     * 오류1. 이미지 회전 시 전혀 다른 각도에서 회전을 시작하는 오류
     * 오류2. 회전 시 충돌 검사를 제대로 하지 못한다.
     */


    Cropper.prototype.rotate = function rotate() {
        var rotateAngle = _Calculator.Calc.toRadians(-90);

        this.image.rotation += rotateAngle;
        this.image.rotatePoints();
        this.image.updatePrevLtPointForPivot();
        // this.setImagePivot();

        var rotationPoints = this.resizeUI.rotationPoints;
        var lens = this.resizeUI.pointsToBounds(rotationPoints);
        //Painter.drawPoints(this.gRotate, rotationPoints, false, 1, 0x00ff00, 0.7);

        var zoom = _Calculator.Calc.getBoundsScale(this.bounds, lens).min;
        var rubberband = _Calculator.Calc.getImageSizeKeepAspectRatio(lens, this.bounds);
        rubberband.x = this.canvas.width / 2 - rubberband.width / 2;
        rubberband.y = this.canvas.height / 2 - rubberband.height / 2;
        this.resizeUI.setSize(rubberband);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.resizeUIPoints = this.resizeUI.points;

        this.image.width = this.image.width * zoom;
        this.image.height = this.image.height * zoom;

        this.stageRotation += rotateAngle;
        this.maxRotation = this.stageRotation + this.limitRotation;
        this.minRotation = this.stageRotation - this.limitRotation;
    };

    Cropper.prototype.rotateEnd = function rotateEnd(e) {
        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.cornerResizeStart = function cornerResizeStart(e) {
        this.startLensBounds = this.resizeUI.bounds;
        this.image.updatePrevLtPointForPivot();
    };

    /**
     * 1. 줌 비율 구하기
     * 2. 러버밴드 리사이즈 구하기
     * 3. 러버밴드 설정
     * 4. 줌 비율에 이미지 리사이즈 하기
     * 5. 이미지 위치 구하기
     * 6. 이미지 위치 구할 때 러버밴드 리사이즈 후 위치를 기준 좌표로 삼으면 됩니다.
     * @param lens : 확대 / 축소 하기 위해 설정한 Rectangle
     */


    Cropper.prototype.magnifyImage = function magnifyImage(lens) {
        var offsetX = this.image.lt.x - lens.x;
        var offsetY = this.image.lt.y - lens.y;

        var zoom = _Calculator.Calc.getBoundsScale(this.bounds, lens).min;
        var rubberband = _Calculator.Calc.getImageSizeKeepAspectRatio(lens, this.bounds);
        rubberband.x = this.canvas.width / 2 - rubberband.width / 2;
        rubberband.y = this.canvas.height / 2 - rubberband.height / 2;
        this.resizeUI.setSize(rubberband);

        this.image.width = this.image.width * zoom;
        this.image.height = this.image.height * zoom;

        var posX = offsetX * zoom;
        var posY = offsetY * zoom;
        var pivotOffsetX = this.image.x - this.image.lt.x;
        var pivotOffsetY = this.image.y - this.image.lt.y;
        this.image.x = rubberband.x + posX + pivotOffsetX;
        this.image.y = rubberband.y + posY + pivotOffsetY;

        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.cornerResizeChange = function cornerResizeChange(e) {
        var changePoint;
        var dx = e.dx;
        var dy = e.dy;
        var corner = e.target;
        var tx = corner.x + dx;
        var ty = corner.y + dy;
        var speedX = dx * 2;
        var speedY = dy * 2;

        if (tx > this.startLensBounds.x && tx < this.startLensBounds.x + this.startLensBounds.width && ty > this.startLensBounds.y && ty < this.startLensBounds.y + this.startLensBounds.height) {

            changePoint = this.resizeUI.getCornerUpdatePoints(corner, tx, ty);

            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
            } else {
                changePoint = this.resizeUI.fixCorner(corner, changePoint, this.image);
                this.resizeUI.setPoint(changePoint);
            }
        } else {
            changePoint = this.resizeUI.getCornerUpdatePoints(corner, tx + speedX, ty + speedY);

            if (this.image.isContainsBounds(changePoint)) {
                this.resizeUI.setPoint(changePoint);
            } else {
                changePoint = this.resizeUI.fixCorner(corner, changePoint, this.image);
                this.resizeUI.setPoint(changePoint);
            }
            this.magnifyImage(this.resizeUI.bounds);
        }

        this.moveUI.setSize(this.resizeUI.bounds);
        this.image.updatePrevLtPointForPivot();
    };

    Cropper.prototype.cornerResizeEnd = function cornerResizeEnd(e) {
        this.magnifyImage(this.resizeUI.bounds);
        this.moveUI.setSize(this.resizeUI.bounds);
        this.gLens.clear();

        this.setImagePivot();
        this.image.updatePrevLtPointForPivot();
    };

    //////////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////
    // Debug Util Function
    //////////////////////////////////////////////////////////////////////////


    /**
     * 현재 화면 사이즈에 맞는 이미지 바운드 영역을 화면에 출력합니다.
     */
    Cropper.prototype.displayImageRotationBounds = function displayImageRotationBounds() {
        var imageRect = _Calculator.Calc.getImageSizeKeepAspectRatio(this.image, this.bounds);

        var imagePoint = {
            lt: { x: 0, y: 0 },
            rt: { x: imageRect.width, y: 0 },
            rb: { x: imageRect.width, y: imageRect.height },
            lb: { x: 0, y: imageRect.height }
        };

        var rotationPoints = _Calculator.Calc.getRotationRectanglePoints({
            x: imageRect.width / 2,
            y: imageRect.height / 2
        }, imagePoint, _Calculator.Calc.toDegrees(this.image.rotation));
        var rotationRect = _Calculator.Calc.getBoundsRectangle(rotationPoints);
        rotationRect.x = this.canvas.width / 2 - rotationRect.width / 2;
        rotationRect.y = this.canvas.height / 2 - rotationRect.height / 2;

        //Painter.drawBounds(this.gImage, rotationRect, true, 2, 0x00FCFF, 0.4); // 하늘색
    };

    _createClass(Cropper, [{
        key: 'bounds',
        get: function get() {
            var canvasWidth = this.canvas.width;
            var canvasHeight = this.canvas.height;

            var boundsWidth = canvasWidth - this.paddingX;
            var boundsHeight = canvasHeight - this.paddingY;
            var boundsX = canvasWidth / 2 - boundsWidth / 2;
            var boundsY = canvasHeight / 2 - boundsHeight / 2;

            return {
                width: boundsWidth,
                height: boundsHeight,
                x: boundsX,
                y: boundsY
            };
        }
    }, {
        key: 'stageRotation',
        set: function set(radians) {
            this._stageRotation = radians;

            /*if(-360 == Calc.toDegrees(this._stageRotation))
                this._stageRotation = 0;*/
        },
        get: function get() {
            return this._stageRotation;
        }
    }]);

    return Cropper;
}(PIXI.Container);

},{"../const/HitSide":3,"../const/KeyCode":4,"../ui/MoveUI":8,"../ui/ResizeUI":9,"../ui/RotateUI":10,"../ui/imageUI":11,"../utils/Calculator":12,"../utils/Painter":13}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlArea = exports.ControlArea = function (_PIXI$Sprite) {
    _inherits(ControlArea, _PIXI$Sprite);

    _createClass(ControlArea, null, [{
        key: 'ROW',
        get: function get() {
            return 'row';
        }
    }, {
        key: 'COL',
        get: function get() {
            return 'col';
        }
    }, {
        key: 'CORNER',
        get: function get() {
            return 'corner';
        }
    }]);

    function ControlArea(type) {
        _classCallCheck(this, ControlArea);

        var _this = _possibleConstructorReturn(this, _PIXI$Sprite.call(this));

        _this.initialize(type);
        _this.draw(type);
        return _this;
    }

    ControlArea.prototype.initialize = function initialize(type) {
        this.type = type;
        this.globalAlpha = 0;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    };

    ControlArea.prototype.draw = function draw(type) {
        this.graphics.clear();

        switch (type) {
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
    };

    return ControlArea;
}(PIXI.Sprite);

},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CornerShape = exports.CornerShape = function (_PIXI$Sprite) {
    _inherits(CornerShape, _PIXI$Sprite);

    _createClass(CornerShape, null, [{
        key: 'LEFT_TOP',
        get: function get() {
            return 'leftTop';
        }
    }, {
        key: 'RIGHT_TOP',
        get: function get() {
            return 'rightTop';
        }
    }, {
        key: 'RIGHT_BOTTOM',
        get: function get() {
            return 'rightBottom';
        }
    }, {
        key: 'LEFT_BOTTOM',
        get: function get() {
            return 'leftBottom';
        }
    }]);

    function CornerShape(type) {
        _classCallCheck(this, CornerShape);

        var _this = _possibleConstructorReturn(this, _PIXI$Sprite.call(this));

        _this.initialize();
        _this.draw(type);
        return _this;
    }

    CornerShape.prototype.initialize = function initialize(type) {
        var thickness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

        this.type = type;
        this.size = size;
        this.half = size / 2;
        this.thickness = thickness;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.buttonArea = new PIXI.Graphics();
        this.addChild(this.graphics);
        this.addChild(this.buttonArea);
    };

    CornerShape.prototype.draw = function draw(type) {
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

    CornerShape.prototype.drawButtonArea = function drawButtonArea() {
        var h = this.half;
        var s = this.size;
        this.buttonArea.clear();
        this.buttonArea.beginFill(0x4285f4, 0.1);
        this.buttonArea.drawRect(-h, -h, s, s);
        this.buttonArea.endFill();
    };

    CornerShape.prototype.drawLeftTop = function drawLeftTop() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-t, -t, h, t);
        this.graphics.drawRect(-t, -t, t, h);
        this.graphics.endFill();
    };

    CornerShape.prototype.drawRightTop = function drawRightTop() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-(h - t), -t, h, t);
        this.graphics.drawRect(0, -t, t, h);
        this.graphics.endFill();
    };

    CornerShape.prototype.drawRightBottom = function drawRightBottom() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-(h - t), 0, h, t);
        this.graphics.drawRect(0, t, t, -h);
        this.graphics.endFill();
    };

    CornerShape.prototype.drawLeftBottom = function drawLeftBottom() {
        var h = this.half;
        var t = this.thickness;
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4);
        this.graphics.drawRect(-t, 0, h, t);
        this.graphics.drawRect(-t, t, t, -h);
        this.graphics.endFill();
    };

    return CornerShape;
}(PIXI.Sprite);

},{}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.MoveUI = undefined;

var _Calculator = require('../utils/Calculator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MoveUI = exports.MoveUI = function (_PIXI$Sprite) {
    _inherits(MoveUI, _PIXI$Sprite);

    function MoveUI(canvas) {
        _classCallCheck(this, MoveUI);

        var _this = _possibleConstructorReturn(this, _PIXI$Sprite.call(this));

        _this.initialize(canvas);
        _this.render();
        _this.addMouseDownEvent();
        return _this;
    }

    MoveUI.prototype.initialize = function initialize(canvas) {
        this.canvas = canvas;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    };

    MoveUI.prototype.render = function render() {
        this.graphics.clear();
        this.graphics.beginFill(0x4285f4, 0.0);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    };

    MoveUI.prototype.setSize = function setSize(sizeRect) {
        //this.graphics.width = imageRect.width - 32;
        //this.graphics.height = imageRect.height - 32;
        this.graphics.width = sizeRect.width;
        this.graphics.height = sizeRect.height;
        this.graphics.x = this.canvas.width / 2 - this.graphics.width / 2;
        this.graphics.y = this.canvas.height / 2 - this.graphics.height / 2;
    };

    MoveUI.prototype.addMouseDownEvent = function addMouseDownEvent() {
        this._mouseDownListener = this.onMouseDown.bind(this);
        this.on('mousedown', this._mouseDownListener);
    };

    MoveUI.prototype.removeMouseDownEvent = function removeMouseDownEvent() {
        this.off('mousedown', this._mouseDownListener);
    };

    MoveUI.prototype.addMouseMoveEvent = function addMouseMoveEvent() {
        this._mouseMoveListener = this.onMouseMove.bind(this);
        this._mouseUpListener = this.onMouseUp.bind(this);

        window.document.addEventListener('mousemove', this._mouseMoveListener);
        window.document.addEventListener('mouseup', this._mouseUpListener);
    };

    MoveUI.prototype.removeMouseMoveEvent = function removeMouseMoveEvent() {
        window.document.removeEventListener('mousemove', this._mouseMoveListener);
        window.document.removeEventListener('mouseup', this._mouseUpListener);
    };

    MoveUI.prototype.onMouseDown = function onMouseDown(e) {
        this.prevMousePoint = { x: e.data.global.x, y: e.data.global.y };

        this.emit('moveStart');

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    };

    MoveUI.prototype.onMouseMove = function onMouseMove(e) {
        this.currentMousePoint = { x: e.clientX, y: e.clientY };

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

    MoveUI.prototype.onMouseUp = function onMouseUp(e) {
        this.emit('moveEnd');
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    };

    return MoveUI;
}(PIXI.Sprite);

},{"../utils/Calculator":12}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ResizeUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CornerShape = require('./CornerShape');

var _ControlArea = require('./ControlArea');

var _Calculator = require('../utils/Calculator');

var _Painter = require('../utils/Painter');

var _HitSide = require('../const/HitSide');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizeUI = exports.ResizeUI = function (_PIXI$Container) {
    _inherits(ResizeUI, _PIXI$Container);

    function ResizeUI(canvas) {
        _classCallCheck(this, ResizeUI);

        var _this = _possibleConstructorReturn(this, _PIXI$Container.call(this));

        _this.initialize(canvas);
        _this.addCornerDownEvent();
        return _this;
    }

    ResizeUI.prototype.initialize = function initialize(canavs) {
        this.offset = -1;
        this.canvas = canvas;
        this.imageRect = new PIXI.Graphics();
        this.topControl = new _ControlArea.ControlArea(_ControlArea.ControlArea.ROW);
        this.bottomControl = new _ControlArea.ControlArea(_ControlArea.ControlArea.ROW);
        this.leftControl = new _ControlArea.ControlArea(_ControlArea.ControlArea.COL);
        this.rightControl = new _ControlArea.ControlArea(_ControlArea.ControlArea.COL);
        this.lt = new _CornerShape.CornerShape(_CornerShape.CornerShape.LEFT_TOP);
        this.rt = new _CornerShape.CornerShape(_CornerShape.CornerShape.RIGHT_TOP);
        this.rb = new _CornerShape.CornerShape(_CornerShape.CornerShape.RIGHT_BOTTOM);
        this.lb = new _CornerShape.CornerShape(_CornerShape.CornerShape.LEFT_BOTTOM);
        this.addChild(this.imageRect);
        this.addChild(this.topControl);
        this.addChild(this.bottomControl);
        this.addChild(this.leftControl);
        this.addChild(this.rightControl);
        this.addChild(this.lt);
        this.addChild(this.rt);
        this.addChild(this.rb);
        this.addChild(this.lb);

        // TODO 디버그용 삭제 필요
        this.gDebug = new PIXI.Graphics();
        this.addChild(this.gDebug);
    };

    ResizeUI.prototype.resize = function resize(imageRect) {
        this.resizeCornerShape(imageRect);
        this.resizeControl();
        this.drawImageRect();
    };

    ResizeUI.prototype.resizeCornerShape = function resizeCornerShape(imageRect) {
        this.lt.x = imageRect.x - this.offset;
        this.lt.y = imageRect.y - this.offset;
        this.rt.x = imageRect.x + imageRect.width + this.offset;
        this.rt.y = imageRect.y - this.offset;
        this.rb.x = this.rt.x + this.offset;
        this.rb.y = imageRect.y + imageRect.height + this.offset;
        this.lb.x = this.lt.x - this.offset;
        this.lb.y = this.rb.y + this.offset;
    };

    ResizeUI.prototype.resizeControl = function resizeControl() {
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
    };

    ResizeUI.prototype.drawImageRect = function drawImageRect() {
        this.imageRect.clear();
        this.imageRect.lineStyle(2, 0x9e9e9e); // 회색
        this.imageRect.moveTo(this.lt.x, this.lt.y);
        this.imageRect.lineTo(this.rt.x, this.rt.y);
        this.imageRect.lineTo(this.rb.x, this.rb.y);
        this.imageRect.lineTo(this.lb.x, this.lb.y);
        this.imageRect.lineTo(this.lt.x, this.lt.y);
        this.imageRect.endFill();
    };

    ResizeUI.prototype.updateOtherCorner = function updateOtherCorner(changeCorner) {
        switch (changeCorner) {
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
    };

    ResizeUI.prototype.setSize = function setSize(rect) {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;

        this.lt.x = x;
        this.lt.y = y;
        this.rt.x = x + width;
        this.rt.y = y;
        this.rb.x = this.rt.x;
        this.rb.y = y + height;
        this.lb.x = x;
        this.lb.y = this.rb.y;

        this.drawImageRect();
    };

    ResizeUI.prototype.setPoint = function setPoint(points) {
        this.lt.x = points.lt.x;
        this.lt.y = points.lt.y;
        this.rt.x = points.rt.x;
        this.rt.y = points.rt.y;
        this.rb.x = points.rb.x;
        this.rb.y = points.rb.y;
        this.lb.x = points.lb.x;
        this.lb.y = points.lb.y;

        this.drawImageRect();
    };

    /**
     * 이동하는 코너와 변화값을 보내주면 변화된 points 들을 계산해서 건내줍니다.
     * @param corner
     * @param dx
     * @param dy
     * @returns {*}
     */


    ResizeUI.prototype.getCornerUpdatePoints = function getCornerUpdatePoints(corner, tx, ty) {
        var points = this.points;

        switch (corner) {
            case this.lt:
                points.lt.x = tx;
                points.lt.y = ty;
                points.rt.y = points.lt.y;
                points.lb.x = points.lt.x;
                break;

            case this.rt:
                points.rt.x = tx;
                points.rt.y = ty;
                points.lt.y = points.rt.y;
                points.rb.x = points.rt.x;
                break;

            case this.rb:
                points.rb.x = tx;
                points.rb.y = ty;
                points.rt.x = points.rb.x;
                points.lb.y = points.rb.y;
                break;

            case this.lb:
                points.lb.x = tx;
                points.lb.y = ty;
                points.lt.x = points.lb.x;
                points.rb.y = points.lb.y;
                break;
        }

        return points;
    };

    ResizeUI.prototype.fixCorner = function fixCorner(corner, points, image) {
        var hitPoints = image.getHitPoints(points);

        for (var i = 0; i < hitPoints.length; i++) {
            var hitInfo = hitPoints[i];

            var limit;
            var point = hitInfo.point;
            var hitSide = hitInfo.hitSide;

            switch (hitSide) {
                case _HitSide.HitSide.LEFT:
                    limit = this.getLeft(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case _HitSide.HitSide.RIGHT:
                    limit = this.getRight(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case _HitSide.HitSide.TOP:
                    limit = this.getTop(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;

                case _HitSide.HitSide.BOTTOM:
                    limit = this.getBottom(points, image);
                    points = this.getCornerUpdatePoints(point, limit.x, limit.y);
                    break;
            }
        }

        return points;
    };

    ResizeUI.prototype.getLeft = function getLeft(points, image) {
        var ltx, lbx;

        if (image.isOutLeftLine(points.lt)) {
            ltx = image.getLeftIntersectionPoint(points.lt).x;
        } else if (image.isOutTopLine(points.lt)) {
            ltx = image.getTopIntersectionPoint(points.lt).x;
        } else if (image.isOutBottomLine(points.lt)) {
            ltx = image.getBottomIntersectionPoint(points.lt).x;
        } else {
            ltx = points.lt.x;
        }

        if (image.isOutLeftLine(points.lb)) {
            lbx = image.getLeftIntersectionPoint(points.lb).x;
        } else if (image.isOutTopLine(points.lb)) {
            lbx = image.getTopIntersectionPoint(points.lb).x;
        } else if (image.isOutBottomLine(points.lb)) {
            lbx = image.getBottomIntersectionPoint(points.lb).x;
        } else {
            lbx = points.lb.x;
        }

        return Math.max(ltx, lbx);
    };

    ResizeUI.prototype.getTop = function getTop(points, image) {
        var lty, rty;

        if (image.isOutTopLine(points.lt)) {
            lty = image.getTopIntersectionPoint(points.lt).y;
        } else if (image.isOutLeftLine(points.lt)) {
            lty = image.getLeftIntersectionPoint(points.lt).y;
        } else if (image.isOutRightLine(points.lt)) {
            lty = image.getRightIntersectionPoint(points.lt).y;
        } else {
            lty = points.lt.y;
        }

        if (image.isOutTopLine(points.rt)) {
            rty = image.getTopIntersectionPoint(points.rt).y;
        } else if (image.isOutLeftLine(points.rt)) {
            rty = image.getLeftIntersectionPoint(points.rt).y;
        } else if (image.isOutRightLine(points.rt)) {
            rty = image.getRightIntersectionPoint(points.rt).y;
        } else {
            rty = points.rt.y;
        }

        return Math.max(lty, rty);
    };

    ResizeUI.prototype.getRight = function getRight(points, image) {
        var rtx, rbx;

        if (image.isOutRightLine(points.rt)) {
            rtx = image.getRightIntersectionPoint(points.rt).x;
        } else if (image.isOutTopLine(points.rt)) {
            rtx = image.getTopIntersectionPoint(points.rt).x;
        } else if (image.isOutBottomLine(points.rt)) {
            rtx = image.getBottomIntersectionPoint(points.rt).x;
        } else {
            rtx = points.rt.x;
        }

        if (image.isOutRightLine(points.rb)) {
            rbx = image.getRightIntersectionPoint(points.rb).x;
        } else if (image.isOutTopLine(points.rb)) {
            rbx = image.getTopIntersectionPoint(points.rb).x;
        } else if (image.isOutBottomLine(points.rb)) {
            rbx = image.getBottomIntersectionPoint(points.rb).x;
        } else {
            rbx = points.rb.x;
        }

        return Math.min(rtx, rbx);
    };

    ResizeUI.prototype.getBottom = function getBottom(points, image) {
        var rby, lby;

        if (image.isOutBottomLine(points.rb)) {
            rby = image.getBottomIntersectionPoint(points.rb).y;
        } else if (image.isOutLeftLine(points.rb)) {
            rby = image.getLeftIntersectionPoint(points.rb).y;
        } else if (image.isOutRightLine(points.rb)) {
            rby = image.getRightIntersectionPoint(points.rb).y;
        } else {
            rby = points.rb.y;
        }

        if (image.isOutBottomLine(points.lb)) {
            lby = image.getBottomIntersectionPoint(points.lb).y;
        } else if (image.isOutLeftLine(points.lb)) {
            lby = image.getLeftIntersectionPoint(points.lb).y;
        } else if (image.isOutRightLine(points.lb)) {
            lby = image.getRightIntersectionPoint(points.lb).y;
        } else {
            lby = points.lb.y;
        }

        return Math.min(rby, lby);
    };

    ResizeUI.prototype.pointsToBounds = function pointsToBounds(points) {
        return {
            x: points.lt.x,
            y: points.lt.y,
            width: points.rt.x - points.lt.x,
            height: points.rb.y - points.rt.y
        };
    };

    /**
     * 좌상단 점이 바운드안에 포함되었는지 여부
     * @param bounds
     * @returns {boolean}
     */


    ResizeUI.prototype.isLtInsideBounds = function isLtInsideBounds(bounds) {
        return _Calculator.Calc.isInsideSquare(this.lt, bounds.lt, bounds.rt, bounds.rb, bounds.lb);
    };

    ResizeUI.prototype.isRtInsideBounds = function isRtInsideBounds(bounds) {
        return _Calculator.Calc.isInsideSquare(this.rt, bounds.lt, bounds.rt, bounds.rb, bounds.lb);
    };

    ResizeUI.prototype.isRbInsideBounds = function isRbInsideBounds(bounds) {
        return _Calculator.Calc.isInsideSquare(this.rb, bounds.lt, bounds.rt, bounds.rb, bounds.lb);
    };

    ResizeUI.prototype.isLbInsideBounds = function isLbInsideBounds(bounds) {
        return _Calculator.Calc.isInsideSquare(this.lb, bounds.lt, bounds.rt, bounds.rb, bounds.lb);
    };

    //////////////////////////////////////////////////////////////////////
    // Event Handler
    //////////////////////////////////////////////////////////////////////


    ResizeUI.prototype.onCornerDown = function onCornerDown(e) {
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
    };

    ResizeUI.prototype.onCornerMove = function onCornerMove(e) {
        this.currentDragX = e.clientX;
        this.currentDragY = e.clientY;

        this.dx = this.currentDragX - this.prevDragX;
        this.dy = this.currentDragY - this.prevDragY;

        this.emit('cornerResizeChange', {
            dx: this.dx,
            dy: this.dy,
            prevX: this.prevDragX,
            prevY: this.prevDragY,
            target: this.selectedTarget
        });

        this.prevDragX = this.currentDragX;
        this.prevDragY = this.currentDragY;
        //console.log('dx:' + Calc.digit(this.dx) + ',' + Calc.digit(this.dy));
    };

    ResizeUI.prototype.onCornerUp = function onCornerUp(e) {
        this.addCornerDownEvent();
        this.removeCornerMoveEvent();

        this.emit('cornerResizeEnd', {
            target: this.selectedTarget
        });

        this.selectedTarget = null;
    };

    //////////////////////////////////////////////////////////////////////
    // Add & Remove MouseEvent
    //////////////////////////////////////////////////////////////////////


    ResizeUI.prototype.addCornerDownEvent = function addCornerDownEvent() {
        this._cornerDownListener = this.onCornerDown.bind(this);
        this.lt.on('mousedown', this._cornerDownListener);
        this.rt.on('mousedown', this._cornerDownListener);
        this.rb.on('mousedown', this._cornerDownListener);
        this.lb.on('mousedown', this._cornerDownListener);
    };

    ResizeUI.prototype.removeCornerDownEvent = function removeCornerDownEvent() {
        this.lt.off('mousedown', this._cornerDownListener);
        this.rt.off('mousedown', this._cornerDownListener);
        this.rb.off('mousedown', this._cornerDownListener);
        this.lb.off('mousedown', this._cornerDownListener);
    };

    ResizeUI.prototype.addCornerMoveEvent = function addCornerMoveEvent() {
        this._cornerUpListener = this.onCornerUp.bind(this);
        this._cornerMoveListener = this.onCornerMove.bind(this);

        window.document.addEventListener('mouseup', this._cornerUpListener);
        window.document.addEventListener('mousemove', this._cornerMoveListener);
    };

    ResizeUI.prototype.removeCornerMoveEvent = function removeCornerMoveEvent() {
        window.document.removeEventListener('mouseup', this._cornerUpListener);
        window.document.removeEventListener('mousemove', this._cornerMoveListener);
    };

    //////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////


    _createClass(ResizeUI, [{
        key: 'bounds',
        get: function get() {
            return {
                x: this.lt.x,
                y: this.lt.y,
                width: this.rt.x - this.lt.x,
                height: this.rb.y - this.rt.y
            };
        }
    }, {
        key: 'points',
        get: function get() {
            return {
                lt: { x: this.lt.x, y: this.lt.y },
                rt: { x: this.rt.x, y: this.rt.y },
                rb: { x: this.rb.x, y: this.rb.y },
                lb: { x: this.lb.x, y: this.lb.y }
            };
        }
    }, {
        key: 'rotationPoints',
        get: function get() {
            // lt -> lb
            // lb -> rb
            // rb -> rt
            // rt -> lt
            var pivot = { x: this.cx, y: this.cy };
            return {
                lt: _Calculator.Calc.getRotationPoint(pivot, this.rt, -90),
                rt: _Calculator.Calc.getRotationPoint(pivot, this.rb, -90),
                rb: _Calculator.Calc.getRotationPoint(pivot, this.lb, -90),
                lb: _Calculator.Calc.getRotationPoint(pivot, this.lt, -90)
            };
        }
    }, {
        key: 'cx',
        get: function get() {
            return this.lt.x + this.bounds.width / 2;
        }
    }, {
        key: 'cy',
        get: function get() {
            return this.lt.y + this.bounds.height / 2;
        }
    }, {
        key: 'isMinWidth',
        get: function get() {
            var bounds = this.bounds;
            var min = this.size * 2 + this.half;
            return bounds.width < min;
        }
    }, {
        key: 'isMinHeight',
        get: function get() {
            var bounds = this.bounds;
            var min = this.size * 2 + this.half;
            return bounds.height < min;
        }
    }]);

    return ResizeUI;
}(PIXI.Container);

},{"../const/HitSide":3,"../utils/Calculator":12,"../utils/Painter":13,"./ControlArea":6,"./CornerShape":7}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.RotateUI = undefined;

var _Calculator = require('../utils/Calculator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RotateUI = exports.RotateUI = function (_PIXI$Sprite) {
    _inherits(RotateUI, _PIXI$Sprite);

    function RotateUI(canvas) {
        _classCallCheck(this, RotateUI);

        var _this = _possibleConstructorReturn(this, _PIXI$Sprite.call(this));

        _this.initialize(canvas);
        _this.render();
        _this.addMouseDownEvent();
        return _this;
    }

    RotateUI.prototype.initialize = function initialize(canvas) {
        this.canvas = canvas;
        this.interactive = true;
        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    };

    RotateUI.prototype.render = function render() {
        this.graphics.clear();
        this.graphics.beginFill(0xFF00FF, 0.0);
        this.graphics.drawRect(0, 0, 1, 1);
        this.graphics.endFill();
    };

    RotateUI.prototype.resize = function resize() {
        this.graphics.width = this.canvas.width;
        this.graphics.height = this.canvas.height;

        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    };

    RotateUI.prototype.addMouseDownEvent = function addMouseDownEvent() {
        this._mouseDownListener = this.onMouseDown.bind(this);
        this.on('mousedown', this._mouseDownListener);
    };

    RotateUI.prototype.removeMouseDownEvent = function removeMouseDownEvent() {
        this.off('mousedown', this._mouseDownListener);
    };

    RotateUI.prototype.addMouseMoveEvent = function addMouseMoveEvent() {
        this._mouseMoveListener = this.onMouseMove.bind(this);
        this._mouseUpListener = this.onMouseUp.bind(this);

        window.document.addEventListener('mousemove', this._mouseMoveListener);
        window.document.addEventListener('mouseup', this._mouseUpListener);
    };

    RotateUI.prototype.removeMouseMoveEvent = function removeMouseMoveEvent() {
        window.document.removeEventListener('mousemove', this._mouseMoveListener);
        window.document.removeEventListener('mouseup', this._mouseUpListener);
    };

    RotateUI.prototype.onMouseDown = function onMouseDown(e) {
        this.prevRotation = _Calculator.Calc.getRotation({ x: this.centerX, y: this.centerY }, { x: e.data.global.x, y: e.data.global.y });

        this.emit('rotateStart', {
            prevRotation: this.prevRotation,
            currentRotation: this.prevRotation,
            currentRadian: _Calculator.Calc.toRadians(this.prevRotation)
        });

        e.stopPropagation();
        this.addMouseMoveEvent();
        this.removeMouseDownEvent();
    };

    RotateUI.prototype.onMouseMove = function onMouseMove(e) {
        this.currentRotation = _Calculator.Calc.getRotation({ x: this.centerX, y: this.centerY }, { x: e.clientX, y: e.clientY });

        this.change = this.currentRotation - this.prevRotation;
        this.absChange = this.change < 0 ? this.change * -1 : this.change;

        if (this.absChange < 100) {
            this.emit('rotateChange', {
                prevRotation: this.prevRotation,
                currentRotation: this.currentRotation,
                currentRadian: _Calculator.Calc.toRadians(this.currentRotation),
                change: _Calculator.Calc.toRadians(this.change)
            });
        }

        this.prevRotation = this.currentRotation;
    };

    RotateUI.prototype.onMouseUp = function onMouseUp(e) {
        this.emit('rotateEnd');
        this.addMouseDownEvent();
        this.removeMouseMoveEvent();
    };

    return RotateUI;
}(PIXI.Sprite);

},{"../utils/Calculator":12}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ImageUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Calculator = require('../utils/Calculator');

var _Painter = require('../utils/Painter');

var _HitSide = require('../const/HitSide');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUI = exports.ImageUI = function (_PIXI$Container) {
    _inherits(ImageUI, _PIXI$Container);

    function ImageUI(textureCanvas) {
        _classCallCheck(this, ImageUI);

        var _this = _possibleConstructorReturn(this, _PIXI$Container.call(this));

        _this.initialize(textureCanvas);
        _this.addDebugPoint();
        return _this;
    }

    ImageUI.prototype.initialize = function initialize(textureCanvas) {
        this.textureCanvas = textureCanvas;

        this.image = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(textureCanvas)));
        this.image.x = -this.image.width / 2;
        this.image.y = -this.image.height / 2;
        this.addChild(this.image);

        this.ltp = new PIXI.Sprite();
        this.rtp = new PIXI.Sprite();
        this.rbp = new PIXI.Sprite();
        this.lbp = new PIXI.Sprite();

        this.ltp.x = this.image.x;
        this.ltp.y = this.image.y;
        this.rtp.x = this.image.x + this.image.width;
        this.rtp.y = this.image.y;
        this.rbp.x = this.image.x + this.image.width;
        this.rbp.y = this.image.y + this.image.height;
        this.lbp.x = this.image.x;
        this.lbp.y = this.image.y + this.image.height;

        this.addChild(this.ltp);
        this.addChild(this.rtp);
        this.addChild(this.rbp);
        this.addChild(this.lbp);
    };

    /**
     * TODO 디버그 테스트 용
     */


    ImageUI.prototype.addDebugPoint = function addDebugPoint() {
        this.hitSprite = new PIXI.Sprite();
        this.hitSprite.alpha = 0;
        this.hitColorRect = new PIXI.Graphics();
        this.hitColorRect.beginFill(0xFF3300, 0.3);
        this.hitColorRect.drawRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.hitColorRect.endFill();
        this.addChild(this.hitSprite);
        this.hitSprite.addChild(this.hitColorRect);

        return;

        this.pivotGraphics = new PIXI.Graphics();
        this.pivotGraphics.beginFill(0xFF3300, 0.0);
        this.pivotGraphics.drawRect(-2, -2, 4, 4);
        this.pivotGraphics.endFill();
        this.addChild(this.pivotGraphics);

        var size = 16;
        var half = size / 2;
        var ltd = _Painter.Painter.getRect(size, 0xF9EE00); //노랑
        var rtd = _Painter.Painter.getRect(size, 0xDA9C00); //주황
        var rbd = _Painter.Painter.getRect(size, 0x009CD7); //하늘
        var lbd = _Painter.Painter.getRect(size, 0x1861B1); //파랑
        ltd.x = half;
        ltd.y = half;
        rtd.x = -half;
        rtd.y = half;
        rbd.x = -half;
        rbd.y = -half;
        lbd.x = half;
        lbd.y = -half;
        this.ltp.addChild(ltd);
        this.rtp.addChild(rtd);
        this.rbp.addChild(rbd);
        this.lbp.addChild(lbd);
    };

    ImageUI.prototype.rotatePoints = function rotatePoints() {
        var toBeLt = { x: this.rtp.x, y: this.rtp.y };
        var toBeRt = { x: this.rbp.x, y: this.rbp.y };
        var toBeRb = { x: this.lbp.x, y: this.lbp.y };
        var toBeLb = { x: this.ltp.x, y: this.ltp.y };

        this.ltp.x = toBeLt.x;
        this.ltp.y = toBeLt.y;
        this.rtp.x = toBeRt.x;
        this.rtp.y = toBeRt.y;
        this.rbp.x = toBeRb.x;
        this.rbp.y = toBeRb.y;
        this.lbp.x = toBeLb.x;
        this.lbp.y = toBeLb.y;
    };

    ImageUI.prototype.getMoveUpdatePoints = function getMoveUpdatePoints(dx, dy) {
        var points = this.points;
        points.lt.x += dx;
        points.lt.y += dy;
        points.rt.x += dx;
        points.rt.y += dy;
        points.rb.x += dx;
        points.rb.y += dy;
        points.lb.x += dx;
        points.lb.y += dy;
        return points;
    };

    ImageUI.prototype.fixMove = function fixMove(resizeUI) {
        var stageRotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var rotation = this.rotation - stageRotation;

        // 위로 회전
        if (rotation > 0) {
            if (this.isOutLeftLine(resizeUI.lt) && resizeUI.isLtInsideBounds(this) === false) {
                //console.log('case1-1');
                _Calculator.Calc.moveToCollision(this, resizeUI.lt, this.leftLine);
            }

            if (this.isOutBottomLine(resizeUI.lb) && resizeUI.isLbInsideBounds(this) === false) {
                //console.log('case1-2');
                _Calculator.Calc.moveToCollision(this, resizeUI.lb, this.bottomLine);
            }

            if (this.isOutTopLine(resizeUI.rt) && resizeUI.isRtInsideBounds(this) === false) {
                //console.log('case1-3');
                _Calculator.Calc.moveToCollision(this, resizeUI.rt, this.topLine);
            }

            if (this.isOutRightLine(resizeUI.rb) && resizeUI.isRbInsideBounds(this) === false) {
                //console.log('case1-4');
                _Calculator.Calc.moveToCollision(this, resizeUI.rb, this.rightLine);
            }
        } else {
            if (this.isOutTopLine(resizeUI.lt) && resizeUI.isLtInsideBounds(this) === false) {
                //console.log('case2-1');
                _Calculator.Calc.moveToCollision(this, resizeUI.lt, this.topLine);
            }

            if (this.isOutLeftLine(resizeUI.lb) && resizeUI.isLbInsideBounds(this) === false) {
                //console.log('case2-2');
                _Calculator.Calc.moveToCollision(this, resizeUI.lb, this.leftLine);
            }

            if (this.isOutRightLine(resizeUI.rt) && resizeUI.isRtInsideBounds(this) === false) {
                //console.log('case2-3');
                _Calculator.Calc.moveToCollision(this, resizeUI.rt, this.rightLine);
            }

            if (this.isOutBottomLine(resizeUI.rb) && resizeUI.isRbInsideBounds(this) === false) {
                //console.log('case2-4');
                _Calculator.Calc.moveToCollision(this, resizeUI.rb, this.bottomLine);
            }
        }
    };

    /**
     * 회전 시 이미지가 최대로 커질 사이즈를 구하고
     * 그에 따른 최대 스케일 값을 구합니다.
     */


    ImageUI.prototype.getImageMaxScale = function getImageMaxScale(bounds) {
        var imageRect = _Calculator.Calc.getImageSizeKeepAspectRatio(this, bounds);
        var w = imageRect.width;
        var h = imageRect.height;
        var imageMaxScaleHeight = _Calculator.Calc.getDiagonal(w, h);
        var imageMaxScaleWidth = w * imageMaxScaleHeight / h;
        var imageMaxScaleX = imageMaxScaleWidth / w;
        var imageMaxScaleY = imageMaxScaleHeight / h;
        var imageMaxScale = imageMaxScaleY;
        return imageMaxScale;
    };

    /**
     * 중심점 이동시 위치 보정을 위해 좌상단 좌표를 저장합니다.
     */


    ImageUI.prototype.updatePrevLtPointForPivot = function updatePrevLtPointForPivot() {
        this.prevLtX = this.lt.x;
        this.prevLtY = this.lt.y;
    };

    ImageUI.prototype.setPivot = function setPivot(globalPivot) {
        var localPivot = this.toLocal(globalPivot);
        this.pivot = localPivot;

        // TODO 디버그 테스트 용
        if (this.pivotGraphics) {
            this.pivotGraphics.x = this.pivot.x;
            this.pivotGraphics.y = this.pivot.y;
        }

        var offsetX = this.lt.x - this.prevLtX;
        var offsetY = this.lt.y - this.prevLtY;
        this.x = this.x - offsetX;
        this.y = this.y - offsetY;
        this.updatePrevLtPointForPivot();
    };

    ImageUI.prototype.isOutLeftLine = function isOutLeftLine(point) {
        if (_Calculator.Calc.triangleArea(point, this.lb, this.lt) > 0) return true;
        return false;
    };

    ImageUI.prototype.isOutTopLine = function isOutTopLine(point) {
        if (_Calculator.Calc.triangleArea(point, this.lt, this.rt) > 0) return true;
        return false;
    };

    ImageUI.prototype.isOutRightLine = function isOutRightLine(point) {
        if (_Calculator.Calc.triangleArea(point, this.rt, this.rb) > 0) return true;
        return false;
    };

    ImageUI.prototype.isOutBottomLine = function isOutBottomLine(point) {
        if (_Calculator.Calc.triangleArea(point, this.rb, this.lb) > 0) return true;
        return false;
    };

    ImageUI.prototype.getLeftIntersectionPoint = function getLeftIntersectionPoint(point) {
        return _Calculator.Calc.getShortestDistancePoint(point, this.lb, this.lt);
    };

    ImageUI.prototype.getTopIntersectionPoint = function getTopIntersectionPoint(point) {
        return _Calculator.Calc.getShortestDistancePoint(point, this.lt, this.rt);
    };

    ImageUI.prototype.getRightIntersectionPoint = function getRightIntersectionPoint(point) {
        return _Calculator.Calc.getShortestDistancePoint(point, this.rt, this.rb);
    };

    ImageUI.prototype.getBottomIntersectionPoint = function getBottomIntersectionPoint(point) {
        return _Calculator.Calc.getShortestDistancePoint(point, this.rb, this.lb);
    };

    /**
     * 이미지가 Bounds를 포함하는지 여부
     * @param bounds
     * @returns {boolean}
     */


    ImageUI.prototype.isContainsBounds = function isContainsBounds(bounds) {
        var points = [bounds.lt, bounds.rt, bounds.rb, bounds.lb];

        for (var i = 0; i < points.length; i++) {
            if (_Calculator.Calc.isInsideSquare(points[i], this.lt, this.rt, this.rb, this.lb) === false) return false;
        }
        return true;
    };

    ImageUI.prototype.getHitSide = function getHitSide(bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        var hitSide = _HitSide.HitSide.NONE;

        // 왼쪽 도달
        if (_Calculator.Calc.triangleArea(bounds.lt, lb, lt) > 0 || _Calculator.Calc.triangleArea(bounds.lb, lb, lt) > 0) hitSide = _HitSide.HitSide.LEFT;

        // 오른쪽 도달
        if (_Calculator.Calc.triangleArea(bounds.rt, rt, rb) > 0 || _Calculator.Calc.triangleArea(bounds.rb, rt, rb) > 0) hitSide = _HitSide.HitSide.RIGHT;

        // 상단
        if (_Calculator.Calc.triangleArea(bounds.lt, lt, rt) > 0 || _Calculator.Calc.triangleArea(bounds.rt, lt, rt) > 0) hitSide = hitSide === _HitSide.HitSide.NONE ? _HitSide.HitSide.TOP : hitSide += ',' + _HitSide.HitSide.TOP;

        // 하단
        if (_Calculator.Calc.triangleArea(bounds.rb, rb, lb) > 0 || _Calculator.Calc.triangleArea(bounds.lb, rb, lb) > 0) hitSide = hitSide === _HitSide.HitSide.NONE ? _HitSide.HitSide.BOTTOM : hitSide += ',' + _HitSide.HitSide.BOTTOM;

        return hitSide;
    };

    ImageUI.prototype.getHitPoints = function getHitPoints(bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        var hitPoints = [];

        // 왼쪽 도달
        if (_Calculator.Calc.triangleArea(bounds.lt, lb, lt) > 0) {
            hitPoints.push({ point: bounds.lt, hitSide: _HitSide.HitSide.LEFT });
        }

        if (_Calculator.Calc.triangleArea(bounds.lb, lb, lt) > 0) {
            hitPoints.push({ point: bounds.lb, hitSide: _HitSide.HitSide.LEFT });
        }

        // 오른쪽 도달
        if (_Calculator.Calc.triangleArea(bounds.rt, rt, rb) > 0) {
            hitPoints.push({ point: bounds.rt, hitSide: _HitSide.HitSide.RIGHT });
        }

        if (_Calculator.Calc.triangleArea(bounds.rb, rt, rb) > 0) {
            hitPoints.push({ point: bounds.rb, hitSide: _HitSide.HitSide.RIGHT });
        }

        // 상단
        if (_Calculator.Calc.triangleArea(bounds.lt, lt, rt) > 0) {
            hitPoints.push({ point: bounds.lt, hitSide: _HitSide.HitSide.TOP });
        }

        if (_Calculator.Calc.triangleArea(bounds.rt, lt, rt) > 0) {
            hitPoints.push({ point: bounds.rt, hitSide: _HitSide.HitSide.TOP });
        }

        // 하단
        if (_Calculator.Calc.triangleArea(bounds.rb, rb, lb) > 0) {
            hitPoints.push({ point: bounds.rb, hitSide: _HitSide.HitSide.BOTTOM });
        }

        if (_Calculator.Calc.triangleArea(bounds.lb, rb, lb) > 0) {
            hitPoints.push({ point: bounds.lb, hitSide: _HitSide.HitSide.BOTTOM });
        }

        return hitPoints;
    };

    /**
     * 글로벌 좌표로 포인트를 반환합니다.
     * @returns {{lt: PIXI.Point, rt: PIXI.Point, rb: PIXI.Point, lb: PIXI.Point}}
     */


    ImageUI.prototype.getUpdatePoints = function getUpdatePoints(dx, dy) {
        var p = this.image.points;
        p.lt.x += dx;
        p.lt.y += dy;
        p.rt.x += dx;
        p.rt.y += dy;
        p.rb.x += dx;
        p.rb.y += dy;
        p.lb.x += dx;
        p.lb.y += dy;
        return p;
    };

    ImageUI.prototype.toString = function toString() {
        var str = '' + 'LT[' + _Calculator.Calc.leadingZero(parseInt(this.lt.x)) + ', ' + _Calculator.Calc.leadingZero(parseInt(this.lt.y)) + '] ' + 'RT[' + _Calculator.Calc.leadingZero(parseInt(this.rt.x)) + ', ' + _Calculator.Calc.leadingZero(parseInt(this.rt.y)) + '] ' + 'RB[' + _Calculator.Calc.leadingZero(parseInt(this.rb.x)) + ', ' + _Calculator.Calc.leadingZero(parseInt(this.rb.y)) + '] ' + 'LB[' + _Calculator.Calc.leadingZero(parseInt(this.lb.x)) + ', ' + _Calculator.Calc.leadingZero(parseInt(this.lb.y)) + '] ' + 'XY[' + _Calculator.Calc.leadingZero(parseInt(this.x)) + ', ' + _Calculator.Calc.leadingZero(parseInt(this.y)) + '] ' + 'WH[' + _Calculator.Calc.leadingZero(parseInt(this.width)) + ', ' + _Calculator.Calc.leadingZero(parseInt(this.height)) + '] ' + 'RO[' + _Calculator.Calc.digit(_Calculator.Calc.toDegrees(this.rotation)) + ']';

        //console.log(str);
        return str;
    };

    _createClass(ImageUI, [{
        key: 'points',
        get: function get() {
            return {
                lt: this.lt,
                rt: this.rt,
                rb: this.rb,
                lb: this.lb
            };
        }
    }, {
        key: 'lt',
        get: function get() {
            return this.toGlobal(this.ltp.position);
        }
    }, {
        key: 'rt',
        get: function get() {
            return this.toGlobal(this.rtp.position);
        }
    }, {
        key: 'rb',
        get: function get() {
            return this.toGlobal(this.rbp.position);
        }
    }, {
        key: 'lb',
        get: function get() {
            return this.toGlobal(this.lbp.position);
        }
    }, {
        key: 'leftLine',
        get: function get() {
            return { a: this.lb, b: this.lt };
        }
    }, {
        key: 'topLine',
        get: function get() {
            return { a: this.lt, b: this.rt };
        }
    }, {
        key: 'rightLine',
        get: function get() {
            return { a: this.rt, b: this.rb };
        }
    }, {
        key: 'bottomLine',
        get: function get() {
            return { a: this.lb, b: this.rb };
        }
    }, {
        key: 'left',
        get: function get() {
            return Math.min(this.lt.x, this.lb.x);
        }
    }, {
        key: 'right',
        get: function get() {
            return Math.max(this.rt.x, this.rb.x);
        }
    }, {
        key: 'top',
        get: function get() {
            return Math.min(this.lt.y, this.rt.y);
        }
    }, {
        key: 'bottom',
        get: function get() {
            return Math.max(this.lb.y, this.rb.y);
        }
    }, {
        key: 'size',
        get: function get() {
            return {
                width: this.rt.x - this.lt.x,
                height: this.lb.y - this.lt.y
            };
        }
    }, {
        key: 'bounds',
        get: function get() {
            return {
                x: this.lt.x,
                y: this.lt.y,
                width: this.rt.x - this.lt.x,
                height: this.rb.y - this.rt.y
            };
        }
    }]);

    return ImageUI;
}(PIXI.Container);

},{"../const/HitSide":3,"../utils/Calculator":12,"../utils/Painter":13}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calc = exports.Calc = function () {
    function Calc() {
        _classCallCheck(this, Calc);
    }

    /**
     * 바운드안에 이미지를 넣을 수 있도록 사이즈를 제공합니다.
     * @param imageSize 이미지 넓이와 높이
     * @param boundsSize 바운드 넓이와 높이
     * @returns {{width: number, height: number}}
     */
    Calc.getImageSizeKeepAspectRatio = function getImageSizeKeepAspectRatio(imageSize, boundsSize) {
        var scale = Calc.getBoundsScale(boundsSize, imageSize);
        var minScale = scale.min;
        var resizeWidth = minScale * imageSize.width;
        var resizeHeight = minScale * imageSize.height;
        return { width: resizeWidth, height: resizeHeight };
    };

    /**
     * 바운드와 이미지의 최소, 최대 비율을 구합니다.
     * @param boundsSize 바운드의 넓이와 높이
     * @param imageSize 이미지의 넓이와 높이
     * @returns {*} 최대, 최소 비율
     */


    Calc.getBoundsScale = function getBoundsScale(boundsSize, imageSize) {
        var scaleX = boundsSize.width / imageSize.width;
        var scaleY = boundsSize.height / imageSize.height;

        if (scaleX < scaleY) return { min: scaleX, max: scaleY };else return { max: scaleX, min: scaleY };
    };

    Calc.getRotation = function getRotation(centerPoint, mousePoint) {
        var dx = mousePoint.x - centerPoint.x;
        var dy = mousePoint.y - centerPoint.y;
        var radians = Math.atan2(dy, dx);
        var rotation = Calc.toDegrees(radians);
        //var rotation = Calculator.getDegrees(radians) + Calculator.getDegrees(Math.PI);
        //rotation = (rotation <= 0) ? 180 : -180;
        return rotation;
    };

    /**
     * 대각선 길이를 구합니다.
     * @param width 사각형의 넓이
     * @param height 사각형의 높이
     * @returns {number} 대각선 길이
     */


    Calc.getDiagonal = function getDiagonal(width, height) {
        return Math.sqrt(width * width + height * height);
    };

    /**
     * 새로운 사각형의 넓이 구하기
     * @param originalWidth 기존 사각형 넓이
     * @param originalHeight 기존 사각형 높이
     * @param newHeight 새로운 사각형 높이
     * @returns {number}
     */


    Calc.getRectangleWidth = function getRectangleWidth(originalWidth, originalHeight, newHeight) {
        return originalWidth * newHeight / originalHeight;
    };

    Calc.toRadians = function toRadians(degree) {
        return degree * Calc.DEG_TO_RAD;
    };

    Calc.toDegrees = function toDegrees(radians) {
        return radians * Calc.RAD_TO_DEG;
    };

    /**
     * 삼각형 면적 구하기
     * 삼각형면적공식이 정말 면적을 구하는 경우가 아니라면,
     * 2로 나누는 연산(실수 연산이므로 부하가 있다)은 대체로 필요없는 경우가 대부분이다.
     * 따라서, 2로 나누지 않고 사용하는 경우가 많다.
     * 사실 최적화라고 할 것도 없다.
     * Area(A, B, C) = ((Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax)) / 2
     * 위 공식을 아래와 같이 바꾸면 된다.
     * Area2(A, B, C) = ((Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax))
     *
     * @param p0 삼각형 좌표(Point)
     * @param p1 삼각형 좌표(Point)
     * @param p2 삼각형 좌표(Point)
     * @returns {number} 삼각형의 면적
     */


    Calc.triangleArea = function triangleArea(p0, p1, p2) {
        return p2.x * p1.y - p1.x * p2.y - (p2.x * p0.y - p0.x * p2.y) + (p1.x * p0.y - p0.x * p1.y);
    };

    /**
     * 점 C가 직선 AB 위에 존재하는지 검사
     * 세 점이 한 직선상에 있거나 어느 두 점이 동일한 위치의 점이면,
     * 세 점이 이루는 삼각형의 면적은 0이므로 한 직선상에 있다고 볼 수 있다.
     *
     * OnLineAB(A,B,rb) = (Area2(A,B,rb) = 0)
     *
     * 점 C가 직선 AB로 나뉘는 두 평면 중 어느 쪽 평면에 속하는가?
     * 세 점의 두르기 방향에 따라 면적이 양수 또는 음수가 산출되는 사실을 이용한 것이다.
     * 2차 공간에서 직선 AB는 직선의 진행방향을 기준으로 평면을 왼쪽 평면과 우측 평면으로 분활한다.
     * 이 때 점 C가 왼쪽평면에 속하는지 우측평면에 속하는지 알려면
     * 삼각 ABC의 면적이 양수인지 음수인지 검사하면 된다.
     *
     * isLeftOfAB(A,B,rb) = (Area2(A,B,rb) > 0)
     * isRightOfAB(A,B,rb) = (Area2(A,B,rb) < 0)
     *
     * 삼각형의 면적이 양수이면 점 C는 왼쪽에
     * 삼각형의 면적이 음수이면 점 C는 오른쪽에 있다.
     *
     * 사각형안에 점이 있는지 판단은
     * 사각형의 좌,우,상,하의 선분과 한 점의 이용해 삼각형의 면적을 구해서
     * 모두 0이거나 0보다 작으면 우측, 즉 사각형 안에 점이 있는 것이고
     * 하나라도 양수가 나오면 사각형 안에 점이 없는 것이 된다.
     *
     * @param point 체크하고 싶은 포인트
     * @param lt 사각형 좌상단 포인트
     * @param rt 사각형 우상단 포인트
     * @param rb 사각형 우한단 포인트
     * @param lb 사각형 좌하단 포인트
     * @returns {boolean} 사각형안에 포인트가 있는지 여부
     */


    Calc.isInsideSquare = function isInsideSquare(point, lt, rt, rb, lb) {
        //console.log(
        //    parseInt(lt.x), parseInt(lt.y),
        //    parseInt(rt.x), parseInt(rt.y),
        //    parseInt(rb.x), parseInt(rb.y),
        //    parseInt(lb.x), parseInt(lb.y),
        //    parseInt(point.x), parseInt(point.y)
        //);

        if (Calc.triangleArea(point, lt, rt) > 0 || Calc.triangleArea(point, rt, rb) > 0 || Calc.triangleArea(point, rb, lb) > 0 || Calc.triangleArea(point, lb, lt) > 0) return false;
        return true;
    };

    /**
     * 이미지 좌우상하 어디에 히트 되었는지 체크 하는 샘플 코드입니다.
     */


    Calc.sampleCodeHitTest = function sampleCodeHitTest(point, lt, rt, rb, lb) {
        var result = { isHitLeft: false, isHitRight: false, isHitTop: false, isHitBottom: false };

        if (Calc.triangleArea(point, lt, rt) > 0) result.isHitTop = true;

        if (Calc.triangleArea(point, rt, rb) > 0) result.isHitRight = true;

        if (Calc.triangleArea(point, rb, lb) > 0) result.isHitBottom = true;

        if (Calc.triangleArea(point, lb, lt) > 0) result.isHitLeft = true;

        return result;
    };

    Calc.getPointsByBounds = function getPointsByBounds(bounds) {
        return {
            lt: { x: bounds.x, y: bounds.y },
            rt: { x: bounds.x + bounds.width, y: bounds.y },
            rb: { x: bounds.x + bounds.height, y: bounds.y + bounds.height },
            lb: { x: bounds.x, y: bounds.y + bounds.height }
        };
    };

    Calc.digit = function digit(convertNumber) {
        var digitNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (digitNumber === 0) digitNumber = 1;

        var pow = Math.pow(10, digitNumber);
        return parseInt(convertNumber * pow) / pow;
    };

    Calc.leadingZero = function leadingZero(number) {
        var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

        var zero = '';
        number = number.toString();

        if (number.length < digits) {
            for (var i = 0; i < digits - number.length; i++) {
                zero += '0';
            }
        }
        return zero + number;
    };

    Calc.getOneToOne = function getOneToOne(x, a, b, c, d) {
        return (d - c) / (b - a) * (x - a) + c;
    };

    /**
     * 회전하는 좌표 구하기
     * @param pivot 사각형의 중심점
     * @param point 계산하고 싶은 포인트
     * @param angle2 회전각 degrees
     * @returns {{x: (number|*), y: (number|*)}}
     */


    Calc.getRotationPoint = function getRotationPoint(pivot, point, angle) {
        var diffX = point.x - pivot.x;
        var diffY = point.y - pivot.y;
        var dist = Math.sqrt(diffX * diffX + diffY * diffY);
        var ca = Math.atan2(diffY, diffX) * 180 / Math.PI;
        var na = (ca + angle) % 360 * Math.PI / 180;
        var x = pivot.x + dist * Math.cos(na) + 0.5 | 0;
        var y = pivot.y + dist * Math.sin(na) + 0.5 | 0;
        return { x: x, y: y };
    };

    /**
     * 회전각과 사각형의 포인트를 넘겨주면 회전된 사각형의 포인트를 전달합니다.
     * @param pivot 사각형의 pivot(anchor) 포인트
     * @param rectanglePoints 사각형 좌표 (leftTop, rightTop, rightBottom, leftBottom)
     * @param angle 각도 degress
     * @returns {{lt: ({x, y}|{x: (number|*), y: (number|*)}), rt: ({x, y}|{x: (number|*), y: (number|*)}), rb: ({x, y}|{x: (number|*), y: (number|*)}), lb: ({x, y}|{x: (number|*), y: (number|*)})}}
     */


    Calc.getRotationRectanglePoints = function getRotationRectanglePoints(pivot, rectanglePoints, angle) {
        var lt = Calc.getRotationPoint(pivot, rectanglePoints.lt, angle);
        var rt = Calc.getRotationPoint(pivot, rectanglePoints.rt, angle);
        var rb = Calc.getRotationPoint(pivot, rectanglePoints.rb, angle);
        var lb = Calc.getRotationPoint(pivot, rectanglePoints.lb, angle);
        return { lt: lt, rt: rt, rb: rb, lb: lb };
    };

    /**
     * 사각형의 좌표를 가지고 바운드를 계산합니다.
     * @param rectanglePoints 사각형 좌표 (leftTop, rightTop, rightBottom, leftBottom)
     * @returns {{x: number, y: number, width: number, height: number}}
     */


    Calc.getBoundsRectangle = function getBoundsRectangle(rectanglePoints) {
        var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

        var half = space / 2;
        var x1 = Math.min(rectanglePoints.lt.x, rectanglePoints.rt.x, rectanglePoints.rb.x, rectanglePoints.lb.x);
        var y1 = Math.min(rectanglePoints.lt.y, rectanglePoints.rt.y, rectanglePoints.rb.y, rectanglePoints.lb.y);
        var x2 = Math.max(rectanglePoints.lt.x, rectanglePoints.rt.x, rectanglePoints.rb.x, rectanglePoints.lb.x);
        var y2 = Math.max(rectanglePoints.lt.y, rectanglePoints.rt.y, rectanglePoints.rb.y, rectanglePoints.lb.y);
        return { x: x1 - half, y: y1 - half, width: x2 - x1 + space, height: y2 - y1 + space };
    };

    /**
     * 제곱근
     * @param x
     * @returns {number}
     */


    Calc.sqr = function sqr(x) {
        return x * x;
    };

    /**
     * 거리 구하기
     * @param a
     * @param b
     * @returns {number}
     */


    Calc.dist2 = function dist2(a, b) {
        return Calc.sqr(a.x - b.x) + Calc.sqr(a.y - b.y);
    };

    /**
     * 점과 선에서 가장 가까운 거리가 되는 점을 반환합니다.
     * @param point 점 좌표
     * @param linePointA 라인 좌표
     * @param linePointB 라인 좌표
     * @returns {*} 점과 선에서 가장 가까운 거리가 되는 점의 좌표
     */


    Calc.getShortestDistancePoint = function getShortestDistancePoint(point, linePointA, linePointB) {
        var l2 = Calc.dist2(linePointA, linePointB);
        if (l2 == 0) return linePointA;
        var t = ((point.x - linePointA.x) * (linePointB.x - linePointA.x) + (point.y - linePointA.y) * (linePointB.y - linePointA.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return { x: linePointA.x + t * (linePointB.x - linePointA.x), y: linePointA.y + t * (linePointB.y - linePointA.y) };
    };

    /**
     * 점과 선에서 가장 가까운 점을 반환 받아 거리를 계산해서 반환합니다.
     * @param point
     * @param linePointA
     * @param linePointB
     * @returns {*}
     */


    Calc.distToSegmentSquared = function distToSegmentSquared(point, linePointA, linePointB) {
        var distPoint = Calc.getShortestDistancePoint(point, linePointA, linePointB);
        return Calc.dist2(point, distPoint);
    };

    /**
     * 한 점과 한 라인 사이에 가장 가까운 거리를 구합니다.
     * @param point 점 좌표
     * @param linePointA 라인 좌표
     * @param linePointB 라인 좌표
     * @returns {number} 점과 선의 가장 가까운 거리값
     */


    Calc.distToSegment = function distToSegment(point, linePointA, linePointB) {
        return Math.sqrt(Calc.distToSegmentSquared(point, linePointA, linePointB));
    };

    /**
     * 두 점 사이의 차를 반환합니다.
     * @param point
     * @param distancePoint
     * @returns {{x: number, y: number}}
     */


    Calc.getReturnPoint = function getReturnPoint(point, distancePoint) {
        return { x: point.x - distancePoint.x, y: point.y - distancePoint.y };
    };

    /**
     * 이미지 회전 충돌 시 총돌한 점과 선의 거리를 구하고 거리만큼 이미지를 이동 시킵니다.
     * @param image 회전 이미지
     * @param point 충돌 체크할 점
     * @param linePointA 충돌 체크할 선분의 좌표
     * @param linePointB 충돌 체크할 선분의 좌표
     */


    Calc.moveToCollision = function moveToCollision(image, point, line) {
        var distancePoint = Calc.getShortestDistancePoint(point, line.a, line.b);
        var returnPoint = Calc.getReturnPoint(point, distancePoint);
        image.x = image.x + returnPoint.x;
        image.y = image.y + returnPoint.y;
    };

    /**
     * 객체 회전 각도에 따라 다음 이동할 좌표를 구합니다.
     * @param centerX
     * @param centerY
     * @param distance
     * @param rotation
     * @returns {{x: *, y: *}}
     */


    Calc.getNextMovePosition = function getNextMovePosition(centerX, centerY, radius, rotation) {
        //distance *= 0.4;
        var x = centerX + radius * Math.cos(rotation);
        var y = centerY + radius * Math.sin(rotation);

        //console.log(Calc.trace(x), Calc.trace(y), Calc.trace(distance * Math.cos(rotation)), Calc.trace(distance * Math.sin(rotation)));
        return { x: x, y: y };
    };

    /**
     * 부모 박스가 자식 박스를 포함하고 있는지 여부
     * imageUI에 isContainsBounds 와 같은 함수
     * @param parent
     * @param child
     * @returns {boolean}
     */


    Calc.hasBox = function hasBox(parent, child) {
        var points = [child.lt, child.rt, child.rb, child.lb];

        for (var i = 0; i < points.length; i++) {
            if (Calc.isInsideSquare(points[i], parent.lt, parent.rt, parent.rb, parent.lb) === false) return false;
        }
        return true;
    };

    Calc.trace = function trace(number) {
        return Calc.leadingZero(parseInt(number));
    };

    Calc.copyObject = function copyObject(obj) {
        var copy = {};
        for (var prop in obj) {
            copy[prop] = obj[prop];
        }return copy;
    };

    _createClass(Calc, null, [{
        key: 'DEG_TO_RAD',
        get: function get() {
            if (Calc._DEG_TO_RAD) return Calc._DEG_TO_RAD;

            Calc._DEG_TO_RAD = Math.PI / 180;
            return Calc._DEG_TO_RAD;
        }
    }, {
        key: 'RAD_TO_DEG',
        get: function get() {
            if (Calc._RAD_TO_DEG) return Calc._RAD_TO_DEG;

            Calc._RAD_TO_DEG = 180 / Math.PI;
            return Calc._RAD_TO_DEG;
        }
    }, {
        key: 'DEG180_TO_RAD',
        get: function get() {
            if (Calc._DEG180_TO_RAD) return Calc._DEG180_TO_RAD;

            Calc._DEG180_TO_RAD = 180 * Math.PI / 180;
            return Calc._DEG180_TO_RAD;
        }
    }]);

    return Calc;
}();

},{}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Painter = function () {
    function Painter() {
        _classCallCheck(this, Painter);
    }

    Painter.getRect = function getRect() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xFF3300;
        var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        var half = size / 2;
        var rect = new PIXI.Graphics();
        rect.beginFill(color, alpha);
        rect.drawRect(-half, -half, size, size);
        rect.endFill();
        return rect;
    };

    Painter.getCircle = function getCircle() {
        var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0xFF3300;
        var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        var cicle = new PIXI.Graphics();
        cicle.beginFill(color, alpha);
        cicle.drawRect(0, 0, radius);
        cicle.endFill();
        return cicle;
    };

    Painter.drawBounds = function drawBounds(graphics, bounds) {
        var initClear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var thickness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFF3300;
        var alpha = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.7;

        if (initClear) graphics.clear();

        graphics.lineStyle(thickness, color, alpha);
        graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        graphics.endFill();
    };

    Painter.drawPoints = function drawPoints(graphics, points) {
        var initClear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var thickness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFF3300;
        var alpha = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.7;

        if (initClear) graphics.clear();

        var lt = points.lt;
        var rt = points.rt;
        var rb = points.rb;
        var lb = points.lb;

        graphics.lineStyle(thickness, color, alpha);
        graphics.moveTo(lt.x, lt.y);
        graphics.lineTo(rt.x, rt.y);
        graphics.lineTo(rb.x, rb.y);
        graphics.lineTo(lb.x, lb.y);
        graphics.lineTo(lt.x, lt.y);
        graphics.endFill();
    };

    Painter.drawCircle = function drawCircle(graphics, point) {
        var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0xFF3300;
        var alpha = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.7;
        var initClear = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        if (initClear) graphics.clear();

        graphics.beginFill(color, alpha);
        graphics.drawCircle(point.x, point.y, radius);
        graphics.endFill();
    };

    Painter.drawGrid = function drawGrid(graphics, width, height) {
        var lightLineAlpha = 0.1;
        var heavyLineAlpha = 0.3;

        for (var x = 0.5; x < width; x += 10) {
            if ((x - 0.5) % 50 === 0) graphics.lineStyle(1, 0x999999, heavyLineAlpha);else graphics.lineStyle(1, 0xdddddd, lightLineAlpha);

            graphics.moveTo(x, 0);
            graphics.lineTo(x, height);
        }

        for (var y = 0.5; y < height; y += 10) {
            if ((y - 0.5) % 50 === 0) graphics.lineStyle(1, 0x999999, heavyLineAlpha);else graphics.lineStyle(1, 0xdddddd, lightLineAlpha);

            graphics.moveTo(0, y);
            graphics.lineTo(width, y);
        }

        graphics.endFill();
    };

    Painter.drawDistToSegment = function drawDistToSegment(graphics, point, lineA, lineB, distancePoint) {
        // 1. 라인 그리기
        // 2. distancePoint -> point 연결하기
        // 3. distancePoint -> returnPoint 연결하기

        var radius = 3;
        var lineAlpha = 0.1;
        var shapeAlpha = 0.2;

        // 1
        graphics.beginFill(0x00CC33, shapeAlpha);
        graphics.lineStyle(1, 0x009933, lineAlpha);
        graphics.moveTo(lineA.x, lineA.y);
        graphics.lineTo(lineB.x, lineB.y);
        graphics.drawCircle(lineA.x, lineA.y, radius);
        graphics.drawCircle(lineB.x, lineB.y, radius);

        // 2
        /*graphics.beginFill(0xCCCCFF, shapeAlpha);
        graphics.lineStyle(1, 0x660099, 0.1);
        graphics.moveTo(distancePoint.x, distancePoint.y);
        graphics.lineTo(point.x, point.y);
        graphics.drawCircle(point.x, point.y, radius);
        graphics.beginFill(0xFF3300, 0.4);
        graphics.drawCircle(distancePoint.x, distancePoint.y, radius);*/

        // 3
        graphics.beginFill(0xFFCCFF, shapeAlpha);
        graphics.lineStyle(1, 0xCC99CC, lineAlpha);
        graphics.moveTo(point.x, point.y);
        graphics.lineTo(point.x, distancePoint.y);
        graphics.lineTo(distancePoint.x, distancePoint.y);
        graphics.drawCircle(point.x, point.y, radius);
        graphics.drawCircle(distancePoint.x, distancePoint.y, radius);

        graphics.endFill();
    };

    Painter.drawLine = function drawLine(graphics, p1, p2) {
        var thickness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFF3300;
        var alpha = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

        //graphics.beginFill(color, alpha);
        graphics.lineStyle(thickness, color, alpha);
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
        //graphics.endFill();
    };

    Painter.drawHitSide = function drawHitSide(graphics, point, line) {
        var thickness = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0xFF3300;
        var alpha = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.7;

        graphics.beginFill(color, alpha);
        graphics.lineStyle(thickness, color, alpha);
        graphics.moveTo(point.x, point.y);
        graphics.lineTo(line.a.x, line.a.y);
        graphics.lineTo(line.b.x, line.b.y);
        graphics.endFill();
    };

    return Painter;
}();

exports.default = Painter;

},{}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;
//--Animation methods
//Easing functions adapted from Robert Penner's easing equations
//http://www.robertpenner.com/easing/
var easingEffects = {
    linear: function linear(t) {
        return t;
    },
    easeInQuad: function easeInQuad(t) {
        return t * t;
    },
    easeOutQuad: function easeOutQuad(t) {
        return -1 * t * (t - 2);
    },
    easeInOutQuad: function easeInOutQuad(t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
        return -1 / 2 * (--t * (t - 2) - 1);
    },
    easeInCubic: function easeInCubic(t) {
        return t * t * t;
    },
    easeOutCubic: function easeOutCubic(t) {
        return 1 * ((t = t / 1 - 1) * t * t + 1);
    },
    easeInOutCubic: function easeInOutCubic(t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
        return 1 / 2 * ((t -= 2) * t * t + 2);
    },
    easeInQuart: function easeInQuart(t) {
        return t * t * t * t;
    },
    easeOutQuart: function easeOutQuart(t) {
        return -1 * ((t = t / 1 - 1) * t * t * t - 1);
    },
    easeInOutQuart: function easeInOutQuart(t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
        return -1 / 2 * ((t -= 2) * t * t * t - 2);
    },
    easeInQuint: function easeInQuint(t) {
        return 1 * (t /= 1) * t * t * t * t;
    },
    easeOutQuint: function easeOutQuint(t) {
        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
    },
    easeInOutQuint: function easeInOutQuint(t) {
        if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
        return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
    },
    easeInSine: function easeInSine(t) {
        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
    },
    easeOutSine: function easeOutSine(t) {
        return 1 * Math.sin(t / 1 * (Math.PI / 2));
    },
    easeInOutSine: function easeInOutSine(t) {
        return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
    },
    easeInExpo: function easeInExpo(t) {
        return t === 0 ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
    },
    easeOutExpo: function easeOutExpo(t) {
        return t === 1 ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
    },
    easeInOutExpo: function easeInOutExpo(t) {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
    },
    easeInCirc: function easeInCirc(t) {
        if (t >= 1) return t;
        return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
    },
    easeOutCirc: function easeOutCirc(t) {
        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
    },
    easeInOutCirc: function easeInOutCirc(t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    easeInElastic: function easeInElastic(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) return 0;
        if ((t /= 1) == 1) return 1;
        if (!p) p = 1 * 0.3;
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
    },
    easeOutElastic: function easeOutElastic(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) return 0;
        if ((t /= 1) == 1) return 1;
        if (!p) p = 1 * 0.3;
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
    },
    easeInOutElastic: function easeInOutElastic(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = 1 * (0.3 * 1.5);
        if (a < Math.abs(1)) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    easeInBack: function easeInBack(t) {
        var s = 1.70158;
        return 1 * (t /= 1) * t * ((s + 1) * t - s);
    },
    easeOutBack: function easeOutBack(t) {
        var s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
    },
    easeInOutBack: function easeInOutBack(t) {
        var s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= 1.525) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    easeInBounce: function easeInBounce(t) {
        return 1 - easingEffects.easeOutBounce(1 - t);
    },
    easeOutBounce: function easeOutBounce(t) {
        if ((t /= 1) < 1 / 2.75) {
            return 1 * (7.5625 * t * t);
        } else if (t < 2 / 2.75) {
            return 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
        } else if (t < 2.5 / 2.75) {
            return 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
        } else {
            return 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
        }
    },
    easeInOutBounce: function easeInOutBounce(t) {
        if (t < 1 / 2) return easingEffects.easeInBounce(t * 2) * 0.5;
        return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
    }
};

//Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
var requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60);
    };
}();

var cancelAnimFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (callback) {
        return window.clearTimeout(callback, 1000 / 60);
    };
}();

/**
 * <pre>
 *     cancelAnimFrame(this.animationId);
 *
 *     this.animationId = animationLoop(
 *     this._animationDraw, 60, 'easeInOutBack',
 *     function progressHandler() {},
 *     function completeHandler() {}, this);
 * </pre>
 * @param callback
 * @param totalSteps
 * @param easingString
 * @param onProgress
 * @param onComplete
 * @param chartInstance
 */
var animationLoop = function animationLoop(callback, totalSteps, easingString, onProgress, onComplete, chartInstance) {
    var currentStep = 0,
        easingFunction = easingEffects[easingString] || easingEffects.linear;

    var animationFrame = function animationFrame() {
        currentStep++;
        var stepDecimal = currentStep / totalSteps;
        var easeDecimal = easingFunction(stepDecimal);

        callback.call(chartInstance, easeDecimal, stepDecimal, currentStep);
        onProgress.call(chartInstance, easeDecimal, stepDecimal);
        if (currentStep < totalSteps) {
            try {
                chartInstance.animationFrame = requestAnimFrame(animationFrame);
            } catch (e) {
                console.log(e);
            }
        } else {
            onComplete.apply(chartInstance);
        }
    };
    requestAnimFrame(animationFrame);
};

exports.easingEffects = easingEffects;
exports.requestAnimFrame = requestAnimFrame;
exports.cancelAnimFrame = cancelAnimFrame;
exports.animationLoop = animationLoop;

},{}]},{},[1]);
