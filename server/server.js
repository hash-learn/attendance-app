import express from 'express';
import cors from 'cors';
import fs from 'fs';
import {v4 as uuid} from 'uuid';

import {getLearners, setLearners} from './learnersmodel.js';

const hostname = '127.0.0.1'; 
const port = 3000; 

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to new Attendance app, served by express!!')
})

app.get('/learners', (req, res) => {
    res.send(getLearners())
})

app.get('/add/:name', (req, res) => {
    console.log(req.params)
    const learners = getLearners();
    const blabla = req.params.name
    const learner = {
        id: uuid(),
        name: blabla
    }
    console.log(learners);
    const updatedLearners = [
        ...learners,
        learner
    ]
    setLearners(updatedLearners)
    res.end(`Successfully added ${blabla}!! `) 
})

app.post('/delete', (req, res) => {
    console.log(req.body)
    const {id} = req.body // req.body is an object as sent by the POST request in the client
    const learners = getLearners();
    const updatedLearners = learners.filter((learner) => learner.id !== id);
    setLearners(updatedLearners)
    res.end(`Successful deleted ${id}!`)
})



app.listen(port, hostname, () => {
    console.log(`Express server started at ${hostname}:${port}`)
})
