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
      const titles = await Title.find({}); 
      res.status(200).json(titles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.delete('/delete_title/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedTitle = await Title.findByIdAndDelete(id);
      if (!deletedTitle) {
          return res.status(404).json({ message: 'Title not found' });
      }
      res.status(200).json({ message: 'Title deleted successfully', deletedTitle });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

router.put('/update_title/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { internalTitle } = req.body;
      const updatedTitle = await Title.findByIdAndUpdate(
          id,
          { internalTitle: internalTitle },
          { new: true } 
      );
      if (!updatedTitle) {
          return res.status(404).json({ message: 'Title not found' });
      }
      res.status(200).json({ message: 'Title updated successfully', updatedTitle });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
