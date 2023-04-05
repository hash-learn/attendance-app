import express from 'express';
import cors from 'cors';
import {v4 as uuid} from 'uuid';
import { getLearners, addLearner } from './models/learners.js';

const hostname = '127.0.0.1'; 
const port = 3000; 

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Welcome to new Attendance app, served by express!!')
})

app.get('/learners', async (req, res) => {
    const learners = await getLearners();
    console.log(learners)
    res.send(learners)
})

app.post('/add', (req, res) => {
    console.log(req.body);
    const blabla = req.body.name;
    const learner = {
        name: blabla,
        email: blabla+'@email.com'
    }
    addLearner(learner)
    res.end(`Successfully added ${learner}!! `)
})


app.post('/delete', (req, res) => {
    console.log(req.body);
    const {id} = req.body // req.body is an object as sent by the POST request in the client
    const learners = getLearners();
    const updatedLearners = learners.filter((learner) => learner.id !== id);
    setLearners(updatedLearners)
    res.end(`Successful deleted ${id}!`)
})



app.listen(port, hostname, () => {
    console.log(`Express server started at ${hostname}:${port}`)
})