const express = require('express');
const router = express.Router();
const Internal = require('../models/internal_form'); 
const sign_increment = require('../models/sign_increment'); 

router.post('/internal', async (req, res) => {
    try {
        const {
            teamSize,
            cluster,
            projectTitle,
            teamName,
            guideName,          // Extract guideName
            guideDepartment,     // Extract guideDepartment
            guideEmail,          // Extract guideEmail
            leaderName,
            leaderRoll,
            email1,
            department1,
            member2Name,
            member2Roll,
            email2,
            department2,
            member3Name,
            member3Roll,
            email3,
            department3
        } = req.body;

        // Create the new internal form submission with separate guide fields
        const formData = new Internal({
            teamSize,
            cluster,
            projectTitle,
            teamName,
            guideName,           // Store guideName
            guideDepartment,      // Store guideDepartment
            guideEmail,           // Store guideEmail
            leaderName,
            leaderRoll,
            email1,
            department1,
            member2Name,
            member2Roll,
            email2,
            department2,
            member3Name,
            member3Roll,
            email3,
            department3,
            type: 'Internal',     // Default type to Internal
            status: 'Pending'     // Default status to Pending
        });

        const savedForm = await formData.save();
        res.status(201).json(savedForm);  
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
});

router.get('/internal', async (req, res) => {
    try {
        const submissions = await Internal.find(); // Fetch all submissions
        res.status(200).json(submissions); // Return the submissions as JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
});
router.get('/internal/:emailID', async (req, res) => {
    const emailID = req.params.emailID; // Extract email from URL parameters
    try {
        // Find submission by matching emailID with email1, email2, or email3
        const submission = await Internal.findOne({
            $or: [{ email1: emailID }, { email2: emailID }, { email3: emailID }]
        });

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        
        res.status(200).json(submission); // Return the submission if found
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
});

router.get('/internal/guide/:guideEmail', async (req, res) => {
    try {
        const { guideEmail } = req.params;
        console.log(`Searching for guideEmail: ${guideEmail}`);

        const formsForGuide = await Internal.find({
            guideEmail: { $regex: new RegExp(guideEmail, 'i') }
        });

        console.log(`Forms found: ${formsForGuide}`);

        if (formsForGuide.length === 0) {
            return res.status(404).json({ message: 'No forms found for the specified guide.' });
        }

        res.status(200).json(formsForGuide);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.patch('/update-status', async (req, res) => {
    const { submissionId, status } = req.body;
    
    try {

        const updatedSubmission = await Internal.findByIdAndUpdate(submissionId, 
            { status: status },
            { new: true }
        );

        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', updatedSubmission });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
