const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
    S_no: {
        type: Number,
        min: [1, 'S_no must be at least 1'],
        required: true
    },
    guideName: {
        type: String,
        required: [true, 'Guide name is required'],
        maxlength: [100, 'Guide name must not exceed 100 characters']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        maxlength: [100, 'Department name must not exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/.+\@.+\..+/, 'email must be a valid email address']
    },
    // to track how many teams have selected this guide
    // teamCount: {
    //     type: Number,
    //     default: 0,
    //     min: [0, 'Team count cannot be negative'],
    //     max: [4, 'A guide can be assigned to a maximum of 4 teams']
    // }
});

module.exports = mongoose.model('Add_guide', guideSchema);
