require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const authController = require('./controllers/login');
const getUserController = require('./controllers/getUser');
const goalController = require('./controllers/createGoal');
const getGoalsController = require('./controllers/getGoals');
const dbHandlers = require('./lib/createDoc');
const firebase = require('./config/firebaseconfig');
const {verifyTokenMiddleware} = require('./middleware/authenticate');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyparser.json());

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
app.post('/api/register', async (req,res) => {
    try {
        const {email, password, name} = req.body;
        const userRecord = await firebase.admin.auth().createUser({
            email,
            password
        });
        const uid = userRecord.uid;
        await dbHandlers.createUserDocument(uid,name);
        res.status(201).send("User registered successfully");
    }
    catch(error){
        res.status(400).send(error.message);
    }
})
app.post('/api/login', authController.loginUser);
app.post('/api/getUser', getUserController);
app.post('/api/createGoal',verifyTokenMiddleware, goalController);
app.get('/api/getGoals', verifyTokenMiddleware, getGoalsController);
app.post('/api/refreshToken', authController.getRefreshToken);
app.post('/api/deleteGoal', verifyTokenMiddleware, async (req,res) => {
    try {
        const {uid, goalId} = req.body;
        const doc = await firebase.db.collection('users').doc(uid).collection('goals').doc(goalId).delete();
        res.status(200).send("Goal deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/',(req,res) => {
    res.send('Hello World');
})