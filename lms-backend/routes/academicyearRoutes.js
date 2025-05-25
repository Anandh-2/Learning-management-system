const express = require('express');
const { getAllAcademicYears, getAcademicYearById, createAcademicYear, deleteAcademicYear } = require('../controllers/academicyearController');
const router = express.Router();

router.get('/academic-years', getAllAcademicYears);
router.get('/academic-years/:academicyearId', getAcademicYearById);
router.post('/academic-years', createAcademicYear);
router.delete('/academic-years/:academicyearId', deleteAcademicYear);

module.exports = router;