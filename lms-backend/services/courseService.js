const Course = require('../models/Course');
const { deleteModule } = require('./moduleService');

exports.deleteCourse = async (courseId, session) => {
    try{
        const course = await Course.findById(courseId).session(session);
        if (!course) {
            throw new Error('Course not found');
        }
        for (const module of course.modules) {
            await deleteModule(module._id, session);
        }
        await Course.deleteOne({ _id: courseId }).session(session);
        return course;
    }catch(err){
        console.log('Error in course service',err);
        throw new Error('Error in course service');
    }
}   