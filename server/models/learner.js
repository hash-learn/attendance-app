import fs from 'fs'
import {Learner, Status} from './connection.js'

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

export const markAttendance = (statusObj) => {
    const statusDoc = new Status(statusObj);
    statusDoc.save()
    .then(() => {
        console.log('Successfully maked attendance!!')
    }).catch((err) => {
        console.error('Error marking attendance', err)
    })
}

export const setLearners = (updatedLearners) => {
    learners = updatedLearners
}