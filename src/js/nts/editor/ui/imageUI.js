export class ImageUI extends PIXI.Container {
    constructor(imageElement) {
        super();
        this.initialize(imageElement);
    }

    initialize(imageElement) {
        this.imageElement = imageElement;

        /*this.base = new PIXI.BaseTexture(this.imageElement);
        this.texture = new PIXI.Texture(this.base);
        this.image = new PIXI.Sprite(this.texture);
        this.image.anchor = {x:0.5, y:0.5};
        this.addChild(this.image);*/

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
    }


    /**
     * 글로벌 좌표로 포인트를 반환합니다.
     * @returns {{lt: PIXI.Point, rt: PIXI.Point, rb: PIXI.Point, lb: PIXI.Point}}
     */
    getGlobalBoundsPoints() {
        return {
            lt: this.toGlobal(this.lt.position),
            rt: this.toGlobal(this.rt.position),
            rb: this.toGlobal(this.rb.position),
            lb: this.toGlobal(this.lb.position)
        }
    }


    getGlobalPoints() {
        
    }

}