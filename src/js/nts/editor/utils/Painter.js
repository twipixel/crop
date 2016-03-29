export class Painter {
    constructor() {

    }


    static getDebugPoint(rect, color = 0xFF3300, alpha = 1) {
        if(!rect)
            rect = {x:-5, y:-5, width:10, height:10};

        var point = new PIXI.Graphics();
        point.beginFill(color, alpha);
        point.drawRect(rect.x, rect.y, rect.width, rect.height);
        point.endFill();
        return point;
    }


    static drawBounds(graphics, bounds, thickness = 1, color = 0xFF3300, alpha = 0.7) {
        graphics.clear();
        graphics.lineStyle(thickness, color, alpha);
        graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
        graphics.endFill();
    }


    static drawGrid(graphics, width, height) {
        graphics.clear();

        var lightLineAlpha = 0.1;
        var heavyLineAlpha = 0.3;

        for (var x = 0.5; x < width; x += 10) {
            if ((x - 0.5) % 50 === 0)
                graphics.lineStyle(1, 0x999999, heavyLineAlpha);
            else
                graphics.lineStyle(1, 0xdddddd, lightLineAlpha);

            graphics.moveTo(x, 0);
            graphics.lineTo(x, height);
        }

        for (var y = 0.5; y < height; y += 10) {
            if ((y - 0.5) % 50 === 0)
                graphics.lineStyle(1, 0x999999, heavyLineAlpha);
            else
                graphics.lineStyle(1, 0xdddddd, lightLineAlpha);

            graphics.moveTo(0, y);
            graphics.lineTo(width, y);
        }

        graphics.endFill();
    }
}