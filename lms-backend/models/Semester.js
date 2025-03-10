const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    semesterId:{type:Sring, required:true, unique:true},
    name:{type:String, required:true},
    startDate:{type:Date, required:true},
    endDate:{type:Date, required:true},
    status:{type:String, enum:["ongoing", "completed"], default:"ongoing"}
},{timestamps:true});

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;