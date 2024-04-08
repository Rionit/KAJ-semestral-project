export class Input{
    
    #pressedKeys
    #isShooting
    #isMoving
    
    constructor() {
        this.#pressedKeys = {w: false, a: false, s: false, d: false, ArrowDown: false, ArrowUp: false, ArrowLeft: false, ArrowRight: false};
        document.addEventListener('keydown', this.handleKeyEvent.bind(this));
        document.addEventListener('keyup', this.handleKeyEvent.bind(this));
    }

    handleKeyEvent(e) {
        const key = e.key;
        if (key in this.#pressedKeys) {
            this.#pressedKeys[key] = (e.type === 'keydown');
        } else {
            console.log("Error: (" + e.key + ") key was not found!");
        }
    }

    playerDir() {
        const x = (this.#pressedKeys["d"] ? 1 : 0) + (this.#pressedKeys["a"] ? -1 : 0);
        const y = (this.#pressedKeys["s"] ? 1 : 0) + (this.#pressedKeys["w"] ? -1 : 0);
        
        // Normalize the vector if it's not zero
        if (x !== 0 || y !== 0) {
            const length = Math.sqrt(x * x + y * y);
            return { x: x / length, y: y / length };
        }
        
        return { x: 0, y: 0 }; // If no keys are pressed
    }

    get isMoving() {
        return (this.#pressedKeys["w"] || this.#pressedKeys["a"] || this.#pressedKeys["s"] || this.#pressedKeys["d"]) ? true : false;
    }

    gunDir() {
        const x = (this.#pressedKeys["ArrowRight"] ? 1 : 0) + (this.#pressedKeys["ArrowLeft"] ? -1 : 0);
        const y = (this.#pressedKeys["ArrowDown"] ? 1 : 0) + (this.#pressedKeys["ArrowUp"] ? -1 : 0);
        
        // Normalize the vector if it's not zero
        if (x !== 0 || y !== 0) {
            const length = Math.sqrt(x * x + y * y);
            return { x: x / length, y: y / length };
        }
    }

    get isShooting() {
        if(this.#pressedKeys["ArrowDown"] ^ this.#pressedKeys["ArrowUp"]) return true;
        if(this.#pressedKeys["ArrowLeft"] ^ this.#pressedKeys["ArrowRight"]) return true;
    }
}