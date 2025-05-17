const Course = require("../models/Course");

// exports.getModules = async(req, res)=>{
//     try{
//         const {courseId} = req.body;
//         const modules = await Module.find({courseId});
//         return res.status(200).json({modules});
//     }catch(err){
//         return res.status(500).json({message:'Server error'});
//     }
// }

exports.createModule = async(req,res)=>{
    try{
        const {courseId} = req.params.courseId;
        const newModule = new Module({
            moduleName:"New Module",
            // courseId:courseId,
            contents:[]
        });
        await newModule.save();
        const course = await Course.findById(courseId);
        course.modules.push(newModule._id);
        await course.save();
        return res.status(200).json({message:'Module created successfully'});
    }catch (err){
        return res.status(500).json({message:'Server error'});
    }
};