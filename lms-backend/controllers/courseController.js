const express = require('express');
const Course = require('../models/Course.js');
const User = require('../models/User.js');
const Module = require('../models/Module.js');
const Enrollment = require('../models/Enrollment.js');

exports.createCourse = async(req, res)=>{
    try{
        const {title,semester}=req.body;
        const newCourse = new Course({
            title,
            instructor:req.user.id,
            department:req.user.dept,
            semester,
            modules:[],
        })
        await newCourse.save();
        return res.status(201).json({message:"Course creation successful", course:newCourse});
    }catch (err){
        return res.status(500).json({message:'Server error'});
    }
};

exports.deleteCourse=async(req,res)=>{
    try{
        const courseId = req.params.courseId;
        await Course.findByIdAndDelete(courseId);
        return res.status(200).json('Course deleted successfully');
    }catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

exports.getEnrolledCourses = async(req,res)=>{
    try{
        const courses = await Enrollment.find({student:req.user.id}).populate("course");
        return res.status(200).json({courses});
    }catch(err){
        return res.status(500).json({message:'Server error'});
    }
};

exports.getCreatedCourses = async(req,res)=>{
    try{
        const courses = await Course.find({instructor:req.user.id}).populate('semester');
        return res.status(200).json({courses});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

