const express = require('express');
const router = express.Router();
const Title = require('../models/add_title');
const sign_increment = require('../models/sign_increment');


router.post('/add_titles', async (req, res) => {
    try {
        const nextSno = await sign_increment('add_title');
        const { internalTitle } = req.body; 
          const titleData = new Title({
            S_no: nextSno,
            internalTitle: internalTitle 
        });

        const savedTitle = await titleData.save();
        res.status(201).json(savedTitle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.get('/get_titles', async (req, res) => {
    try {
      const titles = await Title.find({}); // Fetch all titles from the database
      res.status(200).json(titles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
