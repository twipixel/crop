export class Calculator {
    constructor() {

    }

    /**
     * 비율 유지되는 리사이즈 이미지를 구합니다.
     *
     * @param resizeWidth 리사이즈 되는 넓이
     * @param originalImageWidth 원본 이미지 넓이
     * @param resizeHeight 리사이즈 되는 높이
     * @param originalImageHeight 원본 이미지 높이
     * @returns {{width: number, height: number}}
     */
    static getImageSizeKeepAspectRatio(resizeWidth, originalImageWidth, resizeHeight, originalImageHeight) {
        var scale = Calculator.getResizeMinScaleKeepAspectRatio(resizeWidth, originalImageWidth, resizeHeight, originalImageHeight);
        var resizeWidth = scale * originalImageWidth;
        var resizeHeight = scale * originalImageHeight;
        return {width: resizeWidth, height: resizeHeight};
    }

    /**
     * 리사이즈 되는 이미지의 가로 / 세로 비율 중 작은 비율을 가져 옵니다.
     *
     * @param resizeWidth 리사이즈 되는 넓이
     * @param originalImageWidth 원본 이미지 넓이
     * @param resizeHeight 리사이즈 되는 높이
     * @param originalImageHeight 원본 이미지 높이
     * @returns {number} 리사이즈 되는 비율 중 작은 비율 (Ratio)
     */
    static getResizeMinScaleKeepAspectRatio(resizeWidth, originalImageWidth, resizeHeight, originalImageHeight) {
        var widthRatio = resizeWidth / originalImageWidth;
        var heightRatio = resizeHeight / originalImageHeight;
        return Math.min(widthRatio, heightRatio);
    }
}