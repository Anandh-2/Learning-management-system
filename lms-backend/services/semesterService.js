const BatchDepartment = require('../models/BatchDepartment');
const Course = require('../models/Course');
const Semester = require('../models/Semester');

exports.createSemester = async(session, data)=>{
    try{
        const today = new Date();
        const pastSemester = await Semester.findOne({semNum:data.semNum, endDate:{$lt:today}}).sort({createdAt:-1}).session(session);
        const newSem = new Semester({
            name: `Sem ${data.semNum} ${new Date(data.startDate).getFullYear()}`,
            semNum:data.semNum,
            batch:data.batch,
            startDate:data.startDate,
            endDate:data.endDate,
            // status:"upcoming"
        })
        await newSem.save({session});
        if(pastSemester){
            const pastCourses = await Course.find({semester:pastSemester._id}).populate({
                path:"modules",
                populate:{
                    path:"contents"
                }
            }).session(session);
            const batchDepts = await BatchDepartment.find({batch:data.batchId}).session(session);
            const deptIds = batchDepts.map((bd)=>bd.department.toString());
            const validCourses= pastCourses.filter((course)=>deptIds.includes(course.department.toString()));
            const newCourses = validCourses.map((course)=>{
                return {
                    title:course.title,
                    instructor:course.instructor,
                    department: course.department,
                    semester:newSem._id,
                    isPublished:false,
                    modules:course.modules.map((module)=>{
                        const mod = module.toObject();
                        delete mod._id;
                        return {
                            ...mod,
                            isPublished:false,
                            contents:module.contents.map((content)=>{
                                const con = content.toObject();
                                delete con._id;
                                return con;
                            })
                        }
                    }),
                }
            });
            await Course.insertMany(newCourses, {session});
            
        }
        return newSem;
    }catch(err){
        console.log('Error in semester service',err);
        throw new Error('Error in semester service');
    }
}

exports.deleteSemester = async(semesterId, session)=>{
    try{
        const semester = await Semester.findById(semesterId).session(session);
        if(!semester){
            throw new Error('Semester not found');
        }
        const courses = await Course.find({semester:semester._id}).session(session);
        for(const course of courses){
            await deleteCourse(course._id, session);
        }
        await semester.deleteOne({ _id: semesterId }).session(session);
        return semester;
    }catch(err){
        console.log('Error in semester service',err);
        throw new Error('Error in semester service');
    }
}