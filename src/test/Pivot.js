/**
 * http://jsfiddle.net/Ym3nX/
 * @type {PIXI.Stage|{get}}
 */

var stage = new PIXI.Stage();
var renderer = new PIXI.autoDetectRenderer(1024, 768, null, true, true);
//var renderer = new PIXI.CanvasRenderer(1024, 768, null, true, true);
document.body.appendChild(renderer.view);

var imgUrl = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Ski_trail_rating_symbol-blue_square.svg/600px-Ski_trail_rating_symbol-blue_square.svg.png';

var graphics = new PIXI.Graphics();
stage.addChild(graphics);

var sprite = PIXI.Sprite.fromImage(imgUrl);
//var sprite = PIXI.Container();
var spriteGraphics = new PIXI.Graphics();
sprite.addChild(spriteGraphics);

spriteGraphics.beginFill(0xFF3300);
spriteGraphics.drawRect(0, 0, 300, 300);
spriteGraphics.endFill();

//sprite.position.set(0, 0);
sprite.pivot.set(150, 150);

sprite.x = 0;
sprite.y = 0;
sprite.width = 300;
sprite.height = 300;


stage.addChild(sprite);


requestAnimFrame(animate);
function animate() {
    requestAnimFrame(animate);

    sprite.rotation += 0.01;

    renderer.render(stage);
}




var w = 800;
var h = 600;
var lightLineAlpha = 0.1;
var heavyLineAlpha = 0.3;

for (var x = 0.5; x < w; x += 10) {
    if ((x - 0.5) % 50 === 0)
        graphics.lineStyle(1, 0x999999, heavyLineAlpha);
    else
        graphics.lineStyle(1, 0xdddddd, lightLineAlpha);

    graphics.moveTo(x, 0);
    graphics.lineTo(x, h);
}

for (var y = 0.5; y < h; y += 10) {
    if ((y - 0.5) % 50 === 0)
        graphics.lineStyle(1, 0x999999, heavyLineAlpha);
    else
        graphics.lineStyle(1, 0xdddddd, lightLineAlpha);

    graphics.moveTo(0, y);
    graphics.lineTo(w, y);
}

graphics.endFill();