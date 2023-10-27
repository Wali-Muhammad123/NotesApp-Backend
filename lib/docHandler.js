const {db} = require('../config/firebaseconfig');

const createGoal = async (uid, goalName) => {
    try {
      const newGoal = await db.collection('users').doc(uid).collection('goals').add({
        goalName: goalName,
        goals: {}, 
        createdAt: new Date(),
      });
      console.log('Goal created!');
      return newGoal;
    } catch(error) {
      console.error('Error creating goal', error);
      throw error;
    }
  }

  const getGoals = async (uid) => {
    try {
      const goals = await db.collection('users').doc(uid).collection('goals').get()
      .then((querysnapshot) => {
        let goals = [];
        querysnapshot.forEach((doc) => {
            goals.push({
                goalName: doc.data(),
                id: doc.id
            })
        })
        return goals;
      })
      return goals;
    } catch(error) {
      console.error('Error getting goals', error);
      throw error;
    }
  }

  module.exports = {
    createGoal,
    getGoals
  }