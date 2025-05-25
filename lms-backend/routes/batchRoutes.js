const express = require('express');
const { createBatch, getAllBatches, deleteBatch, getActiveBatches } = require('../controllers/batchController');
const router = express.Router();

router.post('/batches',createBatch);
router.get('/batches',getAllBatches);
router.get('/batches/active',getActiveBatches);
router.delete('/batches/:batchId',deleteBatch);

module.exports=router;