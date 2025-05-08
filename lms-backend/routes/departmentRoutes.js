const express = require('express');
const { getDepartments, createDept } = require('../controllers/departmentController');
const router = express.Router();

router.get('/departments',getDepartments);
router.post('/departments', createDept);

module.exports=router;