export class Config {
    constructor() {

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



}