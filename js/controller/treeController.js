class TreeController {
    constructor(treeView, userDataModel, gameGui) {
        this.treeView = treeView;
        this.userDataModel = userDataModel;
        this.gameGui = gameGui;
        this.treeUpgraderModel = new TreeUpgraderModel();
        this.selectedTree = null;
        this.buyButton = null;

        this.initializeEventListeners();
        this.attachEvents();
    }

    initializeEventListeners() {
        this.buyButton = document.getElementById("buy_tree");
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

    handleTreeClick(evt, treeModel) {
        const upgradeCost = this.treeUpgraderModel.getUpgradeCost(treeModel.level + 1);
        this.gameGui.updateTreeStats(treeModel);
        this.gameGui.updateUpgradeCost(upgradeCost);
        this.gameGui.showUpgradeButton(() => {
            this.handleUpgradeTree(treeModel);
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

    handleBuyTree(treeModel) {
        // Check if the user has enough resources for the upgrade
        // Upgrade the tree's level and update the user's resources
    }    

    generateTrees() {
        const treeArray = [];

        for (let i = 0; i < this.treeModels.length; i++) {
            const treeModel = this.treeModels[i];
            const treeView = new TreeView(treeModel, this.treeView.scene);

            treeArray.push(treeView.treeMesh);
        }

        return treeArray;
    }
}    