export class SizeControlBar extends PIXI.Sprite {
    constructor() {
        super();

        this.initialize();
        this.addEvent();
        this.render();
    }

    initialize() {
        this.interactive = true;

        this.graphics = new PIXI.Graphics();
        this.addChild(this.graphics);
    }


    addEvent() {
        this.downListener = this.on('mousedown', this.onMouseDown);
    }

    render() {
        this.graphics.clear();
        this.graphics.beginFill(0xFF3300);
        this.graphics.drawRect(0, 0, 40, 4);
        this.graphics.endFill();
    }

    onMouseDown() {
        console.dir(this);
        window.document.addEventListener('mousemove', this.onMouseMove, true);
        window.document.addEventListener('mouseup', this.onMouseUp, true);
    }

    onMouseMove() {
        console.log('onMouseMove');
    }

    onMouseUp() {
        console.log('onMouseUp');
        window.document.removeEventListener('mousemove', this.onMouseMove, true);
        window.document.removeEventListener('mouseup', this.onMouseUp, true);
    }

}