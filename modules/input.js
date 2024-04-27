export class Input{
    
    #pressedKeys
    #isShooting
    #isMoving
    #gunDirection
    #playerDirection
    
    constructor() {
        this.#pressedKeys = {w: false, a: false, s: false, d: false, ArrowDown: false, ArrowUp: false, ArrowLeft: false, ArrowRight: false};
        document.addEventListener('keydown', this.handleKeyEvent.bind(this));
        document.addEventListener('keyup', this.handleKeyEvent.bind(this));
    }

    handleKeyEvent(e) {
        const key = e.key;
        if (key in this.#pressedKeys) {
            this.#pressedKeys[key] = (e.type === 'keydown');

            // Get the corresponding circle based on the pressed key
            const circleId = this.getCircleId(key);
            const circle = document.querySelector(circleId);

            if (circle) {
                // Add or remove the animation class based on key press
                if (this.#pressedKeys[key]) {
                    // circle.style.strokeWidth = 15;
                    circle.style.transform = 'translateY(7px)';
                    circle.style.filter = 'drop-shadow(0px 0px 0px rgb(0 0 0 / 1))';
                } else {
                    // circle.style.strokeWidth = 5;
                    circle.style.transform = 'translateY(-7px)';
                    circle.style.filter = 'drop-shadow(0px 14px 0px rgb(0 0 0 / 1))';
                }
            }

            if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
                // Prevent the default action (scrolling)
                e.preventDefault();
            }
        } else {
            console.log("Error: (" + e.key + ") key was not found!");
        }
    }

    getCircleId(key) {
        // Map keys to circle IDs
        const keyToCircleId = {
            w: '.upBtn',
            a: '.leftBtn',
            s: '.downBtn',
            d: '.rightBtn',
            ArrowDown: 'circle3',
            ArrowUp: 'circle1',
            ArrowLeft: 'circle2',
            ArrowRight: 'circle4'
        };
        return keyToCircleId[key];
    }

    get playerDirection() {
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

    get gunDirection() {
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