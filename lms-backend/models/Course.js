const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {type: String, required:true, unique:true},
    title: {type: String, required: true},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    department: {type: String, required:true},
    semesterId:{type:mongoose.Schema.Types.ObjectId, ref:"Semester", required:true}
},{timestamps: true});

module.exports=mongoose.model("Course", courseSchema);
