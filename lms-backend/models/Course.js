const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    _id: {type: String, required:true},
    title: {type: String, required: true},
    instructor: {type: String, ref:"User", required: true},
    department: {type: String, required:true},
    //semesterId:{type:mongoose.Schema.Types.ObjectId, ref:"Semester", required:true}
},{timestamps: true});

module.exports=mongoose.model("Course", courseSchema);
