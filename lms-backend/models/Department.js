const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    hod:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null},
},{timestamps:true});

module.exports=mongoose.model("Department", departmentSchema);