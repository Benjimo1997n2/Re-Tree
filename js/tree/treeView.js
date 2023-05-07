class TreeView {
    constructor(treeModel, scene) {
        this.treeModel = treeModel;
        this.scene = scene;
        this.treeMesh = null;

        // this.init();
    }

    async init() {
        this.treeMesh = await this.loadTreeMesh();
    }

    async update() {
        // Dispose of the old mesh
        if (this.treeMesh) {
            this.treeMesh.forEach(mesh => {
                mesh.dispose();
            });
        }
    
        // Load the new mesh
        this.treeMesh = await this.loadTreeMesh();
    }    

    updateTreePosition(treeModel) {
        console.log("Updating tree position", treeModel); // Log the treeModel to check the values

        this.treeMesh.forEach(mesh => {
            if (mesh.treeID === treeModel.id) {
                mesh.position.set(treeModel.x, treeModel.y, treeModel.z);
                // Refresh the scene
            } else {
                console.log("mesh.treeID ", mesh.treeID);
                console.log("treeModel.id ", treeModel.id);
            }
        });
        // this.update()
    }    
    
    loadTreeMesh() {
        const { id, level, x, y, z } = this.treeModel;
        const rootPath = "assets/trees/";
        const modelFileName = `tree_lvl_${level}.obj`;
        const materialsFileName = `tree_lvl_${level}.mtl`;
    
        return new Promise((resolve) => {
            BABYLON.SceneLoader.ImportMesh("", rootPath, modelFileName + "?" + rootPath + materialsFileName, this.scene, (meshes, particleSystems, skeletons) => {
                // Iterate through all the meshes and set the required properties
                meshes.forEach((mesh, index) => {
                    mesh.id = `${id}_${index}`;
                    mesh.lvl = level;
                    mesh.position.set(x, y, z);
                    mesh.treeID = id; // Assign the treeID to the mesh

                    // Add a physics impostor to the mesh
                    mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                        mesh,
                        BABYLON.PhysicsImpostor.BoxImpostor,
                        { mass: 0, restitution: 0.1, friction: 0.5 },
                        this.scene
                    );
                });
    
                // Store all meshes as an array in this.treeMeshes
                this.treeMeshes = meshes;
    
                // Resolve the promise with the array of meshes
                resolve(meshes);
            });
        });
    }
}
