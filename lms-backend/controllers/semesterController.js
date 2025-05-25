const Semester = require('../models/Semester');

exports.updateSemester = async (req, res) => {
  try {
    const {semesterId} = req.params;
    const updatedSemester = req.body;
    const semester = await Semester.findByIdAndUpdate(semesterId, updatedSemester, {new: true});
    return res.status(200).json({semester});
  }catch (err) {
    console.log(err);
    return res.status(500).json({message:'Server error'});
  }
}

exports.getActiveSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find({endDate: {$gte: new Date()}});
    return res.status(200).json({semesters});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:'Server error'});
  }
}