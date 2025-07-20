const User = require("../models/User")
const Semester = require('../models/Semester')
const Course = require('../models/Course')
const Enrollment = require('../models/Enrollment')

exports.syncCourses=async(studentId)=>{
    try{
        const student = await User.findById(studentId);
        const semesters = await Semester.find({batch:student.batch, endDate:{$gte:new Date()}});
        const courses = await Course.find({semester:{$in:semesters}});
        const enrolledCourses = await Enrollment.find({student:studentId});
        const notEnrolledCourses = courses.filter(course => !enrolledCourses.some(enrollment => enrollment.course.toString() === course._id.toString()));
        const newEnrollments = notEnrolledCourses.map(course=>({student:studentId, course:course._id}));
        console.log(newEnrollments);
        await Enrollment.insertMany(newEnrollments, {ordered:false});
    }catch(err){
        console.log('Error in enrollment service', err);
        throw new Error('Server error');
    }
}

exports.syncStudents=async(courseId)=>{
    try{
        const course = await Course.findById(courseId).populate('semester');
        const students = await User.find({role:'student', department: course.department, batch:course.semester.batch, isVerified:true, isActive:true});
        const enrollments = await Enrollment.find({course:course._id});
        const enrolledStudents = enrollments.map((en)=>en.student.toString());
        const notEnrolledStudents = students.filter(stu=>!enrolledStudents.some(eStu=>eStu===stu._id.toString()));
        const newEnrollments = notEnrolledStudents.map(e=>({course:courseId, student:e}));
        await Enrollment.insertMany(newEnrollments, {ordered:false});
    }catch(err){
        console.log('Error in enrollment service', err);
        throw new Error('Server error');
    }
}