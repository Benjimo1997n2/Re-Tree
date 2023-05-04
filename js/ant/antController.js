class AntController {
    constructor(antModel, antView, scene) {
        this.antModel = antModel;
        this.antView = antView;
        this.scene = scene;
        this.inputMap = {};
        this.speed = 0.1;
        this.jumpHeight = 0.25;
        this.isJumping = false;

        // Initialize keys states
        this.keyStates = {
            z: false,
            q: false,
            s: false,
            d: false,
        };

        // Register keyboard event listeners
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    setupControls() {
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyDownTrigger,
                (evt) => { this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; }
            )
        );

        this.scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyUpTrigger,
                (evt) => { this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; }
            )
        );
    }

    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (this.keyStates.hasOwnProperty(key)) {
            this.keyStates[key] = true;
        }
    }

    handleKeyUp(event) {
        const key = event.key.toLowerCase();
        if (this.keyStates.hasOwnProperty(key)) {
            this.keyStates[key] = false;
        }
    }

    update() {
        if (this.keyStates.z) {
          this.antView.antMesh.position.z += this.speed;
          this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x + 1, this.antView.antMesh.position.y, this.antView.antMesh.position.z));
        }
        if (this.keyStates.q) {
          this.antView.antMesh.position.x -= this.speed;
          this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x, this.antView.antMesh.position.y, this.antView.antMesh.position.z + 1));
        }
        if (this.keyStates.s) {
          this.antView.antMesh.position.z -= this.speed;
          this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x - 1, this.antView.antMesh.position.y, this.antView.antMesh.position.z));
        }
        if (this.keyStates.d) {
          this.antView.antMesh.position.x += this.speed;
          this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x, this.antView.antMesh.position.y, this.antView.antMesh.position.z - 1));
        }
        if (this.keyStates.d && this.keyStates.z) {
          this.antView.antMesh.position.x += this.speed;
          this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x + 1, this.antView.antMesh.position.y, this.antView.antMesh.position.z - 1));
        }
        if (this.keyStates.d && this.keyStates.s) {
            this.antView.antMesh.position.x += this.speed;
            this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x - 1, this.antView.antMesh.position.y, this.antView.antMesh.position.z - 1));
        }
        if (this.keyStates.q && this.keyStates.z) {
            this.antView.antMesh.position.x -= this.speed;
            this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x + 1, this.antView.antMesh.position.y, this.antView.antMesh.position.z + 1));
        }
        if (this.keyStates.q && this.keyStates.s) {
            this.antView.antMesh.position.x -= this.speed;
            this.antView.antMesh.lookAt(new BABYLON.Vector3(this.antView.antMesh.position.x - 1, this.antView.antMesh.position.y, this.antView.antMesh.position.z + 1));
        }
      }
      
    
    jump(ant, jumpHeight, scene) {
        const groundRay = new BABYLON.Ray(ant.position, new BABYLON.Vector3(0, -1, 0), 1);
        const groundHit = scene.pickWithRay(groundRay);
    
        if (groundHit.hit) {
            const initialVelocity = Math.sqrt(-2 * scene.gravity.y * jumpHeight);
            ant.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, initialVelocity, 0));
        }
    }
}    