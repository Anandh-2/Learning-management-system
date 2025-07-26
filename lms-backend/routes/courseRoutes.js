const express = require('express');
const router = express.Router();
const {auth, isInstructor, roleMiddleware}=require('../middlewares/Auth');
const { createCourse, getEnrolledCourses, getCreatedCourses, getCourseById, reorderCourse, deleteCourse, syncCourses, getEnrolledStudents, syncStudents, getAllCourses, getNewCourses, getEnrolledCoursesCount, getCreatedCoursesCount } = require('../controllers/courseController');
const {getModules, createModule, deleteModule} = require('../controllers/moduleController');
const { createContent, getContentById, saveVideoContent, deleteContent } = require('../controllers/contentController');

const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.post("/courses",auth,roleMiddleware("instructor","hod"),createCourse);
router.get("/courses", auth, getAllCourses);
router.get("/courses/new", auth, getNewCourses);
//router.post();
router.post("/courses/:courseId/modules",auth,roleMiddleware("instructor","hod"),createModule);
router.post("/modules/:moduleId/contents", auth, roleMiddleware("instructor","admin"),createContent);
router.get("/courses/enrolled-courses",auth,getEnrolledCourses);
router.get("/courses/created-courses",auth,getCreatedCourses);
router.get("/courses/:courseId/students", auth, getEnrolledStudents);
router.get("/courses/:courseId", auth, getCourseById);
router.get('/contents/:contentId',auth,getContentById);
// router.get("/:courseId/modules",auth,getModules);
router.put('/contents/:contentId',auth,roleMiddleware("instructor","hod"),upload.single('video'),saveVideoContent);
router.delete('/modules/:moduleId/contents/:contentId',auth,deleteContent);
router.delete('/courses/:courseId/modules/:moduleId', auth, deleteModule);
router.delete('/courses/:courseId',auth,deleteCourse);
router.patch('/courses/:courseId/reorder',auth,reorderCourse);

router.post('/courses/sync-courses', auth, syncCourses);
router.post('/courses/:courseId/sync-students', auth, syncStudents);

router.get('/courses/enrolled-courses/count', auth, getEnrolledCoursesCount);
router.get('/courses/created-courses/count', auth, getCreatedCoursesCount);
module.exports=router;