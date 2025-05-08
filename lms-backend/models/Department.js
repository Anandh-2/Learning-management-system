const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    // hod:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
},{timestamps:true});

module.exports=mongoose.model("Department", departmentSchema);