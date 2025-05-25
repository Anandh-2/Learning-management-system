const { default: mongoose } = require('mongoose');
const AcademicYear = require('../models/AcademicYear');
const { createSemester, deleteSemester } = require('../services/semesterService');

exports.createAcademicYear=async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const {academicyearName, academicyearData} = req.body;
        console.log(academicyearName, academicyearData);
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

exports.getAllAcademicYears=async(req,res)=>{
    try{
        const academicyears = await AcademicYear.find();
        // console.log(academicyears);
        return res.status(200).json({academicyears});
    }
    catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

exports.getAcademicYearById=async(req,res)=>{
    try{
        const academicyear = await AcademicYear.findById(req.params.academicyearId).populate({
            path: 'semesters',
            populate: {
                path: 'batch',
                model: 'Batch'
            }
        });
        if(!academicyear){
            return res.status(404).json({message:'Academic year not found'});
        }
        return res.status(200).json({academicyear});
    }
    catch(err){
        return res.status(500).json({message:'Server error'});
    }
}

exports.deleteAcademicYear = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { academicyearId } = req.params;
        const academicyear = await AcademicYear.findById(academicyearId).session(session);
        if (!academicyear) {
            return res.status(404).json({ message: 'Academic year not found' });
        }
        for(const semester of academicyear.semesters){
            await deleteSemester(semester._id, session);
        }
        await AcademicYear.deleteOne({ _id: academicyearId }).session(session);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: 'Academic year deleted successfully' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
}