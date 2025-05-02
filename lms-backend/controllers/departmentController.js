const Department = require("../models/Department");
const User = require("../models/User");

exports.createDept = async (req, res) => {
  try {
    const { deptName } = req.body;

    const department = new Department({
      name: deptName,
      hod: req.user.id,
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
    const { instructorId } = req.body;
    const deptId = req.params.department;

    const department = await Department.findById(deptId);
    const oldHOD = await User.findById(department.hod);
    if(oldHOD.role!=='admin'){
        oldHOD.role='hod';
        await oldHOD.save();
    }
    const newHOD = await User.findByIdAndUpdate(
      instructorId,
      { role: "hod" },
      { new: true }
    );

    department.hod=instructorId;
    await department.save();
    return res.status(200).json({department, newHOD});
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
