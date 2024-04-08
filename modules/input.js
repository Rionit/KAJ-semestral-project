export class Input{
    
    #pressedKeys

    constructor() {
        this.#pressedKeys = {w: false, a: false, s: false, d: false};
        document.addEventListener('keydown', this.handleKeyEvent.bind(this));
        document.addEventListener('keyup', this.handleKeyEvent.bind(this));
    }

    handleKeyEvent(e) {
        const key = e.key.toLowerCase();
        if (key in this.#pressedKeys) {
            this.#pressedKeys[key] = (e.type === 'keydown');
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
}