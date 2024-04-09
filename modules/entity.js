export class Entity {
    moveSpeed;

    constructor() {
        this.moveSpeed = 4
    }

    move(dir, speed) {
        this.position = { x: this.position.x + dir.x * speed, y: this.position.y + dir.y * speed };
        this.sprite.position = this.position;
    }

    checkBoundaryX(x, width, minX, maxX) {
        return x - width / 2 <= minX || x + width / 2 >= maxX;
    }

    checkBoundaryY(y, height, minY, maxY) {
        return y - height / 2 <= minY || y + height / 2 >= maxY;
    }

    destroy() {
        location.reload();
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }
}