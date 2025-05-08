const Course = require('../models/Course');
const Semester = require('../models/Semester');

exports.createSemester = async(session, semNo)=>{
    try{
        const pastSemester = await Semester.findOne({semNum:semNo, status:"completed"},{session}).sort({createdAt:-1});
        if(pastSemester){
            const pastCourses = await Course.find({semester:pastSemester._id},{session}).populate("instructor").populate("department");
            const validCourses= pastCourses.filter((course)=>course.department.isActive).map((course)=>{{name: course.name, }})
        }
    }
}