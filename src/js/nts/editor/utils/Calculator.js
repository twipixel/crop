export class Calculator {
    constructor() {

    }

    static get DEG_TO_RAD() {
        if (Calculator._DEG_TO_RAD)
            return Calculator._DEG_TO_RAD;

        Calculator._DEG_TO_RAD = Math.PI / 180;
        return Calculator._DEG_TO_RAD;
    }

    static get RAD_TO_DEG() {
        if (Calculator._RAD_TO_DEG)
            return Calculator._RAD_TO_DEG;

        Calculator._RAD_TO_DEG = 180 / Math.PI;
        return Calculator._RAD_TO_DEG;
    }

    static get DEG180_TO_RAD() {
        if (Calculator._DEG180_TO_RAD)
            return Calculator._DEG180_TO_RAD;

        Calculator._DEG180_TO_RAD = 180 * Math.PI / 180;
        return Calculator._DEG180_TO_RAD;
    }


    /**
     * 원본 비율을 유지한 리사이즈 정보를 구합니다.
     * @param originalRect 원본 이미지 정보
     * @param resizeRect 리사이즈 된 이미지 정보
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    static getImageSizeKeepAspectRatio(originalRect, resizeRect) {
        var scale = Calculator.getScaleKeepAspectRatio(originalRect, resizeRect);
        var minScale = scale.min;
        var resizeWidth = minScale * originalRect.width;
        var resizeHeight = minScale * originalRect.height;
        return {x: 0, y: 0, width: resizeWidth, height: resizeHeight};
    }


    /**
     * 원본 비율을 구합니다.
     * @param originalRect 원본 사이즈
     * @param resizeRect 변화된 사이즈
     * @returns {*} 최대, 최소 비율
     */
    static getScaleKeepAspectRatio(originalRect, resizeRect) {
        var widthRatio = resizeRect.width / originalRect.width;
        var heightRatio = resizeRect.height / originalRect.height;

        if(widthRatio < heightRatio)
            return {min:widthRatio, max:heightRatio};
        else
            return {max:widthRatio, min:heightRatio};
    }


    static getRotation(centerPoint, mousePoint) {
        var dx = mousePoint.x - centerPoint.x;
        var dy = mousePoint.y - centerPoint.y;
        var radians = Math.atan2(dy, dx);
        var rotation = Calculator.getDegrees(radians);
        //var rotation = Calculator.getDegrees(radians) + Calculator.getDegrees(Math.PI);
        //rotation = (rotation <= 0) ? 180 : -180;
        return rotation;
    }

    /**
     * 대각선 길이를 구합니다.
     * @param width 사각형의 넓이
     * @param height 사각형의 높이
     * @returns {number} 대각선 길이
     */
    static getDiagonal(width, height) {
        return Math.sqrt(width * width + height * height);
    }

    /**
     * 새로운 사각형의 넓이 구하기
     * @param originalWidth 기존 사각형 넓이
     * @param originalHeight 기존 사각형 높이
     * @param newHeight 새로운 사각형 높이
     * @returns {number}
     */
    static getRectangleWidth(originalWidth, originalHeight, newHeight) {
        return originalWidth * newHeight / originalHeight;
    }

    static getRadians(degree) {
        return degree * Calculator.DEG_TO_RAD;
    }

    static getDegrees(radians) {
        return radians * Calculator.RAD_TO_DEG;
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
     * @param p0 삼각형 좌표(Point)
     * @param p1 삼각형 좌표(Point)
     * @param p2 삼각형 좌표(Point)
     * @returns {number} 삼각형의 면적
     */
    static triangleArea(p0, p1, p2) {
        return (p2.x * p1.y - p1.x * p2.y) - (p2.x * p0.y - p0.x * p2.y) + (p1.x * p0.y - p0.x * p1.y);
    }

    /**
     * 점 C가 직선 AB 위에 존재하는지 검사
     * 세 점이 한 직선상에 있거나 어느 두 점이 동일한 위치의 점이면,
     * 세 점이 이루는 삼각형의 면적은 0이므로 한 직선상에 있다고 볼 수 있다.
     *
     * OnLineAB(A,B,rb) = (Area2(A,B,rb) = 0)
     *
     * 점 C가 직선 AB로 나뉘는 두 평면 중 어느 쪽 평면에 속하는가?
     * 세 점의 두르기 방향에 따라 면적이 양수 또는 음수가 산출되는 사실을 이용한 것이다.
     * 2차 공간에서 직선 AB는 직선의 진행방향을 기준으로 평면을 왼쪽 평면과 우측 평면으로 분활한다.
     * 이 때 점 C가 왼쪽평면에 속하는지 우측평면에 속하는지 알려면
     * 삼각 ABC의 면적이 양수인지 음수인지 검사하면 된다.
     *
     * isLeftOfAB(A,B,rb) = (Area2(A,B,rb) > 0)
     * isRightOfAB(A,B,rb) = (Area2(A,B,rb) < 0)
     *
     * 삼각형의 면적이 양수이면 점 C는 왼쪽에
     * 삼각형의 면적이 음수이면 점 C는 오른쪽에 있다.
     *
     * 사각형안에 점이 있는지 판단은
     * 사각형의 좌,우,상,하의 선분과 한 점의 이용해 삼각형의 면적을 구해서
     * 모두 0이거나 0보다 작으면 우측, 즉 사각형 안에 점이 있는 것이고
     * 하나라도 양수가 나오면 사각형 안에 점이 없는 것이 된다.
     *
     * @param lt 사각형 좌상단 포인트
     * @param rt 사각형 우상단 포인트
     * @param rb 사각형 우한단 포인트
     * @param lb 사각형 좌하단 포인트
     * @param point 체크하고 싶은 포인트
     * @returns {boolean} 사각형안에 포인트가 있는지 여부
     */
    static isInsideSquare(lt, rt, rb, lb, point) {
        /*console.log(
         parseInt(lt.x), parseInt(lt.y),
         parseInt(rt.x), parseInt(rt.y),
         parseInt(rb.x), parseInt(rb.y),
         parseInt(lb.x), parseInt(lb.y),
         parseInt(point.x), parseInt(point.y)
         );*/

        if (Calculator.triangleArea(lt, rt, point) > 0 || Calculator.triangleArea(rt, rb, point) > 0 || Calculator.triangleArea(rb, lb, point) > 0 || Calculator.triangleArea(lb, lt, point) > 0)
            return false;
        return true;
    }


    static getHitPoint(lt, rt, rb, lb, point) {
        var result = {isHitLeft:false, isHitRight:false, isHitTop:false, isHitBottom:false};

        if (Calculator.triangleArea(lt, rt, point) > 0)
            result.isHitTop = true;

        if (Calculator.triangleArea(rt, rb, point) > 0)
            result.isHitRight = true;

        if (Calculator.triangleArea(rb, lb, point) > 0)
            result.isHitBottom = true;

        if (Calculator.triangleArea(lb, lt, point) > 0)
            result.isHitLeft = true;

        return result;
    }


    static getPointsByBounds(bounds) {
        return {
            lt: {x: bounds.x, y: bounds.y},
            rt: {x: bounds.x + bounds.width, y: bounds.y},
            rb: {x: bounds.x + bounds.height, y: bounds.y + bounds.height},
            lb: {x: bounds.x, y: bounds.y + bounds.height}
        }
    }


    static digitNumber(convertNumber, digitNumber = 0) {
        if (digitNumber === 0) {
            console.log('Missing digitNumber');
            return convertNumber;
        }
        var pow = Math.pow(10, digitNumber);
        return parseInt(convertNumber * pow) / pow;
    }



    static getOneToOne(x, a, b, c, d) {
        return (d - c) / (b - a) * (x - a) + c;
    }


    /**
     * 회전하는 좌표 구하기
     * @param pivot 사각형의 중심점
     * @param point 계산하고 싶은 포인트
     * @param angle 회전각 degrees
     * @returns {{x: (number|*), y: (number|*)}}
     */
    static getRotationPoint(pivot, point, angle) {
        var diffX = point.x - pivot.x;
        var diffY = point.y - pivot.y;
        var dist = Math.sqrt(diffX * diffX + diffY * diffY);
        var ca = Math.atan2(diffY, diffX) * 180 / Math.PI;
        var na = ((ca + angle) % 360) * Math.PI / 180;
        var x = (pivot.x + dist * Math.cos(na) + 0.5) | 0;
        var y = (pivot.y + dist * Math.sin(na) + 0.5) | 0;
        return {x: x, y: y};
    }


    /**
     * 회전각과 사각형의 포인트를 넘겨주면 회전된 사각형의 포인트를 전달합니다.
     * @param pivot 사각형의 pivot(anchor) 포인트
     * @param rectanglePoints 사각형 좌표 (leftTop, rightTop, rightBottom, leftBottom)
     * @param angle 각도 degress
     * @returns {{lt: ({x, y}|{x: (number|*), y: (number|*)}), rt: ({x, y}|{x: (number|*), y: (number|*)}), rb: ({x, y}|{x: (number|*), y: (number|*)}), lb: ({x, y}|{x: (number|*), y: (number|*)})}}
     */
    static getRotationRectanglePoints(pivot, rectanglePoints, angle) {
        var lt = Calculator.getRotationPoint(pivot, rectanglePoints.lt, angle);
        var rt = Calculator.getRotationPoint(pivot, rectanglePoints.rt, angle);
        var rb = Calculator.getRotationPoint(pivot, rectanglePoints.rb, angle);
        var lb = Calculator.getRotationPoint(pivot, rectanglePoints.lb, angle);
        return {lt:lt, rt:rt, rb:rb, lb:lb};
    }


    /**
     * 사각형의 좌표를 가지고 바운드를 계산합니다.
     * @param rectanglePoints 사각형 좌표 (leftTop, rightTop, rightBottom, leftBottom)
     * @returns {{x: number, y: number, width: number, height: number}}
     */
    static getBoundsRectangle(rectanglePoints) {
        var x1 = Math.min(rectanglePoints.lt.x, rectanglePoints.rt.x, rectanglePoints.rb.x, rectanglePoints.lb.x);
        var y1 = Math.min(rectanglePoints.lt.y, rectanglePoints.rt.y, rectanglePoints.rb.y, rectanglePoints.lb.y);
        var x2 = Math.max(rectanglePoints.lt.x, rectanglePoints.rt.x, rectanglePoints.rb.x, rectanglePoints.lb.x);
        var y2 = Math.max(rectanglePoints.lt.y, rectanglePoints.rt.y, rectanglePoints.rb.y, rectanglePoints.lb.y);
        return {x: x1, y: y1, width: x2 - x1, height: y2 - y1};
    }
}