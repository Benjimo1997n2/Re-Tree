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

    setVisible(visible) {
        if (this.userMenu) {
            this.userMenu.isVisible = visible;
        }
    }    

    showUsernameInput() {
        this.usernameInput = new BABYLON.GUI.InputText();
        this.usernameInput.width = "80%";
        this.usernameInput.height = "20%";
        this.usernameInput.color = "white";
        this.usernameInput.background = "black";
        this.usernameInput.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.usernameInput.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.usernameInput.top = "70%"; // Adjust this value if needed

        this.usernameInput.onBlurObservable.add(() => {
            if (this.onUsernameEntered) {
                this.onUsernameEntered(this.usernameInput.text);
            }
        });

        this.userMenu.addControl(this.usernameInput);
        this.usernameInput.focus();

        // Add the validation and cancel buttons
        this.showValidateAndCancelButtons();

        // Add an error message label
        this.errorMessageLabel = new BABYLON.GUI.TextBlock();
        this.errorMessageLabel.text = "";
        this.errorMessageLabel.color = "red";
        this.errorMessageLabel.fontSize = 18;
        this.errorMessageLabel.height = "20%";
        this.errorMessageLabel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.errorMessageLabel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.errorMessageLabel.top = "90%"; // Adjust this value if needed
        this.userMenu.addControl(this.errorMessageLabel);
    }

    showValidateAndCancelButtons() {
        this.validateButton = BABYLON.GUI.Button.CreateSimpleButton("validateButton", "Validate");
        this.validateButton.width = "40%";
        this.validateButton.height = "20%";
        this.validateButton.color = "white";
        this.validateButton.background = "green";
        this.validateButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.validateButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.validateButton.top = "50%"; // Adjust this value if needed
        this.validateButton.left = "5%";

        this.validateButton.onPointerUpObservable.add(() => {
            if (this.onUsernameValidate) {
                this.onUsernameValidate(this.usernameInput.text);
            }
        });

        this.cancelButton = BABYLON.GUI.Button.CreateSimpleButton("cancelButton", "Cancel");
        this.cancelButton.width = "40%";
        this.cancelButton.height = "20%";
        this.cancelButton.color = "white";
        this.cancelButton.background = "red";
        this.cancelButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.cancelButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.cancelButton.top = "50%"; // Adjust this value if needed
        this.cancelButton.left = "-5%";

        this.cancelButton.onPointerUpObservable.add(() => {
            if (this.onUsernameCancel) {
                this.onUsernameCancel();
            }
        });

        this.userMenu.addControl(this.validateButton);
        this.userMenu.addControl(this.cancelButton);
    }

    displayErrorMessage(message) {
        this.errorMessageLabel.text = message;
    }

    dispose() {
        this.userMenu.dispose();
    }
}