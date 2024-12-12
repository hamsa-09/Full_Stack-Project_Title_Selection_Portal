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

router.post('check-duplicate', async (req, res) => {
    try {
      const { emails } = req.body; // An array of email IDs to check
  
      // Query both collections for duplicates
      const internalDuplicates = await InternalForm.find({
        $or: [
          { email1: { $in: emails } },
          { email2: { $in: emails } },
          { email3: { $in: emails } },
        ],
      });
  
      const externalDuplicates = await ExternalForm.find({
        $or: [
          { email1: { $in: emails } },
          { email2: { $in: emails } },
          { email3: { $in: emails } },
        ],
      });
  
      const allDuplicates = [...internalDuplicates, ...externalDuplicates];
  
      if (allDuplicates.length > 0) {
        // Collect duplicate email information
        const existingEmails = allDuplicates.flatMap(entry => 
          [entry.email1, entry.email2, entry.email3].filter(email => emails.includes(email))
        );
  
        res.status(200).json({ duplicate: true, existingEmails });
      } else {
        res.status(200).json({ duplicate: false });
      }
    } catch (error) {
      console.error('Error checking duplicates', error);
      res.status(500).send('Server error');
    }
  });
  
 




module.exports = router;
