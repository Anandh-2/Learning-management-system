const mongoose = require('mongoose');

const academicYearSchema = new mongoose.Schema({
    name: {type: String, required:true},
    semesters :[{type:mongoose.Schema.Types.ObjectId, ref:"Semester", required:true}],
    //status: {type:String, enum:["completed","ongoing","upcoming"], default:"upcoming"}
},{timestamps:true});

module.exports=mongoose.model("AcademicYear", academicYearSchema);