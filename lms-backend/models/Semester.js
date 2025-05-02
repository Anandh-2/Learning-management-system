const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    name:{type:String, required:true},
    startDate:{type:Date, required:true},
    endDate:{type:Date, required:true},
    status:{type:String, enum:["upcoming","ongoing", "completed"], default:"upcoming"}
},{timestamps:true});

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;