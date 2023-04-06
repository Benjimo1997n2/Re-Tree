const treesSize = {
    0: {sizeBranch: 10, sizeTrunk: 15},
    1: {sizeBranch: 15, sizeTrunk: 20},
    2: {sizeBranch: 20, sizeTrunk: 25},
    3: {sizeBranch: 25, sizeTrunk: 30},
}

const randomNumber = function(min, max) {
    return Math.random() * (max - min) + min;
};

const GenerateTrees = function(scene, ground) {
    const leafMaterial = new BABYLON.StandardMaterial("leafMaterial", scene);
    leafMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
  
    const woodMaterial = new BABYLON.StandardMaterial("wood", scene);
    const woodTexture = new BABYLON.WoodProceduralTexture("woodtexture", 512, scene);
    woodTexture.ampScale = 50;
    woodMaterial.diffuseTexture = woodTexture;

    // const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const treeArray = []; // Create an array to store the tree objects

    const numTrees = 25;
    const treeSpacing = 2; // Adjust this value to increase or decrease the space between trees
    const treesPerRow = Math.ceil(Math.sqrt(numTrees)); // Calculate the number of trees per row

    for (let i = 0; i < numTrees; i++) {
        const tree = QuickTreeGenerator(treesSize[userData.plants[i].lvl].sizeBranch, treesSize[userData.plants[i].lvl].sizeTrunk, 5, woodMaterial, leafMaterial, scene);

        // Randomly animate the tree's leaves
        const randomFrom = 0;
        const randomTo = 75;
        // const randomSpeedRatio = randomNumber(0.75, 1.25);
        const randomSpeedRatio = randomNumber(0.25, 0.75);

        // Animate the tree's leaves
        scene.beginAnimation(tree.getChildMeshes()[0], randomFrom, randomTo, true, randomSpeedRatio);

        // Calculate the tree's x and z position based on the index and spacing
        const xPos = (i % treesPerRow) * treeSpacing - (ground.scaling.x / 2 - treeSpacing / 2);
        const zPos = Math.floor(i / treesPerRow) * treeSpacing - (ground.scaling.z / 2 - treeSpacing / 2);

        tree.lvl = userData.plants[i].lvl;
        tree.id = userData.plants[i].id;
        tree.position.x = xPos - 4.5;
        tree.position.y = 0.2;
        tree.position.z = zPos - 4.5;
        treeArray.push(tree); // Add the tree object to the treeArray
        if(userData.plants[i].color) {
            changeLeafColor(tree, new BABYLON.Color3(userData.plants[i].color.r, userData.plants[i].color.g, userData.plants[i].color.b));
        }
    }

    scene.onPointerDown = function (evt, pickResult) {
        if (pickResult.hit && pickResult.pickedMesh) {
            const pickedMesh = pickResult.pickedMesh;
    
            // Check if the picked mesh is part of a tree (either leaves or trunk)
            if (pickedMesh.parent && pickedMesh.parent instanceof BABYLON.Mesh) {
                const tree = pickedMesh.parent;
    
                // Check if the tree has a leaves and trunk child
                if (tree.getChildMeshes().some(child => child.name === "sphere") && tree.getChildMeshes().some(child => child.name === "trunk")) {
                    // Call the onTreeClicked function with the tree as its parameter
                    onTreeClicked(tree);
                    AdminSelectedTree(tree);
                }
            }
        }
    };
    

    return treeArray;
}

var selectedTree = null;

function onTreeClicked(tree) {
    selectedTree = tree;
}


const changeLeafColor = function(clickedMesh, color = null) {
    // Make sure the clicked mesh is part of a tree
    // if (clickedMesh.parent && clickedMesh.parent.leafMaterial !== undefined) {
        // const tree = clickedMesh.parent;
        const tree = clickedMesh;

        // Change the leaf material's color
        const newLeafMaterial = tree.leafMaterial.clone("newLeafMaterial");
        // newLeafMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.8, 0); // Set the new color here
        // console.log(tree.color);


        if(color) {
            newLeafMaterial.diffuseColor = color;
        }
        else {
            newLeafMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.8, 0); // Set the new color here
        }

        // Update the tree's leaves with the new material
        tree.getChildMeshes().forEach(child => {
            if (child.material === tree.leafMaterial) {
                child.material = newLeafMaterial;
            }
        });

        // console.log(tree.leafMaterial.diffuseColor.toString);
        // Update the tree's leafMaterial reference
        tree.leafMaterial = newLeafMaterial;
    // }
}

