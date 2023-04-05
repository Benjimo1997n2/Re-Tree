// Define the treesShop object, containing data for each level of the tree
// including price, CO2_per_sec, and color.
const treesShop = {
    0: { price: 10, CO2_per_sec: 1, color: new BABYLON.Color3(1, 0, 0) },
    1: { price: 100, CO2_per_sec: 10, color: new BABYLON.Color3(0, 1, 0) },
    2: { price: 1000, CO2_per_sec: 100, color: new BABYLON.Color3(0, 0, 1) },
}

// Define the buyTree function, which takes a tree and userData as arguments.
const buyTree = function(tree, userData) {
    // Log the tree's current level
    console.log(tree.lvl);

    // Get the data for the current level of the tree from the treesShop object
    const treeData = treesShop[tree.lvl];

    // Check if the tree data exists and if the user has enough CO2 to buy the tree
    if (treeData && userData.CO2 >= treeData.price) {
        // Log the user data before making changes
        console.log(userData);

        // Deduct the price of the tree from the user's CO2
        userData.CO2 -= treeData.price;

        // Increase the user's CO2_per_sec by the amount specified in the tree data
        userData.CO2_per_sec += treeData.CO2_per_sec;

        // Change the tree's color based on its new level
        tree.color = treesShop[tree.lvl].color;

        // Increment the tree's level by 1
        tree.lvl += 1;
    }

    // Return the updated user data
    return userData;
}