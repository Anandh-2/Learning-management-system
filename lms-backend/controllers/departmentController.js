const BatchDepartment = require("../models/BatchDepartment");
const Department = require("../models/Department");
const User = require("../models/User");
const { assignHod } = require("../services/departmentService");

exports.createDept = async (req, res) => {
  try {
    const { deptName } = req.body;

    const department = new Department({
      name: deptName,
    });

    await department.save();

    return res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.assignHOD = async (req, res) => {
  try {
    const {instructorId} = req.body;
    const departmentId = req.params.departmentId;
    const dept = await assignHod(instructorId, departmentId);
    return res.status(200).json({message:'New HOD assigned', dept});
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getDepartments = async(req,res)=>{
  try{
    const {batchId} = req.params;
    const batchDepts = await BatchDepartment.find({batch:batchId}).populate('department');
    return res.status(200).json({batchDepts});
  }catch(err){
    return res.status(500).json({ message: "Server error" });
  }
}

exports.getAllDepartments = async(req,res)=>{
  try{
    const departments = await Department.find().populate('hod');
    return res.status(200).json({departments});
  }catch(err){
    return res.status(500).json({meaasge:'Server error'});
  }
}

exports.deleteDepartment = async(req,res)=>{
  try{
    const {departmentId} = req.params;
    const department = await Department.findByIdAndDelete(departmentId);
    return res.status(200).json({message:'Department deleted successfully'});
  }catch(err){
    return res.status(500).json({ message: "Server error" });
  }
}

exports.getDepartmentCount = async(req,res)=>{
  try{
    const count = await Department.countDocuments();
    return res.status(200).json({count});
  }catch(err){
    return res.status(500).json({ message: "Server error" });
  }
}