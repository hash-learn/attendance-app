import {useEffect, useState} from 'react';
import './index.css'
const API_BASE = 'http://localhost:3000';

function App() {
    const [learners, setLearners] = useState([])
    const [latestDelete, setLatestDelete] = useState('')
    const [latestLearner, setLatestLearner] = useState('')
    const [newLearner, setNewLearner] = useState('');

    useEffect(() => {
        fetch(API_BASE+'/learners')
        .then((res) => res.json())
        .then((learners) => {
            console.log(learners, Date.now())
            setLearners(learners);
        })
    }, [latestDelete, latestLearner])

    const onAdd = () => {
        if(newLearner === '') {
            return;
        }
        const formData = new FormData();
        formData.append("name",  newLearner);
        fetch(API_BASE+'/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        })
        .then((res) => res.text())
        .then((message) => {
            setNewLearner('')
            setLatestLearner(message)
            console.log(message)
        })
    }

    const onDelete = (learnerId) => {
        const formData = new FormData();
        formData.append("id",  learnerId);
        fetch(API_BASE+'/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        })
        .then((res) => res.text())
        .then((message) => {
            console.log(message, Date.now());
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
            <div>
                <div className="content">
                <form id="add-form">
                    <h3>Add Learner</h3>
                    <input type="text" 
                    id="learner-name"
                    className='add-learner-input'
                    onChange={e => setNewLearner(e.target.value)} 
                    value={newLearner}/>
                <div className="button" onClick={onAdd}>Create Task</div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default App;