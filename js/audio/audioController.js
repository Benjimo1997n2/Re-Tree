class AudioController {
    constructor(audioModel, gameGui) {
        this.audioModel = audioModel;
        this.gameGui = gameGui;
    }

    initListeners() {
        this.gameGui.toggleMuteButton.onPointerClickObservable.add(() => {
            if (this.audioModel.muted) {
                // Play the music
                this.audioModel.play();
                this.audioModel.setLoop(true);
                this.gameGui.toggleMuteButton.source = "assets/picto/mute_icon.png";
            } else {
                // Pause the music
                this.audioModel.pause();
                this.gameGui.toggleMuteButton.source = "assets/picto/unmute_icon.png";
            }
        });
        this.gameGui.volumeSlider.onValueChangedObservable.add((value) => {
            this.audioModel.setVolume(value);
        });
    }
}
