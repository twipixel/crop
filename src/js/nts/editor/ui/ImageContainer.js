export class ImageContainer extends PIXI.Container {
    constructor(imageElement) {
        super();

        this.imageElement = imageElement;

        this.initialize();
    }

    initialize() {
        this.anchor = new PIXI.Point(0.5, 0.5);

        this.base = new PIXI.BaseTexture(this.imageElement);
        this.texture = new PIXI.Texture(this.base);
        this.image = new PIXI.Sprite(this.texture);
        this.addChild(this.image);
    }
}