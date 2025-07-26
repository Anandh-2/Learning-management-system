const Enrollment = require('../models/Enrollment');
const User = require('../models/User');
const {register} = require('./authController');

exports.createInstructor = [
    async(req,res,next)=>{
        req.body.role='instructor';
        req.body.department=req.user.dept;
        next();
    },register
]

exports.getUsers = async(req, res)=>{
    try{
        const {role, department, batch, status, isVerified} = req.query;
        // console.log(req.user)
        const filters = {};
        if(role) filters.role=role;
        if(department){
            filters.department=department;
        }else if(req.user.department){
            filters.department=req.user.department;
        }
        if(role==='student'&&batch) filters.batch=batch;
        if(status){
            if(status==='active'){
                filters.isActive=true;
            }else if(status==='inactive'){
                filters.isActive=false;
            }
        }
        if(isVerified) filters.isVerified=isVerified;
        const users = await User.find(filters).populate('department', 'name').populate('batch', 'name');
        return res.status(200).json({users});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error"});
    }
}

exports.blockUser = async(req, res)=>{
    try{
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, {isActive:false});
        return res.status(200).json({message: 'User blocked successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error"});
    }
}

exports.deleteUser = async(req, res)=>{
    try{
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({message: 'User deleted successfully'});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error"});
    }
}

exports.getStudentsCountByInstructor = async(req, res)=>{
    try{
        const enrollments = await Enrollment.find().populate('course');
        const studentCount = enrollments.filter(enrollment => enrollment.course.instructor.equals(req.user.id)).length;
        return res.status(200).json({count: studentCount});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error"});
    }
}