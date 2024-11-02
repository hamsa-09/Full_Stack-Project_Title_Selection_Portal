const mongoose = require('mongoose');

const login2Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }  
});

module.exports = mongoose.model('Staff_Login', login2Schema);
