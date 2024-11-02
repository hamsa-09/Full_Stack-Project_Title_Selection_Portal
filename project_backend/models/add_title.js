const mongoose = require('mongoose');

const internalTitleSchema = new mongoose.Schema({
    S_no: {
        type: Number,
        min:[1]
    },
    internalTitle: {
        type: String,
        required: true,
        maxlength: 100
    }
});

module.exports = mongoose.model('Add_internals', internalTitleSchema);
