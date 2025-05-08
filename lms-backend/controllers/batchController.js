const Batch = require("../models/Batch");
const BatchDepartment = require("../models/BatchDepartment");

exports.createBatch = async (req, res) => {
  try {
    const { name, departments } = req.body;
    const batch = new Batch({
      name,
    });
    await batch.save();

    await BatchDepartment.insertMany(
      departments.map((dept) => {
        return {
          batch: batch._id,
          department: dept,
          hod: null,
        };
      })
    );
    return res
      .status(201)
      .json({ message: "Batch created successfully", batch });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBatch=async(req,res)=>{
    try{
        const batchId = req.params.batchId;
        await BatchDepartment.deleteMany({batch:batchId});
        await Batch.findByIdAndDelete(batchId);
        return res.status(200).json({message:'Batch deleted successfully'});
    }catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

exports.getAllBatches = async(req,res)=>{
    try{
        const batches = await Batch.find();
        return res.status(200).json({batches});
    }catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}