import { Learner } from "./connection.js";


const addLearner = (learner) => {
    const learnerDoc = new Learner(learner);
    learnerDoc.save()
    .then(() => {
    console.log('Learner saved')    
    }).catch((err) => {
        console.log('Error adding the learner ', err)
    })
};

async function getLearners() {
    const learners = await Learner.find()
    console.log('Received learners')
    return learners;
} 

export {addLearner, getLearners}
