const {getGoals} = require('../lib/docHandler')

module.exports = async (req,res) => {
    const uid = req.user.uid;
    try {
        const goals = await getGoals(uid);
        console.log(goals);
        res.status(200).send(goals);
    } catch (error) {
        res.status(400).send(error.message);
    }
}