class GroundModel {
    constructor(scene) {
        // Create the ground (island) mesh using a heightmap
        this.ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            "ground",
            "./assets/textures/heightMap.png",
            {
                width: 80,
                height: 80,
                subdivisions: 100,
                minHeight: -2.2,
                maxHeight: 0,
                onReady: () => {
                    // Set ground physics properties
                    this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                        this.ground,
                        BABYLON.PhysicsImpostor.HeightmapImpostor,
                        { mass: 0, restitution: 0.1, friction: 0.01, isKinematic: true },
                        scene
                    );
                },
            },
            scene
        );

        // Create a grass material
        const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);

        // Load the grass texture
        const grassTexture = new BABYLON.Texture("./assets/textures/grass.jpeg", scene);
        grassTexture.uScale = 15; // Adjust these values to fit your texture
        grassTexture.vScale = 15;
        grassMaterial.diffuseTexture = grassTexture;

        // Set the specular color to black to remove shininess
        grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

        // Apply the grass material to the ground mesh
        this.ground.material = grassMaterial;

        // Create the water mesh
        const waterMesh = BABYLON.MeshBuilder.CreateGround("waterMesh", {width: 200, height: 200}, scene);

        // Create the water material
        const waterMaterial = new BABYLON.WaterMaterial("waterMaterial", scene);
        waterMaterial.bumpTexture = new BABYLON.Texture("./assets/textures/waterBump.png", scene);
        waterMaterial.windForce = -5;
        waterMaterial.waveHeight = 0.1;
        waterMaterial.bumpHeight = 0.1;
        waterMaterial.waveLength = 0.1;
        waterMaterial.colorBlendFactor = 0;
        
        // Adjust the water material transparency and reflectivity
        waterMaterial.alpha = 0.8; // Set transparency (0.0 - fully transparent, 1.0 - fully opaque)
        waterMaterial.reflectionTexture.level = 0.3; // Adjust the reflection intensity (0.0 - no reflection, 1.0 - full reflection)
        waterMaterial.refractionTexture.level = 0.3; // Adjust the refraction intensity (0.0 - no refraction, 1.0 - full refraction)

        // Add objects to reflect and refract in the water material
        waterMaterial.addToRenderList(this.ground);

        // Apply the water material to the water mesh
        waterMesh.material = waterMaterial;

        // Position the water mesh slightly below the ground mesh
        waterMesh.position.y = -2;

        // Create a skybox
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 1000.0}, scene);
        const skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyMaterial.backFaceCulling = false;
        skyMaterial.inclination = 0.49; // The solar inclination, related to the solar azimuth in interval [0, 1]
        skyMaterial.azimuth = 0.25; // The solar azimuth in interval [0, 1]
        skyMaterial.luminance = 1.0; // The sky luminance factor
        skybox.material = skyMaterial;
        skybox.rotation.y = (Math.PI / 2);

        // Create another ground mesh (a plane) continuous with the island
        const continuousGround = BABYLON.MeshBuilder.CreateGround("continuousGround", {width: 200, height: 200, subdivisions: 10}, scene);

        // Position the continuous ground mesh at the same minimum height as the island ground
        continuousGround.position.y = -2;

        // Create a dirt material
        const dirtMaterial = new BABYLON.StandardMaterial("dirtMaterial", scene);

        // Load the dirt texture
        const dirtTexture = new BABYLON.Texture("./assets/textures/sand2.jpeg", scene);
        dirtTexture.uScale = 15; // Adjust these values to fit your texture
        dirtTexture.vScale = 15;
        dirtMaterial.diffuseTexture = dirtTexture;

        // Set the specular color to black to remove shininess
        dirtMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

        // Apply the dirt material to the continuous ground mesh
        continuousGround.material = dirtMaterial;

        // Add the continuous ground to the water material's render list
        waterMaterial.addToRenderList(continuousGround);


    }
}



// class GroundModel {
//     constructor(scene) {
//         this.ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, scene);
//         this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(
//             this.ground,
//             BABYLON.PhysicsImpostor.PlaneImpostor,
//             { mass: 0, restitution: 0.1, friction: 0.01 },
//             scene
//         );
//         // Create a grass material
//         const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);

//         // Load the grass texture
//         const grassTexture = new BABYLON.Texture("./assets/grass.jpeg", scene);
//         grassMaterial.diffuseTexture = grassTexture;

//         // Set the specular color to black to remove shininess
//         grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        
//         // // Apply the grass material to the ground mesh
//         this.ground.material = grassMaterial;
//     }
// }