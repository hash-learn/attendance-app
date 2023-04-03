import express from 'express';
import cors from 'cors';
import fs from 'fs';
import {v4 as uuid} from 'uuid';

const LEARNERS_FILE = './learners.json';

const getLearners = () => {
    return JSON.parse(fs.readFileSync(LEARNERS_FILE));
}

const setLearners = (learners) => {
    fs.writeFileSync( LEARNERS_FILE, JSON.stringify(learners));
}

const hostname = '127.0.0.1'; 
const port = 3000; 

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Welcome to new Attendance app, served by express!!')
})

app.get('/learners', (req, res) => {
    res.send(getLearners())
})

app.post('/add', (req, res) => {
    const learners = getLearners();
    console.log(req.body);
    const blabla = req.body.name;
    const learner = {
        id: uuid(),
        name: blabla,
    }
    console.log(learners);
    const updatedLearners = [
        ...learners,
        learner
    ]
    setLearners(updatedLearners)
    res.end(`Successfully added ${learner.id}!! `) 
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