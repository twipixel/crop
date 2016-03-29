export class Painter {
    constructor() {

    }


    static getRect(size = 4, color = 0xFF3300, alpha = 1) {
        var half = size / 2;
        var rect = new PIXI.Graphics();
        rect.beginFill(color, alpha);
        rect.drawRect(-half, -half, size, size);
        rect.endFill();
        return rect;
    }

    static getCircle(radius = 2, color = 0xFF3300, alpha = 1) {
        var cicle = new PIXI.Graphics();
        cicle.beginFill(color, alpha);
        cicle.drawRect(0, 0, radius);
        cicle.endFill();
        return cicle;
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

    static drawDistToSegment(graphics, point, lineA, lineB, distancePoint) {
        // 1. 라인 그리기
        // 2. distancePoint -> point 연결하기
        // 3. distancePoint -> returnPoint 연결하기

        var radius = 3;
        var lineAlpha = 0.2;
        var shapeAlpha = 0.2;

        // 1
        graphics.beginFill(0xCCFFCC, shapeAlpha);
        graphics.lineStyle(1, 0x66FF00, lineAlpha);
        graphics.moveTo(lineA.x, lineA.y);
        graphics.lineTo(lineB.x, lineB.y);
        graphics.drawCircle(lineA.x, lineA.y, radius);
        graphics.drawCircle(lineB.x, lineB.y, radius);

        // 2
        graphics.beginFill(0xCCCCFF, shapeAlpha);
        graphics.lineStyle(1, 0x9999CC, lineAlpha);
        graphics.moveTo(distancePoint.x, distancePoint.y);
        graphics.lineTo(point.x, point.y);
        graphics.drawCircle(point.x, point.y, radius);
        graphics.beginFill(0xFF3300, 1);
        graphics.drawCircle(distancePoint.x, distancePoint.y, radius);

        // 3
        /*graphics.beginFill(0xFF0066, shapeAlpha);
        graphics.lineStyle(1, 0xFF3399, lineAlpha);
        graphics.moveTo(point.x, point.y);
        graphics.lineTo(point.x, distancePoint.y);
        graphics.lineTo(distancePoint.x, distancePoint.y);
        graphics.drawCircle(point.x, point.y, radius);
        graphics.drawCircle(distancePoint.x, distancePoint.y, radius);*/

        graphics.endFill();
    }

    static drawLine(graphics, p1, p2, thickness = 1, color = 0xFF3300, alpha = 1) {
        graphics.lineStyle(thickness, color, alpha);
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
        graphics.endFill();
    }
}