export class Entity {
    moveSpeed;

    constructor() {
        this.moveSpeed = 4
    }

    move(dir, speed) {
        let nextPosition = { x: this.position.x + dir.x * speed, y: this.position.y + dir.y * speed }

        // this.position = { x: this.position.x + dir.x * speed, y: this.position.y + dir.y * speed };
        // this.sprite.position = this.position;

        // Check collisions along the x-axis
        if (this.checkBoundaryX(nextPosition.x)) {
            this.position.x = nextPosition.x;
            this.sprite.position.x = nextPosition.x;
        }

        // Check collisions along the y-axis
        if (this.checkBoundaryY(nextPosition.y)) {
            this.position.y = nextPosition.y;
            this.sprite.position.y = nextPosition.y;
        }
    }

    checkBoundaryY(y){
        let s = this.sprite;
        return (y - (s.height / 2) <= 50 || y + (s.height / 2) >= 940) ? false : true;
    }

    checkBoundaryX(x){
        let s = this.sprite;
        return (x - (s.frameWidth / 2) <= 35 || x + (s.frameWidth / 2) >= 965) ? false : true;
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