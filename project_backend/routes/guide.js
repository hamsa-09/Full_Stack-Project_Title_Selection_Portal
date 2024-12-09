const express = require('express');
const router = express.Router();
const Guide = require('../models/add_guide');
const sign_increment = require('../models/sign_increment'); 


router.post('/add_guides', async (req, res) => {
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

router.delete('/delete_guide/:id',async(req,res)=>{
  try{
    const{id}=req.params;
    const deletedGuide=await Guide.findByIdAndDelete(id);
    if(!deletedGuide){
      return res.status(404).json({message:'Guide not found'});
    }
    res.status(200).json({message:'Guide deleted successfully',deletedGuide});
  }catch(err){
    res.status(500).json({message:err.message});
  }
});
router.put('/update_guide/:id', async (req, res) => {
  const { guideName, department, email } = req.body;
  try {
    const updatedGuide = await Guide.findByIdAndUpdate(
      req.params.id, 
      { guideName, department, email }, 
      { new: true }  // This option returns the updated document
    );

    if (!updatedGuide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json(updatedGuide);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 

module.exports = router;
