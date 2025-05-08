const express = require('express');
const router = express.Router();
const {auth, isInstructor}=require('../middlewares/Auth');
const { createCourse, getEnrolledCourses, getCreatedCourses } = require('../controllers/courseController');
const {getModules} = require('../controllers/moduleController')

router.post("/create-course",auth,isInstructor,createCourse);
//router.post();
router.get("/enrolled-courses",auth,getEnrolledCourses);
router.get("/created-courses",auth,getCreatedCourses);
router.get("/modules",auth,getModules);

module.exports=router;