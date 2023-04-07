import http from 'http';
import { v4 as uuid} from 'uuid';
import {parse} from 'querystring';

import {getLearners, setLearners} from './learnersmodel.js';

const hostname = '127.0.0.1'; 
const port = 3000; 



const server = http.createServer((req, res) => {
    // CORS related START
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // CORS related END
    console.log(req.url, req.method);
    if(req.url === '/') {
        res.end('Welcome to the Attendance App!');
    } else if(req.url === '/learners') {
        const learners = getLearners();
        res.end(JSON.stringify(learners))
    } else if(req.url.startsWith('/add') && req.method === 'POST') { // `/add/<>` 
            const learners = getLearners();
            const mtd = req.method;
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const data = parse(body)
                const name = data.name
                const learner = {
                    id: uuid(),
                    name
                }
                console.log(learners);
                const updatedLearners = [
                    ...learners,
                    learner
                ]
                setLearners(updatedLearners)
                res.end(`Successfully added ${name}! Received a ${mtd} request `)    
                });
    
            // const name = decodeURI(req.url.split('/')[2]);
    } else if (req.url === '/delete' && req.method === 'POST') { // `/delete/<>`
        // const id = decodeURI(req.url.split('/')[2]);
        const learners = getLearners();
        console.log('Received delete request')
        let body = '';
        req.on('data', chunk => {
            console.log('Received...', chunk.toString())
            body += chunk.toString();
        });
        req.on('end', () => {
        const data = parse(body)
        console.log(body)
        const id = data.id
        const updatedLearners = learners.filter((learner) => learner.id !== id);
        setLearners(updatedLearners)
        res.end(`Successful deleted ${id}!`)
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server started at ${hostname}:${port}...`)
})





