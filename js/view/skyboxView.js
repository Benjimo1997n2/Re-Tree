class SkyboxView {
    constructor(scene) {
        this.scene = scene;
    }

    createSkybox() {
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        
        // Create the CubeTexture with the correct path to the images
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox/sky", this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    }
}
