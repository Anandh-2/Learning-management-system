const express = require('express');
const Course = require('../models/Course.js');
const User = require('../models/User.js');
const Module = require('../models/Module.js');
const Enrollment = require('../models/Enrollment.js');

exports.createCourse = async(req, res)=>{
    try{
        const {courseCode, courseName} = req.body;
        const existingCourse = await Course.findById(courseCode);
        if(existingCourse){
            return res.status(409).json({message: 'Course already exists'});
        }
        const instructor = await User.findById(req.user.id);
        const newCourse = new Course({
            _id: courseCode,
            title: courseName,
            instructor: instructor.username,
            department: instructor.department,
            //semesterId:semesterId
        });
        console.log(newCourse);
        console.log(courseCode);
        await newCourse.save();
        return res.status(200).json({message: 'Course created successfully'});
    }catch (err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
};

exports.getEnrolledCourses = async(req,res)=>{
    try{
        const coursesIds = await Enrollment.find({studentId:req.user.id}).populate("");
        //const courses = await Course.
    }catch(err){
        
    }
};

exports.getCreatedCourses = async(req,res)=>{
    try{
        const courses = await Course.find({instructor:req.user.id});
        return res.status(200).json({courses});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getModules = async(req, res)=>{
    try{
        const {courseId} = req.body;
        const modules = await Module.find({courseId});
        return res.status(200).json({modules});
    }catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

exports.createModule = async(req,res)=>{
    try{
        const {courseId} = req.body;
        const newModule = new Module({
            moduleName:"New Module",
            courseId:courseId,
            contents:[]
        });
        await newModule.save();
        return res.status(200).json({message:'Module created successfully'});
    }catch (err){
        return res.status(500).json({message:'Server error'});
    }
};