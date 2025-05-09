const BatchDepartment = require("../models/BatchDepartment");
const User = require("../models/User");

exports.assignHod = async (instructorId, batchId, departmentId) => {
  try {
    const batchDept = await BatchDepartment.findOne({batch:batchId ,department:departmentId});
    if(!batchDept) throw new Error('BatchDepartment not found');
    if(!batchDept.hod){
      const prevHod = await User.findById(batchDept.hod);
      prevHod.role='instructor';
      await prevHod.save();
    }
    const newHod = await User.findById(instructorId);
    newHod.role='hod'; 
    await newHod.save();
    batchDept.hod=newHod._id;
    await batchDept.save();
    
  }catch(err){
    console.log('Error in department service');
    throw err;
  }
}   