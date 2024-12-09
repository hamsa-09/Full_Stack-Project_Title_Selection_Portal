const express = require('express');
const router = express.Router();
const External = require('../models/external_form'); // Import the Mongoose model

router.post('/external', async (req, res) => {
    try {
        const {
            teamSize,
            domain,
            projectTitle,
            teamName,
            guideName,         
            guideDepartment,     
            guideEmail,
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
      //  const nextSno = await sign_increment('external_form');
        const formData = new External({
            teamSize,
            domain,
            projectTitle,
            teamName,
            guideName,         
            guideDepartment,     
            guideEmail,
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
            type: 'External', 
            status: 'Pending' 
        });


        const savedForm = await formData.save();
        res.status(201).json(savedForm);  
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
});

router.get('/approvedExternal', async (req, res) => {
    try {
        const approvedSubmissions = await External.find({ status: { $regex: /^approved$/i } });
        console.log("Approved Submissions:", approvedSubmissions); 

        if (!approvedSubmissions || approvedSubmissions.length === 0) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(approvedSubmissions);
    } catch (err) {
        console.error("Error retrieving submissions:", err);
        res.status(500).json({ message: err.message });
    }
});
router.get('/external/:emailID', async (req, res) => {
    const emailID = req.params.emailID; 
    try {
       
        const submission = await External.findOne({
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
module.exports = router;
