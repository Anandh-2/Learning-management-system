const Department = require("../models/Department");
const User = require("../models/User");

exports.assignHod = async (instructorId, departmentId) => {
  try {
    const dept = await Department.findById(departmentId);
    if(!dept) throw new Error('Department not found');
    if(dept.hod){
      const prevHod = await User.findById(dept.hod);
      prevHod.role='instructor';
      await prevHod.save();
    }
    const newHod = await User.findById(instructorId);
    newHod.role='hod'; 
    await newHod.save();
    dept.hod=newHod._id;
    await dept.save();
    return dept;
  }catch(err){
    console.log('Error in department service',err);
    throw err;
  }
}   