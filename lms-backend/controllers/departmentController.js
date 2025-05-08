const Department = require("../models/Department");
const User = require("../models/User");

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
    
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getDepartments = async(req,res)=>{
  try{
    const departments = await Department.find();
    return res.status(200).json({departments});
  }catch(err){
    return res.status(500).json({ message: "Server error" });
  }
}