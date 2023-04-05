const treesShop = {
    0: { price: 10, CO2_per_sec: 1 },
    1: { price: 100, CO2_per_sec: 10 },
    2: { price: 1000, CO2_per_sec: 100 },
}

const buyTree = function(tree, userData) {
    console.log(tree.lvl);
    const treeData = treesShop[tree.lvl];

    if (treeData && userData.CO2 >= treeData.price) {
        console.log(userData);
        userData.CO2 -= treeData.price;
        userData.CO2_per_sec += treeData.CO2_per_sec;
        tree.lvl += 1;
        
    }

    return userData;
}
