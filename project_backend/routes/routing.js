const express= require('express');
const router = express.Router();
const Login1 = require('../models/login');
const Login2 =require('../models/login2');
const Login3 =require('../models/login3');
const InternalForm = require('../models/internal_form');
const ExternalForm = require('../models/external_form');

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
            password: req.body.password
        });

        const savedUser = await user.save();
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
            password: req.body.password
        });

        const savedUser = await user.save();
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

router.post('/check-duplicate', async (req, res) => {
    try {
      const { emails } = req.body; // An array of email IDs to check
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
  router.get('/guide/:guideEmail', async (req, res) => {
    try {
        const { guideEmail } = req.params;
        console.log(`Searching for guideEmail: ${guideEmail}`);

        const internalForms = await InternalForm.find({
            guideEmail: { $regex: new RegExp(guideEmail, 'i') }
        });

        const externalForms = await ExternalForm.find({
            guideEmail: { $regex: new RegExp(guideEmail, 'i') }
        });

        console.log(`Internal Forms Found:`, internalForms);
        console.log(`External Forms Found:`, externalForms);

        const allForms = [...internalForms, ...externalForms]; // Merge both submissions

        if (allForms.length === 0) {
            return res.status(404).json({ message: 'No forms found for this guide.' });
        }

        res.status(200).json(allForms);
    } catch (err) {
        console.error("Error retrieving submissions:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.patch('/update-status', async (req, res) => {
    const { submissionId, status } = req.body;

    try {
        let updatedSubmission;

        // Try updating in Internal collection
        updatedSubmission = await InternalForm.findByIdAndUpdate(submissionId, { status }, { new: true });

        // If not found in Internal, try updating in External collection
        if (!updatedSubmission) {
            updatedSubmission = await ExternalForm.findByIdAndUpdate(submissionId, { status }, { new: true });
        }

        // If still not found, return an error
        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', updatedSubmission });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});






module.exports = router;
