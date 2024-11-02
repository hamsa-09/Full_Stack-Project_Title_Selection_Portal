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
            guide,
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
            guide,
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

module.exports = router;
