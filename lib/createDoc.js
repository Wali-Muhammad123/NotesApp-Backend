const firebase = require('../config/firebaseconfig');

const getUserDocument = async (uid) => {
  try {
    const doc = await firebase.db.collection('users').doc(uid).get();
    if (doc.exists) {
      console.log('Document data:', doc.data());
      return doc.data();
    } else {
      console.log('No such document!');
      return null; // Return null to handle the case where the document doesn't exist
    }
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};



const createUserDocument = async (uid,name) => {
  try {
    const doc = await firebase.db.collection('users').doc(uid).set({
      "user": uid,
      "name": name,
      createdAt: new Date(),
    });
    const parentDocumentRef = firebase.db.collection('users').doc(uid);
    console.log(parentDocumentRef);
    const subcollectionRef = parentDocumentRef.collection('goals'); //creating goals collection here
    await subcollectionRef.doc('dummy-document').set({});
    // await subcollectionRef.doc().set({
    //     "name":"dummy-goal 1",
    //     "createdAt": new Date(),
    //     "goals":{}
    // })
    await subcollectionRef.doc().set({
      "name":"Goal 1",
      "createdAt": new Date(),
      "goals":{}
    })
    await subcollectionRef.doc().set({
      "name":"Goal 2",
      "createdAt": new Date(),
      "goals":{}
    })
    await subcollectionRef.doc('dummy-document').delete();
    


    console.log('Document created!');
  } catch (error) {
    console.error('Error creating user document', error);
    throw error;
  }
}


const createGoal = async (uid, goalName) => {
  try {
    const newGoal = await firebase.db.collection('users').doc(uid).collection('goals').add({
      goalName: goalName, 
      createdAt: new Date(),
    });
    console.log('Goal created!');
    return newGoal;
  } catch(error) {
    console.error('Error creating goal', error);
    throw error;
  }
}



module.exports = {
  getUserDocument,
  createUserDocument,
  createGoal
}