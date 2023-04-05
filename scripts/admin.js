// ADMIN CONTROL PANEL //
let cheat = document.getElementById("cheat");
let buyTreeButton = document.getElementById("buy_tree");

const updateUserDataPannel = function() {
    document.getElementById("CO2_txt").innerHTML = "CO2: " + userData.CO2;
    document.getElementById("CO2_per_sec_txt").innerHTML = "CO2/sec: " + userData.CO2_per_sec;
};

cheat.onclick = function() {
    userData.CO2 = parseInt(document.getElementById("CO2").value);
    userData.CO2_per_sec = parseInt(document.getElementById("CO2_per_sec").value);
    score_flag = {value: true, data: userData};
};

buyTreeButton.onclick = function() {
    newUserData = buyTree(selectedTree, userData);
    console.log(selectedTree.lvl)

    userData.CO2 = newUserData.CO2;
    userData.CO2_per_sec = newUserData.CO2_per_sec;

    changeLeafColor(selectedTree, selectedTree.color);
};

const AdminSelectedTree = function(tree) {
    document.getElementById("tree_id").innerHTML = "Tree's id: " + tree.id;
    document.getElementById("tree_lvl").innerHTML = "Current level: " + tree.lvl;
    document.getElementById("tree_price").innerHTML = "Lvl" + (tree.lvl + 1) + " price: " + treesShop[tree.lvl].price;
    document.getElementById("tree_CO2_per_sec").innerHTML = "Lvl" + (tree.lvl + 1) + " CO2/sec: " + treesShop[tree.lvl].CO2_per_sec;
    document.getElementById("tree_color").innerHTML = "Color: " + treesShop[tree.lvl].color;
    document.getElementById("buy_tree").disabled = false;
}