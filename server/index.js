import http from 'http';
import fs from 'fs';
import { v4 as uuid} from 'uuid';

const hostname = '127.0.0.1'; 
const port = 3000; 

const LEARNERS_FILE = './learners.json'

// Verify what happens if you do not have a file learners.json. Ca you handle the code in that case?
let learners = JSON.parse(fs.readFileSync(LEARNERS_FILE));

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if(req.url === '/') {
        res.end('Welcome to the Attendance App!');
    } else if(req.url === '/learners') {
        res.end(JSON.stringify(learners))
    } else if(req.url.startsWith('/add') && req.method === 'GET') { // `/add/<>` 
            const name = decodeURI(req.url.split('/')[2]);
            const learner = {
                id: uuid(),
                name
            }
            console.log(learners);
            const updatedLearners = [
                ...learners,
                learner
            ]
            fs.writeFileSync( LEARNERS_FILE, JSON.stringify(updatedLearners));
            res.end(`Successfully added ${name}! `)    
    } else if (req.url.startsWith('/delete')) { // `/delete/<>`
        const id = decodeURI(req.url.split('/')[2]);
        const updatedLearners = learners.filter((learner) => learner.id !== id);
        fs.writeFileSync( LEARNERS_FILE, JSON.stringify(updatedLearners));
        /* 
        Uncomment the following line and verify!
        learners = updatedLearners;        
        */
        res.end(`Successful deleted ${id}!`)
    }
});

server.listen(port, hostname, () => {
    console.log(`Server started at ${hostname}:${port}...`)
})





