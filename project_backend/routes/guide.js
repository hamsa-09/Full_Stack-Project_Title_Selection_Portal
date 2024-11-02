const express = require('express');
const router = express.Router();
const Guide = require('../models/add_guide');
const sign_increment = require('../models/sign_increment'); 


router.post('/add_guide', async (req, res) => {
  const nextSno = await sign_increment('add_guide'); 
  try {
        
      const { guideName, department, email } = req.body;
      const guideData = new Guide({
          S_no: nextSno,
          guideName: guideName,
          department: department,
          email: email
      });
      const savedGuide = await guideData.save();
      res.status(201).json(savedGuide);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

router.get('/get_guides', async (req, res) => {
  try {
    const guide = await Guide.find({});  
    res.status(200).json(guide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
