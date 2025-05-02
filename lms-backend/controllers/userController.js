const User = require('../models/User');
const {register} = require('./authController');

exports.createInstructor = [
    async(req,res,next)=>{
        req.body.role='instructor';
        req.body.department=req.user.dept;
        next();
    },register
]