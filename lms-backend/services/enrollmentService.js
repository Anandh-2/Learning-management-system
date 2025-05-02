const User = require("../models/User")

exports.syncCourses=async(studentId){
    try{
        const student = await User.findById(studentId);
        const batch = await Batch.findById(student.batch).populate()
    }catch(err){
        
    }
}