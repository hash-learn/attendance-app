import {useEffect, useState} from 'react';
import './index.css'
const API_BASE = 'http://localhost:3000';

function App() {
    const [learners, setLearners] = useState([])
    const [latestDelete, setLatestDelete] = useState('')

    useEffect(() => {
        fetch(API_BASE+'/learners')
        .then((res) => res.json())
        .then((learners) => {
            console.log(learners, Date.now())
            setLearners(learners);
        })
    }, [latestDelete])


    const onDelete = (learnerId) => {
        fetch(API_BASE+'/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: learnerId
            })
        })
        .then((res) => res.text())
        .then((message) => {
            console.log(message, Date.now());
            // setLearners(learners.filter((learner) => learner.id !== learnerId))
            setLatestDelete(learnerId)
        })
    }

    return  (
        <div className="App">
            <h1> Welcome to HashInsert Session! </h1>
            <h4> {Date.now().toString()}  </h4>
            <div className="learners">
                {
                    learners.map((learner, i) => (                    
                        <div key={i} className={'learner'}> 
                            <div className="text"> {learner.name}</div>
                            <button onClick={() => onDelete(learner.id)}> Delete </button>
                        </div>
                        )
                )
                }
                {
                    learners.length === 0 ? (
                        <div className="no-learners">No Learners yet!</div>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default App;