const express = require('express');
const { getDepartments } = require('../controllers/departmentController');
const router = express.Router();

router.get('/departments',getDepartments);

module.exports=router;