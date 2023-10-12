const getUserDocument = require('../lib/createDoc');

module.exports =  async (req, res) => {
    const { uid } = req.body;
    console.log(uid);
    try {
        const data = await getUserDocument(uid);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}