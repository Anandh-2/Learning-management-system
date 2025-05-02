const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    course: {type:mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    progress: {type: Number, default: 0},
    completedContents:[{type:mongoose.Schema.Types.ObjectId, ref:"Content"}]
}, {timestamps: true});

module.exports = mongoose.model("Enrollment", enrollmentSchema);