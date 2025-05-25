const express = require('express');
const { updateSemester, getActiveSemesters } = require('../controllers/semesterController');
const router = express.Router();

router.put('/semesters/:semesterId', updateSemester);
router.get('/semesters/active', getActiveSemesters);

module.exports = router;