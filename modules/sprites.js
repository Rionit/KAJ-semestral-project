export class Sprite {
    #position
    #factor

    constructor(url, factor = 1, x=0, y=0, animated = false, numFrames = 1) {
        this.url = url;
        this.animated = animated;
        this.numFrames = numFrames;
        this.image = new Image();
        this.loaded = false;
        this.#position = {x: x, y: y};
        this.#factor = factor;
        
        this.#loadImage();
    }

    #loadImage() {
        this.image.onload = () => {
          this.loaded = true;
          this.frameWidth = this.image.width / this.numFrames;
          this.width = this.frameWidth * this.#factor;
          this.height = this.image.height * this.#factor;
        };
        this.image.src = this.url;
    }

    getFrameX(frame) {
        return (frame * this.frameWidth) % (this.numFrames * this.frameWidth);
    }
    
    // Getter and setter for x position
    get x() {
        return this.#position.x;
    }
    
    // Getter and setter for y position
    get y() {
        return this.#position.y;
    }

    get position(){
        return this.#position;
    }
    
    set x(value) {
        this.#position.x = value;
    }
    
    set y(value) {
        this.#position.y = value;
    }

}
