const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
    name: {type: String, required:true},
    semesters :[{type:mongoose.Schema.Types.ObjectId, ref:"Semester", required:true}]
},{timestamps:true});

module.exports=mongoose.model("AcademicYear", academicYearSchema);