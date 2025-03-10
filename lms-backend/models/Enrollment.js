const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    courseId: {type:mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    semesterId: {type:mongoose.Schema.Types.ObjectId, ref:"Semester",required: true},
    progress: {type: Number, default: 0},
}, {timestamps: true});

module.exports = mongoose.model("Enrollment", enrollmentSchema);