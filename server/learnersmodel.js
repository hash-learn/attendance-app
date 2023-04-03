import fs from 'fs';

const LEARNERS_FILE = './learners.json';

const getLearners = () => {
    return JSON.parse(fs.readFileSync(LEARNERS_FILE));
}

const setLearners = (learners) => {
    fs.writeFileSync( LEARNERS_FILE, JSON.stringify(learners));
}

export {getLearners, setLearners};
