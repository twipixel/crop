export class Calculator {
    constructor() {

    }

    static get PI() {
        return 3.14159265358979323846;
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

    static getRotation(centerPoint, mousePoint) {
        var dx = mousePonit.x - centerPoint.x;
        var dy = mousePoint.y - centerPoint.y;
        var radians = Math.atan2(dy, dx);
        var rotation = Calculator.getDegrees(radians);
        return rotation;
    }

    static getRadians(degree) {
        return degree * (Calculator.PI / 180);
    }

    static getDegrees(radians) {
        return radians * (180 / Calculator.PI);
    }

    /**
     * 삼각형 면적 구하기
     * 삼각형면적공식이 정말 면적을 구하는 경우가 아니라면,
     * 2로 나누는 연산(실수 연산이므로 부하가 있다)은 대체로 필요없는 경우가 대부분이다.
     * 따라서, 2로 나누지 않고 사용하는 경우가 많다.
     * 사실 최적화라고 할 것도 없다.
     * Area(A, B, C) = ((Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax)) / 2
     * 위 공식을 아래와 같이 바꾸면 된다.
     * Area2(A, B, C) = ((Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax))
     *
     * @param A 삼각형 좌표(Point)
     * @param B 삼각형 좌표(Point)
     * @param C 삼각형 좌표(Point)
     * @returns {number} 삼각형의 면적
     */
    static triangleArea(A, B, C) {
        return (C.x * B.y - B.x * C.y) - (C.x * A.y - A.x * C.y) + (B.x * A.y - A.x * B.y);
    }

    /**
     * 점 C가 직선 AB 위에 존재하는지 검사
     * 세 점이 한 직선상에 있거나 어느 두 점이 동일한 위치의 점이면,
     * 세 점이 이루는 삼각형의 면적은 0이므로 한 직선상에 있다고 볼 수 있다.
     *
     * OnLineAB(A,B,C) = (Area2(A,B,C) = 0)
     *
     * 점 C가 직선 AB로 나뉘는 두 평면 중 어느 쪽 평면에 속하는가?
     * 세 점의 두르기 방향에 따라 면적이 양수 또는 음수가 산출되는 사실을 이용한 것이다.
     * 2차 공간에서 직선 AB는 직선의 진행방향을 기준으로 평면을 왼쪽 평면과 우측 평면으로 분활한다.
     * 이 때 점 C가 왼쪽평면에 속하는지 우측평면에 속하는지 알려면
     * 삼각 ABC의 면적이 양수인지 음수인지 검사하면 된다.
     *
     * isLeftOfAB(A,B,C) = (Area2(A,B,C) > 0)
     * isRightOfAB(A,B,C) = (Area2(A,B,C) < 0)
     *
     * 삼각형의 면적이 양수이면 점 C는 왼쪽에
     * 삼각형의 면적이 음수이면 점 C는 오른쪽에 있다.
     *
     * 사각형안에 점이 있는지 판단은
     * 사각형의 좌,우,상,하의 선분과 한 점의 이용해 삼각형의 면적을 구해서
     * 모두 0이거나 0보다 작으면 우측, 즉 사각형 안에 점이 있는 것이고
     * 하나라도 양수가 나오면 사각형 안에 점이 없는 것이 된다.
     *
     * @param A 사각형 좌상단 포인트
     * @param B 사각형 우상단 포인트
     * @param C 사각형 우한단 포인트
     * @param D 사각형 좌하단 포인트
     * @param P 체크하고 싶은 포인트
     * @returns {boolean} 사각형안에 포인트가 있는지 여부
     */
    static isInsideSquare(A, B, C, D, P) {
        if (triangleArea(A, B, P) > 0 || triangleArea(B, C, P) > 0 || triangleArea(C, D, P) > 0 || triangleArea(D, A, P) > 0)
            return false;
        return true;
    }
}