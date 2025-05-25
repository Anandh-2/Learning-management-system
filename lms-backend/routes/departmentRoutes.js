const express = require('express');
const { getDepartments, createDept, getAllDepartments, deleteDepartment, assignHOD } = require('../controllers/departmentController');
const router = express.Router();

router.get('/:batchId/departments',getDepartments);
router.get('/departments',getAllDepartments);
router.post('/departments', createDept);
router.delete('/departments/:departmentId', deleteDepartment);
router.post('/departments/:departmentId/assign-hod', assignHOD);

module.exports=router;