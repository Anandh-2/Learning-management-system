const Content = require("../models/Content");

exports.createContent = async(req,res)=>{
    try{
        const {type, data} = req.body;
        const newContent = new Content({
            type:type,
            data:data
        });
        await newContent.save();
        return res.status(201).json({message:"Content created successfully"});
    }catch(err){
        return res.status(500).json({message:'Server error'});
    }
}