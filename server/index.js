import express from 'express'
import cors from 'cors';
import { getLearners, addLearner, markAttendance } from './models/learner.js'

const host = '127.0.0.1'
const port = 3000

const app = express()

app.use(cors())  ///  Middleware
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Welcome to the Attendance server!!')
})

app.get('/learners', async (req, res) => {
    const learners = await getLearners()
    res.send(learners);
})

app.post('/addlearner', (req, res) => {
    const {name, email} = req.body;
    const learner = {name, email}
    addLearner(learner);
    res.send('Processing adding a learner')
})

app.get('/mark/:id/:status', async (req, res) => {
    const {id, status} = req.params
    const date = new Date().toISOString()
    const markEntry = {
        learner_id : id,
        date,
        status : status === 'present' ? true : false
    }
    await markAttendance(markEntry);
    res.send(`Entry saved to database`)
})

app.listen(port, host, () => {
    console.log(`Server started at ${host}:${port}`)
})