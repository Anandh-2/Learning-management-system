const express = require('express');
const { getUsers, blockUser, deleteUser, getStudentsCountByInstructor } = require('../controllers/userController');
const { roleMiddleware, auth } = require('../middlewares/Auth');
const router = express.Router();

router.get('/users', auth, roleMiddleware("admin","hod"), getUsers);
router.patch('/users/block/:userId',auth, roleMiddleware("admin","hod"), blockUser);
router.delete('/users/:userId',auth, roleMiddleware("admin","hod"), deleteUser);

router.get('/users/students-count', auth, getStudentsCountByInstructor);

module.exports=router;