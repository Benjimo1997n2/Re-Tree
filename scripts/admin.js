// ADMIN CONTROL PANEL //
let cheat = document.getElementById("cheat");

cheat.onclick = function() {
    userData.CO2 = parseInt(document.getElementById("CO2").value);
    userData.CO2_per_sec = parseInt(document.getElementById("CO2_per_sec").value);
    score_flag = {value: true, data: userData};
};