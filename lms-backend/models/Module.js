const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const moduleSchema = new mongoose.Schema({
    moduleName:{type:String, required:true},
    _id: {type:String, required:true},
    order: {type:Number, required:true, unique:true},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"Course", required:true},
    contents:[{type:mongoose.Schema.Types.ObjectId, ref:"Content"}]
},{timestamps:true});

moduleSchema.plugin(AutoIncrement, {inc_field: "order"});

module.exports=mongoose.model("Module",moduleSchema);