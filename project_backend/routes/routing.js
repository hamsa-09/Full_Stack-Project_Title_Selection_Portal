const express= require('express');
const router = express.Router();
const Login1 = require('../models/login'); 
const Login2 =require('../models/login2');
const Login3 =require('../models/login3');
const Internal = require('../models/internal_form');
const External = require('../models/external_form');

router.post('/register1', async (req, res) => {
    try {
        const user = new Login1({
            email: req.body.email,
            password: req.body.password
        });

        const savedUser = await user.save(); 
        res.status(201).send('User Registered Successfully in Login1');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// POST endpoint to register a user in Login2 collection
router.post('/register2', async (req, res) => {
    try {
        const user = new Login2({
            email: req.body.email,
            password: req.body.password // Store plain text password
        });

        const savedUser = await user.save(); // Save user to the DB
        res.status(201).send('User Registered Successfully in Login2');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// POST endpoint to register a user in Login3 collection
router.post('/register3', async (req, res) => {
    try {
        const user = new Login3({
            email: req.body.email,
            password: req.body.password // Store plain text password
        });

        const savedUser = await user.save(); // Save user to the DB
        res.status(201).send('User Registered Successfully in Login3');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});
router.post('/login1', async (req, res) => {
    try {
        // Find the user by email
        const user = await Login1.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email');
        }

       // compares password
        if (req.body.password !== user.password) {
            return res.status(400).send('Invalid password');
        }

        // If email and password match, login is successfull
        res.status(200).send('Login Successfull');
    } 
    // error handling
    catch (err) {   
        res.status(500).send('Error: ' + err);
    }
});
router.post('/login2', async (req, res) => {
    try {
        const user = await Login2.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email');
        }
        if (req.body.password !== user.password) {
            return res.status(400).send('Invalid password');
        }
        res.status(200).send('Login Successfull');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});
router.post('/login3', async (req, res) => {
    try {
        const user = await Login3.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email');
        }
        if (req.body.password !== user.password) {
            return res.status(400).send('Invalid password');
        }
        res.status(200).send('Login Successfull');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

router.get('/check-email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        // Check both internal and external forms for the email
        const internalSubmission = await Internal.findOne({
            $or: [{ email1: email }, { email2: email }, { email3: email }]
        });
        const externalSubmission = await External.findOne({
            $or: [{ email1: email }, { email2: email }, { email3: email }]
        });

        // Determine if email exists in any submission
        const emailExists = internalSubmission || externalSubmission;
        res.status(200).json({ emailExists: !!emailExists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;
