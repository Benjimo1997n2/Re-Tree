class GameGui {
    constructor(scene, userToken, userData, score_flag) {
        this.scene = scene;
        this.userToken = userToken;
        this.userData = userData;
        this.score_flag = score_flag;
        this.antModel = new AntModel(scene);
        this.antView = new AntView(this.antModel, scene);
        this.antController = new AntController(this.antModel, this.antView, scene);
        this.antModeActivated = false;


        this.GUI = BABYLON.GUI;
        this.advancedTexture = this.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.buildGui();
    }

    buildGui() {
        this.createScoreboardContainer();
        this.createAntModeButton();
        this.createScoreText();
        this.createTreeStatsContainer();
        this.createResetButton();
    }

    // Tree stats container
    createTreeStatsContainer() {
        this.treeStatsContainer = new this.GUI.Rectangle("treeStatsContainer");
        this.treeStatsContainer.width = "220px";
        this.treeStatsContainer.height = "180px";
        this.treeStatsContainer.cornerRadius = 5;
        this.treeStatsContainer.color = "white";
        this.treeStatsContainer.thickness = 2;
        this.treeStatsContainer.background = "rgba(0, 0, 0, 0.5)";
        this.treeStatsContainer.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.treeStatsContainer.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.treeStatsContainer.paddingBottom = "70px"; // Increase padding to make space for the upgrade button
        this.treeStatsContainer.paddingLeft = "10px";
        this.advancedTexture.addControl(this.treeStatsContainer);
        this.treeStatsContainer.isVisible = false;


        this.treeIdText = this.createTreeStatsTextBlock("Tree's ID: -", "10px");
        this.treeLevelText = this.createTreeStatsTextBlock("Current Level: -", "40px");
        this.treeStatsContainer.addControl(this.treeIdText);
        this.treeStatsContainer.addControl(this.treeLevelText);
        
        this.upgradeCostText = this.createTreeStatsTextBlock("Upgrade Cost: -", "70px");
        this.treeStatsContainer.addControl(this.upgradeCostText);

        this.createUpgradeButton();
    }

    createUpgradeButton() {
        this.upgradeButton = this.GUI.Button.CreateSimpleButton("upgradeButton", "Upgrade Tree");
        this.upgradeButton.width = "220px";
        this.upgradeButton.height = "60px";
        this.upgradeButton.color = "white";
        this.upgradeButton.cornerRadius = 5;
        this.upgradeButton.background = "rgba(0, 0, 0, 0.5)";
        this.upgradeButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.upgradeButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.upgradeButton.paddingBottom = "10px";
        this.upgradeButton.paddingLeft = "10px";
        this.advancedTexture.addControl(this.upgradeButton);
        this.upgradeButton.isVisible = false;
    }

    showUpgradeButton(callback) {
        this.upgradeButton.isVisible = true;
        this.upgradeButton.onPointerUpObservable.clear();
        this.upgradeButton.onPointerUpObservable.add(callback);
    }

    hideUpgradeButton() {
        this.upgradeButton.isVisible = false;
    }

    updateUpgradeCost(upgradeCost) {
        this.upgradeCostText.text = `Upgrade Cost: ${upgradeCost}`;
    }

    createTreeStatsTextBlock(text, top) {
        const textBlock = new this.GUI.TextBlock();
        textBlock.text = text;
        textBlock.color = "white";
        textBlock.fontSize = 18; // Decrease font size
        textBlock.textHorizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER; // Center the text horizontally
        textBlock.textVerticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP; // Align the text to the top
        textBlock.top = top;
        return textBlock;
    }

    updateTreeStats(treeModel) {
        this.treeStatsContainer.isVisible = true;
        this.treeIdText.text = `Tree's ID: ${treeModel.id}`;
        this.treeLevelText.text = `Current Level: ${treeModel.level}`;
    }

    hideTreeStats() {
        this.treeStatsContainer.isVisible = false;
    }

    // Reset button
    createResetButton() {
        this.resetButton = this.GUI.Button.CreateSimpleButton("resetButton", "Reset Score");
        this.resetButton.width = "180px";
        this.resetButton.height = "40px";
        this.resetButton.color = "white";
        this.resetButton.cornerRadius = 5;
        this.resetButton.background = "rgba(0, 0, 0, 0.5)";
        this.resetButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.resetButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.resetButton.paddingBottom = "10px";
        this.resetButton.paddingRight = "10px";
        this.advancedTexture.addControl(this.resetButton);
    }

    // Score container
    createScoreboardContainer() {
        this.scoreboardContainer = new this.GUI.Rectangle("scoreboardContainer");
        this.scoreboardContainer.width = "200px";
        this.scoreboardContainer.height = "60px";
        this.scoreboardContainer.cornerRadius = 5;
        this.scoreboardContainer.color = "white";
        this.scoreboardContainer.thickness = 2;
        this.scoreboardContainer.background = "rgba(0, 0, 0, 0.5)";
        this.scoreboardContainer.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scoreboardContainer.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.scoreboardContainer.paddingTop = "10px";
        this.scoreboardContainer.paddingLeft = "10px";
        this.advancedTexture.addControl(this.scoreboardContainer);
    }

    createScoreText() {
        this.scoreText = new this.GUI.TextBlock();
        this.scoreText.text = "CO2: 0";
        this.scoreText.color = "white";
        this.scoreText.fontSize = 24;
        this.scoreboardContainer.addControl(this.scoreText);
    }

    updateScoreText(value) {
        this.scoreText.text = `CO2: ${value}`;
    }

    // updateScore(increment) {
    //     if (this.score_flag["value"] == true) {
    //         this.userData.CO2 = this.score_flag["data"]["CO2"];
    //         this.userData.CO2_per_sec = this.score_flag["data"]["CO2_per_sec"];
    //         this.userData.plants = this.score_flag["data"]["plants"];
    //         this.score_flag["value"] = false;
    //     }

    //     this.userData.CO2 += increment;

    //     this.scoreText.text = `CO2: ${this.userData.CO2}`;
    //     this.updateUserDataPannel();
    //     this.updateTokenValue(this.userToken, this.userData);
    // }

    // Ant mode
    createAntModeButton() {
        this.antModeButton = this.GUI.Button.CreateSimpleButton("antModeButton", "Toggle Ant Mode");
        this.antModeButton.width = "200px";
        this.antModeButton.height = "40px";
        this.antModeButton.color = "white";
        this.antModeButton.cornerRadius = 5;
        this.antModeButton.background = "rgba(0, 0, 0, 0.5)";
        this.antModeButton.verticalAlignment = this.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.antModeButton.horizontalAlignment = this.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.antModeButton.paddingTop = "10px";
        this.antModeButton.paddingRight = "10px";
        this.advancedTexture.addControl(this.antModeButton);

        this.antModeButton.onPointerUpObservable.add(() => {
            this.antMode = !this.antMode;
            this.toggleAntMode(this.antMode, this.scene);
        });
    }

    async toggleAntMode(activate) {
        if (activate) {
            console.log("Ant mode activated");
            this.antModeActivated = true;
    
            // Call createAnt method on the AntView instance
            await this.antView.createAnt();
            // await this.antView.init();
            this.antController.setupControls();
            this.scene.onBeforeRenderObservable.add(this.antControllerUpdateHandler);
        } else {
            console.log("Ant mode deactivated");
            this.antModeActivated = false;
            this.antView.antMesh.dispose(); // Remove the ant from the scene
            this.scene.onBeforeRenderObservable.remove(this.antControllerUpdateHandler);
        }
    }    

    antControllerUpdateHandler = () => {
        if (this.antModeActivated) {
            this.antController.update();
        }
    }
}
