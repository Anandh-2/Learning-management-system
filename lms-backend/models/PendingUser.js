const mongoose=require('mongoose');

const pendingUserSchema=new mongoose.Schema({
    _id:{type: String, required:true},
    username:{type: String, required:true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["student", "instructor", "HOD", "admin"], default: "student"},
    department: {type:String, enum: ["CSE","IT","ECE","EEE","MECH","NA"],default: "NA"},
    year: {type:String, enum: ["I","II","III","IV","NA"],default:"NA"},
},
{timestamps:true});

module.exports=mongoose.model("PendingUser", pendingUserSchema);