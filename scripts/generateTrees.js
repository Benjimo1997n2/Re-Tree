const generateTrees = function(scene, ground) {
    const leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);
  
    const woodMaterial = new BABYLON.StandardMaterial("wood", scene);
    const woodTexture = new BABYLON.WoodProceduralTexture("woodtexture", 512, scene);
    woodTexture.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture;

    // const tree = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
    // tree.position.x = 0;
    // tree.position.y = 0.2;

    // const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const treeArray = []; // Create an array to store the tree objects

    const numTrees = 25;
    const treeSpacing = 2; // Adjust this value to increase or decrease the space between trees
    const treesPerRow = Math.ceil(Math.sqrt(numTrees)); // Calculate the number of trees per row

    for (let i = 0; i < numTrees; i++) {
        const tree = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);

        // Calculate the tree's x and z position based on the index and spacing
        const xPos = (i % treesPerRow) * treeSpacing - (ground.scaling.x / 2 - treeSpacing / 2);
        const zPos = Math.floor(i / treesPerRow) * treeSpacing - (ground.scaling.z / 2 - treeSpacing / 2);

        tree.lvl = 0;
        tree.position.x = xPos - 4.5;
        tree.position.y = 0.2;
        tree.position.z = zPos - 4.5;
        treeArray.push(tree); // Add the tree object to the treeArray

        // console.log(xPos, zPos); // Log the tree's x and z position
    }
    console.log(treeArray[0].lvl); // Log the tree's x and z position

    // Add a pointerDown event to the scene
    scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit && pickResult.pickedMesh) {
            changeLeafColor(pickResult.pickedMesh);
        }
    };

    return treeArray;
}

const changeLeafColor = function(clickedMesh) {
    console.log(clickedMesh.parent.leafMaterial);
    // Make sure the clicked mesh is part of a tree
    if (clickedMesh.parent && clickedMesh.parent.leafMaterial !== undefined) {
        const tree = clickedMesh.parent;

        // Change the leaf material's color
        const newLeafMaterial = tree.leafMaterial.clone("newLeafMaterial");
        newLeafMaterial.diffuseColor = new BABYLON.Color3(0.1, 0, 1); // Set the new color here

        // Update the tree's leaves with the new material
        tree.getChildMeshes().forEach(child => {
            if (child.material === tree.leafMaterial) {
                child.material = newLeafMaterial;
            }
        });

        console.log(tree.leafMaterial.diffuseColor.toString);
        // Update the tree's leafMaterial reference
        tree.leafMaterial = newLeafMaterial;
    }
}

