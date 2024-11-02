const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    // Define other fields as needed
});

const SubmissionModel = mongoose.model('Submission', SubmissionSchema);
module.exports = SubmissionModel;
