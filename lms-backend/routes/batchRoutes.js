const express = require('express');
const { createBatch, getAllBatches, deleteBatch, getActiveBatches, getBatchCount } = require('../controllers/batchController');
const router = express.Router();

router.post('/batches',createBatch);
router.get('/batches',getAllBatches);
router.get('/batches/active',getActiveBatches);
router.delete('/batches/:batchId',deleteBatch);
router.get('/batches/count', getBatchCount);   
module.exports=router;