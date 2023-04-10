class GroundModel {
    constructor(scene) {
        this.ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 50, height: 50}, scene);
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            this.ground,
            BABYLON.PhysicsImpostor.PlaneImpostor,
            { mass: 0, restitution: 0.1, friction: 0.01 },
            scene
        );
        // Create a grass material
        const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);

        // Load the grass texture
        const grassTexture = new BABYLON.Texture("./assets/grass.jpeg", scene);
        grassMaterial.diffuseTexture = grassTexture;

        // Set the specular color to black to remove shininess
        grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        
        // // Apply the grass material to the ground mesh
        this.ground.material = grassMaterial;
    }
}