const userToken = createToken(); // Assume createToken() is a function that returns the user's token
const tokenExists = checkToken(userToken);
var tCO2 = false;

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
function checkToken(token) {
    // Check if token exists in local storage
    if (localStorage.getItem(token) !== null) {
        return true;
    } else {
        return false;
    }
}

function getTokenValue(token) {
    // Get token value from local storage
    const tokenValue = localStorage.getItem(token);

    // Return token value
    return tokenValue;
}

function addNewToken(token) {
    // Set token and score to local storage
    localStorage.setItem(token, 0);
}

if (tokenExists) {
    console.log('Token exists in local storage.');
} else {
    console.log('Token does not exist in local storage.');
    addNewToken(userToken);
    console.log('New token added to local storage with score of 0.');
}

function updateScoreToken(token, score) {

    // Update score in local storage
    localStorage.setItem(token, score);

    // Log message indicating score update
    console.log(`Score for token ${token} has been updated to ${score}.`);
}

function resetScore(){ tCO2 = true; }