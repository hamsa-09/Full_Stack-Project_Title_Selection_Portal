const mongoose = require('mongoose');

const internalSchema = new mongoose.Schema({
    S_no: {
        type: Number,
        min: [1, 'S_no must be greater than 0']
    },
    teamSize: {
        type: Number,
        required: [true, 'Team size is required'],
        min: [1, 'Team size must be at least 1'],
        max: [3, 'Team size must be at most 3']
    },
    cluster: {
        type: String,
        required: [true, 'Cluster is required'],
        maxlength: [100, 'Cluster name should not exceed 100 characters']
    },
    projectTitle: {
        type: String,
        required: [true, 'Project title is required'],
        maxlength: [100, 'Project title must not exceed 100 characters']
    },
    teamName: {
        type: String,
        required: [true, 'Team name is required'],
        maxlength: [50, 'Team name must not exceed 50 characters']
    },
    // Separate guide details
    guideName: {
        type: String,
        required: [true, 'Guide name is required'],
        maxlength: [100, 'Guide name must not exceed 100 characters']
    },
    guideDepartment: {
        type: String,
        required: [true, 'Guide department is required'],
        maxlength: [100, 'Guide department must not exceed 100 characters']
    },
    guideEmail: {
        type: String,
        required: [true, 'Guide email is required'],
        match: [/.+\@.+\..+/, 'Guide email must be a valid email address']
    },
    leaderName: {
        type: String,
        required: [true, 'Leader name is required'],
        maxlength: [50, 'Leader name must not exceed 50 characters']
    },
    leaderRoll: {
        type: String,
        required: [true, 'Leader roll number is required'],
        match: [/^\d{7}[A-Za-z]{2}\d{3}$/, 'Leader roll number must follow the format 7376221CS159']
    },
    email1: {
        type: String,
        required: [true, 'Leader email is required'],
        match: [/.+\@.+\..+/, 'Leader email must be a valid email address']
    },
    department1: {
        type: String,
        required: [true, 'Leader department is required'],
        maxlength: [50, 'Department name must not exceed 50 characters']
    },
    member2Name: {
        type: String,
        maxlength: [50, 'Member 2 name must not exceed 50 characters']
    },
    member2Roll: {
        type: String,
        match: [/^\d{7}[A-Za-z]{2}\d{3}$/, 'Member 2 roll number must follow the format YYABC1234']
    },
    email2: {
        type: String,
        match: [/.+\@.+\..+/, 'Member 2 email must be a valid email address']
    },
    department2: {
        type: String,
        maxlength: [50, 'Department 2 name must not exceed 50 characters']
    },
    member3Name: {
        type: String,
        maxlength: [50, 'Member 3 name must not exceed 50 characters']
    },
    member3Roll: {
        type: String,
        match: [/^\d{7}[A-Za-z]{2}\d{3}$/, 'Member 3 roll number must follow the format YYABC1234']
    },
    email3: {
        type: String,
        match: [/.+\@.+\..+/, 'Member 3 email must be a valid email address']
    },
    department3: {
        type: String,
        maxlength: [50, 'Department 3 name must not exceed 50 characters']
    },
    type: {
        type: String,
        enum: ['Internal', 'External'],
        default: 'Internal'
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Internal_form', internalSchema);
