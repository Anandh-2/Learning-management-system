const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    type:{type:String, enum:["video","quiz"], required:true},
    data:{type:mongoose.Schema.Types.Mixed, required:true},
    module:{type:mongoose.Schema.Types.ObjectId, required:true}
},{timestamps:true});

module.exports=mongoose.model("Content",contentSchema);