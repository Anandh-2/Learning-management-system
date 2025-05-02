const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name:{type:String, required:true},
    semesters:[{type:mongoose.Schema.Types.ObjectId, ref:"Semester"}],
    isActive:{type:mongoose.Schema.Types.Boolean, required:true}
},
{timestamps:true})

module.exports = mongoose.model("Batch",batchSchema);