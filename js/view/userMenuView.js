class UserMenuView {
    constructor(gameGui) {
        this.gameGui = gameGui;
        this._options = [];
    }

    async init() {
        this.userMenu = new BABYLON.GUI.Rectangle("userMenu");
        // Customize the appearance of the menu
        this.userMenu.width = "50%";
        this.userMenu.height = "80%";
        this.userMenu.color = "white";
        this.userMenu.thickness = 4;
        this.userMenu.background = "black";
        this.userMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.userMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    
        // Add the menu options to the user menu
        for (let i = 0; i < 5; i++) {
            const option = BABYLON.GUI.Button.CreateSimpleButton("option" + (i + 1), [
                "Create a new user",
                "Connect",
                "Play as guest",
                "Watch cinematic",
                "Read gameplay",
            ][i]);
            option.width = "100%";
            option.height = "20%";
            option.color = "white";
            option.background = "green";
            option.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            option.top = (i * 20) + "%";
    
            // Add an event listener for when a user clicks an option
            option.onPointerUpObservable.add(() => {
                if (this.onOptionSelected) {
                    this.onOptionSelected(i + 1);
                }
            });
            this.userMenu.addControl(option);
        }
    
        this.gameGui.advancedTexture.addControl(this.userMenu); // Add the user menu to the game GUI
    }    

    dispose() {
        this.userMenu.dispose();
    }
}