class ContinuousGroundView {
    constructor(ground) {
        this.ground = ground.ground;
        this.scene = ground.scene;
    }
    
    createContinuousGroundMesh() {
        const continuousGround = BABYLON.MeshBuilder.CreateGround("continuousGround", {width: 200, height: 200, subdivisions: 10}, this.scene);
        continuousGround.position.y = -1.8;
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