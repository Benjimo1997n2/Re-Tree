class AntView {
    constructor(antModel, scene) {
        this.antModel = antModel;
        this.scene = scene;
        this.antMesh = null;
        // this.init();
    }

    async init() {
        this.antMesh = await this.loadAntMesh();
    }

    loadAntMesh() {
        return new Promise((resolve, reject) => {
          BABYLON.SceneLoader.ImportMesh("", "assets/ant/", "Ant_obj.obj", this.scene, (newMeshes) => {
            const ant = newMeshes[0];
            ant.name = "ant";
      
            // Set the material of the mesh to use the texture
            const material = new BABYLON.StandardMaterial("antMaterial", this.scene);
            material.diffuseTexture = new BABYLON.Texture("assets/ant/tex/Ant_color.jpg", this.scene);
            material.specularColor = new BABYLON.Color3.Black(); // Set the specular color to black
            ant.material = material;
      
            // Resize the mesh if necessary
            ant.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
      
            // Move the mesh up by 2 units in the Y-axis
            ant.position.y = 4.35;
      
            this.antModel.antMesh = ant;
            resolve(ant);
          }, null, (error) => {
            reject(error);
          });
        });
      }
      
    
    async createAnt() {
        await this.init();
        const ant = this.antMesh;

        ant.physicsImpostor = new BABYLON.PhysicsImpostor(ant, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 1, restitution: 0, friction: 0.1 }, this.scene);

        ant.position.y = 0.25;
        ant.checkCollisions = true;
        ant.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25);
        ant.ellipsoidOffset = new BABYLON.Vector3(0, 0.25, 0);

        this.antModel.antMesh = ant;
        return ant;
    }

    updateAntForwardVector(ant) {
        const x = Math.sin(ant.rotation.y);
        const y = 0;
        const z = Math.cos(ant.rotation.y);
        this.antModel.setForward(x, y, z);
    }
}

