import http from 'http';
import { v4 as uuid} from 'uuid';
import {parse} from 'querystring';

import {getLearners, setLearners} from './learnersmodel';

const hostname = '127.0.0.1'; 
const port = 3000; 



const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    console.log(req.url, req.method);
    if(req.url === '/') {
        res.end('Welcome to the Attendance App!');
    } else if(req.url === '/learners') {
        const learners = getLearners();
        res.end(JSON.stringify(learners))
    } else if(req.url.startsWith('/add') ) { // `/add/<>` 
            const mtd = req.method;
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
            setLearners(updatedLearners)
            res.end(`Successfully added ${name}! Received a ${mtd} request `)    
    } else if (req.url.startsWith('/delete') && req.method === 'POST') { // `/delete/<>`
        // const id = decodeURI(req.url.split('/')[2]);
        console.log('Received delete request')
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
        const data = parse(body)
        const id = JSON.parse(Object.keys(data)[0]).id
        const updatedLearners = learners.filter((learner) => learner.id !== id);
        setLearners(updatedLearners)
        res.end(`Successful deleted ${id}!`)
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server started at ${hostname}:${port}...`)
})





