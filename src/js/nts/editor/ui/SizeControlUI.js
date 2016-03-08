export class SizeControlUI extends PIXI.Container {
    constructor(canvas, size, min, max, useDimed) {
        super();

        this.canvas = canvas;
        this.size = size;
        this.min = min;
        this.max = max;
        this.useDimed = useDimed;
        this.dimmedAlpha = 0.7;
        this.dimmedColor = 0x000000;
        this.pointRadius = 5;

        this.updateCoordinate();
        this.initialize();
        this.render();
    }


    initialize() {
        this.dimmedTop = new PIXI.Graphics();
        this.dimmedRight = new PIXI.Graphics();
        this.dimmedBottom = new PIXI.Graphics();
        this.dimmedLeft = new PIXI.Graphics();

        this.leftTop = new PIXI.Graphics();
        this.rightTop = new PIXI.Graphics();
        this.rightBottom = new PIXI.Graphics();
        this.leftBottom = new PIXI.Graphics();

        this.addChild(this.dimmedTop);
        this.addChild(this.dimmedRight);
        this.addChild(this.dimmedBottom);
        this.addChild(this.dimmedLeft);

        this.addChild(this.leftTop);
        this.addChild(this.rightTop);
        this.addChild(this.rightBottom);
        this.addChild(this.leftBottom);
    }


    render() {
        this.drawDimmed();
        this.drawPoints();
    }


    drawPoints() {
        this.leftTop.clear();
        this.leftTop.beginFill(0xFF3300);
        this.leftTop.drawCircle(0, 0, this.pointRadius);
        this.leftTop.endFill();

        this.rightTop.clear();
        this.rightTop.beginFill(0xFF3300);
        this.rightTop.drawCircle(0, 0, this.pointRadius);
        this.rightTop.endFill();

        this.rightBottom.clear();
        this.rightBottom.beginFill(0xFF3300);
        this.rightBottom.drawCircle(0, 0, this.pointRadius);
        this.rightBottom.endFill();

        this.leftBottom.clear();
        this.leftBottom.beginFill(0xFF3300);
        this.leftBottom.drawCircle(0, 0, this.pointRadius);
        this.leftBottom.endFill();

        this.leftTop.click = this.onPointDown.bind(this);
        this.rightTop.on('mousedown', this.onPointDown);
        this.rightBottom.on('mousedown', this.onPointDown);
        this.leftBottom.on('mousedown', this.onPointDown);

        this.leftTop.x = this.leftTopX;
        this.leftTop.y = this.leftTopY;
        this.rightTop.x = this.rightTopX;
        this.rightTop.y = this.rightTopY;
        this.rightBottom.x = this.rightBottomX;
        this.rightBottom.y = this.rightBottomY;
        this.leftBottom.x = this.leftBottomX;
        this.leftBottom.y = this.leftBottomY;
    }


    onPointDown(e) {
        console.log(e);
    }


    drawDimmed() {
        this.dimmedTop.clear();
        this.dimmedTop.beginFill(this.dimmedColor, this.dimmedAlpha);
        this.dimmedTop.drawRect(0, 0, this.canvas.width, this.dimmedHeight);
        this.dimmedTop.endFill();

        this.dimmedRight.clear();
        this.dimmedRight.beginFill(this.dimmedColor, this.dimmedAlpha);
        this.dimmedRight.drawRect(0, 0, this.dimmedWidth, canvas.height - this.totalDimmedHeight);
        this.dimmedRight.endFill();

        this.dimmedBottom.clear();
        this.dimmedBottom.beginFill(this.dimmedColor, this.dimmedAlpha);
        this.dimmedBottom.drawRect(0, -this.dimmedHeight, this.canvas.width, this.dimmedHeight);
        this.dimmedBottom.endFill();

        this.dimmedLeft.clear();
        this.dimmedLeft.beginFill(this.dimmedColor, this.dimmedAlpha);
        this.dimmedLeft.drawRect(0, 0, this.totalDimmedWidth / 2, this.canvas.height - this.totalDimmedHeight);
        this.dimmedLeft.endFill();

        this.dimmedRight.x = this.canvas.width - this.dimmedWidth;
        this.dimmedRight.y = this.dimmedHeight;
        this.dimmedBottom.y = this.canvas.height;
        this.dimmedLeft.y = this.dimmedRight.y;
    }


    update() {
        this.drawDimmed();
    }


    updateCoordinate() {
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.halfCanvasWidth = this.canvasWidth / 2;
        this.halfCanvasHeight = this.canvasHeight / 2;

        this.halfSizeWidth = this.size.width / 2;
        this.halfSizeHeight = this.size.height / 2;

        this.totalDimmedWidth = this.canvasWidth - this.size.width;
        this.totalDimmedHeight = this.canvasHeight - this.size.height;

        this.dimmedWidth = this.totalDimmedWidth / 2;
        this.dimmedHeight = this.totalDimmedHeight / 2;

        this.leftTopX = this.dimmedWidth;
        this.leftTopY = this.dimmedHeight;

        this.rightTopX = this.canvasWidth - this.dimmedWidth;
        this.rightTopY = this.leftTopY;

        this.rightBottomX = this.rightTopX;
        this.rightBottomY = this.canvasHeight - this.dimmedHeight;

        this.leftBottomX = this.leftTopX;
        this.leftBottomY = this.rightBottomY;
    }
}