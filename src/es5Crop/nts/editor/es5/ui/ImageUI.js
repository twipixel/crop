(function () {
    'use strict';

    var utils = usenamespace('editor.es5.utils');
    var consts = usenamespace('editor.es5.consts');

    function ImageUI (textureCanvas, imageElement) {
        Object.defineProperty(this, 'lt', {get: function () {return this.toGlobal(this.ltp.position);}});
        Object.defineProperty(this, 'rt', {get: function () {return this.toGlobal(this.rtp.position);}});
        Object.defineProperty(this, 'rb', {get: function () {return this.toGlobal(this.rbp.position);}});
        Object.defineProperty(this, 'lb', {get: function () {return this.toGlobal(this.lbp.position);}});
        Object.defineProperty(this, 'leftLine', {get: function () {return {a: this.lb, b: this.lt};}});
        Object.defineProperty(this, 'topLine', {get: function () {return {a: this.lt, b: this.rt};}});
        Object.defineProperty(this, 'rightLine', {get: function () {return {a: this.rt, b: this.rb};}});
        Object.defineProperty(this, 'bottomLine', {get: function () {return {a: this.lb, b: this.rb};}});
        Object.defineProperty(this, 'left', {get: function () {return Math.min(this.lt.x, this.lb.x);}});
        Object.defineProperty(this, 'right', {get: function () {return Math.max(this.rt.x, this.rb.x);}});
        Object.defineProperty(this, 'top', {get: function () {return Math.min(this.lt.y, this.rt.y);}});
        Object.defineProperty(this, 'bottom', {get: function () {return Math.max(this.lb.y, this.rb.y);}});
        Object.defineProperty(this, 'size', {get: function () {return {width: this.rt.x - this.lt.x, height: this.lb.y - this.lt.y};}});
        Object.defineProperty(this, 'bounds', {get: function () {return {x: this.lt.x, y: this.lt.y, width: this.rt.x - this.lt.x, height: this.rb.y - this.rt.y};}});
        Object.defineProperty(this, 'points', {get: function () {return {lt: this.lt, rt: this.rt, rb: this.rb, lb: this.lb};}});
        Object.defineProperty(this, 'scaleX', {get: function () {return this.width / this.originalWidth;}});
        Object.defineProperty(this, 'scaleY', {get: function () {return this.height / this.originalHeight;}});

        PIXI.Container.call(this);
        this.initialize(textureCanvas, imageElement);
        this.addDebugPoint();
    };

    var p = ImageUI.prototype = Object.create(PIXI.Container.prototype);

    p.initialize = function (textureCanvas, imageElement) {
        this.imageElement = imageElement;
        this.textureCanvas = textureCanvas;

        // TODO 캔버스로 변경 시 오리지날 알아오기
        if(imageElement) {
            console.log('ImageUI Use ImageElement');
            this.originalWidth = imageElement.width;
            this.originalHeight = imageElement.height;
            this.image = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(imageElement)));
        } else {
            console.log('ImageUI Use Canvas');
            this.originalWidth = textureCanvas.width;
            this.originalHeight = textureCanvas.height;
            this.image = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(textureCanvas)));
        }

        this.image.x = -this.image.width / 2;
        this.image.y = -this.image.height / 2;
        //this.image.alpha = 0.2;
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

        /*this.rtp.x = this.width;
         this.rbp.x = this.width;
         this.rbp.y = this.height;
         this.lbp.y = this.height;*/

        this.addChild(this.ltp);
        this.addChild(this.rtp);
        this.addChild(this.rbp);
        this.addChild(this.lbp);
    };

    /**
     * TODO 디버그 테스트 용
     */
    p.addDebugPoint = function () {
        this.pivotGraphics = new PIXI.Graphics();
        this.pivotGraphics.beginFill(0xFF3300, 0.3);
        this.pivotGraphics.drawRect(-2, -2, 4, 4);
        this.pivotGraphics.endFill();
        this.addChild(this.pivotGraphics);

        var size = 8;
        var half = size / 2;
        var ltd = utils.Painter.getRect(size, 0xF9EE00, 1);  //노랑
        var rtd = utils.Painter.getRect(size, 0xDA9C00, 1);  //주황
        var rbd = utils.Painter.getRect(size, 0x009CD7, 1);  //하늘
        var lbd = utils.Painter.getRect(size, 0x1861B1, 1);  //파랑
        // 디버그 포인트를 이미지 안쪽으로 안 찍으면 회전 시 제대로 충돌 검사를 못 합니다.
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

    p.rotatePoints = function () {
        var toBeLt = {x: this.rtp.x, y: this.rtp.y};
        var toBeRt = {x: this.rbp.x, y: this.rbp.y};
        var toBeRb = {x: this.lbp.x, y: this.lbp.y};
        var toBeLb = {x: this.ltp.x, y: this.ltp.y};

        this.ltp.x = toBeLt.x;
        this.ltp.y = toBeLt.y;
        this.rtp.x = toBeRt.x;
        this.rtp.y = toBeRt.y;
        this.rbp.x = toBeRb.x;
        this.rbp.y = toBeRb.y;
        this.lbp.x = toBeLb.x;
        this.lbp.y = toBeLb.y;
    };

    p.getMoveUpdatePoints = function (dx, dy) {
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

    p.fixMove = function (resizeUI, stageRotation) {
        stageRotation = stageRotation || 0;

        var rotation = this.rotation - stageRotation;

        // 위로 회전
        if (rotation > 0) {
            if (this.isOutLeftLine(resizeUI.lt) &&
                resizeUI.isLtInsideBounds(this) === false) {
                //console.log('case1-1');
                utils.Calc.moveToCollision(this, resizeUI.lt, this.leftLine);
            }

            if (this.isOutBottomLine(resizeUI.lb) &&
                resizeUI.isLbInsideBounds(this) === false) {
                //console.log('case1-2');
                utils.Calc.moveToCollision(this, resizeUI.lb, this.bottomLine);
            }

            if (this.isOutTopLine(resizeUI.rt) &&
                resizeUI.isRtInsideBounds(this) === false) {
                //console.log('case1-3');
                utils.Calc.moveToCollision(this, resizeUI.rt, this.topLine);
            }

            if (this.isOutRightLine(resizeUI.rb) &&
                resizeUI.isRbInsideBounds(this) === false) {
                //console.log('case1-4');
                utils.Calc.moveToCollision(this, resizeUI.rb, this.rightLine);
            }

        } else {
            if (this.isOutTopLine(resizeUI.lt) &&
                resizeUI.isLtInsideBounds(this) === false) {
                //console.log('case2-1');
                utils.Calc.moveToCollision(this, resizeUI.lt, this.topLine);
            }

            if (this.isOutLeftLine(resizeUI.lb) &&
                resizeUI.isLbInsideBounds(this) === false) {
                //console.log('case2-2');
                utils.Calc.moveToCollision(this, resizeUI.lb, this.leftLine);
            }

            if (this.isOutRightLine(resizeUI.rt) &&
                resizeUI.isRtInsideBounds(this) === false) {
                //console.log('case2-3');
                utils.Calc.moveToCollision(this, resizeUI.rt, this.rightLine);
            }

            if (this.isOutBottomLine(resizeUI.rb) &&
                resizeUI.isRbInsideBounds(this) === false) {
                //console.log('case2-4');
                utils.Calc.moveToCollision(this, resizeUI.rb, this.bottomLine);
            }

        }
    };

    /**
     * 중심점 이동시 위치 보정을 위해 좌상단 좌표를 저장합니다.
     */
    p.updatePrevLtPointForPivot = function () {
        this.prevLtX = this.lt.x;
        this.prevLtY = this.lt.y;
    };

    p.setPivot = function (globalPivot) {
        var localPivot = this.toLocal(globalPivot);
        this.pivot = localPivot;
        this.updateDebugPivotGraphic();
        var offsetX = this.lt.x - this.prevLtX;
        var offsetY = this.lt.y - this.prevLtY;
        this.x = this.x - offsetX;
        this.y = this.y - offsetY;
        this.updatePrevLtPointForPivot();
    };

    p.updateDebugPivotGraphic = function () {
        if (this.pivotGraphics) {
            this.pivotGraphics.x = this.pivot.x;
            this.pivotGraphics.y = this.pivot.y;
        }
    };

    p.isOutLeftLine = function (point) {
        if (utils.Calc.triangleArea(point, this.lb, this.lt) > 0)
            return true;
        return false;
    };

    p.isOutTopLine = function (point) {
        if (utils.Calc.triangleArea(point, this.lt, this.rt) > 0)
            return true;
        return false;
    };

    p.isOutRightLine = function (point) {
        if (utils.Calc.triangleArea(point, this.rt, this.rb) > 0)
            return true;
        return false;
    };

    p.isOutBottomLine = function (point) {
        if (utils.Calc.triangleArea(point, this.rb, this.lb) > 0)
            return true;
        return false;
    };

    p.getLeftIntersectionPoint = function (point) {
        return utils.Calc.getShortestDistancePoint(point, this.lb, this.lt);
    };

    p.getTopIntersectionPoint = function (point) {
        return utils.Calc.getShortestDistancePoint(point, this.lt, this.rt);
    };

    p.getRightIntersectionPoint = function (point) {
        return utils.Calc.getShortestDistancePoint(point, this.rt, this.rb);
    };

    p.getBottomIntersectionPoint = function (point) {
        return utils.Calc.getShortestDistancePoint(point, this.rb, this.lb);
    };


    /**
     * 이미지가 Bounds를 포함하는지 여부
     * @param bounds
     * @returns {boolean}
     */
    p.isContainsBounds = function (bounds) {
        var points = [bounds.lt, bounds.rt, bounds.rb, bounds.lb];

        for (var i = 0; i < points.length; i++) {
            if (utils.Calc.isInsideSquare(points[i], this.lt, this.rt, this.rb, this.lb) === false)
                return false;
        }
        return true;
    };

    p.getHitSide = function (bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        var hitSide = consts.HitSide.NONE;

        // 왼쪽 도달
        if (utils.Calc.triangleArea(bounds.lt, lb, lt) > 0 || utils.Calc.triangleArea(bounds.lb, lb, lt) > 0)
            hitSide = consts.HitSide.LEFT;

        // 오른쪽 도달
        if (utils.Calc.triangleArea(bounds.rt, rt, rb) > 0 || utils.Calc.triangleArea(bounds.rb, rt, rb) > 0)
            hitSide = consts.HitSide.RIGHT;

        // 상단
        if (utils.Calc.triangleArea(bounds.lt, lt, rt) > 0 || utils.Calc.triangleArea(bounds.rt, lt, rt) > 0)
            hitSide = (hitSide === consts.HitSide.NONE) ? consts.HitSide.TOP : hitSide += '-' + consts.HitSide.TOP;

        // 하단
        if (utils.Calc.triangleArea(bounds.rb, rb, lb) > 0 || utils.Calc.triangleArea(bounds.lb, rb, lb) > 0)
            hitSide = (hitSide === consts.HitSide.NONE) ? consts.HitSide.BOTTOM : hitSide += '-' + consts.HitSide.BOTTOM;

        return hitSide;
    };

    p.getHitPoints = function (bounds) {
        var lt = this.lt;
        var rt = this.rt;
        var rb = this.rb;
        var lb = this.lb;

        var hitPoints = [];

        // 왼쪽 도달
        if (utils.Calc.triangleArea(bounds.lt, lb, lt) > 0) {
            hitPoints.push({point: bounds.lt, hitSide: consts.HitSide.LEFT});
        }

        if (utils.Calc.triangleArea(bounds.lb, lb, lt) > 0) {
            hitPoints.push({point: bounds.lb, hitSide: consts.HitSide.LEFT});
        }

        // 오른쪽 도달
        if (utils.Calc.triangleArea(bounds.rt, rt, rb) > 0) {
            hitPoints.push({point: bounds.rt, hitSide: consts.HitSide.RIGHT});
        }

        if (utils.Calc.triangleArea(bounds.rb, rt, rb) > 0) {
            hitPoints.push({point: bounds.rb, hitSide: consts.HitSide.RIGHT});
        }

        // 상단
        if (utils.Calc.triangleArea(bounds.lt, lt, rt) > 0) {
            hitPoints.push({point: bounds.lt, hitSide: consts.HitSide.TOP});
        }

        if (utils.Calc.triangleArea(bounds.rt, lt, rt) > 0) {
            hitPoints.push({point: bounds.rt, hitSide: consts.HitSide.TOP});
        }

        // 하단
        if (utils.Calc.triangleArea(bounds.rb, rb, lb) > 0) {
            hitPoints.push({point: bounds.rb, hitSide: consts.HitSide.BOTTOM});
        }

        if (utils.Calc.triangleArea(bounds.lb, rb, lb) > 0) {
            hitPoints.push({point: bounds.lb, hitSide: consts.HitSide.BOTTOM});
        }

        return hitPoints;
    };

    p.getUpdatePoints = function (dx, dy) {
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

    p.toString = function () {
        var globalPivot = this.toGlobal(this.pivotGraphics.position);
        console.log(globalPivot);

        var str = '' +
            'LT[' + utils.Calc.leadingZero(parseInt(this.lt.x)) + ', ' + utils.Calc.leadingZero(parseInt(this.lt.y)) + '] ' +
            'RT[' + utils.Calc.leadingZero(parseInt(this.rt.x)) + ', ' + utils.Calc.leadingZero(parseInt(this.rt.y)) + '] ' +
            'RB[' + utils.Calc.leadingZero(parseInt(this.rb.x)) + ', ' + utils.Calc.leadingZero(parseInt(this.rb.y)) + '] ' +
            'LB[' + utils.Calc.leadingZero(parseInt(this.lb.x)) + ', ' + utils.Calc.leadingZero(parseInt(this.lb.y)) + '] ' +
            'XY[' + utils.Calc.leadingZero(parseInt(this.x)) + ', ' + utils.Calc.leadingZero(parseInt(this.y)) + '] ' +
            'WH[' + utils.Calc.leadingZero(parseInt(this.width)) + ', ' + utils.Calc.leadingZero(parseInt(this.height)) + '] ' +
            'Scale[' + this.scale.x + ', ' + this.scale.y + '] ' +
            'Pivot Local[' + this.pivot.x+ ', ' + this.pivot.y + '] ' +
            'Pivot Global[' + globalPivot.x + ', ' + globalPivot.y + '] ' +
            'Rotation[' + utils.Calc.digit(utils.Calc.toDegrees(this.rotation)) + ']';

        //console.log(str);
        return str;
    };


    //////////////////////////////////////////////////////////////////////
    // Getter & Setter
    //////////////////////////////////////////////////////////////////////

    // TODO getter, setter 를 함수로 빼니 오류가 있어 보류 합니다.

    /*p.getLt = function () {
        return this.toGlobal(this.ltp.position);
    };

    p.getRt = function () {
        return this.toGlobal(this.rtp.position);
    };

    p.getRb = function () {
        return this.toGlobal(this.rbp.position);
    };

    p.getLb = function () {
        return this.toGlobal(this.lbp.position);
    };

    p.getLeftLine = function () {
        return {a: this.lb, b: this.lt};
    };

    p.getTopLine = function () {
        return {a: this.lt, b: this.rt};
    };

    p.getRightLine = function () {
        return {a: this.rt, b: this.rb};
    };
    p.getBottomLine = function () {
        return {a: this.lb, b: this.rb};
    };

    p.getLeft = function () {
        return Math.min(this.lt.x, this.lb.x);
    };

    p.getRight = function () {
        return Math.max(this.rt.x, this.rb.x);
    };

    p.getTop = function () {
        return Math.min(this.lt.y, this.rt.y);
    };
    p.getBottom = function () {
        return Math.max(this.lb.y, this.rb.y);
    };

    p.getSize = function () {
        return {
            width: this.rt.x - this.lt.x,
            height: this.lb.y - this.lt.y
        };
    };
    p.getBounds = function () {
        return {
            x: this.lt.x,
            y: this.lt.y,
            width: this.rt.x - this.lt.x,
            height: this.rb.y - this.rt.y
        };
    };
    p.getPoints = function () {
        return {
            lt: this.lt,
            rt: this.rt,
            rb: this.rb,
            lb: this.lb
        };
    };*/

    usenamespace('editor.es5.ui').ImageUI = ImageUI;
})();



