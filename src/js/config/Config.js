export class Config {
    constructor() {

    }


    static set image(value) {
        console.dir(value);
        this._image = value;
    }

    static get image() {
        return this._image;
    }



    static set imageURL(value) {
        this._imageURL = value;
    }

    static get imageURL() {
        return this._imageURL;
    }


    static set canvas(value) {
        this._canvas = value;
    }

    static get canvas() {
        return this._canvas;
    }

    static set context(value) {
        this._context = value;
    }

    static get context() {
        return this._context;
    }

    static set originalImage(value) {
        this._originalImage = value;
    }

    static get originalImage() {
        return this._originalImage;
    }


    static set stageWidth(value) {
        this._stageWidth = value;
    }

    static get stageHeight() {
        return this._stageWidth;
    }

    static set stageHeight(value) {
        this._stageHeight = value;
    }

    static get stageHeight() {
        return this._stageHeight;
    }




}