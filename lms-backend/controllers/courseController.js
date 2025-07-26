const express = require('express');
const Course = require('../models/Course.js');
const User = require('../models/User.js');
const Module = require('../models/Module.js');
const Content = require('../models/Content.js')
const Enrollment = require('../models/Enrollment.js');
const { default: mongoose } = require('mongoose');
const { syncCourses, syncStudents } = require('../services/enrollmentService.js');

exports.getCourseById = async(req, res)=>{
    try{
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate({
            path:'modules',
            populate:{path:'contents'}
        })
        if(!course){
            return res.status(404).json({message:'Course not found'});
        }
        return res.status(200).json({course});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.createCourse = async(req, res)=>{
    try{
        const {title,semester}=req.body;
        const newCourse = new Course({
            title,
            instructor:req.user.id,
            department:req.user.department,
            semester,
            modules:[],
        })
        await newCourse.save();
        return res.status(201).json({message:"Course creation successful", course:newCourse});
    }catch (err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
};

exports.deleteCourse=async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        const courseId = req.params.courseId;
        session.startTransaction();
        const course = await Course.findById(courseId).populate('modules').session(session);
        const contents = [];
        for(const mod of course.modules){
            contents.push(...mod.contents);

        }
        const modules = course.modules.map(mod=>mod._id);
        await Course.findByIdAndDelete(courseId).session(session);
        await Module.deleteMany({_id:{$in:modules}}).session(session);
        await Content.deleteMany({_id:{$in:contents}}).session(session);
        await Enrollment.deleteMany({course:course._id}).session(session);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json('Course deleted successfully');
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getEnrolledCourses = async(req,res)=>{
    try{
        const {status} = req.query;
        const courses = await Enrollment.find({student:req.user.id}).populate({
            path:'course',
            populate:['semester','instructor']
        });
        console.log(courses);
        const activeCourses = courses.filter((enrollment)=>enrollment.course.semester.endDate>=new Date());
        const pastCourses = courses.filter((enrollment)=>enrollment.course.semester.endDate<new Date());
        if(status === "live"){
            return res.status(200).json({courses:activeCourses.map(enrollment=>enrollment.course)});
        }else if(status === "past"){
            return res.status(200).json({courses:pastCourses.map(enrollment=>enrollment.course)});
        }
        return res.status(200).json({ courses: enrollments.map(e => e.course) });
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
};

exports.getCreatedCourses = async(req,res)=>{
    try{
        const {status} = req.query;
        const courses = await Course.find({instructor:req.user.id}).populate('semester').populate('instructor');
        const activeCourses = courses.filter((course)=>course.semester.endDate>=new Date());
        const pastCourses = courses.filter((course)=>course.semester.endDate<new Date());
        if(status === "live"){
            return res.status(200).json({courses:activeCourses});
        }else if(status === "past"){
            return res.status(200).json({courses:pastCourses});
        }else{
            return res.status(200).json({courses});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getEnrolledStudents = async(req, res)=>{
    try{
        const {courseId} = req.params;
        console.log(courseId);
        const enrollments = await Enrollment.find({course:courseId}).populate('student');
        return res.status(200).json({enrollments});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.reorderCourse = async(req, res)=>{
    try{
        const {courseId} = req.params;
        const {reorderedCourse} = req.body;
        console.log(reorderedCourse);
        
        const course = await Course.findById(courseId);

        for(const reorderedModule of reorderedCourse.modules){
            const module = await Module.findById(reorderedModule._id);
            module.contents = reorderedModule.contents.map(content => content._id);
            await module.save();
        }

        course.modules = reorderedCourse.modules.map(module=>module._id);
        await course.save();
        return res.status(200).json({message:'Reordering successful'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.syncCourses = async(req, res)=>{
    try{
        await syncCourses(req.user.id);
        return res.status(200).json({message:'Synced successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.syncStudents = async(req, res)=>{
    try{
        const {courseId} = req.params;
        await syncStudents(courseId);
        return res.status(200).json({message:'Synced successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getAllCourses = async(req, res)=>{
    try{
        const courses = await Course.find().populate('instructor').populate('semester');
        return res.status(200).json({courses});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getNewCourses = async(req, res)=>{
    try{
        if(req.user.role==='student'){
        const courses = await Enrollment.find({student:req.user.id}).sort({createdAt:-1}).limit(4).populate({
            path:'course',
            populate:['semester','instructor']
        });
        return res.status(200).json({courses:courses.map(enrollment=>enrollment.course)});
        }else if(req.user.role==='instructor'){
            const courses = await Course.find({instructor:req.user.id}).sort({createdAt:-1}).limit(4).populate('semester').populate('instructor');
            return res.status(200).json({courses});
        }else if(req.user.role==='hod'){
            const courses = await Course.find({department:req.user.department}).sort({createdAt:-1}).limit(6).populate('semester').populate('instructor');
            return res.status(200).json({courses});
        }
        const courses = await Course.find().sort({createdAt:-1}).limit(6).populate('semester').populate('instructor');
        return res.status(200).json({courses});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getEnrolledCoursesCount = async(req, res)=>{
    try{
        const {status} = req.query;
        if(status){
            const count = await Enrollment.countDocuments({student:req.user.id,progress:100});
            return res.status(200).json({count});
        }
        const count = await Enrollment.countDocuments({student:req.user.id});
        return res.status(200).json({count});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getCreatedCoursesCount = async(req, res)=>{
    try{
        const count = await Course.countDocuments({instructor:req.user.id});
        return res.status(200).json({count});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}