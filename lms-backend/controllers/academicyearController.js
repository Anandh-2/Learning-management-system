const { default: mongoose } = require('mongoose');
const AcademicYear = require('../models/AcademicYear');
const { createSemester } = require('../services/semesterService');

exports.createAcademicYear=async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const {academicyearName, academicyearData} = req.body;
        const semesters = [];
        for(let i=0; i<academicyearData.length; i++){
            semesters.push(await createSemester(session, academicyearData[i]));
        }
        const newAcademicyear = new AcademicYear({
            name:academicyearName,
            semesters
        });
        await newAcademicyear.save({session});
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({message:'Academic year created successfully'});
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({message:'Server error'});
    }
}