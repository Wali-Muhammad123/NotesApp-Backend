const firebase = require('../config/firebaseconfig');
module.exports = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await firebase.admin.auth().getUserByEmail(email);
        console.log(user);
        const token = await firebase.admin.auth().createCustomToken(user.uid);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error.message);
    }
}