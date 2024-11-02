const express=require('express');
const router=express.Router()
const Login=require('../models/login');
const login = require('../models/login');
router.get('/',async(req,res) =>{
   try{
    const login1=await Login.find();
    res.json(login1);
   }
   catch(err){
    res.send('Error '+err)
   }
})
router.get('/:id',async(req,res) =>{
    try{
     const login=await Login.findById(req.params.id);
     res.json(login);
    }
    catch(err){
     res.send('Error '+err)
    }
 })
router.post('/',async(req,res)=>{
    const login=new Login({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    try{
        const l1= await login.save()
        res.json(l1)
    }
    catch(err){
        res.send('Error')
    }
})
router.patch('/:id',async(req, res)=>{
    try{
        const login=await Login.findById(req.params.id)
            login.password=req.body.password
            const l1=await login.save()
            res.json(l1)
    }
    catch(err){
        res.send('Error')
    }
})
module.exports=router;