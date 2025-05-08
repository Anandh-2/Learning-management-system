const BatchDepartment = require("../models/BatchDepartment")

exports.assignHod = async (instructorId, batchId, departmentId) => {
  try {
    const batchDept = await BatchDepartment.findOne({batch:batchId ,department:departmentId})

  }catch(err){

  } 
}   