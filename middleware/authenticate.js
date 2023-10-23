const {admin} = require('../config/firebaseconfig');

const verifyTokenMiddleware = async (req, res, next) => {
    const idToken = req.headers.authorization;
    try {
        const token= idToken.split(' ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log(decodedToken);
        req.user = decodedToken;
        next();
    } catch(error){
        res.status(401).json({'error':'Invalid or expired Token'});
    }
}

module.exports = {
    verifyTokenMiddleware
}