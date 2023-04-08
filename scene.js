const createScene = async (engine) => {
    // Create the Babylon.js scene
    const scene = new BABYLON.Scene(engine);
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

    // Create a camera and set its position
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(renderCanvas, true);
    
    // Save the previous camera to restore it later (ant mode)
    previousCamera = scene.activeCamera;

    // Create a hemispheric light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 5, 0), scene);
    
    // Ground is 10x10 by default
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.PlaneImpostor,
        { mass: 0, restitution: 0.1, friction: 0.01 },
        scene
    );    
    
    // Generate the moving grass
    GenerateGrass(scene, ground);

    // Generate the trees
    const treeArray = GenerateTrees(scene, ground);

    BuildGui(scene);

    return scene;
};