const { mongo } = require("mongoose");
const Content = require("../models/Content");
const Course = require("../models/Course");
const Module = require("../models/Module");
const { default: mongoose } = require("mongoose");

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
        const {courseId} = req.params;
        const {title} = req.body;
        const newModule = new Module({
            title:title,
            // courseId:courseId,
            contents:[]
        });
        await newModule.save();
        console.log(courseId);
        const course = await Course.findById(courseId);
        course.modules.push(newModule._id);
        await course.save();
        return res.status(200).json({message:'Module created successfully',module:newModule});
    }catch (err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
};

exports.deleteModule = async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        const {courseId, moduleId} = req.params;
        session.startTransaction();
        const course = await Course.findById(courseId).session(session);
        course.modules = course.modules.filter(mod=>mod._id.toString()!==moduleId);
        await course.save({session});
        const module = await Module.findById(moduleId).session(session);
        await Content.deleteMany({_id:{$in:module.contents}}).session(session);
        await Module.findByIdAndDelete(moduleId).session(session);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({message:'Module deleted successfully'});
    }catch(err){
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({message:'Server error'});
    }
}