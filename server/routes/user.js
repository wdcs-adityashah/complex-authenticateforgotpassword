import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router();
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
router.post('/signup',async (req,res)=>{
    const {username,email,password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"user already existed"});  
    }
    const hashpassword = await bcrypt.hash(password,10)
    const newUser = new User({
        username,
        email,
        password:hashpassword,
    })
    try {
        await newUser.save();
        return res.json({ status: true, message: "Record registered" });
      } catch (error) {
        return res.status(500).json({ message: "Server error", error });
      }

})
router.post('/login',async(req,res)=>{
  const{email,password} = req.body;
  const user = await User.findOne({email});
  if(!user){
     return res.status(400).json({message:"user not registered"});
  }
  const validatePassword = await bcrypt.compare(password,user.password)
  if(!validatePassword){
    return res.status(400).json({message:"Password is incorrect"})
  }
  const token = jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
  res.cookie('token',token,{httpOnly:true, maxAge:360000})
  return res.json({status:true,message:"login successfully"})
})
router.post('/forgot-password',async (req,res)=>{
  const{email} = req.body;
  try {
    const user = await User.findOne({email})
    if(!user){
       return res.status(400).json({message:"User not found"})
    }
    const token = jwt.sign({id:user._id},process.env.KEY,{expiresIn:'5m'})
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aditya.shah@codezeros.com',
        pass: 'ejqo izmb necx fiub'
      }
    });
    
    var mailOptions = {
      from: 'aditya.shah@codezeros.com',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:5173/resetPassword/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
console.log("eeeeeeeeeeeee", error)
        return res.json({message:"error sending email"})
      } else {
console.log("ssssssssssss", info)
        return res.json({status:true,message:"email sent"})
      }
    });
  } catch (error) {
    console.log(error);
  }

})
export {router as UserRoute}