const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const firebase = require('./config/firebaseconfig');
const login = require('./controllers/login');
const getUserController = require('./controllers/getUser');
const goalController = require('./controllers/createGoal');
const getGoalsController = require('./controllers/getGoals');
const dbHandlers = require('./lib/createDoc');
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
        const {email, password} = req.body;
        const userRecord = await firebase.admin.auth().createUser({
            email,
            password
        });
        const uid = userRecord.uid;
        await dbHandlers.createUserDocument(uid);
        res.status(201).send("User registered successfully");
    }
    catch(error){
        res.status(400).send(error.message);
    }
})
app.post('/api/login', login);
app.post('/api/getUser', getUserController);
app.post('/api/createGoal', goalController);
app.post('/api/getGoals', verifyTokenMiddleware, getGoalsController);

app.get('/',(req,res) => {
    res.send('Hello World');
})