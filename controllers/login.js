const {admin} = require('../config/firebaseconfig');
const {signIn, refreshToken} = require('../lib/fireBaseAPI/auth');

const loginUser = async (req,res) =>{
    const {email, password} = req.body;
    try {
        //const user = await firebase.admin.auth().getUserByEmail(email)
        const userToken = await signIn(email,password);
        //const token = await firebase.admin.auth().createCustomToken(user.uid);
        console.log(userToken);
        res.status(200).send(userToken);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getRefreshToken = async (req ,res) => {
    const {refreshtoken} = req.body;
    try {
        const userToken = await refreshToken(refreshtoken);
        res.status(200).send({userToken});
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    loginUser,
    getRefreshToken
}