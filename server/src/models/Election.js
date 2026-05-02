import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema({
    stage: {
        type: String,
        required: true,
        enum: ['Voter Registration', 'Candidate Nomination', 'Campaigning', 'Voting Day', 'Counting & Results']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed'],
        default: 'Upcoming'
    },
    order: {
        type: Number,
        required: true
    }
});

const Election = mongoose.model('Election', electionSchema);
export default Election;
