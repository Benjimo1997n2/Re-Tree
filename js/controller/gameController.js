class GameController {
    constructor(gameGui, userDataModel) {
        this.gameGui = gameGui;
        this.userDataModel = userDataModel;

        this.init();
    }

    resetScore() {
        this.userDataModel.userData.CO2 = 0;
        this.userDataModel.userData.CO2_per_sec = 1;
    
        // Save updated user data
        this.userDataModel.updateTokenValue(this.userDataModel.userToken, this.userDataModel.userData);
    
        // Update the score
        this.updateScore();
    }

    init() {
        this.updateScore();
        setInterval(() => {
            this.incrementScore(this.userDataModel.userData.CO2_per_sec);
        }, 1000);

        // Add an event listener to the reset button
        this.gameGui.resetButton.onPointerUpObservable.add(() => {
            this.resetScore();
        });
    }

    incrementScore(amount) {
        this.userDataModel.userData.CO2 += amount;
        this.updateScore();
    }

    updateScore() {
        const { CO2 } = this.userDataModel.userData;
        this.gameGui.updateScoreText(CO2);
        this.userDataModel.saveUserData();
    }

    resetScore() {
        const { userToken } = this.userDataModel;
        const initialUserData = this.createInitialUserData();
        this.userDataModel.userData = initialUserData;
        this.userDataModel.saveUserData();
        this.updateScore();
    }

    createInitialUserData() {
        // Initialize the user data with 25 trees
        let numTrees = 25;
        let trees = [];
        for (let i = 0; i < numTrees; i++) {
            // We compute random values for the tree's position
            const x = Math.random() * 50 - 25;
            const z = Math.random() * 50 - 25;
            trees[i] = new TreeModel(i, 0, 0, x, 0, z);
        }

        return {
            CO2: 0,
            CO2_per_sec: 1,
            trees: trees,
        };
    }
}