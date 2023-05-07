class TreeController {
    constructor(treeView, userDataModel, gameGui) {
        this.treeView = treeView;
        this.userDataModel = userDataModel;
        this.gameGui = gameGui;
        this.treeUpgraderModel = new TreeUpgraderModel();
        this.selectedTree = null;
        this.buyButton = null;

        this.attachEvents();
    }
            
    handleTreeClick(evt, treeModel) {
        this.selectedTree = treeModel;
        console.log(this.treeView)
        console.log(this.selectedTree)
        const upgradeCost = this.treeUpgraderModel.getUpgradeCost(treeModel.level + 1);
        this.gameGui.updateTreeStats(treeModel);
        this.gameGui.updateUpgradeCost(upgradeCost);
        this.gameGui.showUpgradeButton(() => {
            this.handleUpgradeTree(treeModel);
        });

        // Remove previous observables
        this.gameGui.sliderX.onValueChangedObservable.clear();
        this.gameGui.sliderZ.onValueChangedObservable.clear();

        this.gameGui.sliderX.value = treeModel.x;
        this.gameGui.sliderZ.value = treeModel.z;

        // Subscribe to slider value changes
        this.gameGui.sliderX.onValueChangedObservable.add((value) => {
            this.handleSliderXChange(value);
        });
        this.gameGui.sliderZ.onValueChangedObservable.add((value) => {
            this.handleSliderZChange(value);
        });
    }

    updateTreePosition(x, z) {
        if (this.selectedTree ) {
            this.selectedTree.x = x;
            this.selectedTree.z = z;
            this.treeView.updateTreePosition(this.selectedTree);
        }
    }

    handleSliderXChange(value) {
        if (this.selectedTree) {
            this.updateTreePosition(value, this.selectedTree.z);
            this.userDataModel.userData.trees[this.selectedTree.id].x = value;
            this.userDataModel.saveUserData()
        } else {
            console.log("No selected tree");
        }
    }
    
    handleSliderZChange(value) {
        if (this.selectedTree) {
            this.updateTreePosition(this.selectedTree.x, value);
            this.userDataModel.userData.trees[this.selectedTree.id].z = value;
            this.userDataModel.saveUserData()
        }
    }

    
    attachEvents() {
        this.treeView.treeMesh.forEach(mesh => {
            mesh.actionManager = new BABYLON.ActionManager(this.treeView.scene);
            mesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                        (evt) => this.handleTreeClick(evt, this.treeView.treeModel)
                    )
                    );
                });
    }

    updateView(treeModel) {
        const upgradeCost = this.treeUpgraderModel.getUpgradeCost(treeModel.level + 1);
        this.gameGui.updateTreeStats(treeModel);
        this.gameGui.updateUpgradeCost(upgradeCost);
        this.treeView.treeModel = treeModel;
        this.treeView.update();
    }

    handleUpgradeTree(treeModel) {
        const treeIndex = treeModel.id;
        // Get the tree to upgrade
        const treeToUpgrade = this.userDataModel.userData.trees[treeIndex];
        const oldCo2PerSecond = treeToUpgrade.co2PerSecond;

        // Check if the tree can be upgraded
        const nextLevel = treeToUpgrade.level + 1;

        const upgradeCost = this.treeUpgraderModel.getUpgradeCost(nextLevel);
        const userCO2 = this.userDataModel.userData.CO2;

        if (userCO2 >= upgradeCost) {
            // Update user's CO2 and owned trees
            this.userDataModel.userData.CO2 -= upgradeCost;
            treeToUpgrade.level = nextLevel;

            // Update user's total CO2 per second
            treeToUpgrade.co2PerSecond = this.treeUpgraderModel.getCo2PerSecond(nextLevel);
            this.userDataModel.userData.CO2_per_sec = this.userDataModel.userData.CO2_per_sec - oldCo2PerSecond + treeToUpgrade.co2PerSecond;

            // Save updated user data
            this.userDataModel.saveUserData();

            // Update the view
            this.updateView(treeToUpgrade);
        } else {
            console.log("Not enough CO2 to buy the upgrade.");
        }
    }
}    