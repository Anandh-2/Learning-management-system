const { default: mongoose } = require("mongoose");
const Content = require("../models/Content");
const Module = require("../models/Module");
const { uploadToTouTube } = require("../services/ytService");

exports.createContent = async(req,res)=>{
    try{
        const {type} = req.body;
        const {moduleId} = req.params;
        const newContent = new Content({
            title:"Untitled Content",
            type:type,
        });
        await newContent.save();
        const module = await Module.findById(moduleId);
        module.contents.push(newContent._id);
        await module.save();
        return res.status(201).json({message:"Content created successfully",content:newContent});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.getContentById = async(req,res)=>{
    try{
        const {contentId} = req.params;
        const content = await Content.findById(contentId);
        return res.status(200).json({content});
    }catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

exports.saveVideoContent = async(req,res)=>{
    try{
        const {contentId} = req.params;
        const {title} = req.body;
        const videoFile = req.file;

        let ytVideoId =null;
        if(videoFile){
            console.log('upload started')
            ytVideoId = await uploadToTouTube(videoFile.path, title);
            console.log('upload ended')
        }

        const updatedContent = await Content.findByIdAndUpdate(
            contentId,
        {
            title,
            ...(ytVideoId && {data:ytVideoId})
        },
        {new:true}
        );
        return res.json({content:updatedContent});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'});
    }
}

exports.deleteContent = async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        const {moduleId, contentId} = req.params;
        session.startTransaction();
        console.log(contentId);
        const module = await Module.findById(moduleId).session(session);
        module.contents=module.contents.filter(con=>con._id.toString()!==contentId);
        await module.save({session});
        await Content.findByIdAndDelete(contentId).session(session);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({message:'Content deleted successfully'});
    }catch(err){
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({message:'Server error'});
    }
}