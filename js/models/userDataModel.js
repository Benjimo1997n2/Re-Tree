class UserDataModel {
    constructor() {
        this.userToken = this.createToken();
        this.userData = this.getTokenValue(this.userToken);
        if (!this.userData) {
            this.userData = {}; // Initialize as an empty object
        }
    }

    saveUserData() {
        this.updateTokenValue(this.userToken, this.userData);
    }

    createToken() {
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

    checkToken(token) {
        // Check if token exists in local storage
        if (localStorage.getItem(token) !== null) {
            return true;
        } else {
            return false;
        }
    }

    getTokenValue(token) {
        // Get token value from local storage
        const tokenValue = localStorage.getItem(token);
        // Return parsed token value
        return JSON.parse(tokenValue);
    }

    updateTokenValue(token, data) {
        // Convert user data object to a JSON string
        const dataString = JSON.stringify(data);
        // Update the token value in local storage
        localStorage.setItem(token, dataString);
    }
}