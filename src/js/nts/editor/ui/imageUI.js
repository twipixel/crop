export class ImageUI extends PIXI.Container {
    constructor(imageElement) {
        super();
        this.initialize(imageElement);
    }

    initialize(imageElement) {
        this.imageElement = imageElement;
        this.image = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(imageElement)));
        this.image.x = -this.image.width / 2;
        this.image.y = -this.image.height / 2;
        this.addChild(this.image);

        this.lt = new PIXI.Sprite();
        this.rt = new PIXI.Sprite();
        this.rb = new PIXI.Sprite();
        this.lb = new PIXI.Sprite();
        this.lt.x = this.image.x;
        this.lt.y = this.image.y;
        this.rt.x = this.image.x + this.image.width;
        this.rt.y = this.image.y;
        this.rb.x = this.image.x + this.image.width;
        this.rb.y = this.image.y + this.image.height;
        this.lb.x = this.image.x;
        this.lb.y = this.image.y + this.image.height;
        this.addChild(this.lt);
        this.addChild(this.rt);
        this.addChild(this.rb);
        this.addChild(this.lb);


        console.log(this.lt.x, this.lt.y, this.rt.x, this.rt.y, this.rb.x, this.rb.y, this.lb.x, this.lb.y);
    }

}