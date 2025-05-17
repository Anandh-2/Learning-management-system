const express = require('express');
const router = express.Router();
const {auth, isInstructor}=require('../middlewares/Auth');
const { createCourse, getEnrolledCourses, getCreatedCourses } = require('../controllers/courseController');
const {getModules, createModule} = require('../controllers/moduleController')

router.post("/courses",auth,isInstructor,createCourse);
//router.post();
router.post("/:courseId/modules",auth,isInstructor,createModule);
router.get("/enrolled-courses",auth,getEnrolledCourses);
router.get("/created-courses",auth,getCreatedCourses);
// router.get("/:courseId/modules",auth,getModules);


module.exports=router;