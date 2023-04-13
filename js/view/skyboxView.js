class SkyboxView {
    constructor(scene) {
        this.scene = scene;
    }
    
    createSkybox() {
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 1000.0}, this.scene);
        const skyMaterial = new BABYLON.SkyMaterial("skyMaterial", this.scene);
        skyMaterial.backFaceCulling = false;
        skyMaterial.inclination = 0.49;
        skyMaterial.azimuth = 0.25;
        skyMaterial.luminance = 1.0;
        skybox.material = skyMaterial;
        skybox.rotation.y = (Math.PI / 2);
    }
}    