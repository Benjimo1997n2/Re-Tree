let antMode = false;

const BuildGui = function(scene) {
    // Import the Babylon GUI library
    const GUI = BABYLON.GUI;

    // Create the GUI advanced texture
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Create the scoreboard container
    const scoreboardContainer = new GUI.Rectangle("scoreboardContainer");
    scoreboardContainer.width = "200px";
    scoreboardContainer.height = "60px";
    scoreboardContainer.cornerRadius = 5;
    scoreboardContainer.color = "white";
    scoreboardContainer.thickness = 2;
    scoreboardContainer.background = "rgba(0, 0, 0, 0.5)";
    scoreboardContainer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    scoreboardContainer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    scoreboardContainer.paddingTop = "10px";
    scoreboardContainer.paddingLeft = "10px";
    advancedTexture.addControl(scoreboardContainer);

    // Create the ant mode button
    const antModeButton = GUI.Button.CreateSimpleButton("antModeButton", "Toggle Ant Mode");
    antModeButton.width = "200px";
    antModeButton.height = "40px";
    antModeButton.color = "white";
    antModeButton.cornerRadius = 5;
    antModeButton.background = "rgba(0, 0, 0, 0.5)";
    antModeButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    antModeButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    antModeButton.paddingTop = "10px";
    antModeButton.paddingRight = "10px";
    advancedTexture.addControl(antModeButton);

    antModeButton.onPointerUpObservable.add(() => {
        antMode = !antMode;
        toggleAntMode(antMode, scene);
    });

    // Create the scoreboard text
    const scoreText = new GUI.TextBlock();
    scoreText.text = "CO2: 0";
    scoreText.color = "white";
    scoreText.fontSize = 24;
    scoreboardContainer.addControl(scoreText);

    // Function to update the score
    function updateScore(increment) {
        if(score_flag["value"] == true) { 
            userData.CO2 = score_flag["data"]["CO2"];
            userData.CO2_per_sec = score_flag["data"]["CO2_per_sec"];
            userData.plants = score_flag["data"]["plants"];
            score_flag["value"] = false;
        }

        userData.CO2 += increment;

        // document.getElementById("CO2").value = userData.CO2;
        // document.getElementById("CO2_per_sec").value = userData.CO2_per_sec;
        
        scoreText.text = `CO2: ${userData.CO2}`;
        // Update UI or any other relevant code here
        updateUserDataPannel();
        updateTokenValue(userToken, userData);
    }    

    // Each second, update the score +1
    setInterval(() => {
        updateScore(userData.CO2_per_sec);
    }, 1000);
}

function toggleAntMode(activate, scene) {
    if (activate) {
        playAnt(scene);
    } else {
        // TODO REMOVE THE ANT
    }
}