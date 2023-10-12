const {createGoal} = require('../lib/docHandler')
module.exports = async (req,res) => {
    const {uid, goalName} = req.body;
    try {
        const newGoal = await createGoal(uid, goalName);
        res.status(200).send(newGoal);
    } catch (error) {
        res.status(400).send(error.message);
    }
}