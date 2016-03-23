import {Calc} from './../utils/Calculator';


export class ImageVO {
    constructor(imageElement) {
        this.initialize(imageElement);
    }

    initialize(imageElement) {
        this.imageElement = imageElement;
        this._rotateion = 0;
        this._rotationScale = 0;
        this._minRotationRadian = 0;
        this._maxRotationRadian = 0;
        this._limitRotationRadian = 0;
    }


    /**
     * 경계에 맞춰 비율 유지된 이미지 사이즈를 전달합니다.
     * @param bounds
     * @returns {{x, y, width, height}|{width: number, height: number}}
     */
    getSizeByBounds(bounds) {
        return Calc.getImageSizeKeepAspectRatio(this.originalBounds, bounds);
    }


    /**
     * 이미지 넓이와 높이를 주면 이미지 회전 시 최대 넓이와 높이값을 알려줍니다.
     * @param imageWidth
     * @param imageHeight
     * @returns {{width: number, height: number}}
     */
    getImageMaxSize(imageWidth, imageHeight) {
        var height = Calc.getDiagonal(imageWidth, imageHeight);
        var width = Calc.getRectangleWidth(imageWidth, imageHeight, height);
        return {width: width, height: height}
    }


    //////////////////////////////////////////////////////////////////////////
    // ImageElement, originalWidth, originalHeight
    //////////////////////////////////////////////////////////////////////////


    get imageElement() {
        return this._imageElement;
    }

    set imageElement(value) {
        this._imageElement = value;
        this._originalWidth = this._imageElement.width;
        this._originalHeight = this._imageElement.height;
        this.originalBounds.width = this._originalWidth;
        this.originalBounds.height = this._originalHeight;
    }


    //////////////////////////////////////////////////////////////////////////
    // Rotation
    //////////////////////////////////////////////////////////////////////////


    get rotateion() {
        return this._rotateion;
    }

    set rotateion(value) {
        this._rotateion = value;
    }

    get limitRotationRadian() {
        return this._limitRotationRadian;
    }

    set limitRotationRadian(value) {
        this._limitRotationRadian = value;
        this._maxRotationRadian = value;
        this._minRotationRadian = -this._maxRotationRadian;
    }

    /**
     * 0 ~ 1 사이값
     * @returns {number|*}
     */
    get rotationScale() {
        return this._rotationScale;
    }

    set rotationScale(value) {
        this._rotationScale = value;
    }

    get maxRotationRadian() {
        return this._maxRotationRadian;
    }

    set maxRotationRadian(value) {
        this._maxRotationRadian = value;
    }

    get minRotationRadian() {
        return this._minRotationRadian;
    }

    set minRotationRadian(value) {
        this._minRotationRadian = value;
    }


    //////////////////////////////////////////////////////////////////////////
    // originalWidth, originalHeight
    //////////////////////////////////////////////////////////////////////////


    get originalBounds() {
        if(this._originalBounds === undefined || this._originalBounds === null)
            this._originalBounds = {x:0, y:0, width:this._originalWidth, height:this._originalHeight};

        return this._originalBounds;
    }

    get originalWidth() {
        return this._originalWidth;
    }

    set originalWidth(value) {
        this._originalWidth = value;
    }

    get originalHeight() {
        return this._originalHeight;
    }

    set originalHeight(value) {
        this._originalHeight = value;
    }

}
