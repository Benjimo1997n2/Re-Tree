// const getAntCamera = async function(){
//     // Create a camera and set its position
//     const camera = new BABYLON.FollowCamera("followCamera", new BABYLON.Vector3(0, 10, -10), scene);

//     // Create the ant model
//     const ant = await createAnt(scene);
//     camera.lockedTarget = ant; // Target the camera to follow the ant
//     camera.radius = 3; // The distance from the ant to the camera
//     camera.heightOffset = 1; // The height of the camera above the ant

//     return camera;
// }

const playAnt = async function(scene){
    // Create a camera and set its position
    // const camera = new BABYLON.FollowCamera("followCamera", new BABYLON.Vector3(0, 10, -10), scene);

    // Create the ant model
    const ant = await createAnt(scene);
    // camera.lockedTarget = ant; // Target the camera to follow the ant
    // camera.radius = 3; // The distance from the ant to the camera
    // camera.heightOffset = 1; // The height of the camera above the ant

    // Keyboard controls
    const inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            (evt) => { inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            (evt) => { inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; }
        )
    );

    // Move the ant
    const speed = 0.1;
    const jumpHeight = 0.25;
    let isJumping = false;
    scene.onBeforeRenderObservable.add(() => {
        // Move forward
        if (inputMap["z"]) {
            ant.moveWithCollisions(ant.forward.scale(-speed));
            updateAntForwardVector(ant);
        }
        if (inputMap["s"]) {
            ant.moveWithCollisions(ant.forward.scale(speed));
            updateAntForwardVector(ant);
        }
        // Rotate
        const rotationSpeed = 2;
        if (inputMap["d"]) {
            // ant.rotation.y -= rotationSpeed;
            ant.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, -rotationSpeed, 0));
            let isColliding = false;
            for (let i = 0; i < scene.meshes.length; i++) {
            const mesh = scene.meshes[i];
            if (mesh.name !== ant.name && ant.intersectsMesh(mesh)) {
                isColliding = true;
                break;
            }
            }

            if (isColliding) {
            console.log("Ant is colliding!");
            }
            updateAntForwardVector(ant);
        }
        if (inputMap["q"]) {
            // ant.rotation.y += rotationSpeed;
            ant.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(0, rotationSpeed, 0));
            updateAntForwardVector(ant);
        }
        // Jump
        if (inputMap[" "] && !isJumping) {
            jump(ant, jumpHeight, scene);
            isJumping = true;
        }
    
        ant.forward = new BABYLON.Vector3(Math.sin(ant.rotation.y), 0, Math.cos(ant.rotation.y));
    
        // Reset isJumping flag when space key is released
        scene.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnKeyUpTrigger,
                (evt) => {
                    if (evt.sourceEvent.key == " ") {
                        isJumping = false;
                    }
                }
            )
        );
    });    
}

async function createAnt(scene) {
    // Replace this with a real model
    const ant = BABYLON.MeshBuilder.CreateBox("ant", {size: 0.5}, scene);

    // Add physics to the ant
    ant.physicsImpostor = new BABYLON.PhysicsImpostor(ant, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, scene);

    ant.position.y = 0.25; // Raise the ant to be above the ground
    ant.checkCollisions = true;
    ant.ellipsoid = new BABYLON.Vector3(0.25, 0.25, 0.25); // Set the collision ellipsoid
    ant.ellipsoidOffset = new BABYLON.Vector3(0, 0.25, 0); // Set the collision ellipsoid offset
    ant.forward = new BABYLON.Vector3(Math.sin(ant.rotation.y), 0, Math.cos(ant.rotation.y));

    return ant;
}

function updateAntForwardVector(ant) {
    ant.forward = new BABYLON.Vector3(Math.sin(ant.rotation.y), 0, Math.cos(ant.rotation.y));
}

function jump(ant, jumpHeight, scene) {
    // Check if the ant is on the ground
    const groundRay = new BABYLON.Ray(ant.position, new BABYLON.Vector3(0, -1, 0), 1);
    const groundHit = scene.pickWithRay(groundRay);

    if (groundHit.hit) {
        const initialVelocity = Math.sqrt(-2 * scene.gravity.y * jumpHeight);
        ant.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, initialVelocity, 0));
    }
}