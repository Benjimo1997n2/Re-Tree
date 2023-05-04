class AudioModel {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioElement = document.getElementById('background-music');
        this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
        this.audioSource.connect(this.audioContext.destination);
        this.volume = 50;
        this.loop = true;
        this.muted = true;
    }

    play() {
        // Set volume
        this.audioElement.volume = this.volume / 100;
        this.audioContext.resume();
        this.audioElement.play();
        this.muted = false;
    }

    pause() {
        this.audioElement.pause();
        this.muted = true;
    }

    setLoop(loop) {
        this.audioElement.loop = loop;
    }

    setVolume(volume) {
        this.audioElement.volume = volume / 100;
    }
}