const axios = require('axios');


const signIn = async (user,password) =>{
    const data = {
        "email": user,
        "password": password,
        "returnSecureToken":true
    };
    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
            data
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error("Invalid email or password");
    }
} 
const refreshToken = async (refreshToken) => {
    const data = {
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
    };
    try {
        const response = await axios.post(
            `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,
            data
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return "Invalid email or password";
    }
}

module.exports = {
    signIn,
    refreshToken
}