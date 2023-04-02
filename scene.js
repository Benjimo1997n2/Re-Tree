const createScene = async (engine) => {
    // Create the Babylon.js scene
    const scene = new BABYLON.Scene(engine);

    // Create a camera and set its position
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(renderCanvas, true);

    // Create a hemispheric light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 5, 0), scene);

    // Load the grass texture
    const grassTexture = new BABYLON.Texture("./assets/grass-texture.jpeg", scene);
    grassTexture.uScale = 5; // Adjust the horizontal scaling of the texture (optional)
    grassTexture.vScale = 5; // Adjust the vertical scaling of the texture (optional)

    // Create a standard material and assign the grass texture
    const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);
    grassMaterial.diffuseTexture = grassTexture;

    // Create a flat ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    // Apply the grass material to the ground mesh
    ground.material = grassMaterial;


    // Function for loading a tree with a given position
    const loadTree = async (position) => {
        return new Promise((resolve) => {
            BABYLON.SceneLoader.ImportMesh("", "/assets/trees/lvl0/", "matteucia_struthiopteris_1.obj", scene, (meshes) => {
                // Create a parent node for all meshes in the tree model
                const treeParent = new BABYLON.TransformNode("treeParent", scene);

                // Set the scaling and position for the parent node
                treeParent.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05); // Adjust the scaling if needed
                treeParent.position = position;

                // Attach all meshes to the parent node
                meshes.forEach((mesh) => {
                    mesh.parent = treeParent;
                });

                resolve(treeParent);
            }, null, (scene, message, exception) => { console.error(message, exception); });
        });
    };

    // Function to increase the score when a tree is clicked
    function addTreeClickHandler(tree) {
        // Create an invisible hitbox around the tree
        const hitbox = BABYLON.MeshBuilder.CreateCylinder("hitbox", {
            height: 25, // Set the hitbox height according to your tree's size
            diameter: 15, // Set the hitbox diameter according to your tree's size
        }, scene);
        hitbox.position = tree.position;
        hitbox.isPickable = true;
        hitbox.isVisible = true;
        hitbox.parent = tree;

        // Create a transparent material for the hitbox
        const hitboxMaterial = new BABYLON.StandardMaterial("hitboxMaterial", scene);
        hitboxMaterial.alpha = 0.3; // Set the transparency (0.0 = fully transparent, 1.0 = fully opaque)
        var color = new BABYLON.Color3(1, 0, 0);
        if(tree.type == "lvl0"){ color = new BABYLON.Color3(0, 1, 0); }
        hitboxMaterial.diffuseColor = color; // Set the hitbox color (green in this example)

        // Apply the transparent material to the hitbox
        hitbox.material = hitboxMaterial;

        // Add the ActionManager to the hitbox
        hitbox.actionManager = new BABYLON.ActionManager(scene);
        hitbox.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function () {
                    if(tree.type == "lvl0"){
                        CO2 += 10;
                        updateScore(CO2);
                    }
                }
            )
        );
    }

    // Load the three trees and set their positions
    const tree1 = await loadTree(new BABYLON.Vector3(-1, 0, 0));
    tree1.type = "lvl0";
    const tree2 = await loadTree(new BABYLON.Vector3(0, 0, 0));
    const tree3 = await loadTree(new BABYLON.Vector3(1, 0, 0));

    // Add the click handlers to the trees
    addTreeClickHandler(tree1);
    addTreeClickHandler(tree2);
    addTreeClickHandler(tree3);

    // Import the Babylon GUI library
    const GUI = BABYLON.GUI;

    // Create the GUI advanced texture
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // var CO2 = getTokenValue(userToken);
    var CO2 = getTokenValue(userToken);

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

    // Create the scoreboard text
    const scoreText = new GUI.TextBlock();
    scoreText.text = "CO2: 0";
    scoreText.color = "white";
    scoreText.fontSize = 24;
    scoreboardContainer.addControl(scoreText);

    // Function to update the score
    function updateScore(newScore) {
        scoreText.text = "CO2: " + newScore;
        updateScoreToken(userToken, newScore)
        // Console the token value
        console.log(userToken)
    }

    // Each second, update the score +1
    setInterval(() => {
        if(tCO2){
            CO2 = 0;
            tCO2 = false;
        }
        CO2++;
        updateScore(CO2);
    }, 1000);

    // When the user clicks on a tree, update the score +10
    tree1.actionManager = new BABYLON.ActionManager(scene);
    tree1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
        CO2 += 10;
        updateScore(CO2);
    }));

    return scene;
};