import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.ajmcdal.mongodb.net/attendance_app')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err)
})

const learnerSchema = new mongoose.Schema({
    name: {type: String, required: true} , 
    email: {type: String, required: true} , 
    createdAt: {type: Date, default: Date.now}, 
})

export const Learner = mongoose.model('Learner', learnerSchema);