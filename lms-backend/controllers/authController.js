const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const hashPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

exports.register = async (req, res)=>{
    try{
        const {userId, username, rollNo, email, password, role, department, batch, isVerified=true}=req.body;
        const existingUser= await User.findOne({
            email: email,
        })
        if(existingUser){
            return res.status(409).json({message: 'User already exists'});
        }
        const user = new User({
            userId,
            username,
            rollNo,
            email,
            password: await hashPassword(password),
            role,
            department,
            batch,
            isVerified
        })
        await user.save();
        // const token = jwt.sign(
        //     { id: user.id, role: user.role, dept: user.department},
        //     process.env.JWT_SECRET,
        //     {expiresIn:'0.1h'}            
        // )
        return res.status(201).json({message: 'Registration successful', user});
    } catch(err){
        console.error("Error in registration:", err);
        return res.status(500).json({message: 'Server error',err});
    }
};

exports.login= async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email, isVerified:true});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const isSame = await bcryptjs.compare(password,user.password);
        if(!isSame){
            return res.status(401).json({message: 'Wrong password'});
        }
        const token = jwt.sign(
            {id:user.id, role: user.role, department:user.department},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        return res.status(200).json({message: 'Login successful', token, name:user.username, role: user.role});
    } catch(err){
        return res.status(500).json({message: 'Server error'});
    }
};


exports.request=[
    async(req, res, next)=>{
        req.body.isVerified=false;
        next();
    },
    this.register
];


exports.approve=async(req,res)=>{
    try{
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, {isVerified:true});
        return res.status(200).json({message:"Approved succesfully"});
    }catch(err){
        return res.status(500).json({message: 'Server error'});
    }
}

exports.reject=async(req,res)=>{
    try{
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({message:"Rejected succesfully"});
    }catch(err){
        return res.status(500).json({message: 'Server error'});
    }
}

exports.getRequests=async(req,res)=>{
    try{
        const requests = await User.find({isVerified:false});
        return res.status(200).json(requests);
    }catch(err){
        return res.status(500).json({message: 'Server error'});
    }
}