class GameController {
    constructor(gameGui, userDataModel) {
        this.gameGui = gameGui;
        this.userDataModel = userDataModel;
        this.API_ENDPOINT = 'http://127.0.0.1:5000';

        this.init();
    }

    init() {
        this.updateScore();
        if(!this.userDataModel.visitor){
            setInterval(() => {
                // Check if user have data
                if (
                    this.userDataModel.userData.hasOwnProperty('CO2') &&
                    this.userDataModel.userData.hasOwnProperty('CO2_per_sec') &&
                    this.userDataModel.userData.hasOwnProperty('trees')
                ) {
                    this.incrementScore(this.userDataModel.userData.CO2_per_sec);
                } else {
                    this.resetScore();
                }
            }, 1000);

            setInterval(() => {
                // this.sendUserDataToAPI();
                // document.getElementById('example-form').submit();
            }, 3000); // Call the API every 10 seconds    

            // Add an event listener to the reset button
            this.gameGui.resetButton.onPointerUpObservable.add(() => {
                this.resetScore();
            });
        }
    }

    sendUserDataToAPI(event) {
        console.log('Sending user data to API');
        event.preventDefault(); // Prevent page reload

        fetch(`${this.API_ENDPOINT}/save_data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: 'exampleUser', // Replace this with the actual username
                trees: JSON.stringify(this.userDataModel.userData.trees),
                CO2: this.userDataModel.userData.CO2,
                CO2_per_sec: this.userDataModel.userData.CO2_per_sec,
            }),
        })
        .then(response => response.json())
        .then(console.log);
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

    initGameComponents(scene) {
        this.ground = new Ground(scene);

        const groundSize = 100;
        const groundView = new GroundView(this.ground);
        
        const skyboxView = new SkyboxView(scene);
        skyboxView.createSkybox();
        
        const continuousGroundView = new ContinuousGroundView(this.ground, groundSize);
        continuousGroundView.createContinuousGroundMesh();
        groundView.createGroundMesh();

        const waterView = new WaterView(this.ground, continuousGroundView.continuousGround, groundSize);
        waterView.createWaterMesh();
    }
}