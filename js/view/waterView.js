class WaterView {
    constructor(ground, continuousGround, groundSize) {
        this.ground = ground.ground;
        this.groundSize = groundSize;
        this.scene = ground.scene;
        this.continuousGround = continuousGround;
    }
    
    createWaterMesh() {
        const waterMesh = BABYLON.MeshBuilder.CreateGround("waterMesh", {width: this.groundSize, height: this.groundSize}, this.scene);
        waterMesh.position.y = -1.5;
        this.createWaterMaterial(waterMesh);
    }
    
    createWaterMaterial(waterMesh) {
        const waterMaterial = new BABYLON.WaterMaterial("waterMaterial", this.scene);
        waterMaterial.bumpTexture = new BABYLON.Texture("./assets/textures/waterBump.png", this.scene);
        waterMaterial.windForce = -5;
        waterMaterial.waveHeight = 0.1;
        waterMaterial.bumpHeight = 0.1;
        waterMaterial.waveLength = 0.1;
        waterMaterial.colorBlendFactor = 0;
        waterMaterial.alpha = 0.8;
        waterMaterial.reflectionTexture.level = 0.3;
        waterMaterial.refractionTexture.level = 0.3;
        
        // Render the grass
        // waterMaterial.addToRenderList(this.ground);
        // Render the continuous ground (sand)
        waterMaterial.addToRenderList(this.continuousGround);
        waterMesh.material = waterMaterial;
    }
}        