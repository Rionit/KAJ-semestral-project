export class Sprite {
    #currentX
    #currentY
    
    constructor(url, x=0, y=0, animated = false, numFrames = 1) {
        this.url = url;
        this.animated = animated;
        this.numFrames = numFrames;
        this.image = new Image();
        this.loaded = false;
        this.#currentX = x;
        this.#currentY = y;
        
        this.#loadImage();
    }

    #loadImage() {
        this.image.onload = () => {
          this.loaded = true;
          this.frameWidth = this.image.width / this.numFrames;
        };
        this.image.src = this.url;
    }

    getFrameX(frame) {
        return (frame * this.frameWidth) % (this.numFrames * this.frameWidth);
    }
    
    // Getter and setter for x position
    get x() {
        return this.#currentX;
    }

    set x(value) {
        this.#currentX = value;
    }

    // Getter and setter for y position
    get y() {
        return this.#currentY;
    }

    set y(value) {
        this.#currentY = value;
    }
}
