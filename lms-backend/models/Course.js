const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    department: {type: mongoose.Schema.Types.ObjectId, ref:"Department", required:true},
    semester:{type:mongoose.Schema.Types.ObjectId, ref:"Semester", required:true},
    isPublished:{type:Boolean, default:false}
},{timestamps: true});

module.exports=mongoose.model("Course", courseSchema);
