// ADMIN CONTROL PANEL //
let cheat = document.getElementById("cheat");

const updateUserDataPannel = function() {
    document.getElementById("CO2_txt").innerHTML = "CO2: " + userData.CO2;
    document.getElementById("CO2_per_sec_txt").innerHTML = "CO2/sec: " + userData.CO2_per_sec;
};

cheat.onclick = function() {
    userData.CO2 = parseInt(document.getElementById("CO2").value);
    userData.CO2_per_sec = parseInt(document.getElementById("CO2_per_sec").value);
    score_flag = {value: true, data: userData};
};