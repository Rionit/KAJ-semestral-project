export class Hitbox {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Check if the position is inside the hitbox
    isInside(position){
        return (
            position.x >= this.x - this.width / 2 &&
            position.x <= this.x + this.width / 2 &&
            position.y >= this.y - this.height / 2 &&
            position.y <= this.y + this.height / 2
        );
    }
}