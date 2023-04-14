class ContinuousGroundView {
    constructor(ground, groundSize) {
        this.ground = ground.ground;
        this.groundSize = groundSize;
        this.scene = ground.scene;
    }
    
    createContinuousGroundMesh() {
        const continuousGround = BABYLON.MeshBuilder.CreateBox("continuousGround", {width: this.groundSize, depth: this.groundSize, height: 4}, this.scene); // Adjusted height and depth values
        continuousGround.position.y = -4; // Adjusted the position to make sure the ground is placed correctly
        this.continuousGround = continuousGround;
        this.createDirtMaterial(continuousGround);
    }
    
    createDirtMaterial(continuousGround) {
        const dirtMaterial = new BABYLON.StandardMaterial("dirtMaterial", this.scene);
        const dirtTexture = new BABYLON.Texture("./assets/textures/sand2.jpeg", this.scene);
        dirtTexture.uScale = 15;
        dirtTexture.vScale = 15;
        dirtMaterial.diffuseTexture = dirtTexture;
        dirtMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        continuousGround.material = dirtMaterial;
    }
}    
