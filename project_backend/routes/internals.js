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

        const formData = new Internal({
            teamSize,
            cluster,
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
            type: 'Internal',
            status: 'Pending'
        });

        const savedForm = await formData.save();
        res.status(201).json(savedForm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/internal', async (req, res) => {
    try {
        const submissions = await Internal.find();
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
});
router.get('/internal/:emailID', async (req, res) => {
    const emailID = req.params.emailID;
    try {

        const submission = await Internal.find({
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

// router.get('/internal/guide/:guideEmail', async (req, res) => {
//     try {
//         const { guideEmail } = req.params;
//         console.log(`Searching for guideEmail: ${guideEmail}`);

//         const formsForGuide = await Internal.find({
//             guideEmail: { $regex: new RegExp(guideEmail, 'i') }
//         });

//         console.log(`Forms found: ${formsForGuide}`);

//         if (formsForGuide.length === 0) {
//             return res.status(404).json({ message: 'No forms found for the specified guide.' });
//         }

//         res.status(200).json(formsForGuide);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// router.patch('/update-status', async (req, res) => {
//     const { submissionId, status } = req.body;

//     try {

//         const updatedSubmission = await Internal.findByIdAndUpdate(submissionId,
//             { status: status },
//             { new: true }
//         );

//         if (!updatedSubmission) {
//             return res.status(404).json({ message: 'Submission not found' });
//         }

//         res.status(200).json({ message: 'Status updated successfully', updatedSubmission });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/approved', async (req, res) => {
    try {
        const approvedSubmissions = await Internal.find({ status: { $regex: /^approved$/i } });
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



module.exports = router;
