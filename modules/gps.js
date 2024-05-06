export class GPS {
    constructor(){
        this.geolocationEnabled = 'geolocation' in navigator;
        if (this.geolocationEnabled) {
            this.currentPosition = null;
            this.watchId = null;
            this.getCurrentPosition();
        }
    }

    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.currentPosition = position.coords;
                const p = document.querySelector('.location');
                p.textContent = `${this.currentPosition.latitude}, ${this.currentPosition.longitude}`;
            },
            error => {
                console.error("Error getting current position:", error);
            }
        );
    }

    watchPosition() {
        if (this.geolocationEnabled) {
            this.watchId = navigator.geolocation.watchPosition(
                position => {
                    this.currentPosition = position.coords;
                    console.log("Updated position:", this.currentPosition);
                },
                error => {
                    console.error("Error watching position:", error);
                }
            );
        }
    }

    stopWatchingPosition() {
        if (this.geolocationEnabled && this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }
}