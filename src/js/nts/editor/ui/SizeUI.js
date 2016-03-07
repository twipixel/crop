export class SizeUI extends PIXI.Container {
    constructor(canvas, size, min, max, useDimed) {
        super();

        this.canvas = canvas;
        this.size = size;
        this.min = min;
        this.max = max;
        this.useDimed = useDimed;

        this.updateCoordinate();
        this.initialize();
        this.render();
    }


    initialize() {
        console.log('SizeUI.intialize()');

        this.dimedTop = new PIXI.Graphics();
        this.addChild(this.dimedTop);

    }

    render() {
        var dimedWidth = this.canvas.width - this.size.width;
        var dimedHeight = this.canvas.height - this.size.height;

        this.dimedTop.clear();
        this.dimedTop.beginFill(0x000000, 0.5);
        this.dimedTop.drawRect(0, 0, this.size.width, dimedHeight / 2);
        this.dimedTop.endFill();
    }


    resizeDimed() {
        this.dimedTop.x = this.canv
    }

    update() {
        this.resizeDimed();
    }

    updateCoordinate() {
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.halfCanvasWidth = this.canvasWidth / 2;
        this.halfCanvasHeight = this.canvasHeight / 2;

        this.halfWidth = this.size.width / 2;
        this.halfHeight = this.size.height / 2;
    }
}