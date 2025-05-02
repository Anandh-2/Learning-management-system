const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{type: String, required:true},
    userId:{type:String, required:true, unique:true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["student", "instructor", "hod", "admin"], default: "student"},
    department: {type:mongoose.Schema.Types.ObjectId, ref:"Department", required:true},
    batch: {type:mongoose.Schema.Types.ObjectId, ref:"Batch", required:function(){return this.role==="student";}},
    isVerified: {type:mongoose.Schema.Types.Boolean, default:true}
},
{timestamps:true});

module.exports=mongoose.model("User", userSchema);