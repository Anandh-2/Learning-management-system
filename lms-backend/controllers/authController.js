const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const PendingUser = require('../models/PendingUser');

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
        const {id,username, email, password, role, department, year}=req.body;
        const existingUser= await User.findOne({
            email: email,
        })
        if(existingUser){
            return res.status(409).json({message: 'User already exists'});
        }
        const user = new User({
            _id:id,
            username,
            email,
            password: await hashPassword(password),
            role,
            department,
            year,
        })
        await user.save();
        const token = jwt.sign(
            { id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:'0.1h'}            
        )
        return res.status(201).json({message: 'Registration successful', token});
    } catch(err){
        return res.status(500).json({message: 'Server error'});
    }
};

exports.login= async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
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
        return res.status(200).json({message: 'Login successful', token});
    } catch(err){
        return res.status(500).json({message: 'Server error'});
    }
};


exports.request=async(req, res)=>{
    try{
        const {id,username, email, password, role, department, year}=req.body;
        const existingUser= await PendingUser.findOne({
            email: email,
        })
        if(existingUser){
            return res.status(409).json({message: 'Wait for approval'});
        }
        const user = new PendingUser({
            _id:id,
            username,
            email,
            password: await hashPassword(password),
            role,
            department,
            year,
        })
        await user.save();
        return res.status(201).json({message: 'Registration successful'});
    } catch(err){
        return res.status(500).json({message: 'Server error'});
    }
}
