import fs from 'fs'
import {Learner} from './connection.js'

let learners = JSON.parse(fs.readFileSync('./models/learners.json'));

export async function getLearners() {
    const learners = await Learner.find()
    return learners;
}

export const addLearner = (learner) => {
    const learnerDoc = new Learner(learner);
    learnerDoc.save()
    .then(() => {
        console.log('Successfully added learner!!')
    }).catch((err) => {
        console.error('Error adding learner', err)
    })
}


export const setLearners = (updatedLearners) => {
    learners = updatedLearners
}