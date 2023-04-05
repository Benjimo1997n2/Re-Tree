// This script handles the score and user data
// Create a token for the user based on their browser data
function createToken() {
    // Gather browser data
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // Combine data into token
    const token = `${userAgent}_${language}_${platform}_${screenWidth}x${screenHeight}`;

    return token;
}
// The initial data
function createInitialUserData() {
    return {
        CO2: 0,
        CO2_per_sec: 1,
        plants: [],
    };
}
// Check if token exists in local storage
function checkToken(token) {
    // Check if token exists in local storage
    if (localStorage.getItem(token) !== null) {
        console.log(localStorage.getItem(token));
        return true;
    } else {
        return false;
    }
}
// Get token value from local storage
function getTokenValue(token) {
    // Get token value from local storage
    const tokenValue = localStorage.getItem(token);
    console.log(`Token value for token ${token} is ${tokenValue}.`);
    // Return parsed token value
    return JSON.parse(tokenValue);
}
// Update token value in local storage
function updateTokenValue(token, data) {
    // Convert user data object to a JSON string
    const dataString = JSON.stringify(data);
    // Update the token value in local storage
    localStorage.setItem(token, dataString);
}

// Create a token for the user
const userToken = createToken();
// Retrieve user data from local storage
const userData = getTokenValue(userToken);
const tokenExists = checkToken(userToken);
let score_flag = {value: false, data: userData};

// If token does not exist, create it
if (tokenExists == false) {
    updateTokenValue(userToken, createInitialUserData());
}
console.log(userData);

// Reset the score
function resetScore(){ 
    // userData.CO2 = 0;
    score_flag = {value: true, data: createInitialUserData()};
 }