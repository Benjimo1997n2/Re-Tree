class Ground {
    constructor(scene) {
        this.scene = scene;
    }
}
    
// GroundView.js
class GroundView {
    constructor(ground) {
        this.groundModel = ground;
        this.scene = ground.scene;
    }
    
    createGroundMesh() {
        const groundMesh = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "ground",
        "./assets/textures/heightMap.png",
        {
            width: 80,
            height: 80,
            subdivisions: 100,
            minHeight: -2.4,
            maxHeight: 0,
            onReady: () => {
                this.createGroundPhysics(groundMesh);
            },
        },
        this.scene
    );

    this.createGrassMaterial(groundMesh);
        this.groundModel.ground = groundMesh;
    }
    
    createGroundPhysics(groundMesh) {
        groundMesh.physicsImpostor = new BABYLON.PhysicsImpostor(
            groundMesh,
            BABYLON.PhysicsImpostor.HeightmapImpostor,
            { mass: 0, restitution: 0.1, friction: 0.01, isKinematic: true },
            this.scene
        );
    }
    
    createGrassMaterial(groundMesh) {
        const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", this.scene);
        const grassTexture = new BABYLON.Texture("./assets/textures/grass.jpeg", this.scene);
        grassTexture.uScale = 15;
        grassTexture.vScale = 15;
        grassMaterial.diffuseTexture = grassTexture;
        grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        groundMesh.material = grassMaterial;
    }
}