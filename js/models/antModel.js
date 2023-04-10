class AntModel {
    constructor(scene) {
        this.scene = scene;
        this.forward = new BABYLON.Vector3(0, 0, 1);
    }

    setForward(x, y, z) {
        this.forward.x = x;
        this.forward.y = y;
        this.forward.z = z;
    }
}