const mongoose = require('mongoose');

// const hodAssignmentSchema = new mongoose.Schema({
//   hod: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   from: { type: Date, required: true },
//   to: { type: Date } 
// }, { _id: false });

const batchDepartmentSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
//   hodAssignments: [hodAssignmentSchema],
//   isOffered: { type: Boolean, default: true }
  hod: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('BatchDepartment', batchDepartmentSchema);
