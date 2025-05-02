const Batch = require('../models/Batch');

exports.createBatch=async(req,res)=>{
    try{
        const {year}=req.body;
        const batch = new Batch({
            name:year,
            semesters:[],
            isActive:true
        });
        batch.save();
        return res.status(201).json({message:'Batch created successfully', batch});
    }catch(err){
        return res.status(500).json({message:'Server error'});
    }
}