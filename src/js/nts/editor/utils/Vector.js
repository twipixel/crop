export class Vector {
    constructor(x = 0, y = 0) {
        this.initialize(x, y);
    }

    initialize(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    sub(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    scale(scale) {
        return new Vector(this.x * scale, this.y * scale);
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        var len = this.length();
        return new Vector(this.x / len, this.y / len);
    }

    perp() {
        return new Vector(-this.y, this.x);
    }

}