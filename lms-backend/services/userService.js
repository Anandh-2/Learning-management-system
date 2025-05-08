const User = require("../models/User")

exports.updateUser = async(userId, updatedData)=>{
    try{
        const user = await User.findById(userId);
        Object.assign(user, updatedData);
        await user.save();
    }catch(err){
        console.log('Error in user service: ',err);
        throw new Error('Error in user service');
    }
}