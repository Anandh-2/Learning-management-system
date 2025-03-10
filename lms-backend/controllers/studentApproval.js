const express = require('express');
const User = require('../models/User.js');
const PendingUser = require('../models/PendingUser.js');

exports.getRequests=async(req, res)=>{
    try{
        const requests = await PendingUser.find({department:req.user.department});
        res.status(200).json(requests);
    }catch(err){
        res.status(500).jsom({message: 'Server error'});
    }
}

exports.approve=async(req,res,next)=>{
    try{
        const {id} = req.body;
        const request = await PendingUser.findById(id);
        if(!request){
            return res.status(404).json({message: 'Request not found'});
        }
        const user = new User({
            _id:request._id,
            username:request.username,
            email:request.email,
            password:request.password,
            role:request.role,
            department:request.department,
            year:request.year
        })
        await user.save();
        await PendingUser.findByIdAndDelete(id);
        return res.status(201).json({message:'User Approved'});
    }catch(err){
        return res.status(500).json({message:'Server error',err});
    }
};