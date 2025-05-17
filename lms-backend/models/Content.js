const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title:{type:String, required:true},
    type:{type:String, enum:["video"], required:true},
    data:{type:mongoose.Schema.Types.Mixed, required:true},
    // module:{type:mongoose.Schema.Types.ObjectId, ref:"Module", required:true}
},{timestamps:true});

module.exports=mongoose.model("Content",contentSchema);