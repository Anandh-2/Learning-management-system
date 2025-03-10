const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    moduleId: {type:String, required:true, unique:true},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"Course", required:true},
    contents:[{type:mongoose.Schema.Types.ObjectId, ref:"Content"}]
},{timestamps:true});

module.exports=mongoose.model("Module",moduleSchema);